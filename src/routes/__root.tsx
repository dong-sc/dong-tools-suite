import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const siteUrl = "https://tools.donglinphoto.com";
const description =
  "從照片排版，到報價、服務確認與請款。一些工作中慢慢做出來的小工具，分享給剛好需要的人。";

function NotFoundComponent() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5">
      <div className="max-w-md text-center">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-neutral-950">
          這個工具不在這裡
        </h1>
        <p className="mt-3 text-sm leading-6 text-neutral-500">
          可能移動了位置，也可能還在工作桌上。回首頁看看目前可以使用的工具。
        </p>
        <Link
          to="/"
          className="mt-7 inline-flex rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
        >
          回到所有工具
        </Link>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5">
      <div className="max-w-md text-center">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-neutral-950">
          頁面暫時沒有載入
        </h1>
        <p className="mt-3 text-sm leading-6 text-neutral-500">
          可以再試一次，或先回到首頁。工具沒有跑掉，只是暫時卡了一下。
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
          >
            再試一次
          </button>
          <a
            href="/"
            className="rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
          >
            回首頁
          </a>
        </div>
      </div>
    </main>
  );
}

function PageLoadingComponent() {
  return (
    <main
      aria-busy="true"
      aria-label="頁面載入中"
      className="min-h-screen bg-white px-5 py-24 sm:px-6"
    >
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-3 w-32 rounded-full bg-neutral-100" />
        <div className="mt-8 h-14 max-w-2xl rounded-2xl bg-neutral-100 sm:h-20" />
        <div className="mt-5 h-6 max-w-xl rounded-full bg-neutral-100" />
        <div className="mt-24 grid gap-4 lg:grid-cols-2">
          <div className="h-80 rounded-3xl bg-neutral-100" />
          <div className="h-80 rounded-3xl bg-neutral-100" />
        </div>
      </div>
      <span className="sr-only">載入中</span>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Dong Tools｜工作裡慢慢做出來的工具" },
        { name: "description", content: description },
        { name: "author", content: "Dong Lin Photo" },
        { name: "robots", content: "index, follow" },
        { name: "theme-color", content: "#ffffff" },
        { property: "og:title", content: "Dong Tools｜工作裡慢慢做出來的工具" },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "zh_TW" },
        { property: "og:site_name", content: "Dong Tools" },
        { property: "og:url", content: siteUrl },
        { property: "og:image", content: `${siteUrl}/og-image.png` },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content: "Dong Tools｜工作裡慢慢做出來的工具",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Dong Tools｜工作裡慢慢做出來的工具",
        },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `${siteUrl}/og-image.png` },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "canonical", href: `${siteUrl}/` },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    pendingComponent: PageLoadingComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
