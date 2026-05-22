export async function onRequestPost({ request, env }) {
  const body = await readJson(request);
  const orderId = String(body.orderId || "").trim();
  const contactType = String(body.contactType || "").trim();
  const contactValue = String(body.contactValue || "").trim();

  if (!["qq", "email"].includes(contactType) || !contactValue) {
    return json({ ok: false, message: "missing_contact" }, 400);
  }

  const contact = {
    orderId,
    contactType,
    contactValue,
    submittedAt: new Date().toISOString()
  };

  if (env.ORDERS) {
    await env.ORDERS.put(`contact:${orderId || crypto.randomUUID()}`, JSON.stringify(contact), {
      expirationTtl: 60 * 60 * 24 * 30
    });
  }

  const notified = await notifyQQ(env, [
    "VPRO 用户提交联系方式",
    orderId ? `订单号：${orderId}` : "订单号：未提供",
    `联系方式：${contactType === "qq" ? "QQ" : "邮箱"} ${contactValue}`
  ].join("\n"));

  return json({ ok: true, notified });
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
