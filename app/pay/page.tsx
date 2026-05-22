"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard,
  ExternalLink,
  Loader2
} from "lucide-react";

const serviceModes = [
  {
    name: "全教程模式",
    fee: 298,
    text: "远程操控 + 从0开始完整步骤教程"
  },
  {
    name: "懒人模式",
    fee: 98,
    text: "无远程安装，配置完成后直接交付使用"
  }
];

const serverPlans = [
  { name: "入门型", cpu: "1vCPU 核心", storage: "20GB SSD", memory: "1GB RAM", traffic: "每月 3000GB", serverFee: 160 },
  { name: "轻量型", cpu: "2vCPU 核心", storage: "35GB SSD", memory: "2GB RAM", traffic: "每月 5000GB", serverFee: 255 },
  { name: "标准型", cpu: "3vCPU 核心", storage: "60GB SSD", memory: "4GB RAM", traffic: "每月 7000GB", serverFee: 420 },
  { name: "进阶型", cpu: "6vCPU 核心", storage: "100GB SSD", memory: "6GB RAM", traffic: "每月 12000GB", serverFee: 625 },
  { name: "高配型", cpu: "7vCPU 核心", storage: "150GB SSD", memory: "8GB RAM", traffic: "每月 20000GB", serverFee: 830 }
];

type OrderStatus = "creating" | "pending" | "paid" | "manual";

