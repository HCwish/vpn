"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Send,
  ServerCog,
  ShieldCheck
} from "lucide-react";

const serviceModes = ["全教程模式", "懒人模式"];
const serverPlans = ["入门型", "轻量型", "标准型", "进阶型", "高配型"];

export default function CardPage() {
  const [modeName, setModeName] = useState("");
  const [planName, setPlanName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modeIndex = readIndex(params.get("mode"), serviceModes.length);
    const planIndex = readIndex(params.get("plan"), serverPlans.length);
    setModeName(serviceModes[modeIndex]);
    setPlanName(serverPlans[planIndex]);
  }, []);

  return (
    <main className="min-h-screen bg-[#020b18] px-5 py-6 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-slate-100 transition hover:bg-white/[0.12]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            返回首页
          </Link>
          <span className="hidden text-sm font-semibold text-cyan-100 sm:inline">VPRO CONTACT CARD</span>
        </header>

        <section className="flex flex-1 items-center py-14">
          <div className="w-full rounded-lg border border-cyan-100/[0.18] bg-[linear-gradient(145deg,rgba(8,31,56,0.96),rgba(2,11,24,0.92))] p-6 shadow-[0_0_100px_rgba(56,189,248,0.17)] sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <span className="grid h-16 w-16 place-items-center rounded-full bg-cyan-200 text-slate-950">
                  <ServerCog className="h-8 w-8" aria-hidden="true" />
                </span>
                <p className="mt-8 text-sm font-semibold text-cyan-100">个人名片</p>
                <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">
                  联系开通服务
                </h1>
                <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                  付款后请通过 QQ 或邮箱联系，并发送“开通私人节点服务”。如果你已经选择了商品，也可以把选择内容一起发给我。
                </p>
                {modeName && planName ? (
                  <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.055] p-4 text-sm leading-7 text-slate-200">
                    <p>已选服务：{modeName}</p>
                    <p>已选规格：{planName}</p>
                  </div>
                ) : null}
              </div>

              <div className="grid gap-4">
                <a
                  href="tencent://message/?uin=3914085948&Site=&Menu=yes"
                  className="group rounded-lg border border-white/10 bg-white/[0.055] p-5 transition hover:border-cyan-100/[0.45] hover:bg-white/[0.085]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-cyan-100">QQ</p>
                      <p className="mt-3 break-words text-2xl font-semibold">3914085948</p>
                    </div>
                    <span className="rounded-full bg-cyan-200 px-4 py-2 text-sm font-bold text-slate-950 transition group-hover:bg-white">
                      打开 QQ
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:hcwishpro@gmail.com?subject=%E5%BC%80%E9%80%9A%E7%A7%81%E4%BA%BA%E8%8A%82%E7%82%B9%E6%9C%8D%E5%8A%A1&body=%E5%BC%80%E9%80%9A%E7%A7%81%E4%BA%BA%E8%8A%82%E7%82%B9%E6%9C%8D%E5%8A%A1"
                  className="group rounded-lg border border-white/10 bg-white/[0.055] p-5 transition hover:border-cyan-100/[0.45] hover:bg-white/[0.085]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-cyan-100">邮箱</p>
                      <p className="mt-3 break-words text-2xl font-semibold">hcwishpro@gmail.com</p>
                    </div>
                    <span className="rounded-full bg-cyan-200 px-4 py-2 text-sm font-bold text-slate-950 transition group-hover:bg-white">
                      发送邮件
                    </span>
                  </div>
                </a>

                <div className="rounded-lg border border-cyan-100/[0.18] bg-cyan-200 p-5 text-slate-950">
                  <div className="flex items-center gap-3">
                    <Send className="h-5 w-5" aria-hidden="true" />
                    <p className="text-sm font-black">联系时请发送</p>
                  </div>
                  <p className="mt-4 text-3xl font-black">开通私人节点服务</p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
              <SmallNote icon={<MessageCircle className="h-5 w-5" />} text="QQ：3914085948" />
              <SmallNote icon={<Mail className="h-5 w-5" />} text="hcwishpro@gmail.com" />
              <SmallNote icon={<ShieldCheck className="h-5 w-5" />} text="仅限本人使用" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SmallNote({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex min-h-14 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] px-4 text-sm font-semibold text-slate-100">
      <span className="text-cyan-100">{icon}</span>
      <span className="break-all">{text}</span>
    </div>
  );
}

function readIndex(value: string | null, max: number) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 0 || parsed >= max) {
    return 0;
  }

  return parsed;
}
