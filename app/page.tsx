"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Gauge,
  Globe2,
  MessageCircle,
  MonitorCog,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  UserCheck
} from "lucide-react";

const serviceModes = [
  {
    name: "全教程模式",
    fee: 298,
    badge: "推荐",
    text: "包含远程协助和从 0 开始的完整步骤教程，适合想学会完整流程的新手。",
    methods: ["远程协助", "语音指导", "截图教程", "从 0 开始"]
  },
  {
    name: "懒人模式",
    fee: 98,
    badge: "省心",
    text: "无需远程安装，配置完成后直接交付使用，适合只想快速开通的用户。",
    methods: ["无需远程", "搭建后交付", "直接使用", "基础说明"]
  }
];

const serverPlans = [
  { name: "入门型", cpu: "1vCPU 核心", storage: "20GB SSD", memory: "1GB RAM", traffic: "每月 3000GB", serverFee: 160 },
  { name: "轻量型", cpu: "2vCPU 核心", storage: "35GB SSD", memory: "2GB RAM", traffic: "每月 5000GB", serverFee: 255 },
  { name: "标准型", cpu: "3vCPU 核心", storage: "60GB SSD", memory: "4GB RAM", traffic: "每月 7000GB", serverFee: 420 },
  { name: "进阶型", cpu: "6vCPU 核心", storage: "100GB SSD", memory: "6GB RAM", traffic: "每月 12000GB", serverFee: 625 },
  { name: "高配型", cpu: "7vCPU 核心", storage: "150GB SSD", memory: "8GB RAM", traffic: "每月 20000GB", serverFee: 830 }
];

const valueCards = [
  { title: "自己独享", text: "一人一服，不和陌生人共享资源，使用边界更清楚。", icon: UserCheck },
  { title: "稳定流畅", text: "服务本身不额外限速，实际体验取决于本地网络和线路状态。", icon: Gauge },
  { title: "美国节点", text: "适合日常网络访问、资料查询和个人办公等场景。", icon: Globe2 },
  { title: "安装指导", text: "可选择完整教学或省心交付，按你的熟悉程度开通。", icon: MonitorCog },
  { title: "售后说明", text: "安装、换设备和基础使用问题会协助说明，长期使用更省心。", icon: ShieldCheck }
];

const faqs = [
  ["我家网不好有影响吗？", "有影响。服务体验会受到本地网络、设备和第三方平台状态影响。"],
  ["服务费包含什么？", "懒人模式包含搭建后交付使用；全教程模式包含远程协助、环境配置和使用说明。"],
  ["是一次性费用还是每年都收？", "服务费只收一次；服务器费用按年参考，到期后需要续费服务器。"],
  ["支持什么设备？", "目前主要支持 Windows exe 和安卓 apk。"],
  ["不满意能否退款？", "未开始配置可沟通退款；已完成配置后不支持退款。"]
];

