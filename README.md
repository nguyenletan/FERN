# FERN portal — website source

FERN (Facility Expert Reference Network) internal portal: Home, the seven Workspace guidance sections, Learn, Reference Library (BBM standards and compliance), Help and a proposed content-administration walkthrough.

This repository contains the website only. The FERN applications (Pricing Template Generator, Lifecycle & Asset Analysis, FM Pre-Contract / Pre-Tender Assessment, FM Mobilisation & Transition Tracker, FM Contract & Service Model and future applications) are developed in a separate repository. The portal lists them as "Coming soon" and is the intended single entry point for them once they are released.

## Quick start

Use Node.js 24 and pnpm 11.19.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the address Vite prints (http://127.0.0.1:5173 by default) and sign in with `demo` / `demo`. This is demonstration sign-in only, not production authentication.

## Commands

- `pnpm typecheck` — TypeScript check.
- `pnpm test` — unit and source-data checks.
- `pnpm build` — production build in `dist/`; `pnpm preview` serves it.
- `pnpm build:all` — root build plus the `apps/portal` distribution in `dist/portal`.
- `pnpm export:portal` — creates `dist-share/FERN-Internal-Portal.html`, a single self-contained file for offline demonstration.
- `pnpm test:browser` — browser suite against a running development server (`FERN_TEST_URL`, default http://127.0.0.1:4173).
- `pnpm test:portal-handover` — production build and offline smoke suite.
- `pnpm verify` — typecheck, tests, builds and browser suite; writes `test-results/verification.json`.

Browser suites need Playwright Chromium: `pnpm exec playwright install chromium`.

## Where things are

See [architecture](docs/start/ARCHITECTURE.md) and the [documentation index](docs/README.md).

## Proposed administration

`apps/portal/src/features/admin-demo` contains the sample catalogue, local editor and transition validation. Requirements CMS-01 through CMS-10 govern production implementation. The editor covers 66 sample sections, not the full production inventory. Roles, approvals and publishing are local simulations. Saved/imported drafts never update the current website.

`tests/admin-demo.test.mjs` checks content validation, import boundaries and allowed role/state transitions. The publication state is a demonstration and offers no security boundary. Do not deploy this demo sign-in or browser storage as an internal production service.

Content migration must cover all page/section rows in the package inventory and all approved shared components. Reference documents remain controlled source files; catalogue editing and source replacement are distinct operations.

Amazon-approved identity, CMS/content storage, hosting, Learning Portal and application integration choices remain open.
