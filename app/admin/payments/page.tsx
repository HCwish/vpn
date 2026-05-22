"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardCheck,
  KeyRound,
  Loader2,
  RefreshCcw,
  ShieldCheck
} from "lucide-react";

type AdminOrder = {
  orderId: string;
  status: string;
  amount?: number;
  modeName?: string;
  planName?: string;
  createdAt?: string;
  paidAt?: string;
  updatedAt?: string;
  manualTradeNo?: string;
  merchantCallback?: {
    configured: boolean;
    ok: boolean;
    status: number;
    attempts: number;
    sentAt: string | null;
    reason?: string;
    error?: string;
  } | null;
};

export default function AdminPaymentsPage() {
  const [token, setToken] = useState("");
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  const [tradeNo, setTradeNo] = useState("");
  const [note, setNote] = useState("");
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const latestPending = useMemo(() => orders.filter((order) => order.status !== "paid"), [orders]);

  useEffect(() => {
    const savedToken = window.localStorage.getItem("vpro-admin-token") || "";
    setToken(savedToken);
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("vpro-admin-token", token);
    }
  }, [token]);

  async function loadOrders() {
    if (!token.trim()) {
      setMessage("请先填写 ADMIN_TOKEN。");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/orders?limit=80", {
        headers: {
          "x-admin-token": token.trim()
        }
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "读取订单失败");
      }

      setOrders(data.orders || []);
      setMessage(`已刷新，读取到 ${data.orders?.length || 0} 个订单。`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "读取订单失败");
    } finally {
      setLoading(false);
    }
  }

  async function confirmPayment() {
    if (!token.trim()) {
      setMessage("请先填写 ADMIN_TOKEN。");
      return;
    }

    if (!orderId.trim()) {
      setMessage("请先填写订单号。");
      return;
    }

    setConfirming(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token.trim()
        },
        body: JSON.stringify({
          orderId: orderId.trim(),
          amount: amount ? Number(amount) : undefined,
          tradeNo: tradeNo.trim(),
          note: note.trim()
        })
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "确认付款失败");
      }

      const callback = data.merchantCallback;
      setMessage(
        callback?.configured
          ? callback.ok
            ? `订单 ${data.orderId} 已确认，网站回调成功。`
            : `订单 ${data.orderId} 已确认，但网站回调失败：${callback.error || callback.reason || callback.status}`
          : `订单 ${data.orderId} 已确认。你还没有配置 MERCHANT_NOTIFY_URL，所以没有回调外部网站。`
      );
      setOrderId("");
      setAmount("");
      setTradeNo("");
      setNote("");
      await loadOrders();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "确认付款失败");
    } finally {
      setConfirming(false);
    }
  }

  function pickOrder(order: AdminOrder) {
    setOrderId(order.orderId);
    setAmount(order.amount ? String(order.amount) : "");
    setTradeNo(`MANUAL-${Date.now()}`);
  }

  return (
    <main className="min-h-screen bg-[#07111f] px-5 py-6 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100/20 bg-cyan-100/10 px-3 py-1 text-sm font-semibold text-cyan-100">
              <ShieldCheck className="h-4 w-4" />
              Manual payment relay
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-normal sm:text-5xl">手动确认付款后台</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              用户下单后，你核对真实收款记录，在这里确认订单。确认后系统会把订单改为已付款，并自动回调你配置的网站地址。
            </p>
          </div>

          <button
            type="button"
            onClick={loadOrders}
            disabled={loading}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-cyan-200 px-5 text-sm font-bold text-slate-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            刷新订单
          </button>
        </header>

        <section className="grid gap-6 py-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <KeyRound className="h-5 w-5 text-cyan-100" />
              管理口令
            </h2>
            <label className="mt-5 block text-sm font-semibold text-slate-300" htmlFor="token">
              ADMIN_TOKEN
            </label>
            <input
              id="token"
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="填写 Cloudflare 里配置的 ADMIN_TOKEN"
              className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition focus:border-cyan-100"
            />
            <p className="mt-3 text-xs leading-6 text-slate-400">
              这个口令只保存在你当前浏览器里。不要把它发给客户，不要放进网页公开文案。
            </p>

            <div className="mt-6 rounded-md border border-cyan-100/15 bg-cyan-100/10 p-4 text-sm leading-7 text-cyan-50">
              操作顺序：先让客户提交订单，确认你已经收到钱，再点击下面订单列表里的“填入”，最后点“确认已付款”。
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ClipboardCheck className="h-5 w-5 text-cyan-100" />
              确认订单
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="订单号" value={orderId} onChange={setOrderId} placeholder="VPRO-..." />
              <Field label="实收金额" value={amount} onChange={setAmount} placeholder="例如 458" inputMode="decimal" />
              <Field label="收款流水号" value={tradeNo} onChange={setTradeNo} placeholder="可填微信/银行/手工编号" />
              <Field label="备注" value={note} onChange={setNote} placeholder="例如 客户微信昵称" />
            </div>
            <button
              type="button"
              onClick={confirmPayment}
              disabled={confirming}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-cyan-200 px-5 text-base font-bold text-slate-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {confirming ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle2 className="h-5 w-5" />}
              确认已付款并回调网站
            </button>
            {message ? (
              <div className="mt-4 rounded-md border border-white/10 bg-slate-950/60 p-4 text-sm leading-7 text-slate-100">
                {message}
              </div>
            ) : null}
          </div>
        </section>

        <section className="pb-10">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">最近订单</h2>
            <span className="text-sm text-slate-400">待确认 {latestPending.length} 个</span>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10">
            <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-slate-200 sm:grid-cols-[1.2fr_0.6fr_0.8fr_0.8fr_auto]">
              <span>订单</span>
              <span className="hidden sm:block">金额</span>
              <span className="hidden sm:block">状态</span>
              <span className="hidden sm:block">时间</span>
              <span>操作</span>
            </div>

            {orders.length ? (
              orders.map((order) => (
                <div
                  key={order.orderId}
                  className="grid grid-cols-[1fr_auto] gap-3 border-b border-white/10 px-4 py-4 text-sm last:border-b-0 sm:grid-cols-[1.2fr_0.6fr_0.8fr_0.8fr_auto]"
                >
                  <div>
                    <p className="break-all font-semibold text-cyan-100">{order.orderId}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {[order.modeName, order.planName].filter(Boolean).join(" / ") || "无配置名称"}
                    </p>
                  </div>
                  <span className="hidden font-semibold sm:block">{order.amount || "-"} 元</span>
                  <span className={order.status === "paid" ? "hidden text-emerald-200 sm:block" : "hidden text-amber-200 sm:block"}>
                    {order.status === "paid" ? "已付款" : "待确认"}
                  </span>
                  <span className="hidden text-xs leading-5 text-slate-400 sm:block">
                    {formatDate(order.paidAt || order.createdAt || order.updatedAt)}
                  </span>
                  <button
                    type="button"
                    onClick={() => pickOrder(order)}
                    className="min-h-9 rounded-md border border-white/10 px-3 text-xs font-bold text-white transition hover:bg-white/10"
                  >
                    填入
                  </button>
                </div>
              ))
            ) : (
              <div className="px-4 py-10 text-center text-sm text-slate-400">
                填写 ADMIN_TOKEN 后点击“刷新订单”。
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  inputMode
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  inputMode?: "decimal";
}) {
  return (
    <label className="block text-sm font-semibold text-slate-300">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-100"
      />
    </label>
  );
}

function formatDate(value?: string) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
