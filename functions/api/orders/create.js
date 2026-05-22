export async function onRequestPost({ request, env }) {
  const body = await readJson(request);
  const orderId = sanitizeOrderId(body.orderId) || createOrderId();
  const amount = Number(body.amount || 0);
  const order = {
    orderId,
    amount,
    modeName: String(body.modeName || ""),
    planName: String(body.planName || ""),
    modeIndex: Number(body.modeIndex || 0),
    planIndex: Number(body.planIndex || 0),
    status: "pending",
    createdAt: new Date().toISOString()
  };

  if (env.ORDERS) {
    await env.ORDERS.put(orderId, JSON.stringify(order), { expirationTtl: 60 * 60 * 24 * 30 });
  }

  const paymentUrl = buildPaymentUrl(env, order);

  return json({
    orderId,
    paymentUrl,
    paymentReady: Boolean(paymentUrl)
  });
}

function buildPaymentUrl(env, order) {
  const template = env.PAYMENT_URL_TEMPLATE;

  if (template) {
    return template
      .replaceAll("{orderId}", encodeURIComponent(order.orderId))
      .replaceAll("{amount}", encodeURIComponent(String(order.amount)))
      .replaceAll("{mode}", encodeURIComponent(order.modeName))
      .replaceAll("{plan}", encodeURIComponent(order.planName));
  }

  if (!env.PAYMENT_LINK_BASE) {
    return "";
  }

  try {
    const url = new URL(env.PAYMENT_LINK_BASE);
    url.searchParams.set("order", order.orderId);
    url.searchParams.set("amount", String(order.amount));
    return url.toString();
  } catch {
    return "";
  }
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
