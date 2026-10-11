# Dong Tools identity v1 — isolated preview

Status: preview only. No push, pull request, merge, or deployment.
Repository: `dong-sc/dong-tools-suite`
Branch: `preview/dong-tools-identity`
Baseline: `51d64eafbe3bd3bc28fe13567a0b663ce770124a` (main cloned for this task).

## Purpose → geometry

| Tool           | Actual purpose                                              | Geometry                                    |
| -------------- | ----------------------------------------------------------- | ------------------------------------------- |
| Layout         | Arrange photos and export layouts                           | Three unequal nested photo areas            |
| Quote          | Compile services, prices, discounts/tax and terms           | Item rows, sum bracket, total line          |
| Scope          | Confirm included/excluded work and delivery                 | Four boundary corners and confirmation tick |
| Payment        | Prepare payment request information and documents           | Request document rows and outbound arrow    |
| Travel Expense | Organize expense entries and print receipt backing/crops    | Notched receipt over a backing sheet        |
| THSR Upload    | Estimate upload duration against train journey risk windows | Time ring opened by an upload arrow         |
| Fill           | Overlay entered text/signature on received PDF              | Open page and diagonal writing nib          |

THSR Upload is an estimator; the mark does not imply real uploads, live speed tests, or a security service. Payment is a document request tool, not a payment processor or invoice issuer. The seven tools are owned tools; the photography homepage, works and booking remain external links. “還有空位” remains a non-link placeholder and has no tool logo.

## Asset system

64 × 64 SVG viewBox, 6-unit round strokes, common optical margins. Each tool has its own geometry; color is supplementary. `public/identity/<id>/` includes color/mono/white SVG and transparent 512px PNG, 16/32/48/180/192/512px PNG icons, favicon ICO (16/32/48), and 640 × 400 thumbnail PNG/HTML. `manifest.json` records the geometry, palette, purpose and concept. `scripts/generate-identity.mjs` regenerates SVG and HTML source previews.

Homepage uses the same 16:10 artwork frame and live DOM typography, rather than baking text into an inaccessible image. English names and short Chinese purposes are visible; full descriptions and new-tab hints remain accessible. Every tool appears once, all existing URLs and outside links remain, keyboard focus and reduced-motion handling remain. Hub branding is a Dong Tools wordmark with a separate hub favicon, not the photography logo.

## Validation

- `npm run lint`: passed.
- `npm run build`: passed.
- `npm run format`: only pre-existing `tsconfig.app.json` formatting fails; file matches main and was left unchanged to preserve scope. New/changed source files pass Prettier.
- Installed Chrome desktop 1440px, tablet 768px, mobile 390px: all seven logos loaded, no page/card overflow, card ratio approximately 1.6, Chinese purpose text 14px, no runtime errors, visible keyboard focus.
- Transparent color PNGs: all corners alpha 0; all visible bounds inside the 512px canvas, minimum margin 43px. Black-and-white/32px/white-on-dark checked visually in overview.
- Preview rendering blocked remote network requests, so it did not exercise counters or increase live usage.
- No tool functionality was modified or regression-tested. Browser engine coverage is Chrome only. No production replacement has been verified; no identity-recognition user study or trademark search was performed.
- Existing dependency audit reports 7 findings (2 moderate, 5 high); dependency versions were not changed by this visual work.

## Subsequent tool-site adoption (after design review)

| Repository                                    | Adoption scope                                                                                         |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `dong-sc/layout-tool`                         | `index` and `m/index` navigation inline logo, icon-192/512 and manifest assets                         |
| `dong-sc/simple-quote-generator`              | DongToolsBar tool mark and document/browser icon assets                                                |
| `dong-sc/simple-scope-confirmation-generator` | DongToolsBar tool mark and document/browser icon assets                                                |
| `dong-sc/simple-payment-request-generator`    | DongToolsBar tool mark and document/browser icon assets                                                |
| `dong-sc/dong-tools-suite`                    | Hub assets/cards now previewed; `/travel-expense/` and `/thsr-upload/` identity/favicon still to apply |
| `dong-sc/pdf-form-filler`                     | `index`, `m/index`, single-file PDF tool inline branding and browser icons                             |

Do not change calculations, PDF editing/export, local storage, data access, account settings, credentials, or introduce a service as part of identity adoption. Rollback this preview by discarding the isolated checkout or reverting its local preview commit; production has not changed.
