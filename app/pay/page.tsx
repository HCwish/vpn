"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  ShoppingBag
} from "lucide-react";

const BUY_URL =
  "https://h5.m.goofish.com/item?forceFlush=1&id=1052728878633&ut_sk=1.aPZoNuzLYkEDAOY9u7z86CFq_12431167_1779462515970.Copy.detail.1052728878633.2218546656173";

const serviceModes = [
  { name: "全教程模式", fee: 298 },
  { name: "懒人模式", fee: 98 }
];

const serverPlans = [
  { name: "入门型", detail: "1vCPU / 1GB RAM / 20GB SSD / 3000GB/月", serverFee: 160 },
  { name: "轻量型", detail: "2vCPU / 2GB RAM / 35GB SSD / 5000GB/月", serverFee: 255 },
  { name: "标准型", detail: "3vCPU / 4GB RAM / 60GB SSD / 7000GB/月", serverFee: 420 },
  { name: "进阶型", detail: "6vCPU / 6GB RAM / 100GB SSD / 12000GB/月", serverFee: 625 },
  { name: "高配型", detail: "7vCPU / 8GB RAM / 150GB SSD / 20000GB/月", serverFee: 830 }
];

export default function PayPage() {
  const [modeIndex, setModeIndex] = useState(0);
  const [planIndex, setPlanIndex] = useState(0);
  const selectedMode = serviceModes[modeIndex] ?? serviceModes[0];
  const selectedPlan = serverPlans[planIndex] ?? serverPlans[0];
  const totalPrice = selectedMode.fee + selectedPlan.serverFee;

  const cardHref = useMemo(
    () => `/card?mode=${modeIndex}&plan=${planIndex}`,
    [modeIndex, planIndex]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setModeIndex(readIndex(params.get("mode"), serviceModes.length));
    setPlanIndex(readIndex(params.get("plan"), serverPlans.length));
  }, []);

  return (
    <main className="min-h-screen bg-[#020b18] px-5 py-6 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-4xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <Link
            href="/#pricing"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-slate-100 transition hover:bg-white/[0.12]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            返回
          </Link>
          <span className="text-sm font-semibold text-cyan-100">VPRO BUY</span>
        </header>

        <section className="flex flex-1 items-center py-14">
          <div className="w-full rounded-lg border border-cyan-100/[0.18] bg-[linear-gradient(145deg,rgba(8,31,56,0.96),rgba(2,11,24,0.92))] p-6 shadow-[0_0_90px_rgba(56,189,248,0.14)] sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="grid h-14 w-14 place-items-center rounded-full bg-cyan-200 text-slate-950">
                  <ShoppingBag className="h-7 w-7" aria-hidden="true" />
                </span>
                <h1 className="mt-6 text-4xl font-semibold tracking-normal">确认购买</h1>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  付款后点击“已付款”，进入名片页面联系开通。
                </p>
              </div>

              <div className="rounded-lg bg-cyan-200 p-5 text-slate-950 sm:min-w-56">
                <p className="text-sm font-black">参考价</p>
                <p className="mt-2 text-5xl font-black">{totalPrice}元</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 rounded-lg border border-white/10 bg-white/[0.055] p-5 text-sm">
              <SummaryLine label="模式" value={`${selectedMode.name}（${selectedMode.fee}元）`} />
              <SummaryLine label="规格" value={`${selectedPlan.name}（${selectedPlan.serverFee}元/年）`} />
              <SummaryLine label="配置" value={selectedPlan.detail} />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={BUY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-200 px-7 text-base font-bold text-slate-950 transition hover:bg-white"
              >
                <ExternalLink className="h-5 w-5" aria-hidden="true" />
                去付款
              </a>
              <Link
                href={cardHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white px-7 text-base font-bold text-slate-950 transition hover:bg-cyan-100"
              >
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                已付款
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[4rem_1fr]">
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
