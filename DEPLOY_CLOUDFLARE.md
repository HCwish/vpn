# Cloudflare Pages 部署说明

这个项目是静态 Next.js 网站，不需要 KV、不需要支付接口、不需要后台函数。

## 上传文件

上传或提交这些文件和目录：

- `app`
- `public`
- `package.json`
- `next.config.mjs`
- `tailwind.config.ts`
- `postcss.config.mjs`
- `tsconfig.json`
- `next-env.d.ts`
- `.nvmrc`
- `.gitignore`
- `README.md`

不要再上传旧的 `functions`、`components`、`PAYMENT_SETUP.md`、`MANUAL_PAYMENT_SETUP.md`，当前项目已经不需要它们。

## Cloudflare Pages 构建设置

在 Cloudflare Pages 里填写：

| 配置项 | 内容 |
| --- | --- |
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npx next build` |
| Build output directory | `out` |
| Root directory | 留空 |
| Node.js version | `20.17.0` |

如果 Cloudflare 没有 Node.js version 输入框，可以在环境变量里添加：

```text
NODE_VERSION=20.17.0
```

## 当前购买流程

1. 用户在首页选择服务模式和服务器规格。
2. 点击“立即购买”进入 `/pay`。
3. 点击“去付款”打开指定链接：`https://m.tb.cn/h.RefgWAy?tk=HYdO5Fpkvsb`。
4. 点击“已付款”进入 `/card`。
5. 用户通过 QQ 或邮箱联系开通。

## 绑定域名

1. 打开 Cloudflare Pages 项目。
2. 进入 `Custom domains`。
3. 点击 `Set up a custom domain`。
4. 输入你的域名，例如 `vpro.9865398.xyz`。
5. 按页面提示确认 DNS。
6. 等状态变成 `Active`。

## 常见构建失败原因

1. `app/pay/page.tsx` 没有上传。
2. `public/server-hero.png` 没有上传。
3. Build command 不是 `npx next build`。
4. Build output directory 不是 `out`。
5. 还上传了旧的 `functions` 或旧付款配置文件，导致 Cloudflare 误识别旧接口。
