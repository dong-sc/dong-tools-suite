import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "public/identity");
fs.mkdirSync(out, { recursive: true });
export const family = [
  {
    id: "layout",
    name: "Layout",
    purpose: "照片排版與輸出",
    color: "#345B80",
    bg: "#E9EFF5",
    concept: "不等寬的三格版面，讓照片有位置與層次。",
    shape:
      '<rect x="9" y="9" width="46" height="46" rx="3"/><path d="M29 10v44M30 31h24"/>',
  },
  {
    id: "quote",
    name: "Quote",
    purpose: "整理服務項目與報價",
    color: "#856536",
    bg: "#F3EDE1",
    concept: "分項短列與收束的總額線，把估價整理成一個整體。",
    shape: '<path d="M11 12h17M11 25h23M11 38h17M45 12h8v26h-8M11 52h42"/>',
  },
  {
    id: "scope",
    name: "Scope",
    purpose: "確認拍攝與交付範圍",
    color: "#54705A",
    bg: "#EAF0E9",
    concept: "四個界定範圍的角，包住一個確認勾。",
    shape:
      '<path d="M22 10H10v12M42 10h12v12M54 42v12H42M22 54H10V42M20 32l9 9 16-18"/>',
  },
  {
    id: "payment",
    name: "Payment",
    purpose: "建立請款資訊",
    color: "#936152",
    bg: "#F4EAE5",
    concept: "請款文件的金額列與向外箭頭，表達送出請款通知。",
    shape: '<path d="M35 10H10v44h25M20 23h9M20 35h6M35 32h20M46 23l9 9-9 9"/>',
  },
  {
    id: "travel-expense",
    name: "Travel Expense",
    purpose: "整理交通費與憑證",
    color: "#557578",
    bg: "#E8F0EF",
    concept: "凹口票證疊在底紙上，短列代表待整理的憑證資料。",
    shape:
      '<path d="M11 10h34a2 2 0 0 1 2 2v9a6 6 0 0 0 0 12v9a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2v-9a6 6 0 0 0 0-12v-9a2 2 0 0 1 2-2ZM19 54h36V20M20 22h15M20 32h10"/>',
  },
  {
    id: "thsr-upload",
    name: "THSR Upload",
    purpose: "估算途中上傳時間",
    color: "#746288",
    bg: "#F0EBF4",
    concept: "開口的時間環與上傳箭頭，表達有限時間中的上傳窗口。",
    shape: '<path d="M20 13a23 23 0 1 0 24 0M32 37V9M23 18l9-9 9 9"/>',
  },
  {
    id: "fill",
    name: "Fill",
    purpose: "填寫 PDF 與簽名",
    color: "#626B91",
    bg: "#ECEEF5",
    concept: "留白文件與斜向落筆，明確指向原檔上的填寫動作。",
    shape:
      '<path d="M29 9H12v46h34V40M24 41l3-12 20-20 8 8-20 20-11 4ZM42 14l8 8"/>',
  },
];
function svg(tool, color = tool.color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" style="color:${color}" role="img" aria-label="Dong Tools ${tool.name}"><g stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">${tool.shape}</g></svg>\n`;
}
for (const t of family) {
  const dir = path.join(out, t.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "logo.svg"), svg(t));
  fs.writeFileSync(path.join(dir, "logo-mono.svg"), svg(t, "#202724"));
  fs.writeFileSync(path.join(dir, "logo-white.svg"), svg(t, "#FFFFFF"));
}
fs.writeFileSync(
  path.join(out, "manifest.json"),
  JSON.stringify(
    { version: 1, grid: 64, stroke: 6, padding: 6, family },
    null,
    2,
  ) + "\n",
);
const style = `*{box-sizing:border-box}body{margin:0;font-family:Arial,'PingFang TC','Microsoft JhengHei',sans-serif;color:#202724}img{display:block}.thumb{width:640px;height:400px;padding:34px 40px;position:relative;display:flex;flex-direction:column;justify-content:space-between;background:var(--bg);color:var(--ink)}.meta{display:flex;justify-content:space-between;font-size:14px;letter-spacing:1.5px}.mark{width:116px;height:116px;margin-top:12px}.name{font-size:48px;line-height:1.12;letter-spacing:-1.4px;font-weight:600;margin:0}.purpose{font-size:26px;line-height:1.5;margin:12px 0 0;color:#4A514C}.thumb::after{content:'';position:absolute;right:40px;bottom:40px;width:26px;height:26px;border-top:2px solid currentColor;border-right:2px solid currentColor;transform:rotate(0deg)}.diagonal{position:absolute;right:41px;bottom:52px;width:35px;height:2px;background:currentColor;transform:rotate(-45deg);transform-origin:right center}`;
for (const [i, t] of family.entries()) {
  const markup = `<div class="thumb" style="--bg:${t.bg};--ink:${t.color}"><div><div class="meta"><span>DONG TOOLS</span><span>0${i + 1}</span></div><img class="mark" src="logo.svg"></div><div><h1 class="name">${t.name}</h1><p class="purpose">${t.purpose}</p></div><span class="diagonal"></span></div>`;
  fs.writeFileSync(
    path.join(out, t.id, "thumbnail.html"),
    `<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><style>${style}</style>${markup}</html>`,
  );
}
const cells = family
  .map(
    (t, i) =>
      `<article><div class="cell-head"><span>0${i + 1}</span><span>${t.name}</span></div><div class="symbols" style="color:${t.color}"><img src="${t.id}/logo.svg"><div class="size-test"><img width="32" height="32" src="${t.id}/logo-mono.svg"><span>32 px · mono</span></div><div class="reverse"><img src="${t.id}/logo-white.svg"></div></div><p>${t.purpose}</p><img class="thumbnail" src="${t.id}/thumbnail.png"></article>`,
  )
  .join("");
fs.writeFileSync(
  path.join(out, "overview.html"),
  `<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:#F8F8F4;color:#202724;font-family:Arial,'PingFang TC',sans-serif}main{width:1600px;padding:64px}header{display:flex;align-items:end;justify-content:space-between;margin-bottom:40px;border-bottom:1px solid #CDD3CB;padding-bottom:30px}h1{font-size:55px;letter-spacing:-2px;line-height:1;margin:0}header p{font-size:18px;color:#666E67;line-height:1.6;margin:0}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}article{background:white;border:1px solid #DFE3DC;border-radius:16px;padding:24px}.cell-head{display:flex;gap:16px;font-size:19px;font-weight:600}.cell-head span:first-child{color:#929C93;font-size:14px;line-height:22px}.symbols{display:flex;align-items:center;justify-content:space-between;margin:32px 0 26px}.symbols>img{width:90px;height:90px}.size-test{display:flex;flex-direction:column;gap:14px;align-items:center}.size-test span{font-size:10px;color:#6B736D}.reverse{background:#202724;border-radius:8px;padding:12px}.reverse img{width:40px;height:40px}article p{font-size:16px;margin:0 0 24px;color:#5E685F}.thumbnail{width:100%;border-radius:7px}.note{display:flex;flex-direction:column;justify-content:space-between;background:#EDF0E9}.note h2{font-size:30px;line-height:1.4;font-weight:500;margin:0}.note p{font-size:16px;line-height:1.9}.note strong{font-weight:500}footer{font-size:16px;color:#69726A;border-top:1px solid #CDD3CB;padding-top:24px;margin-top:36px}</style><main><header><h1>Dong Tools</h1><p>七個用途，七個符號。<br>同一網格、線寬與留白。</p></header><div class="grid">${cells}<article class="note"><h2>工作各有<br>自己的形狀。</h2><p>64 × 64 網格<br>6 單位線寬<br>圓角與端點統一<br>顏色輔助，形狀辨識</p><p>首頁縮圖採 16:10。<br>所有符號可單色、反白、透明使用。</p></article></div><footer>方向預覽 v1 · 2026.10.12　／　未套用至正式網站　／　官網、作品與預約連結維持原樣</footer></main></html>`,
);

// Keep generated source previews compatible with the repository format check.
const prettier = await import("prettier");
for (const file of fs.readdirSync(out, { recursive: true })) {
  if (file.endsWith(".html")) {
    const target = path.join(out, file);
    fs.writeFileSync(
      target,
      await prettier.format(fs.readFileSync(target, "utf8"), {
        parser: "html",
      }),
    );
  }
}

fs.writeFileSync(
  path.join(out, "dong-tools.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Dong Tools"><path fill="#202724" fill-rule="evenodd" d="M10 8h20c17 0 26 9 26 24s-9 24-26 24H10V8Zm10 10v28h10c10 0 16-5 16-14s-6-14-16-14H20Z"/><path fill="#202724" d="M15 29h37v6H15z"/></svg>\n`,
);
