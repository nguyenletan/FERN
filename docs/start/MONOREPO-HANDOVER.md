# FERN monorepo engineering handover

7 September 2026. This is a source organisation and independent-build increment, not production or domain approval.

## Application ownership

| Application | Implementation | Run from repository root | Local address |
| --- | --- | --- | --- |
| Integrated portal | `apps/portal/src` | `pnpm dev:portal` | http://127.0.0.1:4173/ |
| Pricing Template Generator | `apps/pricing/src` | `pnpm dev:pricing` | http://127.0.0.1:4174/ |
| Lifecycle & Asset Analysis | `apps/lifecycle/src` | `pnpm dev:lifecycle` | http://127.0.0.1:4175/ |
| FM Pre-Contract / Tender Assessment | `apps/pre-contract/src` | `pnpm dev:pre-contract` | http://127.0.0.1:4176/ |
| FM Mobilisation & Transition Tracker | `apps/launch-tracker/src` | `pnpm dev:launch-tracker` | http://127.0.0.1:4177/ |

An address works only while its server is running. Run each desired command in its own terminal. `pnpm dev` also runs the integrated portal; use `--port 4173 --strictPort` to retain the existing address. Do not run both portal commands on the same port.

Each application has its own HTML/React entry, package manifest and independent build command: for example `pnpm --filter @fern/pricing build`. `pnpm build:all` builds the original root portal plus all five application distributions into `dist/<application>`. `pnpm --filter @fern/pricing preview` serves the pricing build on port 4274 (preview ports are 4273–4277). Open HTTP pages, not HTML files directly.

The four application `src/index.ts` files expose their page component to the portal. The portal composes those public entries. No other application imports another application's implementation. Independent apps do not include the portal navigation or other application screens in their JavaScript dependency graph. They retain prototype demo sign-in and a clearly labelled BHX4 development context. Cross-application navigation in standalone views explains that the user must return to the portal; it does not silently switch origins or discard work.

## Shared code ownership

| Package | Responsibility |
| --- | --- |
| `packages/core` | Currency choices and workbook reader |
| `packages/pricing-core` | Staff, additional and maintenance costs, comparison eligibility, issued pricing records and recipient selection |
| `packages/lifecycle-core` | Asset calculations, classification/import, economics, sensitivity, combined lifecycle pricing and review persistence |
| `packages/pre-contract-core` | Tender cost comparison and ranking from eligible issued pricing |
| `packages/pricing-ui` | Common issued-pricing selection panel |
| `packages/platform` | Common UI, status definitions, stylesheet, assets and demo sign-in |

These are private source packages, compiled by each application's Vite build; they are not independently published libraries. Dependencies and compiler settings are managed at the repository root. Cross-package imports currently use explicit relative source paths. Engineers should keep changes in one monorepo so shared calculation changes can be tested across recipients atomically. Package publication, separate release versioning and remote microfrontends are not implemented or necessary for this handover.

The former dual-purpose `DownstreamPricingPanel` was split into `apps/lifecycle/src/LifecyclePricingPanel.tsx` and `apps/pre-contract/src/TenderPricingPanel.tsx`. Their calculation functions now reside in their respective core packages. Pricing is calculated in one authoritative shared implementation, not copied into recipients. The shared sign-in component receives its host application and no longer imports the portal.

## Save behaviour and data exchange

Existing storage keys and record formats are preserved. Existing data at **http://127.0.0.1:4173/** remains accessible in the same browser at that exact address. Use the existing save/restore buttons and download backups before switching browser or address. This source ZIP does not contain the user's browser-saved projects or pricing records.

Separate ports, `localhost` versus `127.0.0.1`, browsers and preview addresses have separate local storage. Use the integrated portal to issue pricing and select it in Lifecycle or Pre-contract on the same origin. Standalone applications support their existing file import/export controls; they do not synchronise storage across origins. Shared packages mean shared calculation code, not shared runtime data or an Amazon database.

## Installation and validation

