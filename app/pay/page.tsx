import Link from "next/link";

const buyUrl =
  "https://h5.m.goofish.com/item?forceFlush=1&id=1052728878633&ut_sk=1.aPZoNuzLYkEDAOY9u7z86CFq_12431167_1779462515970.Copy.detail.1052728878633.2218546656173";

export default function PayPage() {
  return (
    <main className="min-h-screen bg-[#020b18] px-5 py-6 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-3xl flex-col">
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
            <p className="text-sm font-semibold text-cyan-100">确认购买</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal">付款后联系开通</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              点击“去付款”打开付款链接。完成后回到这里点击“已付款”。
            </p>

            <div className="mt-6 rounded-lg bg-cyan-200 p-5 text-slate-950">
              <p className="text-sm font-black">推荐组合参考价</p>
              <p className="mt-2 text-5xl font-black">458元</p>
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
                href="/card"
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
