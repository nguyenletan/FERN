# FERN portal architecture

30 October 2026 · Website-only repository

## Scope

This repository delivers the FERN website: demo sign-in, Home, the seven Workspace guidance sections, Learn, Reference Library, Help, guided keyword search and the proposed content-administration walkthrough. FERN applications are built in a separate repository and are not part of this source. The portal describes them as "Coming soon" and does not launch any workflow (WEB-SCOPE-01).

## Structure

| Path | Responsibility |
| --- | --- |
| `index.html`, `src/main.tsx`, `src/App.tsx` | Entry point: demo sign-in, then the portal; separate button for the administration walkthrough |
| `apps/portal/src/app` | `FernWorkspace` shell (header, sidebars, page switching, unsaved-change guard), `portalRoutes` (URL ↔ page), `navigation` |
| `apps/portal/src/features/dashboard` | Home, Get Started, Learn, Reference Library panel, Help, updates, footer and the application descriptions (`homeApplications.ts`) |
| `apps/portal/src/features/{overview,leadership,planning,performance,risk,audit,improvement,framework}` | Workspace guidance pages and Mission & Pillars |
| `apps/portal/src/features/reference` | BBM standards and compliance library, task reader, search; `generated/` holds data built by `scripts/bbm` |
| `apps/portal/src/features/search`, `ask-fern` | Keyword guidance search; scripted assistant responses (not an AI service) |
| `apps/portal/src/features/admin-demo` | Proposed CMS walkthrough with local drafts and simulated roles |
| `packages/platform/src` | Shared stylesheet, images, demo sign-in, status vocabulary and small UI components |
| `tests/` | `node --test` unit and source-data checks; Playwright browser suites (`browser.mjs`, `homepage-browser.mjs`, `portal-handover-browser.mjs`) |
| `scripts/` | Build, verification, single-file export and BBM reader generation |

`apps/portal` also has its own Vite entry (`pnpm dev:portal`, port 4173) that renders the same application as the root entry.

## Routing and state

Navigation state is held in `FernWorkspace` and mirrored in the URL query (`?page=risk`, `?page=learn&lesson=...`, `?bbm=...`) with browser back/forward support. Unknown pages fall back to Home. All persistence (admin drafts, preferences) is browser-local and demonstrative.

## Integration boundary

Identity, CMS, LMS, Quick Suite and application launch are not connected. See [Amazon website integration](AMAZON-WEBSITE-INTEGRATION-HANDOVER.md), [non-technical content administration](NON-TECHNICAL-CONTENT-ADMINISTRATION.md) and [website and applications boundary](WEBSITE-APPLICATION-BOUNDARY.md).

## Conventions

- Shared packages must not import the portal (`tests/module-boundaries.test.mjs`); this repository holds only `apps/portal` and `packages/platform`.
- React state hooks are never created inside JSX callbacks (`tests/architecture.test.mjs`).
- Keep unavailable and unconnected states explicit; never imply live data, AI answers or approval.
