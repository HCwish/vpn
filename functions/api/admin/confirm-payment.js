export async function onRequestPost({ request, env }) {
  if (!isAdmin(request, env)) {
    return json({ ok: false, message: "unauthorized" }, 401);
  }

  if (!env.ORDERS) {
    return json({ ok: false, message: "orders_kv_not_bound" }, 500);
  }

  const body = await readJson(request);
  const orderId = String(body.orderId || "").trim();

  if (!/^VPRO-[A-Z0-9-]{8,60}$/.test(orderId)) {
    return json({ ok: false, message: "invalid_order_id" }, 400);
  }

  const rawOrder = await env.ORDERS.get(orderId);

  if (!rawOrder) {
    return json({ ok: false, message: "unknown_order", orderId }, 404);
  }

  const order = JSON.parse(rawOrder);
  const expectedAmount = Number(order.amount);
  const receivedAmount = Number(body.amount || expectedAmount);

  if (Number.isFinite(expectedAmount) && Number.isFinite(receivedAmount) && Math.abs(expectedAmount - receivedAmount) > 0.01) {
    return json(
      {
        ok: false,
        message: "amount_mismatch",
        expectedAmount,
        receivedAmount
      },
      400
    );
  }

  const alreadyPaid = order.status === "paid";
  const paidAt = order.paidAt || new Date().toISOString();
  const updatedOrder = {
    ...order,
    status: "paid",
    paidAt,
    updatedAt: new Date().toISOString(),
    manualConfirmed: true,
    manualConfirmedAt: new Date().toISOString(),
    manualTradeNo: String(body.tradeNo || `MANUAL-${Date.now()}`).trim(),
    manualNote: String(body.note || "").trim().slice(0, 500),
    paymentPayload: {
      provider: "manual",
      status: "paid",
      amount: Number.isFinite(receivedAmount) ? receivedAmount : expectedAmount,
      tradeNo: String(body.tradeNo || "").trim(),
      note: String(body.note || "").trim().slice(0, 500)
    }
  };

  if (!alreadyPaid || !order.merchantCallback?.ok || body.resendCallback === true) {
    updatedOrder.merchantCallback = await notifyMerchant(env, updatedOrder);
  } else {
    updatedOrder.merchantCallback = order.merchantCallback;
  }

  await env.ORDERS.put(orderId, JSON.stringify(updatedOrder), {
    expirationTtl: 60 * 60 * 24 * 30
  });

  return json({
    ok: true,
    duplicate: alreadyPaid,
    orderId,
    status: "paid",
    merchantCallback: publicCallbackResult(updatedOrder.merchantCallback)
  });
}

async function notifyMerchant(env, order) {
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
    amount: order.amount,
    status: "paid",
    paidAt: order.paidAt,
    modeName: order.modeName || "",
    planName: order.planName || "",
    provider: "manual",
    providerTradeNo: order.manualTradeNo || "",
    relay: {
      name: "vpro-manual-payment-relay",
      version: "1.0"
    }
  };
  const bodyText = JSON.stringify(payload);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "User-Agent": "VPRO-Manual-Payment-Relay/1.0",
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

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function isAdmin(request, env) {
  if (!env.ADMIN_TOKEN) {
    return false;
  }

  const url = new URL(request.url);
  const headerToken = request.headers.get("x-admin-token");
  const bearerToken = String(request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const queryToken = url.searchParams.get("token");

  return safeEqual(headerToken, env.ADMIN_TOKEN) || safeEqual(bearerToken, env.ADMIN_TOKEN) || safeEqual(queryToken, env.ADMIN_TOKEN);
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
