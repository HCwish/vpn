const PAID_STATUSES = new Set([
  "paid",
  "success",
  "succeeded",
  "trade_success",
  "payment_success",
  "finished",
  "completed"
]);

export async function onRequest({ request, env }) {
  if (!["POST", "GET"].includes(request.method)) {
    return json({ ok: false, message: "method_not_allowed" }, 405);
  }

  const { body, rawBody } = await readPayload(request);

  if (!(await isAuthorized(request, env, rawBody))) {
    return json({ ok: false, message: "unauthorized" }, 401);
  }

  const orderId = getFirstString(body, [
    "orderId",
    "out_trade_no",
    "outTradeNo",
    "tradeNo",
    "trade_no",
    "merchant_order_id",
    "merchantOrderId",
    "order"
  ]);
  const callbackAmount = extractAmount(body);

  if (!orderId || !isPaid(body)) {
    return json({ ok: false, message: "ignored" }, 400);
  }

  let order = { orderId };
  let rawOrder = null;

  if (env.ORDERS) {
    rawOrder = await env.ORDERS.get(orderId);

    if (!rawOrder) {
      return json({ ok: false, message: "unknown_order", orderId }, 404);
    }

    order = JSON.parse(rawOrder);
  }

  const amountMismatch = getAmountMismatch(order, callbackAmount);

  if (amountMismatch) {
    await saveRejectedPayment(env, orderId, body, amountMismatch);
    return json({ ok: false, message: "amount_mismatch", ...amountMismatch }, 400);
  }

  const alreadyPaid = order.status === "paid";

  if (alreadyPaid && order.merchantCallback?.ok) {
    return json({
      ok: true,
      duplicate: true,
      orderId,
      status: "paid",
      merchantCallback: publicCallbackResult(order.merchantCallback)
    });
  }

  const paidAt = order.paidAt || new Date().toISOString();
  const updatedOrder = {
    ...order,
    status: "paid",
    paidAt,
    paymentPayload: sanitizePaymentPayload(body),
    updatedAt: new Date().toISOString()
  };

  const merchantCallback = await notifyMerchant(env, updatedOrder, body);
  updatedOrder.merchantCallback = merchantCallback;

  if (env.ORDERS) {
    await env.ORDERS.put(orderId, JSON.stringify(updatedOrder), {
      expirationTtl: 60 * 60 * 24 * 30
    });
  }

  const notified = await notifyQQ(env, buildNotifyText(updatedOrder, merchantCallback, alreadyPaid));

  return json({
    ok: true,
    duplicate: alreadyPaid,
    orderId,
    status: "paid",
    notified,
    merchantCallback: publicCallbackResult(merchantCallback)
  });
}

async function notifyMerchant(env, order, paymentBody) {
  const notifyUrl = order.merchantNotifyUrl || env.MERCHANT_NOTIFY_URL || env.ORDER_SUCCESS_NOTIFY_URL;

  if (!notifyUrl) {
    return {
      configured: false,
      ok: false,
      reason: "merchant_notify_url_not_configured"
    };
  }

  const payload = {
    event: "payment.paid",
    orderId: order.orderId,
    amount: order.amount ?? extractAmount(paymentBody),
    status: "paid",
    paidAt: order.paidAt,
    modeName: order.modeName || "",
    planName: order.planName || "",
    provider: getFirstString(paymentBody, ["provider", "channel", "payment_channel"]) || "payment",
    providerTradeNo: getFirstString(paymentBody, [
      "transaction_id",
      "trade_no",
      "tradeNo",
      "providerTradeNo",
      "pay_order_id",
      "payOrderId"
    ]),
    relay: {
      name: "vpro-payment-relay",
      version: "1.0"
    }
  };
  const bodyText = JSON.stringify(payload);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "User-Agent": "VPRO-Payment-Relay/1.0",
    "X-Payment-Event": "payment.paid",
    "X-Payment-Timestamp": timestamp
  };

  if (env.MERCHANT_NOTIFY_SECRET) {
    headers["X-Payment-Signature"] = `sha256=${await hmacSha256Hex(
      env.MERCHANT_NOTIFY_SECRET,
      `${timestamp}.${bodyText}`
    )}`;
  }

  let lastStatus = 0;
  let lastError = "";
  let responseText = "";

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const response = await fetch(notifyUrl, {
        method: "POST",
        headers,
        body: bodyText,
        signal: controller.signal
      });
      clearTimeout(timeout);
      lastStatus = response.status;
      responseText = (await response.text()).slice(0, 300);

      if (response.ok) {
        return {
          configured: true,
          ok: true,
          status: response.status,
          attempts: attempt,
          sentAt: new Date().toISOString()
        };
      }

      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error?.name === "AbortError" ? "request_timeout" : "request_failed";
    }

    if (attempt < 3) {
      await sleep(attempt * 350);
    }
  }

  return {
    configured: true,
    ok: false,
    status: lastStatus,
    attempts: 3,
    error: lastError,
    responseText,
    sentAt: new Date().toISOString()
  };
}

