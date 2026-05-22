export async function onRequestGet({ request, env }) {
  if (!isAdmin(request, env)) {
    return json({ ok: false, message: "unauthorized" }, 401);
  }

  if (!env.ORDERS) {
    return json({ ok: false, message: "orders_kv_not_bound" }, 500);
  }

  const url = new URL(request.url);
  const limit = clamp(Number(url.searchParams.get("limit") || 50), 1, 100);
  const listed = await env.ORDERS.list({ limit: 1000 });
  const orders = [];

  for (const key of listed.keys) {
    if (!key.name.startsWith("VPRO-")) {
      continue;
    }

    const rawOrder = await env.ORDERS.get(key.name);

    if (!rawOrder) {
      continue;
    }

    try {
      const order = JSON.parse(rawOrder);
      orders.push(toPublicOrder(order));
    } catch {
      orders.push({
        orderId: key.name,
        status: "unreadable",
        updatedAt: "",
        createdAt: ""
      });
    }
  }

  orders.sort((left, right) =>
    String(right.updatedAt || right.createdAt || "").localeCompare(String(left.updatedAt || left.createdAt || ""))
  );

  return json({
    ok: true,
    orders: orders.slice(0, limit)
  });
}

function toPublicOrder(order) {
  return {
    orderId: order.orderId || "",
    status: order.status || "pending",
    amount: order.amount || 0,
    modeName: order.modeName || "",
    planName: order.planName || "",
    createdAt: order.createdAt || "",
    paidAt: order.paidAt || "",
    updatedAt: order.updatedAt || "",
    manualTradeNo: order.manualTradeNo || "",
    merchantCallback: order.merchantCallback
      ? {
          configured: Boolean(order.merchantCallback.configured),
          ok: Boolean(order.merchantCallback.ok),
          status: order.merchantCallback.status || 0,
          attempts: order.merchantCallback.attempts || 0,
          sentAt: order.merchantCallback.sentAt || null,
          reason: order.merchantCallback.reason || "",
          error: order.merchantCallback.error || ""
        }
      : null
  };
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

function clamp(value, min, max) {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(Math.max(Math.round(value), min), max);
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
