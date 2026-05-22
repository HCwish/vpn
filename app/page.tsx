"use client";

import Image from "next/image";
import { type PointerEvent as ReactPointerEvent, type ReactNode, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Gauge,
  Globe2,
  Mail,
  MessageCircle,
  MonitorCog,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
  XCircle
} from "lucide-react";
import { InteractiveShell } from "../components/InteractiveShell";
import { VerificationGate } from "../components/VerificationGate";

const promiseItems = ["独享使用", "稳定流畅", "远程安装", "售后指导", "长期可用"];

const valueCards = [
  {
    title: "自己独享",
    text: "一人一服，不和陌生人共享资源，使用边界更清楚。",
    icon: UserCheck
  },
  {
    title: "不限速不卡顿",
    text: "服务本身不额外限速，实际体验由你当前正常网速、设备和线路状态决定。",
    icon: Gauge
  },
  {
    title: "美国节点",
    text: "适合日常网络加速、海外网络访问、资料查询和个人办公等场景。",
    icon: Globe2
  },
  {
    title: "安装指导",
    text: "可选懒人交付或全教程远程协助，按你的熟悉程度来开通。",
    icon: MonitorCog
  },
  {
    title: "售后指导",
    text: "安装、换设备、基础使用问题会协助说明，长期使用更省心。",
    icon: ShieldCheck
  }
];

const sharedProblems = [
  "多人共享，晚高峰容易拥挤",
  "速度和稳定性容易被别人影响",
  "公共资源边界不清晰",
  "问题排查难，售后定位慢"
];

const privateBenefits = [
  "一人一服，资源自己使用",
  "不额外限速，体验更可控",
  "美国节点明确，适合日常访问",
  "专属环境交付，后续更好维护"
];

const platformCards = [
  { name: "Netflix", mark: "N", style: "bg-[#e50914] text-white" },
  { name: "ChatGPT", mark: "GPT", style: "bg-[#10a37f] text-white" },
  { name: "YouTube", mark: "YT", style: "bg-[#ff0033] text-white" },
  { name: "Google", mark: "G", style: "bg-white text-[#4285f4]" }
];

const setupSteps = [
  { title: "咨询沟通", text: "确认设备、使用场景和适合的服务模式。" },
  { title: "选择规格", text: "按预算和需求选择服务器规格与年费。" },
  { title: "配置交付", text: "完成环境配置、应用安装和必要说明。" },
  { title: "开始使用", text: "交付个人名片联系方式，后续问题可咨询。" }
];

const serviceModes = [
  {
    name: "全教程模式",
    fee: 298,
    badge: "推荐",
    text: "包含远程操控和从0开始的全部步骤教程，适合想学会完整流程的新手。",
    methods: ["远程协助", "语音指导", "截图教程", "从0开始"]
  },
  {
    name: "懒人模式",
    fee: 98,
    badge: "省心",
    text: "无远程安装环节，等待搭建好后直接使用，适合只想快速开通的用户。",
    methods: ["无需远程", "搭建后交付", "直接使用", "基础说明"]
  }
];

const serverPlans = [
  {
    name: "入门型",
    cpu: "1vCPU 核心",
    storage: "20GB SSD 储存",
    memory: "1GB RAM 内存",
    traffic: "每月 3000GB 流量",
    serverFee: 160
  },
  {
    name: "轻量型",
    cpu: "2vCPU 核心",
    storage: "35GB SSD 储存",
    memory: "2GB RAM 内存",
    traffic: "每月 5000GB 流量",
    serverFee: 255
  },
  {
    name: "标准型",
    cpu: "3vCPU 核心",
    storage: "60GB SSD 储存",
    memory: "4GB RAM 内存",
    traffic: "每月 7000GB 流量",
    serverFee: 420
  },
  {
    name: "进阶型",
    cpu: "6vCPU 核心",
    storage: "100GB SSD 储存",
    memory: "6GB RAM 内存",
    traffic: "每月 12000GB 流量",
    serverFee: 625
  },
  {
    name: "高配型",
    cpu: "7vCPU 核心",
    storage: "150GB SSD 储存",
    memory: "8GB RAM 内存",
    traffic: "每月 20000GB 流量",
    serverFee: 830
  }
];

