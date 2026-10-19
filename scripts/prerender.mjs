import { readFile, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

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
} finally {
  await server.close();
}
