# FERN baseline validation

## Browser executable installed; OS launch restriction remains

Install Playwright Chromium in the receiving environment before running browser checks. Core unit checks pass independently of that install. See [handover verification](../../../verification/HANDOVER-VERIFICATION.json) for the checks recorded with this package.

Current consolidated status: [package START-HERE](../../../START-HERE.md). `pnpm verify` records each check and fails if browser validation cannot run; see [technical verification](TECHNICAL-VERIFICATION.json). Earlier increment counts/statuses below describe development history.

## Economic sensitivity — 6 September 2026

Users can add up to 30 named economic sensitivity cases, each with explicit inflation, nominal discount rate and rationale/source. Cases retain baseline currency, location, timing and cost scope. They do not modify baseline economic inputs. The asset view permits editing; the combined view evaluates the same cases against the reviewed combined schedule.

Each valid case shows undiscounted cost, net present cost, absolute and percentage difference from baseline NPC, and five horizon results where covered. Zero baseline NPC has no percentage. Missing baseline or case inputs withhold that comparison without blocking valid base calculations. Cases are scenarios, not forecasts, probabilities, recommendations or approved country rates.

Project save/restore and JSON calculation records preserve cases. Each case can export a CSV with its assumptions, baseline rates/evidence, case identity and (for combined scope) pricing reference and overlap evidence. Adding/changing cases changes the project snapshot and therefore requires fresh combined review under the existing binding rule. AMZ-PRC-16/18 remain open for domain and economic-method approval.

Verification: 87 automated tests, typecheck and build pass. Browser synthetic case: baseline NPC EUR 400; alternative 10% inflation / 0% discount yields NPC EUR 537.02, delta EUR 137.02 (34.26%). Tests cover no baseline mutation, invalid inputs, zero denominator, unavailable horizons, CSV provenance and backup validation. The standalone Playwright executable remains absent, so complete browser/download automation is not reported as passed.


## Economic CSV reports — 6 September 2026

Asset and combined economic panels now export dedicated cash-flow CSV reports. Reports include site, scope, currency, price base date, analysis length, location, inflation, nominal discount rate, timing convention, source evidence, method, limitations and provisional status. Combined reports additionally identify the pricing issue/revision, overlap treatment and evidence. Annual base-price/nominal/present costs and the five horizon totals are exported without display rounding; uncovered horizons are explicitly unavailable. Existing base-price CSVs remain separate.

Economic results are recalculated from inputs at export; invalid calculations and missing report identity block the report. CSV fields preserve quoted/multiline evidence and protect formula-like user text. This does not approve source inputs or create a production audit record. Amazon AMZ-PRC-16/18 remain open.

Verification: 82 automated tests, typecheck and build pass. Export tests check annual/horizon reconciliation, currency, source-version traceability, unavailable horizons, malformed inputs and CSV quoting. The standalone browser suite still cannot launch because its executable is absent. The new browser download action and downloaded-file validation remain unverified here; executable regression assertions are supplied for the engineering environment.


## Economic cash-flow increment — 6 September 2026

Asset and combined Lifecycle views now calculate nominal annual cash flows and net present cost from user-entered location, inflation, nominal discount rate, timing and source evidence. No rates are prefilled. The implemented provisional convention uses a 1 January analysis base date, base prices in year 1, uniform annual inflation from year 2, and end-of-year discounting. Nominal year n = base cost × (1 + inflation)^(n−1); present cost = nominal ÷ (1 + nominal discount)^n. No intermediate rounding. All included cost categories use the same rates. Currency amounts are not converted.

Zero is valid when explicitly entered; negative rates must be greater than −100%. Missing/invalid economic inputs withhold economic results while leaving valid base-cost estimates available. The profile supports 1–25 consecutive annual periods. All five horizon rows are displayed; uncovered horizons remain unavailable rather than extrapolated. This increment does not include varying annual/category rates, residual values, mid-year payments or approved country-rate feeds.