const faqItems = [
  {
    question: "我家网不好有影响吗？",
    answer: "有影响。VPN 速度取决于原网速，若未连接 VPN 时本身卡顿，连接后也可能卡顿。"
  },
  {
    question: "服务费包含什么？",
    answer:
      "懒人模式包含搭建完成后的交付使用；全教程模式包含远程操控、服务器环境配置、优化插件、应用软件和现场截图教程留存。"
  },
  {
    question: "是一次性费用还是每年都收？",
    answer: "服务费只收取一次。服务器是固定资源，到期后如果继续使用，需要按年续费服务器费用。"
  },
  {
    question: "后续换手机、换电脑还收费吗？",
    answer: "不收费。服务器在有效期内更换设备仍可使用，但目前仅支持 Windows（exe）和安卓（apk）设备。"
  },
  {
    question: "出问题谁负责？",
    answer:
      "安装和配置问题会协助解答。网络环境、服务器商、第三方平台、个人误操作等因素不承诺绝对稳定。"
  },
  {
    question: "不满意能否退款？",
    answer: "未开始配置可退，已完成配置不支持退款。"
  },
  {
    question: "服务器账号归谁？",
    answer: "归客户本人所有。服务器到期后可以选择续费，也可以自行购买更合适的服务器。"
  }
];

const testimonials = [
  {
    name: "156*****",
    text: "选的懒人模式，等搭好后直接用，整体很省事，说明也讲得清楚。"
  },
  {
    name: "188*****",
    text: "全教程模式很适合新手，远程一步步带着做完，后面换设备也知道怎么处理。"
  },
  {
    name: "139*****",
    text: "私人节点比之前共享的稳定很多，日常访问和办公资料查询都顺畅不少。"
  }
];

const boundaryCards = [
  {
    title: "本人使用",
    text: "仅限本人使用，多设备同时在线可能影响体验。"
  },
  {
    title: "设备范围",
    text: "目前只能在 Windows（exe）和安卓（apk）设备上使用。"
  },
  {
    title: "售后边界",
    text: "网络环境、服务器商、第三方平台、个人误操作等因素不承诺绝对稳定。"
  }
];

