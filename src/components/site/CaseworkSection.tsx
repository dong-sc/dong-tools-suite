import { ArrowUpRight } from "lucide-react";
import { type CSSProperties } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { casework, tools } from "@/data/tools";

const caseworkTools = tools
  .filter((tool) => tool.series)
  .sort((a, b) => a.series!.step - b.series!.step);

const pad = (n: number) => String(n).padStart(2, "0");
const stepOf = (id: string) => tools.find((t) => t.id === id)?.series?.step;

// 同一步之後有兩個以上的下一步時，彼此是「擇一」關係（例如 04 領據、05 勞報單）。
function alternativesOf(id: string) {
  const alternatives = new Set<number>();
  for (const tool of caseworkTools) {
    const next = tool.series!.next;
    if (next.length > 1 && next.includes(id))
      for (const other of next)
        if (other !== id) alternatives.add(stepOf(other) ?? 0);
  }
  return [...alternatives].filter(Boolean);
}

export function CaseworkSection() {
  const { ref, visible } = useReveal<HTMLOListElement>();
  const total = caseworkTools.length;
  const stageSpans = casework.stages.map((stage) => ({
    ...stage,
    span: caseworkTools.filter((t) => t.series!.stage === stage.id).length,
  }));
  const stageLabel = Object.fromEntries(
    casework.stages.map((s) => [s.id, s.label]),
  );

  if (!total) return null;

  return (
    <section
      id="casework"
      aria-labelledby="casework-title"
      className="scroll-mt-20 bg-white"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
              {casework.name} · 01–{pad(total)}
            </p>
            <h2
              id="casework-title"
              className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-neutral-950 sm:text-6xl"
            >
              {casework.name}
            </h2>
            <p className="mt-4 text-pretty text-xl tracking-[-0.02em] text-neutral-600 sm:text-2xl">
              {casework.tagline}
            </p>
          </div>
          <p className="max-w-sm text-pretty text-sm leading-6 text-neutral-500">
            {casework.description}
          </p>
        </div>

        <div className="casework-rail" aria-hidden="true">
          {stageSpans
            .filter((stage) => stage.span)
            .map((stage) => (
              <span key={stage.id} style={{ gridColumn: `span ${stage.span}` }}>
                {stage.label}
              </span>
            ))}
        </div>

        <ol
          ref={ref}
          className={`casework-steps ${visible ? "is-visible" : ""}`}
          aria-label={`${casework.name} 的 ${total} 個步驟`}
        >
          {caseworkTools.map((tool, index) => {
            const series = tool.series!;
            const alternatives = alternativesOf(tool.id);
            return (
              <li key={tool.id} style={{ transitionDelay: `${index * 50}ms` }}>
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noreferrer"
                  className="casework-step"
                  style={
                    {
                      "--tool-ink": tool.identity.color,
                      "--tool-paper": tool.identity.background,
                    } as CSSProperties
                  }
                >
                  <span className="casework-head">
                    <span className="casework-num">{pad(series.step)}</span>
                    <span className="casework-stage">
                      {stageLabel[series.stage]}
                    </span>
                  </span>
                  <img
                    className="casework-logo"
                    src={tool.identity.logo}
                    alt=""
                    width="40"
                    height="40"
                  />
                  <span className="casework-verb">{series.verb}</span>
                  <span className="casework-name">{tool.name}</span>
                  <span className="casework-when">{series.when}</span>
                  {alternatives.length > 0 && (
                    <span className="casework-alt">
                      或 {alternatives.map(pad).join("、")}，擇一
                    </span>
                  )}
                  <span className="casework-out">
                    <span>產出：{series.output}</span>
                    <ArrowUpRight aria-hidden="true" strokeWidth={1.6} />
                  </span>
                  <span className="sr-only">
                    {tool.description}（另開新分頁）
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