Economic assumptions persist in project saves/backups. Asset and combined JSON calculation records include recalculated economic results and the assumptions in the project. Existing CSVs remain base-price profiles. Combined review bindings include economic inputs; changing them requires the combined review again. Formal source and method validation remain open under AMZ-PRC-18 and AMZ-PRC-16.

Verification: 78 automated tests, typecheck and build pass. In-app browser verified zero-rate EUR 400 cash flow/NPC and synthetic 10% inflation/10% nominal discount giving EUR 537.02 cash flow and EUR 363.64 NPC. The standalone browser suite still cannot launch because its executable is absent; no browser download-content assertion is claimed as passed.


## Combined assessment recovery — 6 September 2026

Lifecycle now provides Save combined assessment review and Restore combined assessment review. One record per site is stored in this browser, separately from the saved asset project. It includes overlap treatment, evidence, source issue identity/revision, timestamp and an exact binding to the reviewed project and pricing inputs. Restore recalculates totals; no saved numerical total is trusted. It restores review fields only and never replaces assets or switches pricing versions.

Matching, valid inputs can restore the prior provisional review. Changed inputs retain the evidence/treatment but require fresh confirmation; unconfirmed or invalid drafts cannot become reviewed through restoration. Object-key order alone is ignored; substantive values and array order remain material. Malformed storage, cross-site mismatches and storage failures report errors without replacing the current draft. Records are size-limited and remain browser-local; this is not Amazon identity, immutable audit or formal approval.

Verification: 73 automated tests, typecheck and build pass. In-app browser verified saving, restoration after reopening to EUR 4,800, and re-review requirement after changing the horizon. Standalone Playwright remains unable to launch due to its missing executable; its recovery regression steps are included but not reported as passed. AMZ-PRC-13–16/17 remain open for production persistence, identity, approvals and domain validation.


## User-facing terminology — 6 September 2026

User direction: use plain FERN Lifecycle terminology on application screens. NRM3 naming has been removed from authored headings, configuration text, asset classification controls, import instructions and validation messages. The user guide and engineering methodology retain NRM3 attribution and traceability. Existing workbook sheet/header mappings, calculation methods and source records are unchanged. Original uploaded filenames and user-entered evidence remain source data rather than rewritten product labels. This wording change does not assert Amazon authorship or approval of the underlying standard.

Verification: 68 tests, typecheck and build pass. The browser regression locator now uses Asset classification code. The standalone browser suite remains unavailable because its executable is missing.


## Euro downstream verification — 6 September 2026

Positive in-app browser cases now verify EUR 4,800 additional-scope and EUR 4,600 full-maintenance-replacement results, persistence, currency mismatch blocking and Pre-contract EUR 88 / 10% difference. Remaining pound-specific rate and elemental labels were corrected. See [acceptance evidence](PRICING-ACCEPTANCE-EVIDENCE.md) for executed cases and outstanding tests. The earlier positive-combination browser limitation is superseded; standalone browser/download assertions and Amazon domain acceptance remain open.

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

The nine-sheet source review evaluated all 6,980 formulas: 6,976 numeric cache matches and four matching division-by-zero errors. A synthetic multi-year test gives source cost 8,000 versus single-quantity cost 800. No source file or application calculation changed. This is not domain approval; AMZ-PRC-01–10/16 remain open. See [workbook evidence](../apps/pricing/PRICING-WORKBOOK-RECONCILIATION.md).

See [Amazon specification and approval register](../amazon/AMAZON-PRICING-DECISIONS.md) for evidence requests, proposed owner roles and interim treatment. All items remain open until explicitly resolved.

## Pricing recovery and handover fixes

