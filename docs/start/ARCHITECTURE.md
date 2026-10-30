# FERN architecture

## Current source structure — 7 September 2026

The monorepo separation supersedes the older `src/features` and `src/shared` paths below. See [MONOREPO-HANDOVER.md](MONOREPO-HANDOVER.md) for the authoritative current structure, independent application commands and unchanged production release gates. Later sections preserve earlier implementation history and historical verification counts; use [TECHNICAL-VERIFICATION.json](../verification/TECHNICAL-VERIFICATION.json) for current verification.


## Economic sensitivity — 6 September 2026

Users can add up to 30 named economic sensitivity cases, each with explicit inflation, nominal discount rate and rationale/source. Cases retain baseline currency, location, timing and cost scope. They do not modify baseline economic inputs. The asset view permits editing; the combined view evaluates the same cases against the reviewed combined schedule.

Each valid case shows undiscounted cost, net present cost, absolute and percentage difference from baseline NPC, and five horizon results where covered. Zero baseline NPC has no percentage. Missing baseline or case inputs withhold that comparison without blocking valid base calculations. Cases are scenarios, not forecasts, probabilities, recommendations or approved country rates.

Project save/restore and JSON calculation records preserve cases. Each case can export a CSV with its assumptions, baseline rates/evidence, case identity and (for combined scope) pricing reference and overlap evidence. Adding/changing cases changes the project snapshot and therefore requires fresh combined review under the existing binding rule. AMZ-PRC-16/18 remain open for domain and economic-method approval.

Verification: 87 automated tests, typecheck and build pass. Browser synthetic case: baseline NPC EUR 400; alternative 10% inflation / 0% discount yields NPC EUR 537.02, delta EUR 137.02 (34.26%). Tests cover no baseline mutation, invalid inputs, zero denominator, unavailable horizons, CSV provenance and backup validation. The standalone Playwright executable remains absent, so complete browser/download automation is not reported as passed.


## Economic cash-flow increment — 6 September 2026

Asset and combined Lifecycle views now calculate nominal annual cash flows and net present cost from user-entered location, inflation, nominal discount rate, timing and source evidence. No rates are prefilled. The implemented provisional convention uses a 1 January analysis base date, base prices in year 1, uniform annual inflation from year 2, and end-of-year discounting. Nominal year n = base cost × (1 + inflation)^(n−1); present cost = nominal ÷ (1 + nominal discount)^n. No intermediate rounding. All included cost categories use the same rates. Currency amounts are not converted.

Zero is valid when explicitly entered; negative rates must be greater than −100%. Missing/invalid economic inputs withhold economic results while leaving valid base-cost estimates available. The profile supports 1–25 consecutive annual periods. All five horizon rows are displayed; uncovered horizons remain unavailable rather than extrapolated. This increment does not include varying annual/category rates, residual values, mid-year payments or approved country-rate feeds.

Economic assumptions persist in project saves/backups. Asset and combined JSON calculation records include recalculated economic results and the assumptions in the project. Existing CSVs remain base-price profiles. Combined review bindings include economic inputs; changing them requires the combined review again. Formal source and method validation remain open under AMZ-PRC-18 and AMZ-PRC-16.

Verification: 78 automated tests, typecheck and build pass. In-app browser verified zero-rate EUR 400 cash flow/NPC and synthetic 10% inflation/10% nominal discount giving EUR 537.02 cash flow and EUR 363.64 NPC. The standalone browser suite still cannot launch because its executable is absent; no browser download-content assertion is claimed as passed.


## Combined assessment recovery — 6 September 2026

Lifecycle now provides Save combined assessment review and Restore combined assessment review. One record per site is stored in this browser, separately from the saved asset project. It includes overlap treatment, evidence, source issue identity/revision, timestamp and an exact binding to the reviewed project and pricing inputs. Restore recalculates totals; no saved numerical total is trusted. It restores review fields only and never replaces assets or switches pricing versions.

