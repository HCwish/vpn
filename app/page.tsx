"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const serviceModes = [
  {
    name: "全教程模式",
    fee: 298,
    badge: "推荐",
    text: "远程协助，从 0 开始带你完成配置，适合想学会完整流程的新手。"
  },
  {
    name: "懒人模式",
    fee: 98,
    badge: "省心",
    text: "无需远程安装，配置完成后直接交付使用，适合只想快速开通的用户。"
  }
];

const serverPlans = [
  { name: "入门型", cpu: "1vCPU", memory: "1GB RAM", storage: "20GB SSD", traffic: "3000GB/月", serverFee: 160 },
  { name: "轻量型", cpu: "2vCPU", memory: "2GB RAM", storage: "35GB SSD", traffic: "5000GB/月", serverFee: 255 },
  { name: "标准型", cpu: "3vCPU", memory: "4GB RAM", storage: "60GB SSD", traffic: "7000GB/月", serverFee: 420 },
  { name: "进阶型", cpu: "6vCPU", memory: "6GB RAM", storage: "100GB SSD", traffic: "12000GB/月", serverFee: 625 },
  { name: "高配型", cpu: "7vCPU", memory: "8GB RAM", storage: "150GB SSD", traffic: "20000GB/月", serverFee: 830 }
];

const values = [
  ["自己独享", "一人一服，不和陌生人共享资源，使用边界更清楚。"],
  ["不额外限速", "服务本身不额外限速，实际体验取决于你的本地网络和线路状态。"],
  ["美国节点", "适合日常网络访问、资料查询、个人办公和海外网站访问。"],
  ["安装指导", "可选完整远程教学，也可选择搭建后直接交付。"],
  ["售后说明", "安装、换设备、基础使用问题会协助说明。"]
];

const faqs = [
  ["我家网不好有影响吗？", "有影响。体验会受到本地网络、设备和第三方平台状态影响。"],
  ["服务费包含什么？", "懒人模式包含搭建后交付；全教程模式包含远程协助、环境配置和使用说明。"],
  ["是一次性费用还是每年都收？", "服务费只收一次；服务器费用按年参考，到期后如继续使用需要续费。"],
  ["支持什么设备？", "目前主要支持 Windows exe 和安卓 apk。"],
  ["不满意能否退款？", "未开始配置可沟通退款；已完成配置后不支持退款。"]
];

const reviews = [
  ["135*****", "开通很快，说明也清楚，按步骤就能用。"],
  ["188*****", "全教程模式适合新手，远程讲得很细。"],
  ["156*****", "懒人模式省心，交付后直接按说明使用。"],
  ["177*****", "换设备时也帮忙说明了，回复比较及时。"],
  ["139*****", "整体比之前用共享资源稳定，边界也清楚。"],
  ["182*****", "配置和注意事项说得明白，适合长期用。"]
];

