import { ArrowUpRight, PackageOpen } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { tools, type Tool } from "@/data/tools";

function ExternalHint() {
  return <span className="sr-only">（另開新分頁）</span>;
}

function FeaturedToolCard({ tool }: { tool: Tool }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>();
  const Icon = tool.icon;

  return (
    <a
      ref={ref}
      href={tool.href}
      target="_blank"
      rel="noreferrer"
      className={`group relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-950 p-7 text-white transition-[transform,opacity,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4 sm:p-9 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_42%)]" />
      <div className="relative flex min-h-72 flex-col justify-between sm:min-h-80">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-inset ring-white/10">
            <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
          </div>
          <ArrowUpRight
            aria-hidden="true"
            className="h-5 w-5 text-white/45 transition-[color,transform] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
          />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
            {tool.name}
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            {tool.label}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
            {tool.description}
          </p>
          <p className="mt-7 text-sm font-medium text-white">
            開啟工具 <span aria-hidden="true">→</span>
            <ExternalHint />
          </p>
        </div>
      </div>
    </a>
  );
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>();
  const Icon = tool.icon;

  return (
    <a
      ref={ref}
      href={tool.href}
      target="_blank"
      rel="noreferrer"
      style={{ transitionDelay: `${index * 60}ms` }}
      className={`group flex min-h-64 flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 transition-[border-color,box-shadow,transform,opacity] duration-500 ease-out hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_50px_-30px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-950 group-hover:text-white">
          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 text-neutral-300 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900"
        />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
          {tool.name}
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-neutral-950">
          {tool.label}
        </h3>
        <p className="mt-2 text-sm leading-6 text-neutral-500">
          {tool.description}
        </p>
        <ExternalHint />
      </div>
    </a>
  );
}

function EmptyTools() {
  return (
    <div className="rounded-3xl border border-dashed border-neutral-300 px-6 py-16 text-center">
      <PackageOpen
        aria-hidden="true"
        className="mx-auto h-6 w-6 text-neutral-400"
      />
      <h3 className="mt-4 text-sm font-medium text-neutral-900">工具整理中</h3>
      <p className="mt-2 text-sm text-neutral-500">
        完成之後，會從這裡開始出現。
      </p>
    </div>
  );
}

export function ToolsGrid() {
  const featuredTool = tools.find((tool) => tool.featured);
  const businessTools = tools.filter((tool) => tool.category === "business");

  return (
    <section
      id="tools"
      aria-labelledby="tools-title"
      className="scroll-mt-20 border-y border-neutral-200/70 bg-neutral-50/70"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
              Available now
            </p>
            <h2
              id="tools-title"
              className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-neutral-950 sm:text-4xl"
            >
              現在可以使用的工具
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-neutral-500">
            不用註冊。需要處理的內容，留在你的瀏覽器裡。
          </p>
        </div>

        {tools.length === 0 ? (
          <EmptyTools />
        ) : (
          <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
            {featuredTool ? <FeaturedToolCard tool={featuredTool} /> : null}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {businessTools.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
              <div className="flex min-h-64 flex-col justify-end rounded-3xl border border-dashed border-neutral-300 bg-white/35 p-6">
                <p className="text-sm leading-6 text-neutral-400">
                  還有空位。
                  <br />
                  下一個工具成熟後，就放進來。
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
