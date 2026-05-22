export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const orderId = String(url.searchParams.get("orderId") || "").trim();

  if (!orderId) {
    return json({ status: "missing_order" }, 400);
  }

  if (!env.ORDERS) {
    return json({ orderId, status: "pending", paymentReady: false });
  }

  const rawOrder = await env.ORDERS.get(orderId);

  if (!rawOrder) {
    return json({ orderId, status: "pending" });
  }

  const order = JSON.parse(rawOrder);

  return json({
    orderId,
    status: order.status || "pending",
    paidAt: order.paidAt || null,
    merchantCallback: order.merchantCallback
      ? {
          configured: Boolean(order.merchantCallback.configured),
          ok: Boolean(order.merchantCallback.ok),
          status: order.merchantCallback.status || 0,
          attempts: order.merchantCallback.attempts || 0,
          sentAt: order.merchantCallback.sentAt || null
        }
      : null
  });
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
