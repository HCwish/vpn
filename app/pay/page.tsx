"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  ShoppingBag
} from "lucide-react";

const BUY_URL = "https://m.tb.cn/h.RefgWAy?tk=HYdO5Fpkvsb";

const serviceModes = [
  {
    name: "全教程模式",
    fee: 298,
    text: "远程协助 + 从 0 开始的完整步骤教程"
  },
  {
    name: "懒人模式",
    fee: 98,
    text: "无需远程安装，配置完成后直接交付使用"
  }
];

const serverPlans = [
  { name: "入门型", cpu: "1vCPU 核心", storage: "20GB SSD", memory: "1GB RAM", traffic: "每月 3000GB", serverFee: 160 },
  { name: "轻量型", cpu: "2vCPU 核心", storage: "35GB SSD", memory: "2GB RAM", traffic: "每月 5000GB", serverFee: 255 },
  { name: "标准型", cpu: "3vCPU 核心", storage: "60GB SSD", memory: "4GB RAM", traffic: "每月 7000GB", serverFee: 420 },
  { name: "进阶型", cpu: "6vCPU 核心", storage: "100GB SSD", memory: "6GB RAM", traffic: "每月 12000GB", serverFee: 625 },
  { name: "高配型", cpu: "7vCPU 核心", storage: "150GB SSD", memory: "8GB RAM", traffic: "每月 20000GB", serverFee: 830 }
];

export default function PayPage() {
  const [modeIndex, setModeIndex] = useState(0);
  const [planIndex, setPlanIndex] = useState(0);
  const selectedMode = serviceModes[modeIndex] ?? serviceModes[0];
  const selectedPlan = serverPlans[planIndex] ?? serverPlans[0];
  const totalPrice = selectedMode.fee + selectedPlan.serverFee;

  const cardHref = useMemo(
    () => `/card?mode=${modeIndex}&plan=${planIndex}`,
    [modeIndex, planIndex]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setModeIndex(readIndex(params.get("mode"), serviceModes.length));
    setPlanIndex(readIndex(params.get("plan"), serverPlans.length));
  }, []);

  return (
    <main className="min-h-screen bg-[#020b18] px-5 py-6 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <Link
            href="/#pricing"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-slate-100 transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-cyan-100"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            返回选择商品
          </Link>
          <span className="hidden text-sm font-semibold text-cyan-100 sm:inline">VPRO BUY</span>
        </header>

        <section className="flex flex-1 items-center py-14">
          <div className="w-full rounded-lg border border-cyan-100/[0.18] bg-[linear-gradient(145deg,rgba(8,31,56,0.96),rgba(2,11,24,0.92))] p-6 shadow-[0_0_100px_rgba(56,189,248,0.17)] sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <span className="grid h-16 w-16 place-items-center rounded-full bg-cyan-200 text-slate-950">
                  <ShoppingBag className="h-8 w-8" aria-hidden="true" />
                </span>
                <p className="mt-8 text-sm font-semibold text-cyan-100">确认商品</p>
                <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
                  选择后继续购买
                </h1>
                <p className="mt-6 text-base leading-8 text-slate-300">
                  请核对本次选择的服务模式和服务器规格。点击“去付款”会打开指定付款链接；付款完成后回到这里点击“已付款”，进入名片界面留下联系方式。
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
                <div className="space-y-4 border-b border-white/10 pb-5">
                  <SummaryLine label="服务模式" value={`${selectedMode.name}（${selectedMode.fee}元）`} />
                  <SummaryLine label="模式说明" value={selectedMode.text} />
                  <SummaryLine label="服务器规格" value={`${selectedPlan.name}（${selectedPlan.serverFee}元/年）`} />
                  <SummaryLine
                    label="配置详情"
                    value={`${selectedPlan.cpu} / ${selectedPlan.storage} / ${selectedPlan.memory} / ${selectedPlan.traffic}`}
                  />
                </div>

                <div className="mt-5 rounded-lg bg-cyan-200 p-5 text-slate-950">
                  <p className="text-sm font-black">应付参考价</p>
                  <p className="mt-2 text-5xl font-black">{totalPrice}元</p>
                  <p className="mt-2 text-xs font-semibold text-slate-700">
                    {selectedMode.fee}元一次性服务费 + {selectedPlan.serverFee}元服务器年费
                  </p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <a
                    href={BUY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-200 px-7 text-base font-bold text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100"
                  >
                    <ExternalLink className="h-5 w-5" aria-hidden="true" />
                    去付款
                  </a>
                  <Link
                    href={cardHref}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white px-7 text-base font-bold text-slate-950 transition hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                  >
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    已付款
                  </Link>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-400">
                  如果付款链接没有自动打开，请复制或重新点击“去付款”。付款后请务必点击“已付款”，方便继续联系开通。
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 text-sm sm:grid-cols-[7rem_1fr]">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold text-white">{value}</span>
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