Matching, valid inputs can restore the prior provisional review. Changed inputs retain the evidence/treatment but require fresh confirmation; unconfirmed or invalid drafts cannot become reviewed through restoration. Object-key order alone is ignored; substantive values and array order remain material. Malformed storage, cross-site mismatches and storage failures report errors without replacing the current draft. Records are size-limited and remain browser-local; this is not Amazon identity, immutable audit or formal approval.

Verification: 73 automated tests, typecheck and build pass. In-app browser verified saving, restoration after reopening to EUR 4,800, and re-review requirement after changing the horizon. Standalone Playwright remains unable to launch due to its missing executable; its recovery regression steps are included but not reported as passed. AMZ-PRC-13–16/17 remain open for production persistence, identity, approvals and domain validation.


## Multi-currency correction — 6 September 2026

User-confirmed requirement: NRM3 is the calculation baseline and does not restrict FERN to GBP. Lifecycle now starts with a required currency dropdown using the same 22 choices as Pricing, including EUR, GBP, USD, AED and others. New assessments start without a currency selected. Pre-existing saved projects without a currency field retain GBP, their previous calculation basis. Saving/restoring retains the selected currency.

Calculations, annual and elemental CSV labels, JSON records and combined pricing/Lifecycle output use the selected currency. Pricing and Lifecycle must match; differing currencies block combination. Changing currency does not convert entered amounts, so users must review rates and evidence. The GBP-only limitation in earlier increment notes is superseded. Calendar alignment, scope/overlap gates and constant-price, undiscounted limitations are unchanged. FX conversion and Amazon economic/domain approval remain separate.

Verification: 68 automated tests, typecheck and build passed. Tests cover EUR/USD/GBP/AED/JPY combination without numerical conversion, blank-currency blocking, legacy GBP migration, invalid currencies, saved currency and export labels. Euro dropdown selection was verified in an isolated in-app browser. The standalone browser suite still cannot launch because its Playwright executable is absent.


## Downstream pricing calculation — implemented increment, 6 September 2026

Lifecycle now has an explicit combined calculation using the selected fixed pricing issue and current asset calculation. Choose additional pricing scope, or replacement of ALL asset-maintenance costs while retaining renewals. The combined table separately reports renewal, retained maintenance, excluded maintenance, pricing and total. Inputs are not deleted; the existing asset-only result and CSV remain separate. Download the combined JSON record to retain source snapshots, issue/version, overlap treatment, evidence and calculated annual totals. Overlap review is session-only and resets on input changes; it is not included in the existing project save/restore.

Compatibility gates: same site; GBP because the current asset engine is GBP-only; Pricing starts 01-01 of the Lifecycle start year; horizon at most 25 years; valid asset and pricing calculations; explicit evidence and review of matching price/tax basis and non-overlapping scope. No FX, period prorating, inflation or discounting. Partial overlap requires upstream scope reconciliation. Pricing must exclude renewal costs already in Lifecycle. AMZ-PRC-12/16 remain open: this provisional application logic is not approved domain mapping.

Pre-contract now automatically recalculates eligible comparisons from the selected issue, showing source type, amount, difference, percentage and cost-only rank. Equal amounts tie; pending sources are excluded and retain reasons. The rank includes eligible actual/tender/benchmark reference amounts, not service suitability. No Lifecycle costs are added to this comparison. Download the comparison record with issued inputs and version. Newer issues do not silently replace the selected version.

Verification: 65 automated tests, typecheck and build pass. Unit cases cover addition once, full maintenance replacement without asset mutation, mismatched sites/currencies/periods, invalid inputs, long horizons and tied ranks. Isolated in-app browser checks verified GBP 88 / 10% in Pre-contract and the incompatible September/calendar-year gate in Lifecycle. Positive combined Lifecycle UI/export end-to-end remains unverified; its arithmetic is unit-tested. The standalone Playwright suite cannot launch because its executable is absent and is not reported as passed. Domain acceptance remains open.


## Pricing comparisons — implemented increment, 6 September 2026

