# FERN homepage integration — 7 September 2026

The approved corporate homepage is integrated into the existing portal after prototype sign-in. Open http://127.0.0.1:4173/ (demo / demo if sign-in is shown).

- Blue fern branding, photographic hero, simple Phosphor tool icons, one helper character.
- Sidebar open on desktop, collapsible, mobile drawer with Escape and focus containment.
- Five Open tool links retain existing application behavior and facility context.
- Choose your facility opens the shared picker/history; it does not replace or clear existing records.
- Get started, What is FERN, learning, reference and help controls open useful introductory content in the page. Reference library and live AI availability are explicit.
- Need a hand is the final section; there is no sitemap footer.

Source boundaries: apps/portal/src/features/dashboard/{DashboardPage.tsx,HomeNavigation.tsx,home.css}; portal shell wiring in app/FernWorkspace.tsx; raster assets in packages/platform/src/assets/home-*.png. Standard icons use @phosphor-icons/react. Generated photograph is illustrative, not a photograph of identified Amazon employees.

Validation: typecheck, 124 unit tests and all six builds pass. In-app browser verified desktop/mobile layout, search, navigation, guidance, facility history and all five tool links, with no error logs. Full automated browser suite remains blocked by missing bundled Chromium; system Chrome launch also fails under current execution restrictions. tests/homepage-browser.mjs is provided for engineering reruns, not reported as passing.

Amazon confirmation remains needed for production accounts, storage, approval workflows, AI, training catalog, reference content and support. This change does not complete the underlying applications' outstanding domain work.

Login branding update: shared DemoSignIn now uses login-blue-fern.png, matching the homepage blue fern and goggle-wearing guide. All app builds and the standalone HTML were refreshed. Typecheck/build checks pass; login image inspected in the in-app browser.
