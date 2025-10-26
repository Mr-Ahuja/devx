DevX — Developer Tools Hub (SPA)

Overview
- DevX is a lightweight, single‑page app hosting everyday developer tools.
- Tools include JSON/XML format/validate and a Diff Checker (MVP), with room to grow.
- Shareable deep links: the app loads a tool based on URL query params.

Design Language
- Styled to match the "the-choosen-one" theme used elsewhere in this workspace.
- Uses glass panels, gradient buttons, and a constellation background respecting reduced motion.

URL Contract
- `?tool=` selects the tool: `json`, `xml`, `diff`.
- `?mode=` optional mode (e.g., `format`, `validate`).
- `?a=` and `?b=` Base64 text inputs (Diff).

Examples
- Home: `https://<org>.github.io/devx/`
- JSON Validator: `https://<org>.github.io/devx/?tool=json&mode=validate`
- Diff Checker: `https://<org>.github.io/devx/?tool=diff&a=<b64>&b=<b64>`

Local Development
- Prereqs: Node 18+; recommended pnpm 9+.
- Install: `pnpm i` (or `npm i`)
- Dev: `pnpm dev` (or `npm run dev`)
- Build: `pnpm build` (or `npm run build`)
- Preview: `pnpm preview` (or `npm run preview`)

Deploy (GitHub Pages)
- Includes `.github/workflows/pages.yml` (Node 20, uploads `dist/`).
- The Vite `base` is set to `./` for subpath-safe relative assets.
- After pushing to `main`, Pages will build and deploy automatically.

Structure
- `src/App.jsx` — AppShell and ToolRouter integration.
- `src/components/IconGrid.jsx` — home icon grid; redirects by `?tool=`.
- `src/components/ToolRouter.jsx` — parses URL and renders the correct tool.
- `src/components/tools/*` — JSON, XML, Diff tool components.
- `src/styles/theme.css` — the-choosen-one design tokens and surfaces.
- `src/lib/constellation.js` — background canvas animation.

Security/Privacy
- All tools run fully client-side; no data leaves the browser.

Privacy Policy
- A store-ready privacy policy is available at `public/privacy.html` and will be deployed to your Pages site.
- After deployment, use this URL in the Web Store privacy section: `https://mr-ahuja.github.io/devx/privacy.html` (update the domain if you host elsewhere).
