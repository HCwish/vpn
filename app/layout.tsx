import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "私人 VPN 服务器梯子节点",
  description: "私人 VPN 服务器梯子节点，自己独享，不限速不卡顿，美国节点，适合日常网络加速与海外网络访问。"
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