export default function Home() {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [selectedModeIndex, setSelectedModeIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const selectedPlan = serverPlans[selectedPlanIndex];
  const selectedMode = serviceModes[selectedModeIndex];
  const totalPrice = selectedMode.fee + selectedPlan.serverFee;

  return (
    <InteractiveShell>
      <VerificationGate />

      <section className="relative min-h-[92vh] overflow-hidden">
        <Image
          src="/server-hero.png"
          alt="深蓝服务器节点视觉"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,11,24,0.34)_0%,rgba(2,11,24,0.86)_74%,#020b18_100%)]" />

        <div className="relative mx-auto flex min-h-[92vh] w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-4">
            <a href="#" className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cyan-200/30 bg-white/10 backdrop-blur">
                <ServerCog className="h-5 w-5 text-cyan-100" aria-hidden="true" />
              </span>
              <span className="truncate text-sm font-semibold text-cyan-50">VPRO 私人节点</span>
            </a>
            <nav className="flex items-center gap-2">
              <a
                href="#pricing"
                className="hidden min-h-10 items-center rounded-full px-4 text-sm font-medium text-slate-200 transition hover:bg-white/10 sm:inline-flex"
              >
                价目表
              </a>
              <a
                href="#faq"
                className="hidden min-h-10 items-center rounded-full px-4 text-sm font-medium text-slate-200 transition hover:bg-white/10 sm:inline-flex"
              >
                问答
              </a>
              <a
                href="/card"
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              >
                联系开通
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </nav>
          </header>

          <div className="flex flex-1 items-center justify-center py-16 text-center sm:py-20">
            <div className="max-w-5xl">
              <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-100/25 bg-white/10 px-4 py-2 text-sm font-medium text-cyan-50 backdrop-blur">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                一人一服 · 专属使用 · 美国节点
              </p>
              <h1 className="mx-auto max-w-5xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl lg:text-7xl">
                私人 VPN 服务器梯子节点
              </h1>
              <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-slate-200 sm:text-xl">
                自己独享，不限速不卡顿。具体网速由你当前正常网速决定，适合日常网络加速与海外网络访问。
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/card"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-200 px-7 text-base font-bold text-slate-950 shadow-[0_0_48px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  发送“开通私人节点服务”
                </a>
                <a
                  href="#pricing"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/10 px-7 text-base font-semibold text-white backdrop-blur transition hover:bg-white/[0.16] focus:outline-none focus:ring-2 focus:ring-white/60 sm:w-auto"
                >
                  服务器价目表
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-3 pb-5 sm:grid-cols-2 lg:grid-cols-5">
            {promiseItems.map((item) => (
              <div
                key={item}
                className="flex min-h-14 items-center justify-center rounded-full border border-white/10 bg-slate-950/[0.42] px-4 text-center text-sm font-semibold text-slate-100 backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#020b18] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="核心卖点"
            title="更像你的私人网络工具，而不是拥挤的公共资源。"
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {valueCards.map((point) => {
              const Icon = point.icon;
              return (
                <InteractiveCard key={point.title} className="min-h-56 border-white/10 bg-white/[0.055] p-5">
                  <span className="relative grid h-12 w-12 place-items-center rounded-full bg-cyan-200 text-slate-950">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-8 text-xl font-semibold text-white">{point.title}</h3>
                  <p className="relative mt-4 text-sm leading-7 text-slate-300">{point.text}</p>
                </InteractiveCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#061528] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="共享节点 vs 私人节点"
            title="重点不是“能不能用”，而是长期使用是否省心。"
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <ComparePanel tone="muted" title="共享节点常见缺点" items={sharedProblems} />
            <ComparePanel tone="bright" title="私人节点主要优点" items={privateBenefits} />
          </div>
        </div>
      </section>

      <section className="bg-[#020b18] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-cyan-100">访问场景</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
              面向主流美国网站和日常海外网络访问。
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
              图标为页面内生成的展示卡片，用于表达常见访问场景；具体访问体验仍取决于本地网络、服务器状态和第三方平台策略。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {platformCards.map((platform) => (
              <div
                key={platform.name}
                onPointerMove={handleInteractiveCardMove}
                className="interactive-card flex min-h-36 flex-col justify-between rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.22)]"
              >
                <span className={`relative grid h-14 w-14 place-items-center rounded-2xl text-xl font-black ${platform.style}`}>
                  {platform.mark}
                </span>
                <p className="relative text-xl font-semibold text-white">{platform.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#061528] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">支持设备</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
              目前仅支持 Windows（exe）和安卓（apk）。
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <DeviceCard icon={<MonitorCog className="h-7 w-7" />} title="Windows" text="使用 exe 应用" />
              <DeviceCard icon={<Smartphone className="h-7 w-7" />} title="安卓" text="使用 apk 应用" />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-cyan-100">服务流程</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
              从沟通到交付，按步骤完成。
            </h2>
            <div className="mt-8 grid gap-3">
              {setupSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="interactive-card rounded-lg border border-white/10 bg-white/[0.052] p-5"
                  onPointerMove={handleInteractiveCardMove}
                >
                  <div className="relative flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-200 text-sm font-black text-slate-950">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-xl font-semibold text-white">{step.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{step.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[#020b18] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="收费说明"
            title="收费=一次性服务费+服务器年费。"
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
                        className={`interactive-card rounded-lg border p-5 text-left focus:outline-none focus:ring-2 focus:ring-cyan-100 ${
                          isSelected
                            ? "border-cyan-100 bg-cyan-200 text-slate-950 shadow-[0_0_50px_rgba(103,232,249,0.2)]"
                            : "border-white/10 bg-white/[0.055] text-white hover:border-cyan-100/[0.42] hover:bg-white/[0.08]"
                        }`}
                        onPointerMove={handleInteractiveCardMove}
                      >
                        <div className="relative flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xl font-black">{mode.name}</p>
                            <p className={`mt-3 text-sm leading-6 ${isSelected ? "text-slate-800" : "text-slate-300"}`}>
                              {mode.text}
                            </p>
                          </div>
                          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${isSelected ? "bg-slate-950 text-cyan-100" : "bg-white/10 text-cyan-100"}`}>
                            {mode.badge}
                          </span>
                        </div>
                        <div className="relative mt-5 flex flex-wrap gap-2">
                          {mode.methods.map((method) => (
                            <span
                              key={method}
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${isSelected ? "bg-white/[0.55] text-slate-900" : "bg-white/10 text-slate-300"}`}
                            >
                              {method}
                            </span>
                          ))}
                        </div>
                        <p className="relative mt-5 text-3xl font-black">{mode.fee}元</p>
                        <p className={`relative mt-1 text-xs ${isSelected ? "text-slate-700" : "text-slate-400"}`}>
                          一次性服务费，只收取一次
                        </p>
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
                        className={`interactive-card min-h-24 rounded-lg border p-5 text-left focus:outline-none focus:ring-2 focus:ring-cyan-100 ${
                          isSelected
                            ? "border-cyan-100 bg-cyan-200 text-slate-950 shadow-[0_0_50px_rgba(103,232,249,0.2)]"
                            : "border-white/10 bg-white/[0.055] text-white hover:border-cyan-100/[0.42] hover:bg-white/[0.08]"
                        }`}
                        onPointerMove={handleInteractiveCardMove}
                      >
                        <div className="relative grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-center">
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
              <div className="min-h-[430px] rounded-lg border border-cyan-100/[0.22] bg-[#081f38] p-6 shadow-[0_0_90px_rgba(56,189,248,0.16)]">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-sm text-slate-400">当前参考价格</p>
                    <p className="mt-3 text-5xl font-black text-cyan-100">{totalPrice}元</p>
                  </div>
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-cyan-200 text-slate-950">
                    <ServerCog className="h-7 w-7" aria-hidden="true" />
                  </span>
                </div>

                <div className="space-y-4 py-6">
                  <PriceLine label="服务模式" value={selectedMode.name} />
                  <PriceLine label="一次性服务费" value={`${selectedMode.fee}元`} />
                  <PriceLine label="服务器费用" value={`${selectedPlan.serverFee}元/年`} />
                  <PriceLine label="服务器规格" value={selectedPlan.name} />
                </div>

                <div className="rounded-lg bg-white/[0.055] p-5 text-sm leading-7 text-slate-300">
                  <p className="font-semibold text-white">详情：</p>
                  <p className="mt-2">
                    {selectedMode.name}一次性服务费{selectedMode.fee}元+服务器{selectedPlan.serverFee}元/年。
                    当前规格为{selectedPlan.cpu}、{selectedPlan.storage}、{selectedPlan.memory}、{selectedPlan.traffic}。
                  </p>
                </div>

                <a
                  href={`/pay?mode=${selectedModeIndex}&plan=${selectedPlanIndex}`}
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-200 px-7 text-base font-bold text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100"
                >
                  <CreditCard className="h-5 w-5" aria-hidden="true" />
                  立即购买
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#061528] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="真实用户反馈" title="来自已开通用户的正向评价。" />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <InteractiveCard key={item.name} className="border-white/10 bg-white/[0.055] p-6">
                <div className="relative flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-full bg-slate-800">
                    <div className={`h-full w-full scale-125 blur-sm ${index === 0 ? "bg-[radial-gradient(circle_at_30%_28%,#67e8f9,#1e3a8a_58%,#020617)]" : index === 1 ? "bg-[radial-gradient(circle_at_35%_32%,#f0abfc,#0f766e_58%,#020617)]" : "bg-[radial-gradient(circle_at_35%_30%,#facc15,#0ea5e9_54%,#020617)]"}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="mt-1 text-sm text-cyan-100">已开通用户</p>
                  </div>
                </div>
                <p className="relative mt-6 text-base leading-8 text-slate-300">{item.text}</p>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#020b18] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <SectionTitle eyebrow="常见问答" title="开通前，把关键问题说清楚。" />
          <div className="mt-12 space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={item.question} className="rounded-lg border border-white/10 bg-white/[0.052]">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-white sm:text-lg">{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-cyan-100 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="border-t border-white/10 px-5 py-5 text-sm leading-7 text-slate-300">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#061528] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="使用与售后边界" title="使用前需要确认的三件事。" />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {boundaryCards.map((item) => (
              <InteractiveCard key={item.title} className="border-white/10 bg-white/[0.055] p-6">
                <span className="relative grid h-12 w-12 place-items-center rounded-full bg-cyan-200 text-slate-950">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="relative mt-6 text-xl font-semibold text-white">{item.title}</h3>
                <p className="relative mt-4 text-sm leading-7 text-slate-300">{item.text}</p>
              </InteractiveCard>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-red-300/[0.26] bg-red-950/[0.32] p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-red-200 text-red-950">
                <AlertTriangle className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-white">合规使用警示</h2>
                <p className="mt-4 text-base leading-8 text-red-50/90">
                  禁止违法违规用途，本服务仅供合法合规的网络访问、学习、办公和个人使用。禁止用于诈骗、攻击、盗号、垃圾注册、爬虫滥用、传播违法内容等任何违规行为。因用户个人行为产生的法律责任由用户自行承担。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#020b18] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-lg border border-cyan-100/[0.18] bg-[linear-gradient(135deg,rgba(14,116,144,0.25),rgba(15,23,42,0.86))] p-7 shadow-[0_0_90px_rgba(56,189,248,0.14)] sm:p-10">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-semibold text-cyan-100">准备开通</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
                点击进入个人名片，发送“开通私人节点服务”即可联系。
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-300">
                QQ 3914085948，邮箱 hcwishpro@gmail.com。
              </p>
            </div>
            <a
              href="/card"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-bold text-slate-950 transition hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-100 sm:w-auto"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              个人名片
            </a>
          </div>
        </div>
      </section>
    </InteractiveShell>
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
      <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-5 text-base leading-8 text-slate-300">{description}</p> : null}
    </div>
  );
}

function ComparePanel({
  title,
  items,
  tone
}: {
  title: string;
  items: string[];
  tone: "muted" | "bright";
}) {
  const isBright = tone === "bright";

  return (
    <article
      className={`interactive-card rounded-lg border p-6 ${
        isBright
          ? "border-cyan-100/[0.28] bg-cyan-200 text-slate-950"
          : "border-white/10 bg-white/[0.055] text-white"
      }`}
      onPointerMove={handleInteractiveCardMove}
    >
      <div className="relative flex items-center gap-3">
        <span
          className={`grid h-11 w-11 place-items-center rounded-full ${
            isBright ? "bg-slate-950 text-cyan-100" : "bg-white/[0.08] text-slate-400"
          }`}
        >
          {isBright ? (
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          ) : (
            <XCircle className="h-6 w-6" aria-hidden="true" />
          )}
        </span>
        <h3 className="text-2xl font-semibold">{title}</h3>
      </div>
      <div className="relative mt-8 grid gap-3">
        {items.map((item) => (
          <div
            key={item}
            className={`rounded-lg px-4 py-4 text-base font-semibold ${
              isBright ? "bg-white/[0.45] text-slate-950" : "bg-slate-950/[0.34] text-slate-300"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}

function DeviceCard({
  icon,
  title,
  text
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <InteractiveCard className="border-white/10 bg-white/[0.055] p-6">
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-cyan-200 text-slate-950">
        {icon}
      </span>
      <h3 className="relative mt-8 text-2xl font-semibold text-white">{title}</h3>
      <p className="relative mt-3 text-base text-slate-300">{text}</p>
    </InteractiveCard>
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

function InteractiveCard({
  children,
  className
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <article
      className={`interactive-card rounded-lg border ${className}`}
      onPointerMove={handleInteractiveCardMove}
    >
      {children}
    </article>
  );
}

function handleInteractiveCardMove(event: ReactPointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
}
