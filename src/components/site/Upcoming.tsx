import { upcomingTools } from "@/data/tools";
import { useReveal } from "@/hooks/use-reveal";

export function Upcoming() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      aria-labelledby="upcoming-title"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28"
    >
      <div
        ref={ref}
        className={`grid gap-10 transition-[transform,opacity] duration-500 ease-out lg:grid-cols-[0.8fr_1.2fr] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
            On the workbench
          </p>
          <h2
            id="upcoming-title"
            className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-3xl"
          >
            還在工作桌上的東西
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-neutral-500">
            先自己用，反覆調整。等到真的穩定，再慢慢放上來。
          </p>
        </div>

        <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
          {upcomingTools.map((name, index) => (
            <li
              key={name}
              className="flex items-center justify-between gap-4 py-4"
            >
              <span className="text-sm font-medium text-neutral-700">
                {name}
              </span>
              <span className="text-xs tabular-nums text-neutral-300">
                {String(index + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