Manual comparisons now cover existing actual cost, original tender, incumbent renewal tender, new supplier tender and industry benchmark. Each compares a user-supplied cost against the baseline's first twelve months. Required checks: same currency, price date and 12-month period, source/adjustment evidence, defined baseline scope/service level/tax basis and explicit comparability review. Baseline input changes invalidate that review. An incomplete comparison retains its gaps without blocking an otherwise valid pricing calculation or provisional issue.

Difference = comparison amount − baseline year 1; percentage = difference ÷ baseline year 1 × 100. A zero baseline yields no percentage. No currency, inflation, period, scope or service-level normalisation is automated. Users must document original source values and any manual adjustment. The app does not rank recommendations or infer that a cheaper service is suitable. Risk, compliance, resilience and formal approval remain separate.

Comparisons persist with baseline inputs in save/restore, v3 downloads and fixed issues. Recipients can inspect provisional differences and source evidence; downstream financial aggregation remains outstanding. This increment implements the manual cost-comparison portion of Pricing PRD section 4 and section 8; it does not complete licensed benchmark integration or domain acceptance. AMZ-PRC-11/16 remain open and retained in the Amazon register.

Verification: 61 automated tests, typecheck and production build pass. Isolated in-app browser checks verified GBP 968 versus GBP 880 = GBP 88 / 10%, invalidation after quantity change, and restore of the saved comparison. The standalone browser suite remains unable to launch because the Playwright executable is absent; updated browser regression steps are included for the engineering environment. Source workbook unchanged.


## Maintenance and scheduled costs — implemented increment, 6 September 2026

Pricing now accepts explicit maintenance quantities, rate-unit divisors, event counts, first active year, repeat interval, labour minutes/rates, materials and source/scope evidence. Quantity is applied once. Labour marked included elsewhere contributes zero additional task labour. Maintenance-only or additional-cost-only baselines are supported; an entirely empty scope remains invalid.

Year 1 starts at the selected price date. Task events use whole years 1–25, intervals 1–25 and 1–366 events per active year. Fractional-year recurrence and irregular event dates are not yet supported. Staff and annual additional costs repeat each year. The 5/10/15/20/25-year totals are undiscounted at constant base-date prices, without inflation, tax adjustments or renewal assumptions. This implements provisional pricing schedules, not the full NRM3 economic lifecycle model or full workbook parity. Amazon AMZ-PRC-04/05/10 decisions remain open; this is an explicit method rather than a silent correction of the source workbook.

Saved records retain task inputs. New downloads use `FERN-pricing-scheduled-costs-v3`; v1/v2 records remain readable. Fixed provisional issues retain schedules, and both recipients can view their horizon totals and task evidence. Automatic downstream aggregation remains outstanding under AMZ-PRC-12.

Acceptance: 57 automated tests pass; typecheck and production build pass. Tests cover quantity once, materials, unit divisors, labour overlap, horizon boundaries, recurrence, invalid inputs, overflow, saved records and immutable issue inputs. In-app browser testing on isolated localhost verified GBP 880 year 1 / GBP 4,400 five years, quantity recalculation, save/restore, issue and Lifecycle receipt. The standalone browser suite could not launch because its Playwright browser executable is absent; it is not reported as passing. Amazon domain validation remains open under AMZ-PRC-16.


## Amazon pricing review — 6 September 2026

Amazon storage, accounts and formal approvals are confirmed future requirements; specifications remain open under AMZ-PRC-13–15/17. Keep current browser-local persistence and provisional status explicit. Downstream automatic aggregation requires AMZ-PRC-12 mapping and overlap rules.

See [Amazon specification and approval register](../amazon/AMAZON-PRICING-DECISIONS.md) for evidence requests, proposed owner roles and interim treatment. All items remain open until explicitly resolved.

## Pricing recovery and handover fixes

Pricing can now issue fixed provisional snapshots to a local, site-specific history. Both Lifecycle and Pre-Contract have a direct Pricing input panel: Load issued pricing baselines, select a version, inspect costs and evidence. Each recipient stores its own selection and retains it when newer issues appear. Identical consecutive drafts reuse the existing issue; changed drafts create the next revision. This is reference handover only, not automatic cash-flow/tender aggregation or formal approval. Local storage is not a tamper-proof audit service.

