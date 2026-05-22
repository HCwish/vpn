# Cloudflare Pages 部署说明

这个项目是纯展示型单页网站，推荐部署到 Cloudflare Pages 的静态站点模式。

## 方式一：GitHub + Cloudflare Pages

适合新手，后续改内容后重新上传或提交代码，Cloudflare 会自动重新部署。

### 1. 准备 GitHub 仓库

1. 登录 GitHub。
2. 点击右上角 `+`，选择 `New repository`。
3. Repository name 填一个英文名，例如 `private-server-service`。
4. 选择 `Private` 或 `Public` 都可以。
5. 点击 `Create repository`。
6. 在仓库页面点击 `uploading an existing file`。
7. 把本项目里的所有文件和文件夹上传，包括：
   - `app`
   - `components`
   - `functions`
   - `public`
   - `package.json`
   - `next.config.mjs`
   - `tailwind.config.ts`
   - `postcss.config.mjs`
   - `tsconfig.json`
   - `.nvmrc`
   - `.gitignore`
   - `PAYMENT_SETUP.md`
8. 点击 `Commit changes`。

### 2. 创建 Cloudflare Pages 项目

1. 登录 Cloudflare。
2. 左侧进入 `Workers & Pages`。
3. 点击 `Create application`。
4. 选择 `Pages`。
5. 选择 `Import an existing Git repository`。
6. 授权并选择刚才创建的 GitHub 仓库。
7. 点击 `Begin setup`。

### 3. 填写构建设置

按下面填写：

| 配置项 | 填写内容 |
| --- | --- |
| Project name | `private-server-service` |
| Production branch | `main` |
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npx next build` |
| Build output directory | `out` |
| Root directory | 留空 |

然后点击 `Save and Deploy`。

### 4. 查看网站

部署成功后，Cloudflare 会给你一个类似下面的地址：

```text
https://private-server-service.pages.dev
```

打开这个地址就能看到网站。

## 绑定自己的域名

1. 进入 Cloudflare 的 Pages 项目。
2. 点击 `Custom domains`。
3. 点击 `Set up a custom domain`。
4. 输入你的域名，例如 `www.example.com`。
5. 按页面提示确认 DNS 记录。
6. 等状态变成 `Active` 后，域名就可以访问网站。

## 修改联系方式

首页底部的联系按钮会跳转到个人名片页，名片内容写在 `app/card/page.tsx` 里。

```tsx
QQ：3914085948
邮箱：hcwishpro@gmail.com
```

如果要改联系方式，直接修改 `app/card/page.tsx` 中的 `contactRows`。

## 人机验证和防刷设置

代码里已经加入了进站前验证层，并预留 Cloudflare Turnstile 接口。要启用官方验证组件，需要在 Cloudflare 里创建 Turnstile 小组件，然后把站点密钥填到 Pages 环境变量。

### 1. 启用 Cloudflare Turnstile

1. 登录 Cloudflare。
2. 左侧进入 `Turnstile`。
3. 点击 `Add widget`。
4. Widget name 填 `VPRO`。
5. Hostnames 添加 `vpro.9865398.xyz`。
6. Widget mode 选择 `Managed`。
7. 创建后复制 `Site Key`。
8. 进入 `Workers & Pages`，打开当前 Pages 项目。
9. 进入 `Settings` → `Environment variables`。
10. 添加变量：

```text
NEXT_PUBLIC_TURNSTILE_SITE_KEY=你复制的 Site Key
```

11. 保存后点击 `Retry deployment` 或重新提交一次代码，等待自动部署。

说明：Cloudflare Turnstile 的标准做法需要服务端校验 token；这个项目是静态展示页，没有后端接口，所以页面内验证主要用于挡掉普通自动访问。真正抗恶意请求，需要配合下面的 WAF 托管质询和速率限制。

### 2. 添加 WAF 托管质询

1. 在 Cloudflare 打开域名 `9865398.xyz`。
2. 进入 `Security` → `WAF` → `Custom rules`。
3. 点击 `Create rule`。
4. Rule name 填 `VPRO challenge`。
5. Expression 填：

```text
(http.host eq "vpro.9865398.xyz")
```

6. Action 选择 `Managed Challenge`。
7. 保存并启用。

这样访问网站前会先经过 Cloudflare 的托管验证，比只在页面里做验证更有效。

### 3. 添加速率限制

1. 进入 `Security` → `WAF` → `Rate limiting rules`。
2. 点击 `Create rate limiting rule`。
3. 匹配条件使用：

```text
(http.host eq "vpro.9865398.xyz")
```

4. 建议先设置为同一 IP `10 秒超过 60 次请求` 时触发。
5. Action 可选择 `Managed Challenge`；如果发现明显恶意流量，再改成 `Block`。

### 4. 打开基础机器人防护

在 Cloudflare 域名设置里进入 `Security` → `Bots`，打开可用的机器人防护选项。免费套餐通常也有基础防护能力。

### 5. 已加入的安全头

项目新增了 `public/_headers`，Cloudflare Pages 构建后会自动生效，包含：

- 禁止被其他网站 iframe 嵌入。
- 禁止浏览器猜测文件类型。
- 限制摄像头、麦克风、定位等浏览器权限。
- 添加基础 Content Security Policy。
- 给静态资源加长期缓存，减少重复请求压力。

官方参考：

- Cloudflare Pages Headers：`https://developers.cloudflare.com/pages/configuration/headers/`
- Cloudflare Turnstile：`https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/`
- Cloudflare WAF Custom rules：`https://developers.cloudflare.com/waf/custom-rules/`
- Cloudflare WAF Rate limiting rules：`https://developers.cloudflare.com/waf/rate-limiting-rules/`

## 常见问题

如果 Cloudflare 构建失败，优先检查这三项：

1. `Build command` 是否是 `npx next build`。
2. `Build output directory` 是否是 `out`。
3. 上传到 GitHub 时是否漏掉了 `public/server-hero.png`。

## 支付和 QQ 通知

付款页面、订单接口和联系方式提交接口已经加好。真实收款自动核验需要在 Cloudflare Pages 里配置 KV、支付平台回调和 QQ 机器人 webhook。详细步骤看 `PAYMENT_SETUP.md`。
