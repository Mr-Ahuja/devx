DevX Chrome Extension (Plugin)

Overview
- Minimal MV3 extension providing quick access to DevX SPA tools from the browser toolbar.
- Popup includes shortcuts to JSON, XML, Diff, and an Open DevX button.

Structure
- plugins/chrome/manifest.json — MV3 manifest (uses PNG icons).
- plugins/chrome/popup.* — Popup UI linking to the live DevX site.
- plugins/chrome/assets/logo.svg — Master SVG icon (X in a circle).
- plugins/chrome/icons/ — Generated PNG icons (16/32/48/128/256).

Build Icons
- Requires Node 18+ and pnpm (or npm) with devDependency `sharp` installed.
- Generate PNGs from SVG:
  - pnpm i
  - pnpm gen:icons

Package for Web Store
- Creates `dist-extension/devx-chrome.zip` suitable for Chrome Web Store.
- Cross-platform packaging (Windows uses PowerShell Compress-Archive; Linux/Mac uses `zip`):
  - pnpm package:ext

Privacy Policy (for Store listing)
- Use the deployed policy URL in the Web Store privacy section:
  - `https://mr-ahuja.github.io/devx/privacy.html`
  - If you host DevX elsewhere, replace the domain accordingly.

Load Unpacked (for local testing)
1) Run `pnpm gen:icons` to ensure `plugins/chrome/icons/` exists.
2) Visit `chrome://extensions` and enable Developer mode.
3) Click “Load unpacked” and select the folder `plugins/chrome/`.

Default Links
- Popup opens the live site at `https://mr-ahuja.github.io/devx/` and tool deep links like `?tool=json`.
- Update `plugins/chrome/popup.js` DEFAULT_BASE if you host DevX elsewhere.