Pricing can now issue fixed provisional snapshots to a local, site-specific history. Both Lifecycle and Pre-Contract have a direct Pricing input panel: Load issued pricing baselines, select a version, inspect costs and evidence. Each recipient stores its own selection and retains it when newer issues appear. Identical consecutive drafts reuse the existing issue; changed drafts create the next revision. This is reference handover only, not automatic cash-flow/tender aggregation or formal approval. Local storage is not a tamper-proof audit service.

Downloaded v1/v2 FERN pricing records can be re-imported with a preview before replacing the draft. Inputs and site are validated; exported totals/approval claims are not trusted and totals are recalculated.

Verification: 51 automated tests, typecheck and build passed for these changes. An isolated localhost browser test issued a synthetic GBP 48,000 version and selected the identical version independently in both recipients. User storage at 127.0.0.1 was untouched. Browser file-restore end-to-end remains unverified; parser, site checks and recalculation have automated coverage.

Amazon environment decision: the product owner confirms shared storage, user accounts and formal approvals will be provided within Amazon; hosting, identity, interfaces and approval policy remain to be confirmed by Amazon. Do not invent configuration or describe the browser-local implementation as production integration.

**Overheads and subcontractors implemented:** Pricing accepts manually entered annual overhead and subcontractor lines with FM allocation, source/scope notes and explicit additional / already-included / outside-scope treatment. Only additional lines contribute. Staff, additional overheads and additional subcontractors are shown separately with a combined provisional annual total. Incomplete included costs block that combined total and download, while the separate valid staff subtotal remains visible. Lines persist with the baseline and are included in the v2 calculation record. This does not import Overheads/Subcontractors worksheet formulas or add tax, profit, inflation, or FX conversion. Existing saved baselines remain compatible.

Verification: browser test produced staff 48,000 + allocated overhead 5,000 = GBP 53,000; changing the overhead to already included restored GBP 48,000; invalid allocation blocked the combined total. Unsaved synthetic data was discarded by restoring the existing baseline. Typecheck, 48 automated tests and build pass. Full standalone browser suite remains unverified.

**Delivery-team costing implemented:** Each staff role can use direct allocated hours or a delivery-team calculation: headcount × annual paid hours per person × FM allocation percentage ÷ 100. The selected method alone contributes to costs. Direct hours are retained when switching methods, and older saved baselines remain compatible. Blank, negative, non-finite or out-of-range inputs block included-role totals; headcount is a whole-person count and allocation ranges from 0 to 100%. Annual paid hours per person cannot exceed 8,784 (the hours in a leap year). Team fields are saved/restored and included in the calculation record. This is cost allocation, not an approved staffing/shift-coverage or competence assessment.

Browser verification: 2 people × 2,000 paid hours × 50% allocation × GBP 40/hour produced GBP 80,000. Allocation 101% removed the total. Temporary values were removed without saving; the existing baseline was restored. Typecheck, 45 automated tests and build pass.

**Current date and currency behaviour:** User-facing date entry is DD-MM-YYYY (for example 06-09-2026). Saved dates retain their existing ISO representation, so prior records remain compatible. Valid dates allow totals; missing, malformed or impossible dates block totals. Currency is user-selected from a dropdown including EUR (€), USD (US$), GBP (£) and other listed currencies. A saved currency outside the list remains available on restore. Changing currency labels the entered rates and totals; no exchange conversion is applied. Browser verification confirmed 06-09-2026 with 40 × 1,200 gives 48,000 under EUR, USD and GBP selections; 30-02-2026 blocks calculation. Temporary values were not saved. Typecheck, 44 automated tests and build pass. This supersedes earlier YYYY-MM-DD entry guidance below; the standalone full browser suite remains unverified.

**Date-entry fix verified in the running app:** Price base date now accepts explicit YYYY-MM-DD text with format guidance and calendar validation. The stale local Vite server was restarted on the same 127.0.0.1:4173 address. In the browser, 2026-09-06 with a synthetic rate of 40 and 1,200 hours produced GBP 48,000.00; 2026-02-30 removed the total and displayed a date error; 2028-02-29 restored the correct total. Unsaved test roles were removed and the existing saved draft restored. No test inputs were saved. Typecheck, 43 automated tests and build pass. This resolves the date-control and focused browser-calculation blockers recorded below; the standalone full browser suite remains unavailable in this execution environment.

