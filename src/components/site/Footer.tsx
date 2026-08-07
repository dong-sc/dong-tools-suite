import { ArrowUp } from "lucide-react";

import { useTotalUsage } from "@/hooks/use-total-usage";

export function Footer() {
  const totalUsage = useTotalUsage();

  return (
    <footer className="border-t border-neutral-200/70">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-7 px-5 py-10 text-sm text-neutral-500 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="font-medium text-neutral-800">Dong Tools</p>
          <p className="mt-1">一些工作中慢慢做出來的小工具。</p>
          {totalUsage !== null && (
            <p className="mt-1 text-neutral-400">
              到目前為止，已經幫忙擋掉 {totalUsage.toLocaleString()}{" "}
              次行政雜事。
            </p>
          )}
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://donglinphoto.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-sm transition-colors hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
          >
            by Dong Lin Photo
            <span className="sr-only">（另開新分頁）</span>
          </a>
          <a
            href="#main-content"
            aria-label="回到頁面頂端"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-[border-color,color,transform] hover:-translate-y-0.5 hover:border-neutral-400 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
          >
            <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
