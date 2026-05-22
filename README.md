# VPRO 私人节点服务网站

这是一个基于 Next.js 和 Tailwind CSS 的静态网站，可部署到 Cloudflare Pages。

当前购买流程很简单：

1. 首页选择服务模式和服务器规格。
2. 点击“立即购买”进入 `/pay`。
3. 点击“去付款”打开指定链接。
4. 点击“已付款”进入 `/card` 名片页面。

## 本地运行

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
```

构建完成后会生成 `out` 目录，Cloudflare Pages 的输出目录填写 `out`。

## 主要文件

- `app/page.tsx`：首页和商品选择
- `app/pay/page.tsx`：购买确认页
- `app/card/page.tsx`：联系方式名片页
- `public/server-hero.png`：首页主视觉图片
- `public/_headers`：Cloudflare Pages 安全响应头