Downloaded v1/v2 FERN pricing records can be re-imported with a preview before replacing the draft. Inputs and site are validated; exported totals/approval claims are not trusted and totals are recalculated.

Verification: 51 automated tests, typecheck and build passed for these changes. An isolated localhost browser test issued a synthetic GBP 48,000 version and selected the identical version independently in both recipients. User storage at 127.0.0.1 was untouched. Browser file-restore end-to-end remains unverified; parser, site checks and recalculation have automated coverage.

Amazon environment decision: the product owner confirms shared storage, user accounts and formal approvals will be provided within Amazon; hosting, identity, interfaces and approval policy remain to be confirmed by Amazon. Do not invent configuration or describe the browser-local implementation as production integration.

## Pricing output recipients

Product-owner clarification: Pricing Template Generator supplies its output directly to both Lifecycle Analysis and FM Pre-Contract / Tender Assessment. Lifecycle uses the pricing baseline for lifecycle cost calculations; Pre-contract uses the same pricing baseline for tender/commercial comparisons, alongside lifecycle results when relevant. Pre-contract must not depend on Lifecycle merely to receive Pricing output.

Both recipients must reference the same pricing baseline identifier and version, with site, scope, currency, price base date, line items, allocations, subtotals, source evidence, exclusions, validation gaps and provisional/approval status. Revised pricing must be identified as newer; existing assessments retain their referenced snapshot until deliberately updated. Handover does not imply approval. Avoid counting the same pricing costs again when combining direct pricing and lifecycle results.

Status: this is the agreed integration requirement and description for the future consolidated User Guide. The current application supports local saving and a downloadable calculation record; direct handover to either recipient is not yet implemented.

**Implemented BB pricing increment (6 September 2026):** Pricing now has a local Staff Rate Card import preview, source formula/PPK warnings, manual role/rate/hour/evidence inputs, provisional annual staff-cost calculation, site-keyed browser save/restore and a downloadable calculation record. Cached source rates are not automatically accepted. Cross-application handover, staffing feasibility, general workbook formula execution and professional approvals remain outstanding. See [BB pricing quick start](../apps/pricing/BB-PRICING-QUICK-START.md).

## Agreed application responsibilities

Product-owner decision, 6 September 2026. The three applications share underlying data and a versioned calculation engine. This is the agreed target structure; implementation and professional validation remain separate work.

| Application | Responsibility |
|---|---|
| Lifecycle | Assets, maintenance strategies, reliability, service-life adjustments and five-horizon lifecycle costs |
| Pricing | Internal BB costs, contractor costs, staffing/team/overhead build-ups, tenders and benchmarks |
| Pre-contract assessment | Compare scenarios and record the business owner’s decision using the shared results |

Shared evidence and governance preserve input versions, applicability, gaps and scoped approvals. Pricing passes the same versioned cost baseline directly to both Lifecycle and Pre-contract; Pre-contract also consumes lifecycle scenario outputs without maintaining a competing calculation method. Revisions must identify affected results and require recalculation before those results are presented as current. Source-specific policies, rates and scoring rules still require their own validation.


**Current implementation increment:** Excel intake with preview, preservation of edited records, loaded NRM3 hierarchy selection, structured source evidence, multiple direct-rate maintenance tasks, independent R/M scope and draft Appendix E/F grouping CSV reports are now implemented. Existing saved projects are retained. [Current workflow and remaining limits](../apps/lifecycle/LIFECYCLE-QUICK-START.md) supersede earlier future-work descriptions for these features. Full time/trade costing, formatted workbook reports and shared professional review remain outstanding.



**Implementation update, 6 September 2026:** Lifecycle now has a working local assessment: FERN JSON import, editable asset records, explicit browser save/restore, backup download, recurring renewal and simplified task-rate maintenance calculations, annual CSV profile and a JSON calculation record. See [quick start and limits](../apps/lifecycle/LIFECYCLE-QUICK-START.md). Earlier statements below about unconnected primitives/reference UI describe the baseline before this increment. Full NRM3 scope, economic evaluation and multi-user governance remain outstanding.

