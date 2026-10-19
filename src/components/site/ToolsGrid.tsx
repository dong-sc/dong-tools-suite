import { ArrowUpRight, PackageOpen } from "lucide-react";
import { type CSSProperties } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { tools, type Tool } from "@/data/tools";

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>();
  return (
    <a
      ref={ref}
      href={tool.href}
      target="_blank"
      rel="noreferrer"
      style={
        {
          "--tool-ink": tool.identity.color,
          "--tool-paper": tool.identity.background,
          transitionDelay: `${index * 40}ms`,
        } as CSSProperties
      }
      className={`tool-card group ${visible ? "is-visible" : ""}`}
    >
      <div className="tool-art" aria-hidden="true">
        <div className="tool-meta">
          <span>DONG TOOLS</span>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <img
          className="tool-logo"
          src={tool.identity.logo}
          alt=""
          width="64"
          height="64"
        />
        <ArrowUpRight className="tool-arrow" strokeWidth={1.6} />
      </div>
      <div className="tool-copy">
        <h3>
          {tool.name}
          <span className="sr-only">：{tool.label}</span>
        </h3>
        <p>{tool.identity.purpose}</p>
        <span className="sr-only">{tool.description}（另開新分頁）</span>
      </div>
    </a>
  );
}

export function ToolsGrid() {
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
            選擇要完成的工作，直接開啟對應工具。
          </p>
        </div>
        {tools.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 px-6 py-16 text-center">
            <PackageOpen
              aria-hidden="true"
              className="mx-auto h-6 w-6 text-neutral-400"
            />
            <h3 className="mt-4 text-sm font-medium text-neutral-900">
              工具整理中
            </h3>
            <p className="mt-2 text-sm text-neutral-500">
              完成之後，會從這裡開始出現。
            </p>
          </div>
        ) : (
          <div className="tools-family-grid">
            {tools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
            <div className="tool-placeholder">
              <p>
                還有空位。
                <br />
                下一個工具成熟後，就放進來。
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
