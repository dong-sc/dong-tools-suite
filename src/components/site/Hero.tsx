import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28">
      <div className="max-w-3xl animate-fade-in">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
          From Dong Lin Photo
        </p>
        <h1 className="mt-6 text-balance text-[2.75rem] font-semibold leading-[1.08] tracking-[-0.045em] text-neutral-950 sm:text-6xl lg:text-7xl">
          工作裡慢慢做出來的工具。
        </h1>
        <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-neutral-600 sm:text-xl sm:leading-9">
          從照片排版，到報價、服務確認與請款。原本只是為了解決每天會遇到的事，現在整理在這裡，分享給剛好需要的人。
        </p>

        <a
          href="#tools"
          className="group mt-10 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 transition-[border-color,background-color,transform] hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
        >
          瀏覽 4 個工具
          <ArrowDown
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5"
          />
        </a>
      </div>
    </section>
  );
}
