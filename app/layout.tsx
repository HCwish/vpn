import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vpro.9865398.xyz"),
  title: {
    default: "VPRO 私人 VPN 服务器梯子节点",
    template: "%s | VPRO"
  },
  description: "私人 VPN 服务器梯子节点，自己独享，不限速不卡顿，美国节点，适合日常网络加速与海外网络访问。",
  keywords: [
    "私人VPN",
    "私人节点",
    "美国节点",
    "服务器环境配置",
    "网络加速",
    "远程配置"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "VPRO 私人 VPN 服务器梯子节点",
    description: "自己独享，不限速不卡顿。美国节点，支持 Windows exe 和安卓 apk。",
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
    title: "VPRO 私人 VPN 服务器梯子节点",
    description: "自己独享，不限速不卡顿。美国节点，支持 Windows exe 和安卓 apk。",
    images: ["/server-hero.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
