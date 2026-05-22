"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const buyUrl =
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setModeIndex(readIndex(params.get("mode"), serviceModes.length));
    setPlanIndex(readIndex(params.get("plan"), serverPlans.length));
  }, []);

  const selectedMode = serviceModes[modeIndex];
  const selectedPlan = serverPlans[planIndex];
  const totalPrice = selectedMode.fee + selectedPlan.serverFee;
  const cardHref = `/card?mode=${modeIndex}&plan=${planIndex}`;

  return (
    <main className="min-h-screen bg-[#020b18] px-5 py-6 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-4xl flex-col">
        <header className="flex items-center justify-between">
          <Link
            href="/#pricing"
            className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-white"
          >
            返回
          </Link>
          <span className="text-sm font-bold text-cyan-100">VPRO BUY</span>
        </header>

        <section className="flex flex-1 items-center py-14">
          <div className="w-full rounded-lg border border-cyan-100/20 bg-[#081f38] p-6 sm:p-8">
            <p className="text-sm font-semibold text-cyan-100">当前配置</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal">确认购买</h1>

            <div className="mt-6 grid gap-4 rounded-lg border border-white/10 bg-white/[0.055] p-5 text-sm">
              <Line label="服务模式" value={`${selectedMode.name}（${selectedMode.fee}元）`} />
              <Line label="服务器规格" value={`${selectedPlan.name}（${selectedPlan.serverFee}元/年）`} />
              <Line label="配置详情" value={selectedPlan.detail} />
            </div>

            <div className="mt-6 rounded-lg bg-cyan-200 p-5 text-slate-950">
              <p className="text-sm font-black">最终价格</p>
              <p className="mt-2 text-5xl font-black">{totalPrice}元</p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={buyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-cyan-200 px-7 text-base font-bold text-slate-950"
              >
                去付款
              </a>
              <Link
                href={cardHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-base font-bold text-slate-950"
              >
                已付款
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[6rem_1fr]">
      <span className="text-slate-400">{label}</span>
      <span className="font-bold text-white">{value}</span>
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