export default function Home() {
  const [modeIndex, setModeIndex] = useState(0);
  const [planIndex, setPlanIndex] = useState(0);
  const selectedMode = serviceModes[modeIndex];
  const selectedPlan = serverPlans[planIndex];
  const totalPrice = selectedMode.fee + selectedPlan.serverFee;

  const buyHref = useMemo(
    () => `/pay?mode=${modeIndex}&plan=${planIndex}`,
    [modeIndex, planIndex]
  );

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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,11,24,0.38)_0%,rgba(2,11,24,0.86)_72%,#020b18_100%)]" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-4">
            <a href="#" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-cyan-200/30 bg-white/10 text-sm font-black text-cyan-100">
                V
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
              <Link href="/card" className="inline-flex min-h-10 items-center rounded-full bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100">
                联系开通
              </Link>
            </nav>
          </header>

          <div className="flex flex-1 items-center justify-center py-16 text-center sm:py-20">
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
                <a href="#pricing" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-cyan-200 px-7 text-base font-bold text-slate-950 transition hover:bg-white sm:w-auto">
                  选择商品
                </a>
                <Link href="/card" className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/[0.18] bg-white/10 px-7 text-base font-semibold text-white transition hover:bg-white/[0.16] sm:w-auto">
                  联系方式
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-3 pb-5 sm:grid-cols-2 lg:grid-cols-5">
            {["独享使用", "稳定流畅", "远程安装", "售后指导", "长期可用"].map((item) => (
              <div key={item} className="rounded-full border border-white/10 bg-slate-950/[0.42] px-4 py-3 text-center text-sm font-semibold text-slate-100">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="核心卖点" title="更像你的私人网络工具，而不是拥挤的公共资源。" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {values.map(([title, text]) => (
              <article key={title} className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-cyan-200 text-lg font-black text-slate-950">
                  ✓
                </span>
                <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#061528] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-cyan-100">支持设备</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-normal sm:text-5xl">
              目前主要支持 Windows 和安卓。
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="rounded-lg border border-white/10 bg-white/[0.055] p-6">
                <h3 className="text-2xl font-semibold">Windows</h3>
                <p className="mt-3 text-base text-slate-300">使用 exe 应用</p>
              </article>
              <article className="rounded-lg border border-white/10 bg-white/[0.055] p-6">
                <h3 className="text-2xl font-semibold">安卓</h3>
                <p className="mt-3 text-base text-slate-300">使用 apk 应用</p>
              </article>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-cyan-100">服务流程</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-normal sm:text-5xl">
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
            title="先选模式，再选服务器"
            description="最终价格=服务模式价格+服务器年费。默认是全教程模式和入门型服务器。"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-semibold text-cyan-100">服务模式</p>
                <div className="grid gap-3 md:grid-cols-2">
                  {serviceModes.map((mode, index) => {
                    const isSelected = modeIndex === index;
                    return (
                      <button
                        key={mode.name}
                        type="button"
                        onClick={() => setModeIndex(index)}
                        className={`rounded-lg border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-100 ${
                          isSelected ? "border-cyan-100 bg-cyan-200 text-slate-950" : "border-white/10 bg-white/[0.055] text-white hover:bg-white/[0.08]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xl font-black">{mode.name}</p>
                            <p className={`mt-3 text-sm leading-6 ${isSelected ? "text-slate-800" : "text-slate-300"}`}>{mode.text}</p>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-black ${isSelected ? "bg-slate-950 text-cyan-100" : "bg-white/10 text-cyan-100"}`}>
                            {mode.badge}
                          </span>
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
                    const isSelected = planIndex === index;
                    return (
                      <button
                        key={plan.name}
                        type="button"
                        onClick={() => setPlanIndex(index)}
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
                <div className="border-b border-white/10 pb-5">
                  <p className="text-sm text-slate-400">当前最终价格</p>
                  <p className="mt-3 text-5xl font-black text-cyan-100">{totalPrice}元</p>
                </div>
                <div className="space-y-4 py-6">
                  <PriceLine label="服务模式" value={selectedMode.name} />
                  <PriceLine label="服务价格" value={`${selectedMode.fee}元`} />
                  <PriceLine label="服务器规格" value={selectedPlan.name} />
                  <PriceLine label="服务器年费" value={`${selectedPlan.serverFee}元`} />
                </div>
                <Link href={buyHref} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-cyan-200 px-7 text-base font-bold text-slate-950 transition hover:bg-white">
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
        <div className="mx-auto max-w-7xl overflow-hidden">
          <SectionTitle eyebrow="用户反馈" title="来自已开通用户的正向评价。" />
          <div className="mt-12 flex gap-4 overflow-hidden">
            <div className="review-marquee flex min-w-max gap-4">
              {[...reviews, ...reviews].map(([name, text], index) => (
                <article
                  key={`${name}-${index}`}
                  className="w-72 shrink-0 rounded-lg border border-white/10 bg-white/[0.055] p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full w-full scale-125 blur-sm ${
                          index % 3 === 0
                            ? "bg-[radial-gradient(circle_at_30%_28%,#67e8f9,#1e3a8a_58%,#020617)]"
                            : index % 3 === 1
                              ? "bg-[radial-gradient(circle_at_35%_32%,#f0abfc,#0f766e_58%,#020617)]"
                              : "bg-[radial-gradient(circle_at_35%_30%,#facc15,#0ea5e9_54%,#020617)]"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{name}</p>
                      <p className="mt-1 text-xs text-cyan-100">已开通用户</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-300">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-lg border border-cyan-100/[0.18] bg-[linear-gradient(135deg,rgba(14,116,144,0.25),rgba(15,23,42,0.86))] p-7 shadow-[0_0_90px_rgba(56,189,248,0.14)] sm:p-10">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-semibold text-cyan-100">准备开通</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-normal sm:text-5xl">
                进入名片页面，发送“开通私人节点服务”即可联系。
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-300">
                QQ 3914085948，邮箱 hcwishpro@gmail.com。
              </p>
            </div>
            <Link href="/card" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-7 text-base font-bold text-slate-950 transition hover:bg-cyan-100 sm:w-auto">
              个人名片
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-xs leading-6 text-slate-500 sm:px-8">
        本服务仅限合法合规的个人学习、办公、资料查询和日常网络访问使用。禁止用于诈骗、攻击、盗号、垃圾注册、传播违法内容、侵犯他人权益或其他任何非法用途；因个人违规使用产生的责任由使用者自行承担。
      </footer>
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

function PriceLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}
