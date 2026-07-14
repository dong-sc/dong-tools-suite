import { ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToTools = () => {
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="mx-auto max-w-3xl px-6 pt-24 pb-24 sm:pt-32 sm:pb-32">
      <div className="animate-fade-in">
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-6xl">
          Dong Tools
        </h1>
        <p className="mt-5 text-lg text-neutral-600 sm:text-xl">
          一些工作中慢慢做出來的小工具。
        </p>
        <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-neutral-500">
          <p>這些工具來自於我平時工作的實際需求。</p>
          <p>有些只是想省下重複工作的時間，有些則是為了解決一直找不到合適工具的問題。</p>
          <p>既然每天都在使用，也希望能分享給同樣有需要的人。</p>
        </div>

        <div className="mt-10">
          <button
            onClick={scrollToTools}
            className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 transition-all hover:border-neutral-300 hover:bg-neutral-50"
          >
            瀏覽工具
            <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