async function isAuthorized(request, env, rawBody) {
  if (env.PAYMENT_WEBHOOK_SECRET) {
    const url = new URL(request.url);
    const headerSecret = request.headers.get("x-payment-secret");
    const querySecret = url.searchParams.get("secret");

    if (
      safeEqual(headerSecret, env.PAYMENT_WEBHOOK_SECRET) ||
      safeEqual(querySecret, env.PAYMENT_WEBHOOK_SECRET)
    ) {
      return true;
    }
  }

  if (!env.PAYMENT_WEBHOOK_SIGNING_SECRET) {
    return false;
  }

  const providedSignature = normalizeSignature(
    request.headers.get("x-payment-signature") || request.headers.get("x-signature")
  );

  if (!providedSignature) {
    return false;
  }

  const timestamp = request.headers.get("x-payment-timestamp") || request.headers.get("x-timestamp");
  const signedPayloads = [rawBody];

  if (timestamp) {
    signedPayloads.push(`${timestamp}.${rawBody}`);
  }

  for (const signedPayload of signedPayloads) {
    const expectedSignature = await hmacSha256Hex(env.PAYMENT_WEBHOOK_SIGNING_SECRET, signedPayload);

    if (safeEqual(providedSignature, expectedSignature)) {
      return true;
    }
  }

  return false;
}

async function readPayload(request) {
  const url = new URL(request.url);
  const queryPayload = Object.fromEntries(url.searchParams.entries());

  if (request.method === "GET") {
    return { body: queryPayload, rawBody: "" };
  }

  const rawBody = await request.text();
  const contentType = request.headers.get("content-type") || "";
  let body = {};

  if (rawBody) {
    if (contentType.includes("application/json")) {
      body = parseJson(rawBody);
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      body = Object.fromEntries(new URLSearchParams(rawBody).entries());
    } else {
      body = parseJson(rawBody);

      if (!Object.keys(body).length) {
        body = Object.fromEntries(new URLSearchParams(rawBody).entries());
      }
    }
  }

  return {
    body: {
      ...queryPayload,
      ...body
    },
    rawBody
  };
}

function parseJson(value) {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function isPaid(body) {
  if (body.paid === true || String(body.paid).toLowerCase() === "true") {
    return true;
  }

  const rawStatus = getFirstString(body, [
    "status",
    "trade_status",
    "tradeStatus",
    "pay_status",
    "payStatus",
    "result"
  ]);
  const normalizedStatus = rawStatus.trim().toLowerCase().replaceAll("-", "_");

  return PAID_STATUSES.has(normalizedStatus);
}

function extractAmount(body) {
  for (const key of ["amount", "total_amount", "totalAmount", "total", "money", "actual_amount", "paid_amount"]) {
    const amount = Number(body[key]);

    if (Number.isFinite(amount)) {
      return amount;
    }
  }

  const cents = Number(body.total_fee || body.totalFee);

  if (Number.isFinite(cents)) {
    return cents / 100;
  }

  return null;
}

function getAmountMismatch(order, callbackAmount) {
  const expectedAmount = Number(order.amount);

  if (!Number.isFinite(expectedAmount) || callbackAmount === null) {
    return null;
  }

  if (Math.abs(expectedAmount - callbackAmount) <= 0.01) {
    return null;
  }

  return {
    expectedAmount,
    callbackAmount
  };
}

async function saveRejectedPayment(env, orderId, body, reason) {
  if (!env.ORDERS) {
    return;
  }

  await env.ORDERS.put(
    `payment-rejected:${orderId}:${Date.now()}`,
    JSON.stringify({
      orderId,
      reason,
      paymentPayload: sanitizePaymentPayload(body),
      createdAt: new Date().toISOString()
    }),
    { expirationTtl: 60 * 60 * 24 * 30 }
  );
}

function buildNotifyText(order, merchantCallback, duplicate) {
  return [
    duplicate ? "VPRO 收到重复付款成功通知" : "VPRO 收到付款成功通知",
    `订单号：${order.orderId}`,
    order.amount ? `金额：${order.amount}元` : "",
    order.modeName ? `服务模式：${order.modeName}` : "",
    order.planName ? `服务器规格：${order.planName}` : "",
    `付款时间：${order.paidAt}`,
    merchantCallback.configured
      ? `网站回调：${merchantCallback.ok ? "成功" : "失败"}`
      : "网站回调：未配置"
  ]
    .filter(Boolean)
    .join("\n");
}

async function notifyQQ(env, text) {
  if (!env.QQ_NOTIFY_WEBHOOK) {
    return false;
  }

  try {
    const response = await fetch(env.QQ_NOTIFY_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: text,
        text,
        message: text
      })
    });

    return response.ok;
  } catch {
    return false;
  }
}

function publicCallbackResult(result) {
  return {
    configured: Boolean(result?.configured),
    ok: Boolean(result?.ok),
    status: result?.status || 0,
    attempts: result?.attempts || 0,
    sentAt: result?.sentAt || null,
    reason: result?.reason || "",
    error: result?.error || ""
  };
}

function sanitizePaymentPayload(body) {
  const blockedKeys = new Set(["secret", "key", "token", "sign", "signature", "password"]);
  const safeBody = {};

  for (const [key, value] of Object.entries(body || {})) {
    if (blockedKeys.has(key.toLowerCase())) {
      continue;
    }

    safeBody[key] = value;
  }

  return safeBody;
}

function getFirstString(body, keys) {
  for (const key of keys) {
    const value = body?.[key];

    if (value !== undefined && value !== null && String(value).trim()) {
      return String(value).trim();
    }
  }

  return "";
}

async function hmacSha256Hex(secret, message) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));

  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function normalizeSignature(value) {
  return String(value || "")
    .trim()
    .replace(/^sha256=/i, "");
}

function safeEqual(left, right) {
  const a = String(left || "");
  const b = String(right || "");

  if (!a || !b) {
    return false;
  }

  let diff = a.length ^ b.length;

  for (let index = 0; index < a.length; index += 1) {
    diff |= a.charCodeAt(index) ^ b.charCodeAt(index % b.length);
  }

  return diff === 0;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
