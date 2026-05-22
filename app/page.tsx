import Link from "next/link";

const buyHref = "/pay";

const plans = [
  ["入门型", "1vCPU / 1GB RAM / 20GB SSD", "160元/年"],
  ["轻量型", "2vCPU / 2GB RAM / 35GB SSD", "255元/年"],
  ["标准型", "3vCPU / 4GB RAM / 60GB SSD", "420元/年"],
  ["进阶型", "6vCPU / 6GB RAM / 100GB SSD", "625元/年"],
  ["高配型", "7vCPU / 8GB RAM / 150GB SSD", "830元/年"]
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020b18] text-white">
      <section className="px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <header className="flex items-center justify-between gap-4">
            <a href="/" className="text-lg font-bold text-cyan-100">
              VPRO
            </a>
            <Link
              href="/card"
              className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950"
            >
              联系方式
            </Link>
          </header>

          <div className="py-16 text-center sm:py-20">
            <p className="text-sm font-semibold text-cyan-100">私人节点服务</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal sm:text-6xl">
              一人一服，省心开通
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
              选择商品后付款，付款完成进入名片页面联系开通。
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#pricing"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-cyan-200 px-7 text-base font-bold text-slate-950"
              >
                选择商品
              </a>
              <Link
                href="/card"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 text-base font-bold text-white"
              >
                先联系
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 lg:grid-cols-[1fr_20rem]">
            <div className="space-y-5">
              <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
                <p className="text-sm font-semibold text-cyan-100">服务模式</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-cyan-200 p-5 text-slate-950">
                    <p className="text-xl font-black">全教程模式</p>
                    <p className="mt-2 text-sm font-semibold">远程协助，从 0 完成配置。</p>
                    <p className="mt-5 text-3xl font-black">298元</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-slate-950/35 p-5">
                    <p className="text-xl font-black">懒人模式</p>
                    <p className="mt-2 text-sm text-slate-300">配置完成后直接交付。</p>
                    <p className="mt-5 text-3xl font-black text-cyan-100">98元</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
                <p className="text-sm font-semibold text-cyan-100">服务器规格</p>
                <div className="mt-4 grid gap-3">
                  {plans.map(([name, spec, price]) => (
                    <div
                      key={name}
                      className="grid gap-2 rounded-lg border border-white/10 bg-slate-950/35 p-4 sm:grid-cols-[7rem_1fr_6rem] sm:items-center"
                    >
                      <p className="font-bold text-white">{name}</p>
                      <p className="text-sm text-slate-300">{spec}</p>
                      <p className="font-bold text-cyan-100">{price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="rounded-lg border border-cyan-100/25 bg-[#081f38] p-6">
              <p className="text-sm text-slate-400">推荐组合</p>
              <p className="mt-3 text-4xl font-black text-cyan-100">458元</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                全教程模式 + 入门型服务器。其他规格可付款后联系调整。
              </p>
              <Link
                href={buyHref}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-cyan-200 px-7 text-base font-bold text-slate-950"
              >
                立即购买
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
