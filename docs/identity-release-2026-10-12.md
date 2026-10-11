# Dong Tools identity release — 2026-10-12

User approval: “總站首頁＋七個工具頁面一起上線”.

Scope: the accepted seven geometric marks, shared homepage cards, individual tool navigation, browser/app icons, Layout mobile variant, Fill mobile variant and downloadable standalone HTML. Preserve all tool functions, data handling, account settings and existing links.

Validation before publication:

- Hub, Quote, Scope and Payment: lint and production build passed.
- Hub format check passed; the baseline TypeScript configuration received formatting only.
- Existing Layout IG/editor regression suites, Quote discount/export/storage suite and hub travel-expense regression tests passed.
- Fresh Chrome contexts, desktop 1440px and mobile 390px: all seven correct SVG geometries loaded, favicon/apple-touch-icon requests passed, navigation fits, no runtime errors, no horizontal overflow. Fill standalone HTML also passed both sizes.
- Quote/Scope/Payment branding stays hidden in print output; THSR estimation input remains functional.
- Layout, Fill and hosted standalone tools retain identical inline JavaScript hashes. Layout shared editor assets and Fill app.js are unchanged.
- Existing analytics/counters were blocked during local checks. No private data or existing user storage was accessed.

Publication will use existing GitHub Pages configuration. Recheck each current main before merging; keep Layout's simultaneous UI/UX work intact. No new hosting, backend or paid services.
