const SERVICE_MODES = [
  { name: "全教程模式", fee: 298 },
  { name: "懒人模式", fee: 98 }
];

const SERVER_PLANS = [
  { name: "入门型", serverFee: 160 },
  { name: "轻量型", serverFee: 255 },
  { name: "标准型", serverFee: 420 },
  { name: "进阶型", serverFee: 625 },
  { name: "高配型", serverFee: 830 }
];

export async function onRequestPost({ request, env }) {
  const body = await readJson(request);
  const orderId = sanitizeOrderId(body.orderId) || createOrderId();
  const modeIndex = readIndex(body.modeIndex, SERVICE_MODES.length);
  const planIndex = readIndex(body.planIndex, SERVER_PLANS.length);
  const selectedMode = SERVICE_MODES[modeIndex];
  const selectedPlan = SERVER_PLANS[planIndex];
  const amount = selectedMode.fee + selectedPlan.serverFee;
  const requestedAmount = Number(body.amount || amount);

  if (Number.isFinite(requestedAmount) && Math.abs(requestedAmount - amount) > 0.01) {
    return json(
      {
        ok: false,
        message: "amount_mismatch",
        expectedAmount: amount
      },
      400
    );
  }

  const order = {
    orderId,
    amount,
    modeName: selectedMode.name,
    planName: selectedPlan.name,
    modeIndex,
    planIndex,
    status: "pending",
    merchantNotifyUrl: resolveMerchantNotifyUrl(env, body.callbackUrl),
    createdAt: new Date().toISOString()
  };

  if (env.ORDERS) {
    await env.ORDERS.put(orderId, JSON.stringify(order), { expirationTtl: 60 * 60 * 24 * 30 });
  }

  const paymentUrl = buildPaymentUrl(env, order, request);

  return json({
    ok: true,
    orderId,
    amount,
    paymentUrl,
    paymentReady: Boolean(paymentUrl),
    merchantNotifyReady: Boolean(order.merchantNotifyUrl)
  });
}

function buildPaymentUrl(env, order, request) {
  const template = env.PAYMENT_URL_TEMPLATE;
  const origin = new URL(request.url).origin;
  const publicNotifyUrl = env.PAYMENT_PUBLIC_NOTIFY_URL || `${origin}/api/payments/webhook`;
  const returnUrl = env.PAYMENT_RETURN_URL || `${origin}/pay`;
  const replacements = {
    "{orderId}": order.orderId,
    "{amount}": String(order.amount),
    "{amountCents}": String(Math.round(order.amount * 100)),
    "{mode}": order.modeName,
    "{plan}": order.planName,
    "{notifyUrl}": publicNotifyUrl,
    "{returnUrl}": returnUrl
  };

  if (template) {
    return Object.entries(replacements).reduce(
      (value, [token, replacement]) => value.replaceAll(token, encodeURIComponent(replacement)),
      template
    );
  }

  if (!env.PAYMENT_LINK_BASE) {
    return "";
  }

  try {
    const url = new URL(env.PAYMENT_LINK_BASE);
    url.searchParams.set("order", order.orderId);
    url.searchParams.set("amount", String(order.amount));
    url.searchParams.set("subject", `${order.modeName}-${order.planName}`);

    if (env.PAYMENT_PUBLIC_NOTIFY_URL) {
      url.searchParams.set("notify_url", publicNotifyUrl);
    }

    if (env.PAYMENT_RETURN_URL) {
      url.searchParams.set("return_url", returnUrl);
    }

    return url.toString();
  } catch {
    return "";
  }
}

function resolveMerchantNotifyUrl(env, callbackUrl) {
  const configuredUrl = normalizeHttpUrl(env.MERCHANT_NOTIFY_URL || env.ORDER_SUCCESS_NOTIFY_URL);

  if (configuredUrl) {
    return configuredUrl;
  }

  if (env.ALLOW_ORDER_CALLBACK_URL !== "true") {
    return "";
  }

  const candidate = normalizeHttpUrl(callbackUrl);

  if (!candidate) {
    return "";
  }

  const allowedHosts = String(env.MERCHANT_NOTIFY_ALLOWED_HOSTS || "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);

  if (!allowedHosts.length) {
    return "";
  }

  return allowedHosts.includes(new URL(candidate).hostname.toLowerCase()) ? candidate : "";
}

function normalizeHttpUrl(value) {
  try {
    const url = new URL(String(value || "").trim());

    if (!["https:", "http:"].includes(url.protocol)) {
      return "";
    }

    return url.toString();
  } catch {
    return "";
  }
}

function readIndex(value, max) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 0 || parsed >= max) {
    return 0;
  }

  return parsed;
}

function createOrderId() {
  const random = crypto.randomUUID().split("-")[0].toUpperCase();
  return `VPRO-${Date.now().toString(36).toUpperCase()}-${random}`;
}

function sanitizeOrderId(value) {
  const orderId = String(value || "").trim();
  return /^VPRO-[A-Z0-9-]{8,40}$/.test(orderId) ? orderId : "";
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
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