Status: implemented prototype decomposition and proposed production boundaries. 6 September 2026.

## Implemented structure

App mounts the demo sign-in screen. Once signed in, FernWorkspace owns navigation, selected site, sidebar state, notifications and account menus. DashboardPage owns the dashboard presentation. AskFern maintains its query interface and calls an explicitly isolated scripted response builder.

Each detailed application has a page component, feature-specific prop types, immutable configuration and named workflow sections. The page owns report state; sections receive only the props they use. Extraction adds React fragments, not layout wrappers. Shared evidence statuses, badges, tooltips and gap/conflict presentations remain reusable.

| Boundary | Responsibility | Must not own |
|---|---|---|
| app | Navigation, shell, active context | Calculation methods or approval rules |
| features/lifecycle | Asset baseline, events, scenarios, sensitivity, review and handover | Pricing workbook formulas |
| features/pricing | Input mapping, method controls, pricing output and handover | Procurement authority |
| features/pre-contract | Baseline, alternatives, comparison, recommendation and decision record | Automatic supplier selection |
| features/launch-tracker | Source intake, requirements, configuration, execution, assurance, decision and report | Operational execution or automatic launch approval |
| features/ask-fern | Question experience and response presentation | Unverified facts or access policy enforcement |
| components | Reusable presentation | Feature-specific persistence or calculations |
| domain | Shared classification/status vocabulary | A universal readiness score |

The source has one site example and one in-memory navigation state. Labels currently act as destinations; deep links, browser back/forward and route permissions are future work. The Contract & Service Model destination and other undeveloped menus deliberately use UnimplementedPage.

## Corrections made during extraction

1. Pricing report state moved from a JSX IIFE to the Pricing page component.
2. Launch report state moved from a JSX IIFE to the Launch page component.
3. Execution-level human review follows the launch assurance controls.
4. Launch readiness assessment precedes go-live review. Launch human review precedes the decision record and assurance report.
5. Figma-specific deployment/preview plugins replaced with standard Vite configuration for independent development.
6. The four large applications use lazy imports so the login/dashboard bundle does not include every workflow.

Existing inline visual styles, assets, field definitions, unconnected states and disabled actions are retained. No business calculation, approval or connection was invented. Further deduplication of repeated field tables should happen alongside the real data model rather than forcing unrelated workflows into one generic schema now.

## Proposed production structure — not implemented

Separate presentation, application services, domain rules and integration adapters. A modular backend is a reasonable initial design candidate, subject to the engineering team's environment and operating requirements. Independent services are not required merely because there are multiple frontend modules.

Application services should implement commands such as SaveAssessment, ValidateSource, RunCalculation, SubmitForReview, RecordDecision and GenerateReport. Each command needs authenticated identity, context, validation, authorisation and an audit event. The UI must never be the sole gatekeeper for approvals or calculations.

Persist site context, source versions, evidence, assessments, scenarios, methods, calculation runs, review records, decisions and handovers as distinct entities. Link records by stable IDs and explicit versions. Store missing values as missing with reasons; do not convert them to zero.

Only the backend should call operational systems, AI providers and protected storage. API schemas, data ownership and adapter behaviour are outlined in P5-INTEGRATION-SPEC.md. Provider choices, hosting, identity and database are open decisions, not commitments made by this refactor.

## Suggested ownership

| Work area | Suggested engineering responsibility |
|---|---|
| Shell, shared UI, accessibility | Frontend/platform engineer |
| Lifecycle and pricing | Domain engineer with validated method owners |
| Contract and pre-contract assessments | Workflow engineer with FM/procurement owners |
| Launch tracking | Workflow engineer with launch governance owners |
| APIs, records, integrations and audit | Backend/integration engineer |
| Acceptance and regression suite | QA engineer with product owner |

These are responsibility groupings, not assignments to named people.
