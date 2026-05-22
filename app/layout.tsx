import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vpro.9865398.xyz"),
  title: {
    default: "VPRO 私人节点服务",
    template: "%s | VPRO"
  },
  description: "VPRO 私人节点服务，提供一人一服、远程协助和售后说明。",
  keywords: ["VPRO", "私人节点", "远程配置", "网络服务"],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "VPRO 私人节点服务",
    description: "一人一服，远程协助，适合个人网络访问与日常使用。",
    url: "https://vpro.9865398.xyz",
    siteName: "VPRO",
    images: [
      {
        url: "/server-hero.png",
        width: 1680,
        height: 945,
        alt: "VPRO 私人节点服务"
      }
    ],
    locale: "zh_CN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "VPRO 私人节点服务",
    description: "一人一服，远程协助，适合个人网络访问与日常使用。",
    images: ["/server-hero.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
