import Link from "next/link";

export default function CardPage() {
  return (
    <main className="min-h-screen bg-[#020b18] px-5 py-6 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-3xl flex-col">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-white"
          >
            首页
          </Link>
          <span className="text-sm font-bold text-cyan-100">VPRO CONTACT</span>
        </header>

        <section className="flex flex-1 items-center py-14">
          <div className="w-full rounded-lg border border-cyan-100/20 bg-[#081f38] p-6 sm:p-8">
            <p className="text-sm font-semibold text-cyan-100">个人名片</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal">联系开通</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              请发送“开通私人节点服务”。
            </p>

            <div className="mt-8 grid gap-4">
              <a
                href="tencent://message/?uin=3914085948&Site=&Menu=yes"
                className="rounded-lg border border-white/10 bg-white/[0.055] p-5"
              >
                <p className="text-sm font-semibold text-cyan-100">QQ</p>
                <p className="mt-2 break-words text-2xl font-semibold">3914085948</p>
              </a>

              <a
                href="mailto:hcwishpro@gmail.com?subject=%E5%BC%80%E9%80%9A%E7%A7%81%E4%BA%BA%E8%8A%82%E7%82%B9%E6%9C%8D%E5%8A%A1&body=%E5%BC%80%E9%80%9A%E7%A7%81%E4%BA%BA%E8%8A%82%E7%82%B9%E6%9C%8D%E5%8A%A1"
                className="rounded-lg border border-white/10 bg-white/[0.055] p-5"
              >
                <p className="text-sm font-semibold text-cyan-100">邮箱</p>
                <p className="mt-2 break-words text-2xl font-semibold">hcwishpro@gmail.com</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