export default function Home() {
  const [selectedModeIndex, setSelectedModeIndex] = useState(0);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const selectedMode = serviceModes[selectedModeIndex];
  const selectedPlan = serverPlans[selectedPlanIndex];
  const totalPrice = selectedMode.fee + selectedPlan.serverFee;

  return (
    <main className="min-h-screen bg-[#020b18] text-white">
      <section className="relative min-h-[92vh] overflow-hidden">
        <Image
          src="/server-hero.png"
          alt="VPRO 私人节点服务"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,11,24,0.36)_0%,rgba(2,11,24,0.86)_74%,#020b18_100%)]" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-4">
            <a href="#" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-cyan-200/30 bg-white/10">
                <ServerCog className="h-5 w-5 text-cyan-100" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-cyan-50">VPRO 私人节点</span>
            </a>
            <nav className="flex items-center gap-2">
              <a href="#pricing" className="hidden min-h-10 items-center rounded-full px-4 text-sm font-medium text-slate-200 transition hover:bg-white/10 sm:inline-flex">
                价格
              </a>
              <a href="#faq" className="hidden min-h-10 items-center rounded-full px-4 text-sm font-medium text-slate-200 transition hover:bg-white/10 sm:inline-flex">
                问答
              </a>
              <Link href="/card" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100">
                联系开通
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </nav>
          </header>

          <div className="flex flex-1 items-center justify-center py-16 text-center">
            <div className="max-w-5xl">
              <p className="mx-auto mb-6 inline-flex items-center rounded-full border border-cyan-100/25 bg-white/10 px-4 py-2 text-sm font-medium text-cyan-50">
                一人一服 · 专属使用 · 远程协助
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-normal sm:text-6xl lg:text-7xl">
                私人节点服务
              </h1>
              <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-slate-200 sm:text-xl">
                自己独享，边界清楚。适合个人日常网络访问、资料查询和办公使用，按你的需求选择服务模式和服务器规格。
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="#pricing" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-200 px-7 text-base font-bold text-slate-950 shadow-[0_0_48px_rgba(103,232,249,0.24)] transition hover:bg-white sm:w-auto">
                  <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                  选择商品
                </a>
                <Link href="/card" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/10 px-7 text-base font-semibold text-white transition hover:bg-white/[0.16] sm:w-auto">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  联系方式
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="核心卖点" title="更像你的私人网络工具，而不是拥挤的公共资源。" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {valueCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-cyan-200 text-slate-950">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-8 text-xl font-semibold">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{card.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#061528] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-cyan-100">支持设备</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
              目前主要支持 Windows 和安卓。
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <DeviceCard icon={<MonitorCog className="h-7 w-7" />} title="Windows" text="使用 exe 应用" />
              <DeviceCard icon={<Smartphone className="h-7 w-7" />} title="安卓" text="使用 apk 应用" />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-cyan-100">服务流程</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
              从选择商品到联系开通，步骤清楚。
            </h2>
            <div className="mt-8 grid gap-3">
              {["选择服务模式", "选择服务器规格", "跳转付款链接", "付款后进入名片联系"].map((step, index) => (
                <div key={step} className="rounded-lg border border-white/10 bg-white/[0.052] p-5">
                  <div className="flex items-center gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-200 text-sm font-black text-slate-950">
                      {index + 1}
                    </span>
                    <p className="text-xl font-semibold">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="选择商品"
            title="收费=一次性服务费+服务器年费"
            description="服务费只收取一次；服务器费用按年参考，实际价格以服务商当前价格为准。"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-semibold text-cyan-100">选择服务模式</p>
                <div className="grid gap-3 md:grid-cols-2">
                  {serviceModes.map((mode, index) => {
                    const isSelected = selectedModeIndex === index;
                    return (
                      <button
                        key={mode.name}
                        type="button"
                        aria-pressed={isSelected}
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
                          <span className={`rounded-full px-3 py-1 text-xs font-black ${isSelected ? "bg-slate-950 text-cyan-100" : "bg-white/10 text-cyan-100"}`}>
                            {mode.badge}
                          </span>
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {mode.methods.map((method) => (
                            <span key={method} className={`rounded-full px-3 py-1 text-xs font-semibold ${isSelected ? "bg-white/[0.55] text-slate-900" : "bg-white/10 text-slate-300"}`}>
                              {method}
                            </span>
                          ))}
                        </div>
                        <p className="mt-5 text-3xl font-black">{mode.fee}元</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-cyan-100">选择服务器规格</p>
                <div className="grid gap-3">
                  {serverPlans.map((plan, index) => {
                    const isSelected = selectedPlanIndex === index;
                    return (
                      <button
                        key={plan.name}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedPlanIndex(index)}
                        className={`rounded-lg border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-100 ${
                          isSelected ? "border-cyan-100 bg-cyan-200 text-slate-950" : "border-white/10 bg-white/[0.055] text-white hover:bg-white/[0.08]"
                        }`}
                      >
                        <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-center">
                          <div>
                            <p className="text-sm font-bold">{plan.name}</p>
                            <p className="mt-2 text-2xl font-black">{plan.cpu}</p>
                          </div>
                          <div className={`grid gap-2 text-sm md:grid-cols-2 ${isSelected ? "text-slate-800" : "text-slate-300"}`}>
                            <span>{plan.storage}</span>
                            <span>{plan.memory}</span>
                            <span>{plan.traffic}</span>
                            <span>每年 {plan.serverFee} 元</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-8">
              <div className="rounded-lg border border-cyan-100/[0.22] bg-[#081f38] p-6 shadow-[0_0_90px_rgba(56,189,248,0.16)]">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-sm text-slate-400">当前参考价格</p>
                    <p className="mt-3 text-5xl font-black text-cyan-100">{totalPrice}元</p>
                  </div>
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-cyan-200 text-slate-950">
                    <ShoppingBag className="h-7 w-7" aria-hidden="true" />
                  </span>
                </div>
                <div className="space-y-4 py-6">
                  <PriceLine label="服务模式" value={selectedMode.name} />
                  <PriceLine label="一次性服务费" value={`${selectedMode.fee}元`} />
                  <PriceLine label="服务器费用" value={`${selectedPlan.serverFee}元/年`} />
                  <PriceLine label="服务器规格" value={selectedPlan.name} />
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

      <section id="faq" className="border-y border-white/10 bg-[#061528] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <SectionTitle eyebrow="常见问答" title="开通前，把关键问题说清楚。" />
          <div className="mt-12 space-y-3">
            {faqs.map(([question, answer]) => (
              <article key={question} className="rounded-lg border border-white/10 bg-white/[0.052] p-5">
                <h3 className="text-lg font-semibold">{question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-lg border border-cyan-100/[0.18] bg-[linear-gradient(135deg,rgba(14,116,144,0.25),rgba(15,23,42,0.86))] p-7 shadow-[0_0_90px_rgba(56,189,248,0.14)] sm:p-10">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-semibold text-cyan-100">准备开通</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
                进入名片页面，发送“开通私人节点服务”即可联系。
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-300">
                QQ 3914085948，邮箱 hcwishpro@gmail.com。
              </p>
            </div>
            <Link href="/card" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-bold text-slate-950 transition hover:bg-cyan-100 sm:w-auto">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              个人名片
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-sm font-semibold text-cyan-100">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-normal sm:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-slate-300">{description}</p> : null}
    </div>
  );
}

function DeviceCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.055] p-6">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-cyan-200 text-slate-950">{icon}</span>
      <h3 className="mt-8 text-2xl font-semibold">{title}</h3>
      <p className="mt-3 text-base text-slate-300">{text}</p>
    </article>
  );
}

function PriceLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}
