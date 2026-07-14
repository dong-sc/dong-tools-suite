import { ArrowUpRight } from "lucide-react";

export function Nav() {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-50 -translate-y-20 rounded-md bg-neutral-950 px-3 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
      >
        跳至主要內容
      </a>
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200/70 bg-white/90 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80">
        <nav
          aria-label="主要導覽"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6"
        >
          <a
            href="/"
            aria-label="Dong Tools 首頁"
            className="group flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
          >
            <img src="/favicon.ico" alt="" className="h-7 w-7 rounded-[7px]" />
            <span className="text-sm font-semibold tracking-[-0.02em] text-neutral-950">
              Dong Tools
            </span>
          </a>

          <div className="flex items-center gap-5 sm:gap-7">
            <a
              href="#tools"
              className="hidden rounded-sm text-sm text-neutral-500 transition-colors hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 sm:block"
            >
              所有工具
            </a>
            <a
              href="https://donglinphoto.com"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 rounded-sm text-sm text-neutral-500 transition-colors hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
            >
              Dong Lin Photo
              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="sr-only">（另開新分頁）</span>
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
