# FERN portal architecture

31 October 2026 · Website-only repository

## Scope

This repository delivers the FERN website: demo sign-in, Home, the seven Workspace guidance sections, Learn, Standards & Reference Library, Help, guided keyword search, a Users & roles demonstration and the proposed content-administration walkthrough. The portal UI is built with Cloudscape (see [Cloudscape portal](../website/CLOUDSCAPE-PORTAL-2026-10-31.md)). FERN applications are built in a separate repository and are not part of this source. The portal describes them as "Coming soon" and does not launch any workflow (WEB-SCOPE-01).

## Structure

| Path | Responsibility |
| --- | --- |
| `index.html`, `src/main.tsx`, `src/App.tsx` | Entry point: demo sign-in, then the portal; the content-administration walkthrough opens from the user menu |
| `src/app` | `FernWorkspace` shell (Cloudscape top navigation, side navigation, breadcrumbs, page switching), `portalRoutes` (URL ↔ page, `routeFor`), `ui.tsx` (shared Cloudscape blocks and theme), `preferences.ts` (header country) |
| `src/features/dashboard` | Home, Applications, Get Started, Learn, Standards & Reference Library page, Help, About, updates and the application descriptions (`homeApplications.ts`) |
| `src/features/admin` | Users & roles demonstration (sample data, browser-tab only) |
| `src/features/{overview,leadership,planning,performance,risk,audit,improvement,framework}` | Workspace guidance pages and Mission & Pillars |
| `src/features/reference` | BBM standards and compliance library, task reader, search; `generated/` holds data built by `scripts/bbm`. The reader is lazy-loaded when the Reference Library opens |
| `public/bbm` | 198 verified BBM PDFs served as static files (`dist/bbm/`); embedded only in the single-file export. Internal Amazon documents: serve behind authentication |
| `src/features/search` | Header keyword search (Cloudscape Autosuggest; not an AI service) |
| `src/features/admin-demo` | Proposed CMS walkthrough with local drafts and simulated roles |
| `src/auth` | Demo sign-in (Cloudscape form); to be replaced by Midway |
| `src/styles/index.css`, `src/assets` | Global stylesheet (Cloudscape global styles: normalize.css and Open Sans; portal base rules; pointer cursor) and shared images |
| `tests/` | `node --test` unit and source-data checks; Playwright browser suites (`browser.mjs`, `homepage-browser.mjs`, `portal-handover-browser.mjs`, `pdf-delivery-browser.mjs`) |
| `scripts/` | Development tooling only: verification, single-file export and BBM reader generation. **Removed when the portal is deployed to Amazon's environment** (see below) |

This is a single Vite application (no pnpm workspace): all source is under `src/`. `pnpm dev` serves it at http://127.0.0.1:4173 and `pnpm build` writes `dist/`. The CMS and the FERN applications are separate services and repositories; if code ever needs sharing with them, publish it as a package rather than adding workspace folders here.

## Deployment note: `scripts/` is not deployed

The `scripts/` folder is development tooling and **will be deleted when FERN is deployed to Amazon's environment**. The deployed website does not need it: `pnpm build` produces `dist/` (`index.html`, `assets/`, `bbm/`) without any of these files.

| Script | Purpose | After deletion |
| --- | --- | --- |
| `scripts/verify.mjs` (`pnpm verify`) | Runs typecheck, tests, build and the browser suite | Replace with Amazon's CI/CD pipeline running `pnpm typecheck`, `pnpm test` and `pnpm build` |
| `scripts/export-portal.mjs` (`pnpm export:portal`) | Builds the single-file HTML for offline review (BBM-HTML-07) | Not needed in production. `pnpm test:browser:pdf` also checks this file, so drop its single-file part with the script |
| `scripts/bbm/build_reader.py` and the two `*-TASK-INDEX.md` files | Regenerate the Standards & Reference Library data (`src/features/reference/generated/`, `public/bbm/`) from new BBM PDF editions | Keep a copy outside the deployed repository, with whoever maintains the BBM content, until the CMS handles BBM source intake (CMS requirements, section 11). The TASK-INDEX files are required inputs |

When the folder is removed, also remove the `verify`, `verify:core` and `export:portal` entries from `package.json` and the `scripts` path from the `format` commands.

## Routing and state

Navigation state is held in `FernWorkspace` and mirrored in the URL query (`?page=risk`, `?page=learn&lesson=...`, `?page=admin`, `?bbm=...`) with browser back/forward support. Unknown pages fall back to Home. Links inside the portal use `NavLink` / `NavButton` with a page label, so they keep real URLs. All persistence (demo sign-in, admin drafts, users and roles, header country) is browser-local and demonstrative.

## Integration boundary

Identity, CMS, LMS, Quick Suite and application launch are not connected. See [Amazon website integration](AMAZON-WEBSITE-INTEGRATION-HANDOVER.md), [non-technical content administration](NON-TECHNICAL-CONTENT-ADMINISTRATION.md) and [website and applications boundary](WEBSITE-APPLICATION-BOUNDARY.md).

## Conventions

- Relative imports stay inside `src/`, and the repository holds one application (`tests/module-boundaries.test.mjs`).
- React state hooks are never created inside JSX callbacks (`tests/architecture.test.mjs`).
- Keep unavailable and unconnected states explicit; never imply live data, AI answers or approval.
- Build pages from Cloudscape components and the shared blocks in `app/ui.tsx`; do not add page-specific CSS for layout.
