import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Gauge,
  Globe2,
  Mail,
  MessageCircle,
  MousePointerClick,
  ServerCog,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Wifi
} from "lucide-react";

const promiseItems = [
  "私人 VPN 服务器梯子节点",
  "自己独享",
  "不限速不卡顿",
  "美国节点",
  "海外网络访问"
];

const productPoints = [
  {
    title: "自己独享",
    text: "不和陌生人共享，不挤公共线路，使用边界更清楚。",
    icon: UserCheck
  },
  {
    title: "不限速不卡顿",
    text: "服务本身不额外限速，实际网速由你当前正常网速、设备和线路状态决定。",
    icon: Gauge
  },
  {
    title: "美国节点",
    text: "适合日常网络加速、海外网络访问、账号日常使用等个人场景。",
    icon: Globe2
  }
];

const setupSteps = [
  "确认需求",
  "购买服务器",
  "远程配置",
  "交付使用"
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020b18] text-white">
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src="/server-hero.png"
          alt="深蓝服务器节点视觉"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,11,24,0.38)_0%,rgba(2,11,24,0.92)_78%,#020b18_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_18%,rgba(56,189,248,0.22),transparent_28rem)]" />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-4">
            <a href="#" className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cyan-200/30 bg-white/10 backdrop-blur">
                <ServerCog className="h-5 w-5 text-cyan-100" aria-hidden="true" />
              </span>
              <span className="truncate text-sm font-semibold text-cyan-50">
                VPRO 私人节点
              </span>
            </a>
            <nav className="flex items-center gap-2">
              <a
                href="#details"
                className="hidden min-h-10 items-center rounded-full px-4 text-sm font-medium text-slate-200 transition hover:bg-white/10 sm:inline-flex"
              >
                了解详情
              </a>
              <a
                href="/card"
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              >
                联系购买
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </nav>
          </header>

          <div className="flex flex-1 items-center justify-center py-16 text-center sm:py-24">
            <div className="max-w-5xl">
              <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-100/25 bg-white/10 px-4 py-2 text-sm font-medium text-cyan-50 backdrop-blur">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                一人一服 · 专属使用 · 远程配置
              </p>
              <h1 className="mx-auto max-w-5xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl lg:text-7xl">
                私人 VPN 服务器梯子节点
              </h1>
              <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-slate-200 sm:text-xl">
                自己独享，不限速不卡顿。具体网速由你当前正常网速决定，节点为美国，适合日常网络加速与海外网络访问。
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/card"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-200 px-7 text-base font-bold text-slate-950 shadow-[0_0_48px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  发送“购买服务器”
                </a>
                <a
                  href="#details"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/10 px-7 text-base font-semibold text-white backdrop-blur transition hover:bg-white/[0.16] focus:outline-none focus:ring-2 focus:ring-white/60 sm:w-auto"
                >
                  查看节点说明
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-3 pb-5 sm:grid-cols-2 lg:grid-cols-5">
            {promiseItems.map((item) => (
              <div
                key={item}
                className="flex min-h-16 items-center justify-center rounded-full border border-white/10 bg-slate-950/[0.42] px-4 text-center text-sm font-semibold text-slate-100 backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="details" className="bg-[#020b18] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold text-cyan-100">核心体验</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
              更像你的私人网络工具，而不是拥挤的公共资源。
            </h2>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {productPoints.map((point) => {
              const Icon = point.icon;
              return (
                <article
                  key={point.title}
                  className="min-h-64 rounded-lg border border-white/10 bg-white/[0.055] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-cyan-200 text-slate-950">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-9 text-2xl font-semibold text-white">{point.title}</h3>
                  <p className="mt-4 text-base leading-8 text-slate-300">{point.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#061528] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-cyan-100">速度说明</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
              不额外限速。体验取决于你本身的正常网络。
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
              如果你的本地网络本身稳定，私人节点会更容易保持流畅；如果当前网络波动，实际访问体验也会跟着变化。
            </p>
          </div>

          <div className="rounded-lg border border-cyan-100/[0.18] bg-[#081f38] p-6 shadow-[0_0_80px_rgba(56,189,248,0.13)]">
            <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-slate-400">节点位置</p>
                <p className="mt-2 text-3xl font-semibold text-white">美国</p>
              </div>
              <span className="grid h-14 w-14 place-items-center rounded-full bg-cyan-200 text-slate-950">
                <Wifi className="h-7 w-7" aria-hidden="true" />
              </span>
            </div>
            <div className="grid gap-4 pt-6 sm:grid-cols-2">
              <Metric label="使用方式" value="自己独享" />
              <Metric label="速度策略" value="不限速" />
              <Metric label="适合场景" value="日常加速" />
              <Metric label="访问范围" value="海外网络" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#020b18] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold text-cyan-100">购买与配置</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
                从沟通到交付，按步骤完成。
              </h2>
            </div>
            <div className="grid gap-3">
              {setupSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex min-h-20 items-center gap-5 rounded-lg border border-white/10 bg-white/[0.052] px-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-200 text-sm font-black text-slate-950">
                    {index + 1}
                  </span>
                  <span className="text-xl font-semibold text-white">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#061528] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          <Notice
            icon={<CheckCircle2 className="h-6 w-6" aria-hidden="true" />}
            title="费用说明"
            text="安装服务费不包含服务器费用，服务器费用另计，参考约160元/年。"
          />
          <Notice
            icon={<ShieldCheck className="h-6 w-6" aria-hidden="true" />}
            title="使用提醒"
            text="仅限本人使用，多设备同时在线可能影响体验。"
          />
          <Notice
            icon={<MousePointerClick className="h-6 w-6" aria-hidden="true" />}
            title="体验边界"
            text="本地网络、服务器商、第三方平台策略和个人误操作等因素，都会影响实际稳定性。"
          />
        </div>
      </section>

      <section className="bg-[#020b18] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-lg border border-cyan-100/[0.18] bg-[linear-gradient(135deg,rgba(14,116,144,0.25),rgba(15,23,42,0.86))] p-7 shadow-[0_0_90px_rgba(56,189,248,0.14)] sm:p-10">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-semibold text-cyan-100">准备购买</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
                点击进入个人名片，发送“购买服务器”即可联系。
              </h2>
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
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-cyan-50">{value}</p>
    </div>
  );
}

function Notice({
  icon,
  title,
  text
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.052] p-6">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-cyan-200 text-slate-950">
        {icon}
      </span>
      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{text}</p>
    </article>
  );
}
