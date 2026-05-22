# 支付中转与付款成功回调配置

这个项目已经内置一个“支付中转层”：

1. 用户在 `/pay` 页面创建订单。
2. 后端把订单保存到 Cloudflare KV：`ORDERS`。
3. 用户跳转到你的正规支付平台付款。
4. 支付平台付款成功后，请求 `/api/payments/webhook`。
5. 本系统验证密钥、校验订单金额、把订单改成 `paid`。
6. 本系统再把付款成功事件回调到你自己的网站：`MERCHANT_NOTIFY_URL`。

重要：这个系统只是订单通知中转，不是收单机构。真实收款必须接入支付宝、微信支付、Stripe、聚合支付等正规渠道。不要保存银行卡信息，不要做替别人代收、跑分、洗钱、绕过平台风控等违规用途。

## 已有接口

| 接口 | 作用 |
| --- | --- |
| `/api/orders/create` | 创建订单，生成付款链接 |
| `/api/orders/status?orderId=订单号` | 查询订单是否已付款 |
| `/api/payments/webhook` | 接收支付平台的付款成功通知 |
| `/api/orders/contact` | 用户留下 QQ 或邮箱后通知客服 |

## 第 1 步：创建 Cloudflare KV

1. 登录 Cloudflare。
2. 左侧进入 `Workers & Pages`。
3. 进入 `KV`。
4. 点击 `Create a namespace`。
5. 名称填写：`ORDERS`。
6. 创建完成后，打开你的 Pages 项目。
7. 进入 `Settings` -> `Functions` -> `KV namespace bindings`。
8. 添加绑定：

```text
Variable name: ORDERS
KV namespace: 选择刚才创建的 ORDERS
```

这个 KV 用来保存订单、付款状态和回调结果。

## 第 2 步：配置环境变量

打开 Cloudflare Pages 项目：

`Settings` -> `Environment variables` -> `Add variable`

至少配置下面这些：

```text
PAYMENT_WEBHOOK_SECRET=自己生成一串随机密钥
MERCHANT_NOTIFY_URL=https://你的网站.com/api/payment-success
MERCHANT_NOTIFY_SECRET=自己生成另一串随机密钥
```

再配置一个付款链接来源，二选一：

```text
PAYMENT_LINK_BASE=https://你的支付平台.example/pay
```

或者如果支付平台给你的是链接模板：

```text
PAYMENT_URL_TEMPLATE=https://你的支付平台.example/pay?order={orderId}&amount={amount}&notify_url={notifyUrl}&return_url={returnUrl}
```

可选变量：

```text
PAYMENT_PUBLIC_NOTIFY_URL=https://你的域名/api/payments/webhook
PAYMENT_RETURN_URL=https://你的域名/pay
QQ_NOTIFY_WEBHOOK=https://你的 QQ 机器人 webhook 地址
```

说明：

- `PAYMENT_WEBHOOK_SECRET`：支付平台回调本系统时使用。
- `MERCHANT_NOTIFY_URL`：本系统付款成功后回调你网站的地址。
- `MERCHANT_NOTIFY_SECRET`：本系统回调你网站时用来生成签名。
- `PAYMENT_URL_TEMPLATE` 支持 `{orderId}`、`{amount}`、`{amountCents}`、`{mode}`、`{plan}`、`{notifyUrl}`、`{returnUrl}`。
- 不要把密钥放进 `NEXT_PUBLIC_` 开头的变量里，`NEXT_PUBLIC_` 会暴露给浏览器。

## 第 3 步：设置支付平台回调地址

在你的支付平台后台，把“异步通知地址 / webhook / notify_url”设置为：

```text
https://你的域名/api/payments/webhook?secret=你的_PAYMENT_WEBHOOK_SECRET
```

如果支付平台支持自定义请求头，优先用请求头，更安全：

```text
x-payment-secret: 你的_PAYMENT_WEBHOOK_SECRET
```

支付平台回调内容至少要包含：

```json
{
  "orderId": "VPRO-订单号",
  "status": "paid",
  "amount": 458,
  "tradeNo": "支付平台流水号"
}
```

本系统也兼容常见字段：

```text
orderId / out_trade_no / tradeNo / trade_no / merchant_order_id / order
status / trade_status / pay_status / result
amount / total_amount / total / money / actual_amount / paid_amount
```

付款成功状态可用：

```text
paid / success / succeeded / trade_success / payment_success / finished / completed
```

