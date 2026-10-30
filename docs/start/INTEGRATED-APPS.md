# Integrated application mode

30 October 2026. Engineering and demonstration mode; it does not change the website delivery boundary.

## Why

Pricing, Lifecycle and Pre-contract form one data flow: Pricing issues a versioned baseline that both recipients select. Run as standalone applications, each has its own origin and browser storage, so issued pricing can only move between them by downloading and importing a file. Integrated mode composes the applications into the portal on one origin, so an issue created in Pricing is offered immediately in Lifecycle and Pre-contract.

## Two builds from one source

| Command | Mode | Result |
| --- | --- | --- |
| `pnpm dev` / `pnpm build` | website (default) | Unchanged website: applications show "Coming soon"; the bundle contains no application code (WEB-SCOPE-01). |
| `pnpm dev:integrated` / `pnpm build:integrated` | `integrated` | Portal plus the four applications under the **FERN Apps** menu; output in `dist-integrated/`. |

`vite.config.ts` defines `import.meta.env.VITE_FERN_APPS` as `on` only in `integrated` mode. `apps/portal/src/app/integratedApps.tsx` lazily imports each application's public `src/index.ts` behind that flag, so the website build removes the branch and every application chunk. Standalone commands (`pnpm dev:pricing` and others) remain for focused development.

## Behaviour

- Routes: `?page=pricing`, `?page=lifecycle`, `?page=pre-contract`, `?page=mobilisation`. They resolve only in integrated mode; the website falls back to Home.
- The portal supplies the demonstration site context (BHX4) and an on-page notice; the standalone facility picker is not used.
- Leaving an application with unsaved changes asks for confirmation through the existing portal guard.
- FM Contract & Service Model has no application and remains "Coming soon".
- Shared storage is this browser's local storage at one address. It is not Amazon shared storage, identity or approval.

## Verification

- `pnpm test` includes route and composition checks (`tests/portal-routes.test.mjs`, `tests/integrated-apps.test.mjs`).
- `pnpm check:bundles` builds both modes and fails if the website contains application code or the integrated build lacks any application. `pnpm verify` runs it after `build:all`.
- `pnpm test:browser:integrated` starts both modes and checks that the website hides applications, a Pricing issue is offered in Pre-contract without file transfer, and application routes support back navigation. Requires Playwright Chromium.
