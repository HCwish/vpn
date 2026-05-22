"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  ServerCog,
  ShoppingBag
} from "lucide-react";

const serviceModes = [
  {
    name: "全教程模式",
    fee: 298,
    text: "远程协助，带你从 0 完成配置。"
  },
  {
    name: "懒人模式",
    fee: 98,
    text: "配置完成后直接交付使用。"
  }
];

const serverPlans = [
  { name: "入门型", cpu: "1vCPU", memory: "1GB RAM", storage: "20GB SSD", traffic: "3000GB/月", serverFee: 160 },
  { name: "轻量型", cpu: "2vCPU", memory: "2GB RAM", storage: "35GB SSD", traffic: "5000GB/月", serverFee: 255 },
  { name: "标准型", cpu: "3vCPU", memory: "4GB RAM", storage: "60GB SSD", traffic: "7000GB/月", serverFee: 420 },
  { name: "进阶型", cpu: "6vCPU", memory: "6GB RAM", storage: "100GB SSD", traffic: "12000GB/月", serverFee: 625 },
  { name: "高配型", cpu: "7vCPU", memory: "8GB RAM", storage: "150GB SSD", traffic: "20000GB/月", serverFee: 830 }
];

const highlights = ["一人一服", "Windows / 安卓", "远程协助", "售后说明"];

export default function Home() {
  const [selectedModeIndex, setSelectedModeIndex] = useState(0);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const selectedMode = serviceModes[selectedModeIndex];
  const selectedPlan = serverPlans[selectedPlanIndex];
  const totalPrice = selectedMode.fee + selectedPlan.serverFee;

  return (
    <main className="min-h-screen bg-[#020b18] text-white">
      <section className="relative overflow-hidden">
        <Image
          src="/server-hero.png"
          alt="VPRO 私人节点服务"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,11,24,0.42)_0%,rgba(2,11,24,0.9)_72%,#020b18_100%)]" />

        <div className="relative mx-auto flex min-h-[82vh] max-w-6xl flex-col px-5 py-6 sm:px-8">
          <header className="flex items-center justify-between gap-4">
            <a href="#" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-cyan-200/30 bg-white/10">
                <ServerCog className="h-5 w-5 text-cyan-100" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-cyan-50">VPRO</span>
            </a>
            <Link
              href="/card"
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
            >
              联系方式
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </header>

          <div className="flex flex-1 items-center justify-center py-16 text-center">
            <div className="max-w-4xl">
              <p className="mx-auto mb-6 inline-flex items-center rounded-full border border-cyan-100/25 bg-white/10 px-4 py-2 text-sm font-medium text-cyan-50">
                私人节点服务
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-normal sm:text-6xl lg:text-7xl">
                一人一服，省心开通
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                按需选择服务模式和服务器规格，付款后通过名片联系开通。
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#pricing"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-200 px-7 text-base font-bold text-slate-950 transition hover:bg-white sm:w-auto"
                >
                  <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                  选择商品
                </a>
                <Link
                  href="/card"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/10 px-7 text-base font-semibold text-white transition hover:bg-white/[0.16] sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  先联系
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-3 pb-6 sm:grid-cols-4">
            {highlights.map((item) => (
              <div key={item} className="rounded-full border border-white/10 bg-slate-950/45 px-4 py-3 text-center text-sm font-semibold text-slate-100">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-semibold text-cyan-100">选择商品</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-5xl">
              服务费 + 服务器年费
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_22rem]">
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-semibold text-cyan-100">服务模式</p>
                <div className="grid gap-3 md:grid-cols-2">
                  {serviceModes.map((mode, index) => {
                    const isSelected = selectedModeIndex === index;
                    return (
                      <button
                        key={mode.name}
                        type="button"
                        onClick={() => setSelectedModeIndex(index)}
                        className={`rounded-lg border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-100 ${
                          isSelected ? "border-cyan-100 bg-cyan-200 text-slate-950" : "border-white/10 bg-white/[0.055] text-white hover:bg-white/[0.08]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xl font-black">{mode.name}</p>
                            <p className={`mt-3 text-sm leading-6 ${isSelected ? "text-slate-800" : "text-slate-300"}`}>
                              {mode.text}
                            </p>
                          </div>
                          {isSelected ? <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" /> : null}
                        </div>
                        <p className="mt-5 text-3xl font-black">{mode.fee}元</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-cyan-100">服务器规格</p>
                <div className="grid gap-3">
                  {serverPlans.map((plan, index) => {
                    const isSelected = selectedPlanIndex === index;
                    return (
                      <button
                        key={plan.name}
                        type="button"
                        onClick={() => setSelectedPlanIndex(index)}
                        className={`rounded-lg border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-100 ${
                          isSelected ? "border-cyan-100 bg-cyan-200 text-slate-950" : "border-white/10 bg-white/[0.055] text-white hover:bg-white/[0.08]"
                        }`}
                      >
                        <div className="grid gap-3 sm:grid-cols-[0.7fr_1.3fr] sm:items-center">
                          <div>
                            <p className="text-sm font-bold">{plan.name}</p>
                            <p className="mt-2 text-2xl font-black">{plan.serverFee}元/年</p>
                          </div>
                          <p className={`text-sm leading-6 ${isSelected ? "text-slate-800" : "text-slate-300"}`}>
                            {plan.cpu} / {plan.memory} / {plan.storage} / {plan.traffic}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-8">
              <div className="rounded-lg border border-cyan-100/[0.22] bg-[#081f38] p-6 shadow-[0_0_70px_rgba(56,189,248,0.14)]">
                <p className="text-sm text-slate-400">当前参考价</p>
                <p className="mt-3 text-5xl font-black text-cyan-100">{totalPrice}元</p>
                <div className="my-6 space-y-3 border-y border-white/10 py-5 text-sm">
                  <Line label="模式" value={selectedMode.name} />
                  <Line label="规格" value={selectedPlan.name} />
                  <Line label="服务费" value={`${selectedMode.fee}元`} />
                  <Line label="年费" value={`${selectedPlan.serverFee}元`} />
                </div>
                <Link
                  href={`/pay?mode=${selectedModeIndex}&plan=${selectedPlanIndex}`}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-200 px-7 text-base font-bold text-slate-950 transition hover:bg-white"
                >
                  <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                  立即购买
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-400">{label}</span>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}
