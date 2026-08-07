import { ArrowUpRight } from "lucide-react";

import { useReveal } from "@/hooks/use-reveal";

export function PhotographyPromo() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      aria-label="關於 Dong Lin Photo 的攝影服務"
      className="mx-auto max-w-6xl px-5 pb-6 sm:px-6 sm:pb-10"
    >
      <div
        ref={ref}
        className={`rounded-xl bg-neutral-950 px-7 py-12 transition-[transform,opacity] duration-500 ease-out sm:px-12 sm:py-16 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
          Dong Lin Photo
        </p>

        <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.15] tracking-[-0.04em] text-white sm:text-5xl">
          做這些工具的人，
          <br />
          平常在拍照。
        </h2>

        <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8">
          主要拍活動、舞台與記者會現場。報價、確認範圍、請款這些事重複久了，就順手寫成工具——把自己的麻煩處理掉，剩下的時間才好拿去把照片拍好。
        </p>

        <p className="mt-4 max-w-2xl text-pretty text-sm leading-7 text-neutral-500 sm:text-base">
          如果你正在找攝影師，或想聊聊拍攝合作，從這裡開始。
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-4">
          <a
            href="https://donglinphoto.com/works"
            target="_blank"
            rel="noopener noreferrer"
            /* 透明外框：讓它和右邊有框的按鈕盒模型一致，並排時才等高 */
            className="inline-flex items-center gap-2 rounded-full border border-transparent bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950"
          >
            看攝影作品
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only">（另開新分頁）</span>
          </a>

          <a
            href="https://donglinphoto.com/booking"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition-[border-color,color,transform] hover:-translate-y-0.5 hover:border-neutral-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950"
          >
            談拍攝合作
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only">（另開新分頁）</span>
          </a>
        </div>
      </div>
    </section>
  );
}
