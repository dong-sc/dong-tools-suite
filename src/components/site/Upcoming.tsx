import { useReveal } from "@/hooks/use-reveal";

const upcoming = [
  "Field Note",
  "Portfolio Builder",
  "Tax Calculator",
  "AI Workflow",
  "Client CRM",
];

function UpcomingCard({ name, index }: { name: string; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 50}ms` }}
      className={`rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/50 p-6 transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="h-10 w-10 rounded-lg bg-neutral-100" />
      <h3 className="mt-6 text-base font-medium tracking-tight text-neutral-400">{name}</h3>
      <p className="mt-1.5 text-sm text-neutral-300">整理中</p>
    </div>
  );
}

export function Upcoming() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          正在慢慢增加中
        </h2>
        <div className="mt-3 space-y-1 text-sm text-neutral-500">
          <p>還有一些工具正在整理中，</p>
          <p>等確定成熟之後，也會慢慢放上來。</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {upcoming.map((name, i) => (
          <UpcomingCard key={name} name={name} index={i} />
        ))}
      </div>
    </section>
  );
}
