import { useReveal } from "@/hooks/use-reveal";

export function ClosingNote() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      aria-label="持續改進"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28"
    >
      <div
        ref={ref}
        className={`max-w-3xl transition-[transform,opacity] duration-500 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p className="text-2xl font-semibold leading-relaxed tracking-[-0.03em] text-neutral-950 sm:text-4xl sm:leading-snug">
          繼續使用，繼續學習，
          <br />
          也繼續把它做得更好。
        </p>
      </div>
    </section>
  );
}
