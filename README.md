# FERN PRD demonstration source — 17 September 2026

Start with [the package guide](../START-HERE.md), [the illustrated PRD](../FERN-Illustrated-PRD.html) and [verification](../verification/VERIFICATION.md).

This copy preserves the engineering baseline and adds a separate proposed content-administration demonstration. Future application discovery is omitted from the website. Existing application source is retained for engineering context and is outside this website delivery scope. Older documents describe earlier increments; the new PRD takes precedence for this handover.

## Run and build

Use Node.js 24 and pnpm 11.19.0. Install with `pnpm install --frozen-lockfile`, then run `pnpm dev`. Sign in with `demo` / `demo`.

- `pnpm typecheck` — TypeScript check.
- `pnpm test` — unit and source-data checks.
- `pnpm build:all` — all inherited application distributions.
- `pnpm export:portal` — creates `dist-share/FERN-Internal-Portal.html`, the single-file website demonstration.
- `pnpm test:browser` — browser suite against a running development server (defaults to port 4173).
- `pnpm test:portal-handover` — production build/offline smoke suite. Install Playwright Chromium before running browser suites.
- `pnpm dev:integrated` / `pnpm build:integrated` — portal with Pricing, Lifecycle, Pre-contract and Mobilisation composed on one origin, sharing issued pricing without file transfer. The default website build still excludes them. See [integrated application mode](docs/start/INTEGRATED-APPS.md).
- `pnpm check:bundles` — confirms the website build has no application code and the integrated build has all four; `pnpm test:browser:integrated` runs the integrated browser acceptance.

The current handover verification records what was actually run. Retained automated browser scripts were updated for this demo scope but were not executed in this session; browser checks used the desktop browser tool.

## Proposed administration

`apps/portal/src/features/admin-demo` contains the sample catalogue, local editor and transition validation. Requirements CMS-01 through CMS-10 govern production implementation. The editor covers 66 sample sections, not the full production inventory. Roles, approvals and publishing are local simulations. Saved/imported drafts never update the current website.

`tests/admin-demo.test.mjs` checks content validation, import boundaries and allowed role/state transitions. The publication state is a demonstration and offers no security boundary. Do not deploy this demo sign-in or browser storage as an internal production service.

Content migration must cover all page/section rows in the package inventory and all approved shared components. Reference documents remain controlled source files; catalogue editing and source replacement are distinct operations.

Amazon-approved identity, CMS/content storage, hosting, Learning Portal and application integration choices remain open. Historical engineering documentation is retained under `docs` and in `BASELINE-README-HISTORY.md`; it is not evidence of production approval.
