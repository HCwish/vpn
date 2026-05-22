import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Send,
  ServerCog,
  ShieldCheck
} from "lucide-react";

const contactRows = [
  {
    label: "QQ",
    value: "3914085948",
    href: "tencent://message/?uin=3914085948&Site=&Menu=yes",
    action: "打开 QQ"
  },
  {
    label: "邮箱",
    value: "hcwishpro@gmail.com",
    href: "mailto:hcwishpro@gmail.com?subject=%E8%B4%AD%E4%B9%B0%E6%9C%8D%E5%8A%A1%E5%99%A8&body=%E8%B4%AD%E4%B9%B0%E6%9C%8D%E5%8A%A1%E5%99%A8",
    action: "发送邮件"
  }
];

export default function CardPage() {
  return (
    <main className="min-h-screen bg-[#020b18] px-5 py-6 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-slate-100 transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-cyan-100"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            返回首页
          </Link>
          <span className="hidden text-sm font-semibold text-cyan-100 sm:inline">
            VPRO CONTACT CARD
          </span>
        </header>

        <section className="flex flex-1 items-center py-14">
          <div className="w-full rounded-lg border border-cyan-100/[0.18] bg-[linear-gradient(145deg,rgba(8,31,56,0.96),rgba(2,11,24,0.92))] p-6 shadow-[0_0_100px_rgba(56,189,248,0.17)] sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <span className="grid h-16 w-16 place-items-center rounded-full bg-cyan-200 text-slate-950">
                  <ServerCog className="h-8 w-8" aria-hidden="true" />
                </span>
                <p className="mt-8 text-sm font-semibold text-cyan-100">个人名片</p>
                <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
                  联系购买服务器
                </h1>
                <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                  可通过 QQ 或邮箱联系。发送关键词“购买服务器”，我会根据你的使用需求回复配置方式。
                </p>
              </div>

              <div className="grid gap-4">
                {contactRows.map((row) => (
                  <a
                    key={row.label}
                    href={row.href}
                    className="group rounded-lg border border-white/10 bg-white/[0.055] p-5 transition hover:border-cyan-100/[0.45] hover:bg-white/[0.085] focus:outline-none focus:ring-2 focus:ring-cyan-100"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-cyan-100">{row.label}</p>
                        <p className="mt-3 break-words text-2xl font-semibold text-white">
                          {row.value}
                        </p>
                      </div>
                      <span className="mt-1 shrink-0 rounded-full bg-cyan-200 px-4 py-2 text-sm font-bold text-slate-950 transition group-hover:bg-white">
                        {row.action}
                      </span>
                    </div>
                  </a>
                ))}

                <div className="rounded-lg border border-cyan-100/[0.18] bg-cyan-200 p-5 text-slate-950">
                  <div className="flex items-center gap-3">
                    <Send className="h-5 w-5" aria-hidden="true" />
                    <p className="text-sm font-black">联系时请发送</p>
                  </div>
                  <p className="mt-4 text-3xl font-black">购买服务器</p>
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
