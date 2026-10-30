# Visual refresh — 16 September 2026

This source continues the 15 September portal. Read [the current visual-refresh context](../context/02-VISUAL-REFRESH-2026-09-16.md) and [visual QA](design-qa.md). Source assets, styles, header/footer and offline HTML export are updated. The following notes remain historical context.

---

# Current package entry point - 15 September 2026

Start with [the package guide](../START-HERE.md) and [current context](../context/01-CURRENT-CONTEXT.md). This copy includes the current portal and preserved standalone source. The dated notes below describe earlier increments; claims about active portal applications, required BHX4 context or a universal browser launch blocker are superseded by the package verification and current scope.

---

# FERN application monorepo — engineering baseline

7 September 2026 · Local provisional application · Not production approved

FERN now has working pricing, asset lifecycle, multi-currency cost calculations, economic analysis and sensitivity workflows. It supports local saves, versioned pricing handover, cost comparisons and calculation exports. Amazon shared storage, production identity, formal approvals, complete workbook parity and independent domain acceptance remain outstanding.

Start with [the package guide](../START-HERE.md) and [current context](../context/01-CURRENT-CONTEXT.md) for implemented capabilities, limits and release gates. Earlier increment notes in other documents are development history.

## Run locally

Use Node.js 24 and pnpm 11.19.0:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the HTTP address printed by Vite, not index.html as a file. Prototype sign-in is `demo` / `demo`; it is not production authentication. BHX4 is demonstration context. Save projects and pricing explicitly and download backups. Local storage is specific to the browser and origin; it is not Amazon shared storage.

## Verify

```sh
pnpm exec playwright install chromium
pnpm verify
```

The verification command runs core checks and a browser suite using its own temporary local server, then writes `test-results/verification.json`. A failure returns a nonzero exit. `pnpm verify:core` intentionally skips browser checks and must not be described as complete acceptance. See [verification evidence](docs/verification/TECHNICAL-VERIFICATION.json) and [acceptance cases](docs/verification/PRICING-ACCEPTANCE-EVIDENCE.md) for the actual current result.

## Guides and specifications

Documentation index: [docs/README.md](docs/README.md).

- [FM Mobilisation full user guide](docs/apps/mobilisation/FM-MOBILISATION-USER-GUIDE.md)
- [FM Mobilisation start-up guide](docs/apps/mobilisation/FM-MOBILISATION-START-UP-GUIDE.md)

- [Lifecycle user guide](docs/apps/lifecycle/LIFECYCLE-QUICK-START.md)
- [Pricing user guide](docs/apps/pricing/BB-PRICING-QUICK-START.md)
- [Platform PRD](docs/start/FERN-SOFTWARE-PRD.md)
- [Pricing PRD](docs/apps/pricing/PRICING-TEMPLATE-GENERATOR-PRD.md)
- [Architecture](docs/start/ARCHITECTURE.md) and [P5 integration specification](docs/amazon/P5-INTEGRATION-SPEC.md)
- [Workbook mapping/reconciliation](docs/apps/pricing/PRICING-WORKBOOK-RECONCILIATION.md)
- [Amazon specification and approval register](docs/amazon/AMAZON-PRICING-DECISIONS.md)

## Source structure

Applications now live in `apps/portal`, `apps/pricing`, `apps/lifecycle`, `apps/pre-contract` and `apps/launch-tracker`. Shared calculations and UI live in `packages`. Each application has independent development and build entries; the portal composes their public page entries.

Start with [the monorepo handover](docs/start/MONOREPO-HANDOVER.md) for application commands, folder ownership, storage limits and the current Amazon release gates. Run `pnpm build:all` to verify every distribution. Run `pnpm dev:pricing`, `pnpm dev:lifecycle`, `pnpm dev:pre-contract` or `pnpm dev:launch-tracker` to work on one application. The integrated portal remains the place for same-origin pricing handover.

## GitHub handover

No repository has been created or uploaded. The engineering archive excludes dependencies, generated build/test output and operational source workbooks. The detailed internal workbook inventory is delivered in the separate Amazon review archive. Repository ownership, visibility, contribution rights and production hosting must be supplied by the team. No software licence or rights to Amazon/Figma-derived assets are asserted by this baseline.

Install Playwright Chromium in the receiving environment before running browser checks. See [package verification](../verification/HANDOVER-VERIFICATION.json) for the checks recorded with this handover.

## Welcome homepage — 7 September 2026

The corporate welcome homepage is integrated with sidebar navigation, tool cards, guided search and facility history. See [homepage integration](docs/website/HOMEPAGE-INTEGRATION.md) for behavior and verification limits.

## Website delivery boundary — 8 September 2026

The default portal now provides the main website with application previews only. It does not launch individual applications or expose demonstration facility selection. Run the standalone application commands above for engineering work. See [website scope and acceptance](docs/start/WEBSITE-APPLICATION-BOUNDARY.md). This supersedes earlier descriptions of integrated portal access.

For required Quick Suite, CMS and LMS connections, see [Amazon website integration handover](docs/start/AMAZON-WEBSITE-INTEGRATION-HANDOVER.md).
