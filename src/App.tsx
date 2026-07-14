import { Component, type ErrorInfo, type ReactNode } from "react";

import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Nav } from "@/components/site/Nav";
import { ToolsGrid } from "@/components/site/ToolsGrid";
import { Upcoming } from "@/components/site/Upcoming";

class AppErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Dong Tools failed to render", error, info);
  }

  render() {
    if (this.state.hasError) {
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
              可以再試一次，或先重新整理頁面。工具沒有跑掉，只是暫時卡了一下。
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-7 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
            >
              重新載入
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <AppErrorBoundary>
      <div className="min-h-screen bg-white text-neutral-900 antialiased">
        <Nav />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <ToolsGrid />
          <Upcoming />
        </main>
        <Footer />
      </div>
    </AppErrorBoundary>
  );
}
