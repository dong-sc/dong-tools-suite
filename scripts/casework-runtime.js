/*
 * Dong Tools · Casework series bar.
 * Built from src/data/tools.ts into dist/casework/series.js. Do not edit the built file.
 *
 * Static pages (the bar is placed right after .dong-tools-bar):
 *   <script src="https://tools.donglinphoto.com/casework/series.js" data-tool="payment" async></script>
 *
 * Pages rendered by a framework (React etc.) mount it themselves, after their own render:
 *   <script src="https://tools.donglinphoto.com/casework/series.js" data-tool="payment" data-mount="manual" async></script>
 *   window.DongCasework?.mountBar("payment", element);   // or wait for the "dongcasework:ready" event
 *
 * Either way:
 *   <div data-casework-next></div>        <!-- optional slot for the next-step card -->
 *   window.DongCasework?.showNext();      // call after the document is printed or exported
 *
 * Nothing here is required for a tool to work. If this file fails to load, the tool simply
 * shows no series bar.
 */
(function (CASEWORK) {
  "use strict";

  const pad = (n) => String(n).padStart(2, "0");
  const esc = (v) =>
    String(v ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );

  /** Position of one tool in the series: previous steps, next steps and alternatives. */
  function model(id) {
    const steps = [...CASEWORK.steps].sort((a, b) => a.step - b.step);
    const current = steps.find((s) => s.id === id);
    if (!current) return null;
    const byId = Object.fromEntries(steps.map((s) => [s.id, s]));
    const next = current.next.map((n) => byId[n]).filter(Boolean);
    const prev = steps.filter((s) => s.next.includes(id));
    return { current, prev, next, steps, total: steps.length };
  }

  const external = '<span class="dtc-sr">（另開新分頁）</span>';
  const link = (s, text) =>
    `<a href="${esc(s.href)}" target="_blank" rel="noopener">${text}${external}</a>`;
  const label = (s) => `${pad(s.step)} ${esc(s.verb)}`;
  const either = (list) => list.map((s) => link(s, label(s))).join(" 或 ");

  function barHTML(m) {
    const { current, prev, next, steps, total } = m;
    const dots = steps
      .map((s) => {
        const here = s.id === current.id;
        return `<li><a href="${esc(s.href)}" ${here ? 'aria-current="step"' : 'target="_blank" rel="noopener"'} style="--dtc-c:${esc(s.color)}" title="${label(s)}"><span class="dtc-sr">${label(s)}${here ? "（目前）" : "（另開新分頁）"}</span></a></li>`;
      })
      .join("");
    return `<div class="dtc-inner">
<a class="dtc-name" href="${esc(CASEWORK.hub)}#casework" target="_blank" rel="noopener">${esc(CASEWORK.name)}${external}</a>
<span class="dtc-pos"><b>${pad(current.step)}</b> / ${pad(total)}　${esc(current.verb)}</span>
<ol class="dtc-dots">${dots}</ol>
<span class="dtc-links">${prev.length ? `<span>← ${either(prev)}</span>` : ""}${next.length ? `<span>${either(next)} →</span>` : ""}</span>
</div>`;
  }

  function nextHTML(m) {
    const { current, next, total } = m;
    if (!next.length)
      return `<p class="dtc-k">${esc(CASEWORK.name)} ${pad(current.step)} / ${pad(total)} 完成</p>
<p class="dtc-t">這個案子的文件都齊了。</p>
<p class="dtc-w">${link({ href: `${CASEWORK.hub}#casework` }, `回到 ${esc(CASEWORK.name)}`)}</p>`;
    const when = next.map((s) => `${pad(s.step)}：${esc(s.when)}`).join("；");
    return `<p class="dtc-k">${esc(CASEWORK.name)} ${pad(current.step)} ${esc(current.verb)}完成</p>
<p class="dtc-t">下一步：${either(next)}</p>
<p class="dtc-w">${next.length > 1 ? "擇一即可。" : ""}${when}</p>`;
  }

  const CSS = `.dtc-bar{border-bottom:1px solid #e4e4dc;background:#fafaf6;color:#3f4540;font:12px/1.5 -apple-system,BlinkMacSystemFont,"PingFang TC","Microsoft JhengHei",sans-serif}
.dtc-inner{display:flex;align-items:center;gap:8px 16px;flex-wrap:wrap;max-width:1440px;min-height:40px;margin:0 auto;padding:6px 28px}
.dtc-bar a{color:inherit;text-decoration:none}.dtc-bar a:hover{color:#111;text-decoration:underline}
.dtc-bar a:focus-visible,.dtc-next a:focus-visible{border-radius:3px;outline:2px solid #202724;outline-offset:3px}
.dtc-name{font-weight:700;color:#111!important;letter-spacing:-.01em}
.dtc-pos b{font-weight:700;color:#111;font-variant-numeric:tabular-nums}
.dtc-dots{display:flex;gap:4px;margin:0;padding:0;list-style:none}
.dtc-dots a{display:block;width:22px;height:5px;border-radius:3px;background:#d9dbd1}
.dtc-dots a:hover{background:var(--dtc-c)}
.dtc-dots a[aria-current]{width:36px;background:var(--dtc-c)}
.dtc-links{display:flex;gap:6px 16px;flex-wrap:wrap;margin-left:auto}
.dtc-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.dtc-next{margin:18px 0;padding:16px 18px;border:1px solid #dfe0d6;border-left:4px solid var(--dtc-c,#202724);border-radius:0 10px 10px 0;background:#fff;color:#2b2d26;font:14px/1.6 -apple-system,BlinkMacSystemFont,"PingFang TC","Microsoft JhengHei",sans-serif}
.dtc-next p{margin:0}.dtc-k{font-size:11px;letter-spacing:.08em;color:#6b6e60}.dtc-t{margin-top:2px!important;font-size:16px;font-weight:650}
.dtc-t a,.dtc-w a{color:inherit;text-decoration:underline;text-underline-offset:3px}.dtc-w{margin-top:4px!important;font-size:12px;color:#6b6e60}
@media(max-width:760px){.dtc-inner{padding:6px 18px}.dtc-links{margin-left:0;width:100%}}
@media print{.dtc-bar,.dtc-next{display:none!important}}`;

  function injectStyle() {
    if (document.getElementById("dtc-style")) return;
    const style = document.createElement("style");
    style.id = "dtc-style";
    style.textContent = CSS;
    document.head.append(style);
  }

  let toolId = "";

  /** Render the series bar. With a target element the bar goes inside it; otherwise after .dong-tools-bar. */
  function mountBar(id, target) {
    const m = model(id);
    if (!m) return null;
    toolId = id;
    injectStyle();
    document.querySelectorAll(".dtc-bar").forEach((el) => el.remove());
    const nav = document.createElement("nav");
    nav.className = "dtc-bar";
    nav.setAttribute("aria-label", `${CASEWORK.name} 系列導覽`);
    nav.innerHTML = barHTML(m);
    const brand = document.querySelector(".dong-tools-bar");
    if (target) target.append(nav);
    else if (brand) brand.after(nav);
    else document.body.prepend(nav);
    return nav;
  }

  /** Show the next-step card. Call after the user prints or exports the document. */
  function showNext(target) {
    const m = model(toolId);
    if (!m) return null;
    injectStyle();
    const slot =
      target ||
      document.querySelector("[data-casework-next]") ||
      document.querySelector("main") ||
      document.body;
    slot.querySelector(":scope > .dtc-next")?.remove();
    const card = document.createElement("section");
    card.className = "dtc-next";
    card.setAttribute("aria-label", `${CASEWORK.name} 下一步`);
    card.setAttribute("role", "status");
    card.style.setProperty("--dtc-c", m.current.color);
    card.innerHTML = nextHTML(m);
    slot.append(card);
    return card;
  }

  const api = { data: CASEWORK, model, barHTML, nextHTML, mountBar, showNext };
  if (typeof window !== "undefined") window.DongCasework = api;
  if (typeof document === "undefined") return;

  const script = document.currentScript;
  const id = script?.dataset.tool;
  if (id) toolId = id;
  // Lets pages that loaded this file with async know it is ready to use.
  window.dispatchEvent(new Event("dongcasework:ready"));
  if (!id || script.dataset.mount === "manual") return;
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", () => mountBar(id), {
      once: true,
    });
  else mountBar(id);
})(__CASEWORK_DATA__);