Use Node.js 24 and pnpm 11.19.0, then `pnpm install --frozen-lockfile`. The workspace lockfile covers all application/package manifests.

- `pnpm typecheck`: all source, applications and packages.
- `pnpm test`: calculation, import, persistence, SSR rendering and architecture tests.
- `pnpm build:all`: root portal and all five independent application builds.
- `pnpm test:browser`: existing integrated user journey, downloads and handover.
- `pnpm verify`: orchestrates the checks above and records actual outcomes.

Architecture tests reject package-to-application imports and imports between applications except portal imports through public entries. They also verify independent entry points and run/build commands. Existing domain tests follow the relocated implementations.

## Outstanding Amazon decisions and release gates

See `AMAZON-PRICING-DECISIONS.md` for the detailed issue register. Preserve that register in any team handover. Amazon must confirm hosting and shared-storage specifications, identity/roles, formal approval workflow, APM/API schema and access, data governance, pricing/workbook interpretation and independent engineering/domain acceptance. None is inferred or approved by separating the source code.

The application remains provisional. Full workbook mapping/formula reconciliation and domain validation remain open. Pre-contract currently provides the implemented pricing comparison plus explicitly unavailable assessment sections; Launch Tracker retains its prototype workflow and unavailable production integrations. Separation does not make these unfinished capabilities functional.

## GitHub handover

Unzip the delivered archive. Give the extracted folder to the engineering team as one repository. Retain `apps`, `packages`, `tests`, `docs`, `scripts`, the workspace/lock files and root configuration together. Do not upload just one application folder: it depends on shared packages. Repository visibility and access should follow Amazon's decision; do not assume this material is approved for public release.

The archive contains source, assets, tests and documentation. It excludes dependencies, build/test output, Git history, environment files, browser storage, operational workbooks and the separate detailed internal workbook inventory. It does not create or upload a GitHub repository.


## Staffing reference update — 7 September 2026

See [Staffing model requirements](../amazon/STAFFING-MODEL-REQUIREMENTS.md) for the two user-supplied staffing/resource documents, proposed use in FM Contract & Service Model and FM Pre-Contract / Pre-Tender Assessment, and open Amazon decisions STF-01–08. These are documented requirements, not implemented staffing rules or formal policy approval.


## Launch Tracker update — 7 September 2026

The new manual launch-plan register supersedes the earlier prototype-only description for task entry and browser-local persistence. See [Launch Tracker guide](../apps/mobilisation/LAUNCH-TRACKER-QUICK-START.md). Planned governance, dependencies, readiness and approvals are still unimplemented.


## Mobilisation purpose review and revised guides

See FM-MOBILISATION-PURPOSE-AND-BENEFITS.md for reviewed use cases, expected benefits, proposed measures and a suggested development order. FM-MOBILISATION-USER-GUIDE.md and FM-MOBILISATION-START-UP-GUIDE.md are the current user instructions; previous IFM-named guide paths remain compatible copies. This increment changes documentation only. Proposed capabilities are not implemented or approved requirements.


## Guided mobilisation setup and workspace — 7 September 2026

The tracker now opens with Start / Continue, four setup steps, a focused task workspace, search/status filters, inline completion validation, prominent Save draft and local save timestamps. Removal requires confirmation and supports undo of the latest removal. Import and draft replacement require confirmation. Existing v1 site records remain compatible; no timestamp is invented for old records. Portal navigation and standalone sign-out include unsaved-draft guards.

Read FM-MOBILISATION-USER-GUIDE.md and FM-MOBILISATION-START-UP-GUIDE.md for the current flow. TECHNICAL-VERIFICATION.json records 97 passing tests, typecheck and all builds, the bounded manual browser checks, and automated browser-launch limitations. Re-run the complete browser suite in the engineering environment, including download/import, native navigation confirmation and concurrent-tab checks, before acceptance.

Amazon must still confirm shared storage, identity, permissions, formal approval workflow and authoritative mobilisation requirements. Records remain provisional; task completion is not readiness or approval. The source ZIP contains code and documentation, not browser-saved operational plans.
