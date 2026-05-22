"use client";

import Link from "next/link";
import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  Send,
  ServerCog,
  ShieldCheck,
  UserRound
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
    href: "mailto:hcwishpro@gmail.com?subject=%E5%BC%80%E9%80%9A%E7%A7%81%E4%BA%BA%E8%8A%82%E7%82%B9%E6%9C%8D%E5%8A%A1&body=%E5%BC%80%E9%80%9A%E7%A7%81%E4%BA%BA%E8%8A%82%E7%82%B9%E6%9C%8D%E5%8A%A1",
    action: "发送邮件"
  }
];

export default function CardPage() {
  const [orderId, setOrderId] = useState("");
  const [contactType, setContactType] = useState<"qq" | "email">("qq");
  const [contactValue, setContactValue] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderId(params.get("order") ?? "");
  }, []);

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!contactValue.trim()) {
      setSubmitState("error");
      setSubmitMessage("请填写 QQ 号或邮箱。");
      return;
    }

    setSubmitState("sending");
    setSubmitMessage("正在提交...");

    try {
      const response = await fetch("/api/orders/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          contactType,
          contactValue: contactValue.trim()
        })
      });

      if (!response.ok) {
        throw new Error("submit failed");
      }

      const data = (await response.json()) as { notified?: boolean };
      setSubmitState("success");
      setSubmitMessage(
        data.notified
          ? "已提交，你的信息已通知到客服 QQ。"
          : "已提交。通知接口未配置时，请同时通过上方 QQ 或邮箱联系。"
      );
    } catch {
      setSubmitState("error");
      setSubmitMessage("提交接口暂不可用，请直接通过上方 QQ 或邮箱联系。");
    }
  }

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
                  联系开通服务
                </h1>
                <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                  可通过 QQ 或邮箱联系。发送关键词“开通私人节点服务”，我会根据你的使用需求回复配置方式。
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
                  <p className="mt-4 text-3xl font-black">开通私人节点服务</p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleContactSubmit}
              className="mt-10 rounded-lg border border-white/10 bg-white/[0.045] p-5"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cyan-200 text-slate-950">
                  <UserRound className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-2xl font-semibold text-white">留下你的联系信息</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    付款成功后可在这里填写 QQ 或邮箱，提交后会尝试通知客服 QQ。
                  </p>
                </div>
              </div>

              {orderId ? (
                <div className="mt-5 rounded-lg border border-white/10 bg-slate-950/[0.28] p-4 text-sm">
                  <span className="text-slate-400">关联订单：</span>
                  <span className="break-all font-semibold text-cyan-100">{orderId}</span>
                </div>
              ) : null}

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setContactType("qq")}
                  className={`min-h-12 rounded-lg border px-4 text-left text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 ${
                    contactType === "qq"
                      ? "border-cyan-100 bg-cyan-200 text-slate-950"
                      : "border-white/10 bg-white/[0.055] text-white hover:bg-white/[0.08]"
                  }`}
                >
                  填写 QQ 号
                </button>
                <button
                  type="button"
                  onClick={() => setContactType("email")}
                  className={`min-h-12 rounded-lg border px-4 text-left text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 ${
                    contactType === "email"
                      ? "border-cyan-100 bg-cyan-200 text-slate-950"
                      : "border-white/10 bg-white/[0.055] text-white hover:bg-white/[0.08]"
                  }`}
                >
                  填写邮箱
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  value={contactValue}
                  onChange={(event) => setContactValue(event.target.value)}
                  type={contactType === "email" ? "email" : "text"}
                  inputMode={contactType === "qq" ? "numeric" : "email"}
                  placeholder={contactType === "qq" ? "请输入 QQ 号" : "请输入邮箱"}
                  className="min-h-12 flex-1 rounded-lg border border-white/10 bg-slate-950/[0.45] px-4 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-100"
                />
                <button
                  type="submit"
                  disabled={submitState === "sending"}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-cyan-200 px-6 text-base font-bold text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitState === "sending" ? (
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  )}
                  提交信息
                </button>
              </div>

              {submitMessage ? (
                <p
                  className={`mt-4 text-sm leading-6 ${
                    submitState === "success" ? "text-cyan-100" : "text-amber-200"
                  }`}
                >
                  {submitMessage}
                </p>
              ) : null}
            </form>

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