如果支付平台只传 `total_fee`，系统会按“分”处理，例如 `45800` 会识别为 `458.00` 元。

## 第 4 步：你的网站接收回调

本系统会向 `MERCHANT_NOTIFY_URL` 发送：

```json
{
  "event": "payment.paid",
  "orderId": "VPRO-订单号",
  "amount": 458,
  "status": "paid",
  "paidAt": "2026-05-22T10:00:00.000Z",
  "modeName": "全教程模式",
  "planName": "入门型",
  "provider": "payment",
  "providerTradeNo": "支付平台流水号",
  "relay": {
    "name": "vpro-payment-relay",
    "version": "1.0"
  }
}
```

同时会带请求头：

```text
X-Payment-Event: payment.paid
X-Payment-Timestamp: 1760000000
X-Payment-Signature: sha256=签名
```

签名算法：

```text
HMAC-SHA256(MERCHANT_NOTIFY_SECRET, timestamp + "." + body)
```

如果你的网站也是 Next.js，可以建一个接收接口：

```ts
// app/api/payment-success/route.ts
import crypto from "crypto";

const secret = process.env.MERCHANT_NOTIFY_SECRET || "";

export async function POST(request: Request) {
  const bodyText = await request.text();
  const timestamp = request.headers.get("x-payment-timestamp") || "";
  const signature = request.headers.get("x-payment-signature") || "";
  const expected =
    "sha256=" +
    crypto
      .createHmac("sha256", secret)
      .update(`${timestamp}.${bodyText}`)
      .digest("hex");
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return Response.json({ ok: false, message: "bad_signature" }, { status: 401 });
  }

  const event = JSON.parse(bodyText);

  if (event.event === "payment.paid") {
    // TODO: 在你的网站数据库里把 event.orderId 标记为已付款。
  }

  return Response.json({ ok: true });
}
```

如果你的网站暂时没有后端，也可以先不配置 `MERCHANT_NOTIFY_URL`。本项目自己的 `/pay` 页面会轮询 `/api/orders/status`，付款成功后自动变成“付款成功”。

## 第 5 步：重新部署

环境变量和 KV 绑定保存后：

1. 回到 Cloudflare Pages 项目。
2. 进入 `Deployments`。
3. 点击最新部署右侧的 `Retry deployment`。
4. 等部署状态变成 `Success`。

## 第 6 步：完整测试

先打开：

```text
https://你的域名/pay
```

选择配置后页面会显示订单号，复制这个订单号。

然后在 Windows PowerShell 测试支付平台回调，把域名、密钥、订单号和金额换成你自己的：

```powershell
$body = @{
  orderId = "VPRO-你的订单号"
  status = "paid"
  amount = 458
  tradeNo = "TEST-10001"
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri "https://你的域名/api/payments/webhook?secret=你的_PAYMENT_WEBHOOK_SECRET" `
  -ContentType "application/json" `
  -Body $body
```

成功时会返回类似：

```json
{
  "ok": true,
  "orderId": "VPRO-你的订单号",
  "status": "paid",
  "merchantCallback": {
    "configured": true,
    "ok": true,
    "status": 200,
    "attempts": 1
  }
}
```

回到付款页面，等待 5 秒左右，页面应显示“付款成功”。

## 常见问题

### 页面一直等待付款

检查：

1. Cloudflare Pages 是否绑定了 `ORDERS`。
2. 支付平台回调地址是否填对。
3. `PAYMENT_WEBHOOK_SECRET` 是否和回调地址里的 `secret` 一致。
4. 支付平台回调里的订单号是否就是本页面生成的订单号。

### 回调接口返回 `unknown_order`

说明 KV 里没有这个订单。通常是：

1. 订单号填错。
2. 没先打开 `/pay` 创建订单。
3. Cloudflare 没绑定 `ORDERS`。

### 回调接口返回 `amount_mismatch`

说明支付平台通知的金额和订单金额不一致。系统不会把这种订单标记为已付款，这是为了防止低金额伪造付款。

### `merchantCallback.ok` 是 `false`

说明本系统已经确认付款，但回调你的网站失败。检查：

1. `MERCHANT_NOTIFY_URL` 是否能公网访问。
2. 你的网站接收接口是否返回 HTTP 200。
3. 你的网站签名校验用的 `MERCHANT_NOTIFY_SECRET` 是否一致。

本系统会即时重试 3 次，并把结果保存到订单状态里。
