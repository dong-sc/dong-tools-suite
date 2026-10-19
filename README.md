# Dong Tools

Dong Lin Photo 在日常工作中慢慢做出來的工具入口。

## 本機開發

```bash
npm install
npm run dev
```

送出變更前請執行：

```bash
npm run lint
npm run build
npm run format
```

## 新增工具

首頁由 `src/data/tools.ts` 驅動。新增已上線的工具時，更新該檔案即可，不需要修改卡片版面。

## 部署

合併到 `main` 後，GitHub Actions 會建置並部署 `dist` 到 GitHub Pages。正式網域為 `tools.donglinphoto.com`。

`npm run build` 會在 Vite 建置後，用相同的 React 元件預先輸出首頁 HTML。工具資料仍以 `src/data/tools.ts` 為唯一來源；即使尚未執行 JavaScript，也能讀取用途與工具連結，不需要伺服器執行環境。
