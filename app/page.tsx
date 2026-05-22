import Image from "next/image";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Headphones,
  MessageCircle,
  MonitorCog,
  MousePointerClick,
  PackageCheck,
  PhoneCall,
  Route,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck
} from "lucide-react";

const highlights = [
  { title: "独享使用", icon: UserCheck },
  { title: "稳定流畅", icon: Sparkles },
  { title: "远程安装", icon: MonitorCog },
  { title: "售后指导", icon: Headphones },
  { title: "长期可用", icon: ShieldCheck }
];

const processSteps = [
  { title: "咨询沟通", text: "确认个人需求、设备情况与交付方式。" },
  { title: "购买服务器", text: "按预算选择合适配置，费用透明分开。" },
  { title: "远程配置", text: "由技术人员完成基础环境搭建与调试。" },
  { title: "交付使用", text: "完成验收，提供后续使用说明。" }
];

const installModes = [
  { title: "远程协助", icon: MonitorCog },
  { title: "语音指导", icon: PhoneCall },
  { title: "截图教程", icon: Smartphone },
  { title: "懒人模式", icon: MousePointerClick }
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-ink text-slate-50">
      <section className="relative min-h-[92vh] overflow-hidden">
        <Image
          src="/server-hero.png"
          alt="深蓝色服务器环境配置视觉图"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,14,25,0.98)_0%,rgba(4,14,25,0.86)_39%,rgba(4,14,25,0.34)_100%)]" />
        <div className="absolute inset-0 tech-grid opacity-[0.45]" />

        <div className="relative z-10 mx-auto flex min-h-[92vh] w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-4">
            <a href="#" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded border border-cyan-300/30 bg-cyan-300/10 shadow-glow">
                <ServerCog className="h-5 w-5 text-cyan-200" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold tracking-[0.22em] text-cyan-100">
                私人配置服务
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center gap-2 rounded border border-cyan-200/[0.35] bg-cyan-200/10 px-4 text-sm font-semibold text-cyan-50 transition hover:border-cyan-100 hover:bg-cyan-200/[0.18] focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              联系咨询
            </a>
          </header>

          <div className="flex flex-1 items-center py-16 sm:py-20">
            <div className="max-w-3xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-sm font-medium text-cyan-100">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                一对一技术配置与交付
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl lg:text-7xl">
                私人服务器环境配置服务
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                面向个人使用场景，提供服务器环境搭建、远程安装、交付指导与后续答疑，让配置过程更省心，日常使用更清晰。
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-cyan-300 px-6 text-base font-bold text-slate-950 shadow-glow transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  立即联系
                </a>
                <a
                  href="#process"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded border border-white/[0.18] bg-white/[0.08] px-6 text-base font-semibold text-white transition hover:bg-white/[0.14] focus:outline-none focus:ring-2 focus:ring-white/60"
                >
                  查看流程
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-3 pb-6 sm:grid-cols-2 lg:grid-cols-5">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex min-h-20 items-center gap-3 rounded border border-cyan-200/[0.18] bg-slate-950/[0.48] px-4 py-4 backdrop-blur"
                >
                  <Icon className="h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true" />
                  <span className="text-sm font-semibold text-slate-50">{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-[#071827] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            icon={<CheckCircle2 className="h-5 w-5" aria-hidden="true" />}
            eyebrow="核心卖点"
            title="把复杂配置交给专业流程"
            description="围绕个人独享、稳定体验、远程交付与长期指导来设计服务，减少反复试错。"
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded border border-white/10 bg-white/[0.045] p-5 shadow-glow"
                >
                  <Icon className="h-7 w-7 text-cyan-200" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="bg-[#061525] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            icon={<Route className="h-5 w-5" aria-hidden="true" />}
            eyebrow="服务流程"
            title="四步完成配置交付"
            description="从前期沟通到最终使用，过程清晰，责任边界明确。"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="relative rounded border border-cyan-200/[0.18] bg-panel/70 p-5"
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded bg-cyan-300 text-sm font-black text-slate-950">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-[#081d30] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionIntro
              icon={<PackageCheck className="h-5 w-5" aria-hidden="true" />}
              eyebrow="安装方式"
              title="按你的熟悉程度选择"
              description="可轻量指导，也可全程远程协助，适合不同基础的个人用户。"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {installModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <article
                    key={mode.title}
                    className="flex min-h-24 items-center gap-4 rounded border border-white/10 bg-white/[0.045] p-5"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded bg-cyan-300/12 text-cyan-100">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-semibold text-white">{mode.title}</h3>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4">
            <InfoBlock
              icon={<CircleDollarSign className="h-6 w-6" aria-hidden="true" />}
              title="费用说明"
              body="安装服务费不包含服务器费用，服务器费用另计，参考约160元/年。实际费用以所选服务商与配置为准。"
            />
            <InfoBlock
              icon={<UserCheck className="h-6 w-6" aria-hidden="true" />}
              title="使用提醒"
              body="仅限本人使用，多设备同时在线可能影响体验。建议按实际设备数量与使用习惯确认配置方案。"
            />
            <InfoBlock
              icon={<AlertTriangle className="h-6 w-6" aria-hidden="true" />}
              title="售后免责"
              body="网络环境、服务器商、第三方平台、个人误操作等因素可能影响实际体验，不承诺绝对稳定。"
            />
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#06111d] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 border-t border-cyan-200/[0.18] pt-10 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] text-cyan-100">
              READY TO CONFIGURE
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              需要私人服务器环境配置？现在就可以开始沟通。
            </h2>
          </div>
          <a
            href="mailto:QQ3914085948"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded bg-white px-6 text-base font-bold text-slate-950 transition hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-100 md:w-auto"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            立即联系
          </a>
        </div>
      </section>
    </main>
  );
}

function SectionIntro({
  icon,
  eyebrow,
  title,
  description
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.22em] text-cyan-100">
        {icon}
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-slate-300">{description}</p>
    </div>
  );
}

function InfoBlock({
  icon,
  title,
  body
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded border border-cyan-200/[0.18] bg-slate-950/[0.38] p-6 shadow-glow">
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded bg-cyan-300/12 text-cyan-100">
          {icon}
        </span>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300">{body}</p>
    </article>
  );
}
