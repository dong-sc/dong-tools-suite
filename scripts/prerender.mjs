import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import { buildCaseworkData, renderSeriesScript } from "./casework-series.mjs";

// Render the same public components used by the client. No user data or browser
// storage is read at build time; the hub only renders its tools.ts catalog.
const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: "custom",
});
try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  const markup = renderToStaticMarkup(createElement(App));
  const file = new URL("../dist/index.html", import.meta.url);
  const html = await readFile(file, "utf8");
  if (!html.includes('<div id="root">'))
    throw new Error("Missing root element");
  await writeFile(
    file,
    html.replace(
      /<div id="root">[\s\S]*?<\/div>/,
      () => `<div id="root">${markup}</div>`,
    ),
  );

  // Casework series bar shared by every tool in the series (same source: tools.ts).
  const { tools, casework } = await server.ssrLoadModule("/src/data/tools.ts");
  const dir = new URL("../dist/casework/", import.meta.url);
  await mkdir(dir, { recursive: true });
  await writeFile(
    new URL("series.js", dir),
    await renderSeriesScript(buildCaseworkData(tools, casework)),
  );
} finally {
  await server.close();
}
