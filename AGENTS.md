# Dong Tools development notes

- Keep the product quiet, practical, and typography-led. Avoid startup, AI-platform, glassmorphism, glow, and promotional visual language.
- Treat `src/data/tools.ts` as the source of truth for hub content. Do not hard-code individual tools into layout components.
- Preserve keyboard access, visible focus states, reduced-motion behavior, semantic landmarks, and descriptive external-link hints.
- Keep the site statically deployable with Vite and GitHub Pages. Do not add a server runtime unless the product genuinely requires one.
- Run `npm run lint`, `npm run build`, and `npm run format` before opening a pull request.
- Do not rewrite published history, force push, or rebase shared branches.
