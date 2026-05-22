export async function onRequestPost({ request, env }) {
  if (!isAuthorized(request, env)) {
    return json({ ok: false, message: "unauthorized" }, 401);
  }

  const body = await readJson(request);
  const orderId = String(body.orderId || body.out_trade_no || body.tradeNo || "").trim();
  const paidStatus = String(body.status || body.trade_status || "").toLowerCase();
  const isPaid = body.paid === true || ["paid", "success", "trade_success"].includes(paidStatus);

  if (!orderId || !isPaid) {
    return json({ ok: false, message: "ignored" }, 400);
  }

  const paidAt = new Date().toISOString();
  let order = { orderId };

  if (env.ORDERS) {
    const rawOrder = await env.ORDERS.get(orderId);
    order = rawOrder ? JSON.parse(rawOrder) : order;
    await env.ORDERS.put(
      orderId,
      JSON.stringify({
        ...order,
        status: "paid",
        paidAt,
        paymentPayload: body
      }),
      { expirationTtl: 60 * 60 * 24 * 30 }
    );
  }

  const notified = await notifyQQ(env, [
    "VPRO 收到付款成功通知",
    `订单号：${orderId}`,
    order.amount ? `金额：${order.amount}元` : "",
    order.modeName ? `服务模式：${order.modeName}` : "",
    order.planName ? `服务器规格：${order.planName}` : "",
    `时间：${paidAt}`
  ].filter(Boolean).join("\n"));

  return json({ ok: true, notified });
}

function isAuthorized(request, env) {
  if (!env.PAYMENT_WEBHOOK_SECRET) {
    return false;
  }

  const url = new URL(request.url);
  const headerSecret = request.headers.get("x-payment-secret");
  const querySecret = url.searchParams.get("secret");

  return headerSecret === env.PAYMENT_WEBHOOK_SECRET || querySecret === env.PAYMENT_WEBHOOK_SECRET;
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
