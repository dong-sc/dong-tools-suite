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

首頁由 `src/data/tools.ts` 驅動。新增已上線或規劃中的工具時，更新該檔案即可，不需要修改卡片版面。

## 部署

合併到 `main` 後，GitHub Actions 會建置並部署 `dist` 到 GitHub Pages。正式網域為 `tools.donglinphoto.com`。
