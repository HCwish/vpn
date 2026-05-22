"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const buyUrl =
  "https://h5.m.goofish.com/item?forceFlush=1&id=1052728878633&ut_sk=1.aPZoNuzLYkEDAOY9u7z86CFq_12431167_1779462515970.Copy.detail.1052728878633.2218546656173";

const serviceModes = [
  {
    name: "全教程模式",
    fee: 298,
    text: "远程协助，从 0 开始带你完成配置。"
  },
  {
    name: "懒人模式",
    fee: 98,
    text: "配置完成后直接交付使用。"
  }
];

const serverPlans = [
  { name: "入门型", detail: "1vCPU / 1GB RAM / 20GB SSD / 3000GB/月", serverFee: 160 },
  { name: "轻量型", detail: "2vCPU / 2GB RAM / 35GB SSD / 5000GB/月", serverFee: 255 },
  { name: "标准型", detail: "3vCPU / 4GB RAM / 60GB SSD / 7000GB/月", serverFee: 420 },
  { name: "进阶型", detail: "6vCPU / 6GB RAM / 100GB SSD / 12000GB/月", serverFee: 625 },
  { name: "高配型", detail: "7vCPU / 8GB RAM / 150GB SSD / 20000GB/月", serverFee: 830 }
];

export default function PayPage() {
  const [modeIndex, setModeIndex] = useState(0);
  const [planIndex, setPlanIndex] = useState(0);

  const selectedMode = serviceModes[modeIndex];
  const selectedPlan = serverPlans[planIndex];
  const totalPrice = selectedMode.fee + selectedPlan.serverFee;

  const cardHref = useMemo(
    () => `/card?mode=${modeIndex}&plan=${planIndex}`,
    [modeIndex, planIndex]
  );

  return (
    <main className="min-h-screen bg-[#020b18] px-5 py-6 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col">
        <header className="flex items-center justify-between">
          <Link
            href="/#pricing"
            className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-white"
          >
            返回
          </Link>
          <span className="text-sm font-bold text-cyan-100">VPRO BUY</span>
        </header>

        <section className="py-12">
          <div className="rounded-lg border border-cyan-100/20 bg-[#081f38] p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start">
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-semibold text-cyan-100">第一步</p>
                  <h1 className="mt-3 text-3xl font-semibold tracking-normal sm:text-5xl">
                    选择服务模式
                  </h1>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {serviceModes.map((mode, index) => {
                      const isSelected = modeIndex === index;
                      return (
                        <button
                          key={mode.name}
                          type="button"
                          onClick={() => setModeIndex(index)}
                          className={`rounded-lg border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-100 ${
                            isSelected
                              ? "border-cyan-100 bg-cyan-200 text-slate-950"
                              : "border-white/10 bg-white/[0.055] text-white hover:bg-white/[0.09]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xl font-black">{mode.name}</p>
                              <p className={`mt-2 text-sm leading-6 ${isSelected ? "text-slate-800" : "text-slate-300"}`}>
                                {mode.text}
                              </p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-black ${isSelected ? "bg-slate-950 text-cyan-100" : "bg-white/10 text-cyan-100"}`}>
                              {mode.fee}元
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-cyan-100">第二步</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-5xl">
                    选择服务器种类
                  </h2>
                  <div className="mt-5 grid gap-3">
                    {serverPlans.map((plan, index) => {
                      const isSelected = planIndex === index;
                      return (
                        <button
                          key={plan.name}
                          type="button"
                          onClick={() => setPlanIndex(index)}
                          className={`rounded-lg border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-100 ${
                            isSelected
                              ? "border-cyan-100 bg-cyan-200 text-slate-950"
                              : "border-white/10 bg-white/[0.055] text-white hover:bg-white/[0.09]"
                          }`}
                        >
                          <div className="grid gap-3 sm:grid-cols-[0.65fr_1.35fr_auto] sm:items-center">
                            <div>
                              <p className="text-lg font-black">{plan.name}</p>
                              <p className={`mt-1 text-sm ${isSelected ? "text-slate-700" : "text-slate-400"}`}>
                                {plan.serverFee}元/年
                              </p>
                            </div>
                            <p className={`text-sm leading-6 ${isSelected ? "text-slate-800" : "text-slate-300"}`}>
                              {plan.detail}
                            </p>
                            <span className={`rounded-full px-3 py-1 text-xs font-black ${isSelected ? "bg-slate-950 text-cyan-100" : "bg-white/10 text-cyan-100"}`}>
                              选择
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <aside className="rounded-lg border border-cyan-100/25 bg-slate-950/40 p-6 lg:sticky lg:top-8">
                <p className="text-sm font-semibold text-cyan-100">最终价格</p>
                <p className="mt-3 text-5xl font-black text-cyan-100">{totalPrice}元</p>

                <div className="my-6 space-y-3 border-y border-white/10 py-5 text-sm">
                  <Line label="服务模式" value={`${selectedMode.name} ${selectedMode.fee}元`} />
                  <Line label="服务器" value={`${selectedPlan.name} ${selectedPlan.serverFee}元/年`} />
                  <Line label="配置" value={selectedPlan.detail} />
                </div>

                <div className="grid gap-3">
                  <a
                    href={buyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-cyan-200 px-7 text-base font-bold text-slate-950 transition hover:bg-white"
                  >
                    去付款
                  </a>
                  <Link
                    href={cardHref}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-base font-bold text-slate-950 transition hover:bg-cyan-100"
                  >
                    已付款
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1">
      <span className="text-slate-400">{label}</span>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}
