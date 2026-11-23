import { ArrowUpRight, PackageOpen } from "lucide-react";
import { type CSSProperties } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { casework, tools, type Tool } from "@/data/tools";
import { CaseworkSection } from "@/components/site/CaseworkSection";

const featuredTools = tools.filter((tool) => tool.featured);
const otherTools = tools.filter((tool) => !tool.featured && !tool.series);

function ToolCard({
  tool,
  index,
  number,
}: {
  tool: Tool;
  index: number;
  number?: string;
}) {
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
          {number && <span>{number}</span>}
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

const eyebrow =
  "text-xs font-medium uppercase tracking-[0.16em] text-neutral-400";

export function ToolsGrid() {
  if (tools.length === 0)
    return (
      <section
        id="tools"
        aria-labelledby="tools-title"
        className="scroll-mt-20 border-y border-neutral-200/70 bg-neutral-50/70"
      >
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
          <h2 id="tools-title" className="sr-only">
            現在可以使用的工具
          </h2>
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
        </div>
      </section>
    );

  return (
    <>
      <section
        id="tools"
        aria-labelledby="tools-title"
        className="scroll-mt-20 border-y border-neutral-200/70 bg-neutral-50/70"
      >
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className={eyebrow}>Available now</p>
              <h2
                id="tools-title"
                className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-neutral-950 sm:text-4xl"
              >
                現在可以使用的工具
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-neutral-500">
              00 是照片排版；接案文件整理成 {casework.name}{" "}
              系列，從報價到報帳照編號往下走。
            </p>
          </div>
          {featuredTools.map((tool, index) => (
            <div key={tool.id} className="featured-row">
              <ToolCard tool={tool} index={index} number="00" />
              <div className="featured-copy">
                <p className={eyebrow}>00 · 主打工具</p>
                <p className="mt-4 text-balance text-2xl font-semibold leading-snug tracking-[-0.03em] text-neutral-950 sm:text-3xl">
                  {tool.label}
                </p>
                <p className="mt-3 max-w-md text-pretty text-base leading-7 text-neutral-600">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CaseworkSection />

      <section
        aria-labelledby="other-tools-title"
        className="border-y border-neutral-200/70 bg-neutral-50/70"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
          <div className="mb-8">
            <p className={eyebrow}>More</p>
            <h2
              id="other-tools-title"
              className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-neutral-950 sm:text-3xl"
            >
              其他工具
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-500">
              不在 {casework.name} 的流程裡，但出外拍攝時用得到。
            </p>
          </div>
          <div className="tools-family-grid">
            {otherTools.map((tool, index) => (
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
        </div>
      </section>
    </>
  );
}
