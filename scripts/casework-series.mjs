import { readFile } from "node:fs/promises";

export const HUB = "https://tools.donglinphoto.com/";

/**
 * Turn the tools.ts catalog into the data the series bar needs, and refuse to build
 * when the series is inconsistent (gaps in numbering, unknown next steps).
 */
export function buildCaseworkData(tools, casework) {
  const steps = tools
    .filter((tool) => tool.series)
    .map((tool) => ({
      id: tool.id,
      step: tool.series.step,
      stage: tool.series.stage,
      verb: tool.series.verb,
      when: tool.series.when,
      output: tool.series.output,
      next: tool.series.next,
      name: tool.name,
      href: tool.href,
      color: tool.identity.color,
    }))
    .sort((a, b) => a.step - b.step);
  const ids = new Set(steps.map((s) => s.id));
  steps.forEach((s, i) => {
    if (s.step !== i + 1)
      throw new Error(`Casework step numbers must run 1..n; got ${s.step}`);
  });
  steps.forEach((s) => {
    for (const next of s.next)
      if (!ids.has(next))
        throw new Error(`Casework step ${s.id} points to unknown ${next}`);
  });
  const stages = new Set(casework.stages.map((s) => s.id));
  for (const s of steps)
    if (!stages.has(s.stage))
      throw new Error(`Casework step ${s.id} has unknown stage ${s.stage}`);
  return { name: casework.name, hub: HUB, steps };
}

export async function renderSeriesScript(data) {
  const runtime = await readFile(
    new URL("./casework-runtime.js", import.meta.url),
    "utf8",
  );
  if (!runtime.includes("__CASEWORK_DATA__"))
    throw new Error("Casework runtime placeholder missing");
  return runtime.replace("__CASEWORK_DATA__", () => JSON.stringify(data));
}