**Latest browser verification:** With explicit user authorization, local demo Save/Restore passed. No saved BB baseline existed before the test. A temporary role with hourly rate 40 and annual allocated paid hours 1,200 was saved; the draft role name and rate were changed (rate 50); Restore recovered the original role name, rate 40, hours 1,200 and evidence text. The temporary role was then removed and the cleared draft saved. After navigating to Lifecycle and back, Restore recovered the cleared baseline and no test roles remained. Existing asset records were not changed. Native date-entry automation and the full browser suite remain unresolved; installed Chrome failed to launch under the execution environment. This verifies save/restore, not a complete browser-calculation pass.

6 September 2026 · Tests of the refactor, not functional-product acceptance

| Check | Result | Scope / limit |
|---|---|---|
| Original source TypeScript check | PASS | Baseline before refactoring |
| Original Vite build | PASS | Original initial JavaScript bundle approximately 772 kB; Vite reported a large-chunk warning |
| Refactored TypeScript check | PASS | No reported type errors |
| Refactored automated tests | PASS — 18 tests | Scripted gap responses/status distinction; report-hook placement; launch composition; server rendering of four pages and launch report expansion; four NRM3 primitive tests covering life factors, pricing, recurring events and invalid inputs |
| Refactored Vite build | PASS | Four application chunks load separately; initial JavaScript bundle approximately 266 kB; no large-chunk warning in the observed build |
| Rendered HTML equivalence | PASS — six views before NRM3 copy update | Sign-in, dashboard, lifecycle, pricing, pre-contract and launch match the corrected baseline after normalising whitespace, React comments and relocated image paths |
| Browser interaction suite | NOT VERIFIED | Test script supplied. Direct browser launch failed in this local sandbox; the in-app inspection stalled without returning a usable snapshot |
| Screenshot / responsive / keyboard visual review | NOT VERIFIED | No successful visual confirmation was obtained during this task |
| Full business workflows and production readiness | NOT MET | Tested NRM3 primitives exist, but no persistence, editable workflow records, complete calculation engine, real integration, exports or production identity implemented |

The corrected comparison baseline differs from the original ZIP only in the two report-hook corrections and launch section order described in ARCHITECTURE.md. Matching server-rendered HTML establishes preservation of that rendered structure/content, not browser interactivity or visual accuracy at every viewport.

Pricing's Export Report is currently a non-interactive span. Other applications contain disabled export buttons. Neither represents a functioning export. Tests preserve this explicit unavailable behaviour; they do not treat it as completion of the export requirement.

The browser suite should be run by the software team in an environment with Playwright Chromium installed. If using an existing Chrome installation, set FERN_BROWSER_CHANNEL=chrome. Use FERN_TEST_URL to select a different local preview address.

Production acceptance must use the app-specific scenarios in FUNCTIONALITY-MATRIX.md and the requirements in FERN-SOFTWARE-PRD.md. Add real method/reference-case tests, persistence/recovery tests, access tests and cross-application handover tests as those features are implemented.

NRM3 update: TypeScript, all 18 automated tests and the production build passed. The lifecycle context, configuration and calculations text now identifies NRM3 as the selected methodology; the earlier HTML equivalence result predates those intentional text changes. Browser and visual verification remain outstanding. Calculation primitives are not yet connected to the application workflow.

## Local preview startup correction