export default function PayPage() {
  const [modeIndex, setModeIndex] = useState(0);
  const [planIndex, setPlanIndex] = useState(0);
  const [selectionReady, setSelectionReady] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [status, setStatus] = useState<OrderStatus>("creating");
  const [statusText, setStatusText] = useState("正在生成安全付款链接...");

  const selectedMode = serviceModes[modeIndex] ?? serviceModes[0];
  const selectedPlan = serverPlans[planIndex] ?? serverPlans[0];
  const totalPrice = selectedMode.fee + selectedPlan.serverFee;

  const orderPayload = useMemo(
    () => ({
      modeIndex,
      planIndex,
      modeName: selectedMode.name,
      planName: selectedPlan.name,
      amount: totalPrice
    }),
    [modeIndex, planIndex, selectedMode.name, selectedPlan.name, totalPrice]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setModeIndex(readIndex(params.get("mode"), serviceModes.length));
    setPlanIndex(readIndex(params.get("plan"), serverPlans.length));
    setSelectionReady(true);
  }, []);

  useEffect(() => {
    let ignore = false;

    async function createOrder() {
      if (!selectionReady) {
        return;
      }

      setStatus("creating");
      setStatusText("正在生成安全付款链接...");

      const fallbackOrderId = createLocalOrderId();

      try {
        const response = await fetch("/api/orders/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...orderPayload, orderId: fallbackOrderId })
        });

        if (!response.ok) {
          throw new Error("order api unavailable");
        }

        const data = (await response.json()) as {
          orderId?: string;
          paymentUrl?: string;
          paymentReady?: boolean;
        };

        if (ignore) {
          return;
        }

        setOrderId(data.orderId ?? fallbackOrderId);
        setPaymentUrl(data.paymentUrl ?? "");
        setStatus(data.paymentReady ? "pending" : "manual");
        setStatusText(
          data.paymentReady
            ? "付款链接已生成，完成付款后页面会自动检测状态。"
            : "支付接口尚未配置，暂时无法自动生成真实付款链接。"
        );
      } catch {
        if (ignore) {
          return;
        }

        const localPaymentUrl = buildLocalPaymentUrl(fallbackOrderId, orderPayload.amount);
        setOrderId(fallbackOrderId);
        setPaymentUrl(localPaymentUrl);
        setStatus(localPaymentUrl ? "pending" : "manual");
        setStatusText(
          localPaymentUrl
            ? "付款链接已生成，完成付款后请等待系统确认。"
            : "支付接口尚未配置，暂时无法自动核验收款。"
        );
      }
    }

    createOrder();

    return () => {
      ignore = true;
    };
  }, [orderPayload, selectionReady]);

  useEffect(() => {
    if (!orderId || !["pending", "manual"].includes(status)) {
      return;
    }

    const timer = window.setInterval(async () => {
      try {
        const response = await fetch(`/api/orders/status?orderId=${encodeURIComponent(orderId)}`);

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { status?: string };

        if (data.status === "paid") {
          setStatus("paid");
          setStatusText("付款成功，请点击确认进入个人名片并留下联系方式。");
        }
      } catch {
        // 静态部署或接口未配置时保持等待状态，不做虚假成功提示。
      }
    }, 5000);

    return () => window.clearInterval(timer);
  }, [orderId, status]);

  return (
    <main className="min-h-screen bg-[#020b18] px-5 py-6 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <Link
            href="/#pricing"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-slate-100 transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-cyan-100"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            返回选择配置
          </Link>
          <span className="hidden text-sm font-semibold text-cyan-100 sm:inline">VPRO SECURE PAY</span>
        </header>

        <section className="flex flex-1 items-center py-14">
          <div className="w-full rounded-lg border border-cyan-100/[0.18] bg-[linear-gradient(145deg,rgba(8,31,56,0.96),rgba(2,11,24,0.92))] p-6 shadow-[0_0_100px_rgba(56,189,248,0.17)] sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <span className="grid h-16 w-16 place-items-center rounded-full bg-cyan-200 text-slate-950">
                  <CreditCard className="h-8 w-8" aria-hidden="true" />
                </span>
                <p className="mt-8 text-sm font-semibold text-cyan-100">订单付款</p>
                <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
                  确认配置后付款
                </h1>
                <p className="mt-6 text-base leading-8 text-slate-300">
                  页面会为本次选择生成独立订单号。付款链接通过后端配置生成，不在页面直接展示收款码。
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
                <div className="border-b border-white/10 pb-5">
                  <p className="text-sm text-slate-400">订单号</p>
                  <p className="mt-2 break-all text-lg font-semibold text-cyan-100">
                    {orderId || "生成中..."}
                  </p>
                </div>

                <div className="space-y-4 py-5">
                  <SummaryLine label="服务模式" value={`${selectedMode.name}（${selectedMode.fee}元）`} />
                  <SummaryLine label="模式说明" value={selectedMode.text} />
                  <SummaryLine label="服务器规格" value={`${selectedPlan.name}（${selectedPlan.serverFee}元/年）`} />
                  <SummaryLine label="配置详情" value={`${selectedPlan.cpu} / ${selectedPlan.storage} / ${selectedPlan.memory} / ${selectedPlan.traffic}`} />
                </div>

                <div className="rounded-lg bg-cyan-200 p-5 text-slate-950">
                  <p className="text-sm font-black">应付参考价</p>
                  <p className="mt-2 text-5xl font-black">{totalPrice}元</p>
                  <p className="mt-2 text-xs font-semibold text-slate-700">
                    {selectedMode.fee}元一次性服务费 + {selectedPlan.serverFee}元服务器年费
                  </p>
                </div>

                <PaymentState status={status} statusText={statusText} />

                {status === "paid" ? (
                  <Link
                    href={`/card?order=${encodeURIComponent(orderId)}`}
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-bold text-slate-950 transition hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                  >
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    确认，填写联系方式
                  </Link>
                ) : paymentUrl ? (
                  <a
                    href={paymentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-200 px-7 text-base font-bold text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100"
                  >
                    <ExternalLink className="h-5 w-5" aria-hidden="true" />
                    打开付款链接
                  </a>
                ) : (
                  <Link
                    href={`/card?order=${encodeURIComponent(orderId)}`}
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-7 text-base font-bold text-white transition hover:bg-white/[0.14] focus:outline-none focus:ring-2 focus:ring-cyan-100"
                  >
                    联系人工确认付款
                  </Link>
                )}

                <p className="mt-4 text-xs leading-6 text-slate-400">
                  自动核验只会在支付接口或收款回调已配置后生效；未核验成功前，页面不会显示付款成功。
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function PaymentState({ status, statusText }: { status: OrderStatus; statusText: string }) {
  const Icon = status === "paid" ? CheckCircle2 : status === "creating" ? Loader2 : Clock3;

  return (
    <div className="mt-5 rounded-lg border border-white/10 bg-slate-950/[0.35] p-4">
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 text-cyan-100 ${status === "creating" ? "animate-spin" : ""}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-semibold text-white">
            {status === "paid" ? "付款成功" : status === "manual" ? "等待人工确认" : "等待付款"}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{statusText}</p>
        </div>
      </div>
    </div>
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

function createLocalOrderId() {
  const randomPart =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().split("-")[0]
      : Math.random().toString(36).slice(2, 10);

  return `VPRO-${Date.now().toString(36).toUpperCase()}-${randomPart.toUpperCase()}`;
}

function buildLocalPaymentUrl(orderId: string, amount: number) {
  const baseUrl = process.env.NEXT_PUBLIC_PAYMENT_LINK_BASE;

  if (!baseUrl) {
    return "";
  }

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("order", orderId);
    url.searchParams.set("amount", String(amount));
    return url.toString();
  } catch {
    return "";
  }
}
