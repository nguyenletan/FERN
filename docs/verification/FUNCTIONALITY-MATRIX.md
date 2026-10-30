# FERN functionality and acceptance matrix

Current consolidated status: [package START-HERE](../../../START-HERE.md) and [handover verification](../../../verification/HANDOVER-VERIFICATION.json). `pnpm verify` records each check and fails if browser validation cannot run; see [technical verification](TECHNICAL-VERIFICATION.json). Earlier increment counts/statuses below describe development history.

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


6 September 2026 · Draft requirements · **No application is certified fully functional by this baseline.**

Legend: **Prototype interaction** means an interface action works using demonstration state. **Structured UI** means fields, controls and intended workflow are described but the business operation is not implemented. **Placeholder** means navigation reaches an undeveloped page.

Every row below is in the product scope for completion, subject to confirming its detailed business rules. Proposed acceptance scenarios define implementation work; they are not test results.

## FERN applications

| Application | Current state | Completion scenario required | Dependencies |
|---|---|---|---|
| Lifecycle & Asset Analysis | Excel intake with preview, hierarchy selection, structured evidence, multiple maintenance tasks, R/M scope, save/restore, initial NRM3 calculations and draft L1/L2 CSV reports; broader workflow remains reference UI | Import assets and costs; correct an invalid record; save/reopen baseline; configure an authorised method and assumptions; calculate/compare scenarios; review; generate report; hand accepted output to pre-contract | NRM3 selected; DSA2 schema mapping documented. Validate asset inputs, life factors, financial assumptions, reference cases and review authority |
| Pricing Template Generator | Staff Rate Card preview, source warnings, manual BB role costing, local site save/restore and calculation record download; remaining workflow is reference UI | Import approved workbook/schema; map and validate fields; enter rates/scope; save/reopen; run formulas; reconcile against reference workbook; review; export a usable workbook; hand output to assessment | Authoritative workbook/version, formula inventory, mapping rules, currencies/units/rounding and commercial ownership |
| FM Pre-Contract / Pre-Tender Assessment | Structured UI; preview and lifecycle navigation | Save current arrangement; create alternatives; receive versioned pricing/lifecycle outputs; compare compatible scopes; resolve a gap/conflict; review recommendation; record authorised decision; export assessment | Validated FM model definitions, assessment method, selection/weighting rules where used and authority matrix |
| IFM Launch Tracker Tool | Structured UI; preview; corrected section order | Register source; validate and promote a requirement; configure ownership/milestone/dependency/evidence; activate and update tracking; preserve history; assess against approved criteria; record review/decision; export report | Actual source requirements, transition rules, readiness methodology, criteria and authorisations |
| FM Contract & Service Model | Placeholder | Save a contract/service baseline; evaluate applicable model options; explain results; obtain required review; hand baseline to related apps without duplicate/conflicting entry | P1/P2 definitions and ownership; boundary with pre-contract; eligibility and interpretation rules |

For every application above, additionally test refresh/restart recovery, validation errors, unavailable source handling, unauthorised actions, version conflicts and auditability. A local-first implementation may use explicitly entered/imported data; that does not make it Amazon-connected or production-approved.

## Dashboard, assistant and governance

| Destination | Current state | Required usable capability |
|---|---|---|
| Programme Overview / Dashboard | Prototype dashboard; empty/static activity lists | Derive status/attention/changes from actual records; filter by authorised context; navigate to underlying records; identify unavailable/stale sources |
| Ask FERN | Scripted keyword responses | Retrieve authorised evidence, answer with grounded references, handle gaps/conflicts, follow source links and preserve context. Evaluate against real test cases |
| Leadership & Policy | Placeholder | Browse current policy versions, identify owner/applicability, record changes and required review; stale versions remain traceable |
| Planning & Objectives | Placeholder | Create objectives, measures, targets, responsibilities and dates; track revisions and actual progress with source evidence |
| Performance & KPIs | Placeholder | Configure approved KPI definitions and targets, ingest validated results, compare matching periods/units, display source/freshness and drill down |
| Risk & Compliance | Placeholder | Create/import risks and requirements; apply an approved method; attach evidence, assign actions, review and track unresolved matters |
| Audit & Assurance | Placeholder | Plan and record an audit, capture findings/evidence, assign actions, review closure and retain audit history |
| Continual Improvement | Placeholder | Create corrective/improvement actions from findings, assign responsibility/date, update status, validate closure and retain effectiveness evidence |

## Administration and support

| Destination | Current state | Required usable capability |
|---|---|---|
| Business Units & Sites | Placeholder; one hardcoded prototype context elsewhere | Maintain validated site/business hierarchy and permitted user context; prevent orphaned or unauthorised references |
| Service Models & Tiers | Placeholder | Maintain controlled definitions and applicable versions; prevent invalid combinations; trace changes into assessments |
| Operating Configurations | Placeholder | Edit and validate authorised context/application configuration with versioning and change history |
| Framework Data / Reference Tables | Placeholder | Import/edit controlled reference tables, validate keys/units/version, approve publication and identify supersession |
| User & Access Management | Placeholder | Manage approved roles, context access and revocation; verify backend enforcement and audit of permission changes |
| Getting Started | Placeholder | Task-based onboarding for the actual released functions with working example flows |
| Framework Documentation | Placeholder | Search/browse controlled source documents with version, owner and applicability |
| Glossary | Placeholder | Search current controlled definitions and follow referenced terms |
| FAQs | Placeholder | Search task-relevant answers and reach supporting guidance |
| Contact / Support | Placeholder | Submit a support request with reference/status or reach the agreed supported contact route |
| Sign-in and account controls | Demo login; other actions partly decorative | Real identity/session/sign-out and functional approved account controls; correct accessible labels, errors and keyboard behaviour |

## Definition of done for each row

1. Owner-approved scope, inputs, rules, permissions and outputs are recorded.
2. Happy path and required validation/error paths work with actual stored records.
3. Save, reopen, edit/version and context isolation pass tests.
4. Results reconcile to approved reference cases where calculations/assessments apply.
5. Evidence, review and decision are traceable; no automatic authority is invented.
6. Applicable imports, exports and cross-app handovers work and are tested.
7. Keyboard/responsive usability and relevant access controls are tested.
8. User acceptance and engineering verification evidence are linked to requirement IDs.

Until then, record the row as incomplete, even if its screen is visually finished.