The in-app browser reproduced a blank screen with `Cannot access React before initialization` in FernWorkspace. React was imported below module-level lazy component declarations; Vite development interop emitted its local binding after those uses. Moved the React import above the declarations and restarted the stale development server. TypeScript, all 18 tests and the production build pass. In-app browser verification now confirms sign-in, successful demo login, visible dashboard, lifecycle lazy loading and dashboard return. A dashboard screenshot was inspected at the current panel width. The full standalone browser suite still cannot launch Chromium under the local sandbox, and comprehensive responsive/keyboard verification remains outstanding.

## Lifecycle local workflow increment

TypeScript, 24 automated tests and the production build pass. Six new domain tests cover complete assessment totals, invalid data, year boundaries, overdue renewals, import validation and suppression of partial totals. In-app browser checks verified importing a synthetic project, five repeated renewal events, quantity edits recalculating costs, explicit local save, navigation away/back restoring edits, and import/save of 127 DSA2 records. The previous global statements about absence of persistence/calculation/exports now apply to the other applications and the broader unimplemented workflows; Lifecycle has the initial local subset documented in LIFECYCLE-QUICK-START.md. Download file contents are covered at the domain generation level; comprehensive browser download testing remains outstanding.

## Excel and elemental-report increment

37 automated tests, TypeScript and the production build pass. Real-file adapter checks read the DSA2 .xlsx register (127 assets), the blank .xlsm template (zero physical asset rows, 2,633 catalog entries, VBA detected but not executed) and 2026 logic workbook (2,633 catalog entries). Exact-code matching retains two DSA2 mapping gaps. Backups round-trip structured records and reference catalog; existing source values remain intact. UI verification covers restoring the 127-record project and Excel import preview with no silent replacement. Elemental cost reconciliation, separate task costs, missing metadata/GIFA and scope validation are covered by domain tests. Complete formatted E/F workbook export and standalone end-to-end browser testing remain unverified/unimplemented as specified in the quick start.

Final in-app browser checks: original DSA2 Excel preview recognised 127 existing records; apply preserved their edited fields and attached maintenance source tasks (first task annual frequency 12). The 2026 reference preview recognised 2,633 entries. Saving succeeded and navigation away/back restored tasks and hierarchy. Final screenshot inspected with the Excel import control visible and JSON restore collapsed. No real project records were placed in automated fixtures or the engineering ZIP.

## BB pricing increment

Typecheck, 42 automated tests and build pass. Tested source warnings, paid-hour costing, excluded rows, missing/invalid inputs, site-bound saved data and existing lifecycle regressions. Real workbook mapping finds 16 roles and retains cached rates separately. Browser sign-in was rejected by automatic approval review because explicit local demo-account authorization was absent; interaction checks are pending. No browser pass or professional cost validation is claimed.


Browser follow-up: the user authorized the local demo login, which succeeded. Pricing and its input-validation state were observed in the browser. Full interaction verification remains incomplete: automatic approval review blocked Restore in the existing browser; the browser-control date input did not produce a valid date for the synthetic calculation; and the standalone Playwright suite could not launch because its Chromium executable was missing. Unsaved synthetic role/currency inputs were removed; no pricing baseline was saved or overwritten. Earlier sign-in-authorization blockers are resolved, but save/restore and successful browser calculation are not claimed as passed.

## Pricing usability update

The live Pricing screen now explains standalone cost planning and intended outputs to Lifecycle and Pre-Contract. Four section links lead to basis/sources, staff/teams, additional costs and review/save. An expandable in-app user guide covers current inputs, worked examples, saving, source warnings and limitations. The old not-ready context and workflow descriptions remain inside the collapsed reference section. Navigation starts closed below 768px and closes after choosing a destination; the toggle has an accessible name and state. Main content padding is reduced on narrow screens. Calculation methods and saved-data formats are unchanged.

Verification: 48 automated tests, typecheck and build passed. Current browser screenshots were inspected for the initial crowded layout, expanded guide and review/save area. Section navigation and narrow-screen menu behaviour were checked. This is a targeted usability improvement, not a complete accessibility certification; desktop/mobile full regression suite remains outstanding.
