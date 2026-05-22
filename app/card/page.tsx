"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  ServerCog
} from "lucide-react";

const serviceModes = ["全教程模式", "懒人模式"];
const serverPlans = ["入门型", "轻量型", "标准型", "进阶型", "高配型"];

export default function CardPage() {
  const [modeName, setModeName] = useState("");
  const [planName, setPlanName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setModeName(serviceModes[readIndex(params.get("mode"), serviceModes.length)]);
    setPlanName(serverPlans[readIndex(params.get("plan"), serverPlans.length)]);
  }, []);

  return (
    <main className="min-h-screen bg-[#020b18] px-5 py-6 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-4xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-slate-100 transition hover:bg-white/[0.12]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            首页
          </Link>
          <span className="text-sm font-semibold text-cyan-100">VPRO CONTACT</span>
        </header>

        <section className="flex flex-1 items-center py-14">
          <div className="w-full rounded-lg border border-cyan-100/[0.18] bg-[linear-gradient(145deg,rgba(8,31,56,0.96),rgba(2,11,24,0.92))] p-6 shadow-[0_0_90px_rgba(56,189,248,0.14)] sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <span className="grid h-14 w-14 place-items-center rounded-full bg-cyan-200 text-slate-950">
                  <ServerCog className="h-7 w-7" aria-hidden="true" />
                </span>
                <h1 className="mt-6 text-4xl font-semibold tracking-normal">联系开通</h1>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  发送“开通私人节点服务”，并附上你的选择。
                </p>
                {modeName && planName ? (
                  <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.055] p-4 text-sm leading-7">
                    <p>服务：{modeName}</p>
                    <p>规格：{planName}</p>
                  </div>
                ) : null}
              </div>

              <div className="grid gap-4">
                <a
                  href="tencent://message/?uin=3914085948&Site=&Menu=yes"
                  className="rounded-lg border border-white/10 bg-white/[0.055] p-5 transition hover:border-cyan-100/[0.45] hover:bg-white/[0.085]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-cyan-100">QQ</p>
                      <p className="mt-2 break-words text-2xl font-semibold">3914085948</p>
                    </div>
                    <MessageCircle className="h-6 w-6 text-cyan-100" aria-hidden="true" />
                  </div>
                </a>

                <a
                  href="mailto:hcwishpro@gmail.com?subject=%E5%BC%80%E9%80%9A%E7%A7%81%E4%BA%BA%E8%8A%82%E7%82%B9%E6%9C%8D%E5%8A%A1&body=%E5%BC%80%E9%80%9A%E7%A7%81%E4%BA%BA%E8%8A%82%E7%82%B9%E6%9C%8D%E5%8A%A1"
                  className="rounded-lg border border-white/10 bg-white/[0.055] p-5 transition hover:border-cyan-100/[0.45] hover:bg-white/[0.085]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-cyan-100">邮箱</p>
                      <p className="mt-2 break-words text-2xl font-semibold">hcwishpro@gmail.com</p>
                    </div>
                    <Mail className="h-6 w-6 text-cyan-100" aria-hidden="true" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function readIndex(value: string | null, max: number) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 0 || parsed >= max) {
    return 0;
  }

  return parsed;
}
