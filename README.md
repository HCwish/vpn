# 私人 VPN 服务器梯子节点

基于 Next.js 与 Tailwind CSS 的中文单页网站，可部署到 Cloudflare Pages 或 Vercel。

也已配置为静态导出，适合部署到 Cloudflare Pages。新手部署步骤见 `DEPLOY_CLOUDFLARE.md`。

## 本地运行

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
```

构建完成后会生成 `out` 目录，可作为 Cloudflare Pages 的构建输出目录。
