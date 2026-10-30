# P5 integration specification — draft

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

AMZ-PRC-12 governs downstream pricing mapping and overlap. AMZ-PRC-13–15 govern Amazon storage, identity and formal approvals; AMZ-PRC-17 covers operating requirements. These remain open. Continue local provisional integrations; production contracts and approval authority cannot be inferred.

See [Amazon specification and approval register](AMAZON-PRICING-DECISIONS.md) for evidence requests, proposed owner roles and interim treatment. All items remain open until explicitly resolved.

## Pricing recovery and handover fixes

Pricing can now issue fixed provisional snapshots to a local, site-specific history. Both Lifecycle and Pre-Contract have a direct Pricing input panel: Load issued pricing baselines, select a version, inspect costs and evidence. Each recipient stores its own selection and retains it when newer issues appear. Identical consecutive drafts reuse the existing issue; changed drafts create the next revision. This is reference handover only, not automatic cash-flow/tender aggregation or formal approval. Local storage is not a tamper-proof audit service.

Downloaded v1/v2 FERN pricing records can be re-imported with a preview before replacing the draft. Inputs and site are validated; exported totals/approval claims are not trusted and totals are recalculated.

Verification: 51 automated tests, typecheck and build passed for these changes. An isolated localhost browser test issued a synthetic GBP 48,000 version and selected the identical version independently in both recipients. User storage at 127.0.0.1 was untouched. Browser file-restore end-to-end remains unverified; parser, site checks and recalculation have automated coverage.

Amazon environment decision: the product owner confirms shared storage, user accounts and formal approvals will be provided within Amazon; hosting, identity, interfaces and approval policy remain to be confirmed by Amazon. Do not invent configuration or describe the browser-local implementation as production integration.

## Pricing output recipients

Product-owner clarification: Pricing Template Generator supplies its output directly to both Lifecycle Analysis and FM Pre-Contract / Tender Assessment. Lifecycle uses the pricing baseline for lifecycle cost calculations; Pre-contract uses the same pricing baseline for tender/commercial comparisons, alongside lifecycle results when relevant. Pre-contract must not depend on Lifecycle merely to receive Pricing output.

Both recipients must reference the same pricing baseline identifier and version, with site, scope, currency, price base date, line items, allocations, subtotals, source evidence, exclusions, validation gaps and provisional/approval status. Revised pricing must be identified as newer; existing assessments retain their referenced snapshot until deliberately updated. Handover does not imply approval. Avoid counting the same pricing costs again when combining direct pricing and lifecycle results.

Status: this is the agreed integration requirement and description for the future consolidated User Guide. The current application supports local saving and a downloadable calculation record; direct handover to either recipient is not yet implemented.

6 September 2026 · Proposed contracts for engineering review. **No backend or adapter is implemented in this baseline.**

## Contract principles

Every read/write carries authenticated actor identity, authorised site/business context, correlation ID and an explicit entity/version where appropriate. The server enforces access and domain rules. Avoid exposing operational credentials or unrestricted system access through the browser.

Writes must validate inputs, detect stale versions and return an actionable result. Repeated commands need idempotent handling where retries could duplicate imports, runs, decisions or handovers. Audit material changes with actor, context, reason, time and previous/new version references.

## Required interface groups

| Group | Intended operations | Required failure behaviour |
|---|---|---|
| Context and identity | List permitted contexts, select context, resolve session and permissions | Deny unauthorised context; expire/revoke session cleanly |
| Sources/evidence | Register source, upload/import permitted evidence, validate, supersede, read permitted references | Validate file/schema/size; retain provenance; distinguish missing, unavailable and denied |
| Assessments/scenarios | Create, save, retrieve, version, submit, review | Detect concurrent edits; preserve drafts and prior versions |
| Methods/calculations | List approved methods, validate input, run, retrieve run/result, reconcile | Reject unapproved/incompatible methods; retain input snapshot; return errors without a false result |
| Launch tracking | Validate/promote requirement, accept configuration, activate/update records, assess criteria | Enforce state transitions; record dependency impact; never bypass evidence or review gates |
| Decisions | Record authorised outcome/rationale/conditions against a reviewed version | Deny unauthorised or stale decision; append auditable correction rather than silent overwrite |
| Reports/exports | Request output for a specific record/version; retrieve file and metadata | Label permitted drafts; block unsupported finalisation; expose generation failure |
| Handovers | Send versioned output, validate receipt, accept/reject, supersede | Preserve originating IDs/method/evidence; detect duplicates and incompatible versions |
| Ask FERN | Query permitted context; return answer with actual evidence references | Explain insufficient evidence; no fabricated retrieval/source counts or cross-context disclosure |

Exact URLs, transport, schemas and system providers are deliberately not specified as implemented APIs. Engineering should publish a versioned API contract after domain and deployment decisions.

## Common data envelope — proposed fields

`id`, `contextId`, `recordType`, `version`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`, `validationStatus`, `sourceReferences`, `supersedesVersion`, `reviewReferences`, `auditReference`.

Evidence reference: source ID/version, location within source, owner/provider, retrieved/effective date, applicability, validation state, permitted access and any explicit gap/conflict. Dates and actors originate from actual events or validated sources, never invented defaults.

Calculation run: method ID/version, input record versions, parameter values and units, currency/price basis where applicable, execution/version details, result records, validation/reconciliation status and exceptions. An input/method change invalidates the previous result's currentness without erasing its history.

Handover: originating app/record/version, receiving context/workflow, method and evidence references, requested action, sent event, receipt, validation result, acceptance/rejection and supersession relation. An exported file alone is not confirmed receipt.

## System-source discovery

For every proposed source, P5 must confirm: system owner, permitted data scope, actual API/file interface, schema/version, authentication, read/write permissions, refresh cadence, source-of-truth policy, rate/volume limits, sandbox/reference data and recovery behaviour. The product owner identifies Amazon APM (Asset Performance Management) as the prospective CAFM/CMMS asset source. Its exact inventory, API availability and permitted interface are not confirmed. GAT and BMS remain discussion references. No connection is implemented.

If local-first development is chosen, adapters can initially accept explicitly supplied data with persistent storage and validation. They must still report their real origin and must not be labelled as live Amazon connections. Retention, backups and migration from local to hosted storage need an explicit plan.

## Required contract tests

Test denied context, revoked permission, missing/stale evidence, schema mismatch, duplicate import, partial failure, timeout/retry, concurrent edit, method-version mismatch, unsupported state transition, unauthorised decision, repeated handover and failed export. Reference calculation tests require approved expected values from domain owners.

## APM coverage and multi-format ingestion

Use [APM-ASSET-COVERAGE-AND-INTAKE.md](APM-ASSET-COVERAGE-AND-INTAKE.md) as the confirmed coverage direction and discovery checklist. Ingestion must retain source remit, partial-fetch state, stable source/site asset IDs, record timestamps and provenance. API integration is additive to Excel/CSV/JSON and manual inputs. A partial APM inventory must never be interpreted as a complete building inventory or compared to all NRM3 classifications as a completeness denominator.
