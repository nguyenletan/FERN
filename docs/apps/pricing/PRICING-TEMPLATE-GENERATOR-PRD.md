# FERN Pricing Template Generator Product Requirements Document

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


## Euro downstream verification — 6 September 2026

Positive in-app browser cases now verify EUR 4,800 additional-scope and EUR 4,600 full-maintenance-replacement results, persistence, currency mismatch blocking and Pre-contract EUR 88 / 10% difference. Remaining pound-specific rate and elemental labels were corrected. See [acceptance evidence](../../verification/PRICING-ACCEPTANCE-EVIDENCE.md) for executed cases and outstanding tests. The earlier positive-combination browser limitation is superseded; standalone browser/download assertions and Amazon domain acceptance remain open.

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


Version 1.0 · Consolidated engineering review draft · 6 September 2026

**Document status:** Consolidated specification for product, domain and engineering review. This document supersedes scattered Pricing requirements where they conflict. It does not establish Amazon approval of formulas, policies, reference data or production readiness. Open decisions have named owner roles and affected work. Application implementation is partial.

## 1 Purpose and product outcomes

Pricing Template Generator builds traceable FM cost baselines for individual facilities. It must function independently for cost planning and supply consistent, versioned pricing directly to both Lifecycle Analysis and FM Pre-Contract / Tender Assessment. Neither recipient is a prerequisite for preparing a pricing baseline.

The product owner has agreed the following ownership: Pricing owns resource, contractor, overhead, tender and benchmark cost preparation; Lifecycle owns asset, maintenance-strategy, reliability and lifecycle economics; Pre-Contract owns scenario/commercial comparison and the business-owner decision. Share calculation methods and data contracts rather than build competing implementations.

The full product must let users enter or import data, resolve issues, calculate supported costs, save/reopen work, compare aligned cost cases, review evidence, export usable outputs and hand versions to both recipients. Static screens, preview badges and disabled buttons do not fulfil those requirements.

Business outcomes to measure during pilot: completion of a site baseline; correctness against independently reviewed reference cases; traceability of cost lines; saved-work recovery; avoidance of duplicated costs; time to resolve input gaps; successful delivery and acknowledgement by both recipients. Numerical service targets require owner agreement and must not be fabricated.

## 2 Agreed scope and boundaries

| Area | Required outcome | Current state |
|---|---|---|
| Site cost planning | Standalone annual FM baseline | Partial: one browser-local draft per site |
| Staff Rate Card | Role/grade cost evidence and validated rates | Supported layout preview; rates entered after source review |
| Delivery teams | Cost allocation from staff capacity inputs | Direct hours or headcount/hour/allocation calculation |
| Overheads and subcontractor fees | Separate allocated costs and exclusions | Manual lines with subtotals |
| Maintenance and materials | Task quantities, frequencies, duration, delivery route, consumables | Planned |
| Multi-year PM | Dated events and identifiable annual cash costs | Planned |
| Workbook calculation | Complete approved mappings, formulas and reconciliation | Partial schema support; no general formula execution |
| Actual, tender and benchmark cases | Aligned evidence-based cost comparison | Planned |
| Save, export and recovery | Durable versioned records and usable outputs | Local save/restore; JSON download and preview re-import |
| Direct recipients | Same pricing version available to both apps | Local issued references implemented; automatic downstream calculation outstanding |
| Shared use and approval | Amazon storage, identity, permissions and approval records | Confirmed future provision; technical details TBC by Amazon |

Potential additional consumers include Contract & Service Model, launch/transition planning, performance reporting and finance. Their interfaces are future extensions, not committed integrations in this version. Pricing may hold costs for those use cases once their scope is agreed.

Pricing does not approve procurement, infer competent staffing from headcount, decide a service tier, override maintenance obligations, grant benchmark licences, or manufacture rates. Country-specific inflation, discounting and five-horizon present-cost analysis belong to Lifecycle's economics; Pricing supplies identified base-date inputs and any explicitly sourced cost schedules. Currency selection alone never applies FX conversion.

## 3 Users and authority

Proposed roles for Amazon confirmation:

| Role | Intended responsibility |
|---|---|
| Site/FM author | Define scope, enter/import data and prepare a draft |
| Pricing/commercial specialist | Map costs, reconcile formulas, prepare comparable cases |
| Facilities/engineering reviewer | Validate technical scope, task assumptions and competence restrictions |
| Finance reviewer | Validate financial basis, rate applicability and commercial treatment |
| Authorised approver | Approve the defined pricing scope within delegated authority |
| Business owner | Decide the facility's eventual service arrangement using downstream assessments |
| Administrator/integration owner | Manage authorised reference versions, mappings and interfaces |
| Read-only reviewer | Inspect permitted records and lineage |

These are responsibilities, not implemented access roles. Amazon will provide shared storage, user accounts and formal approvals. Authentication provider, group mappings, segregation of duties, delegations and authority thresholds remain open. The present demo sign-in is not access control.

## 4 User journeys

### Standalone baseline

1. Select an authorised facility and create or reopen a named cost case.
2. Define scope, price date, currency, analysis period and tax/commercial basis.
3. Import source files or enter available information; review mappings, discrepancies and exclusions before applying changes.
4. Prepare staff/team, maintenance, material, overhead, subcontractor and applicable commercial costs.
5. Review subtotals, trace calculations and resolve material gaps or explicitly limit the priced scope.
6. Save a draft; submit for applicable review; export a provisional or approved output with its actual status.

Current UI offers four section links: basis/sources, staff/teams, additional costs, review/save. The in-app guide must describe actual functionality and distinguish planned features.

### Cost comparison

Create separately identified existing actual, original tender, incumbent renewal, alternative tender or benchmark cases. Align site, service scope, task frequencies, quality requirements, delivery model/tier, included assets, price date, currency and period. Display differences alongside missing coverage and normalization assumptions. Show a raw comparison separately from any adjusted comparison. An incomparable case must not receive a misleading ranking.

### Recovery

Save explicitly and reopen the same record. Preview a downloaded record before replacing a draft. Validate record schema and site; recalculate from inputs rather than trust exported totals or status. Failed import/save preserves existing work. Future shared edits require conflict detection; one author's changes must not silently overwrite another's.

### Issue and consume

Issue an identified pricing version. Both recipients load it directly, select a version deliberately and retain their choice until updated. Show newer versions without silently replacing referenced inputs. Retain issue/receipt status separately from approval and from successful incorporation into a calculation.

## 5 Data requirements

All material fields need source, version/effective date, owner where known, validation state and applicability. Missing, zero, excluded, not applicable, conflicting and unverified values must remain distinct.

| Entity | Required fields and behaviour |
|---|---|
| Cost case | Stable ID, revision, facility/site ID, title, purpose/type, scope and exclusions, author, timestamps, currency, base date, period, status and method version |
| Facility context | Country/location, facility type, operating pattern and complexity, relevant service scope; provenance rather than inference from site code |
| Resource | Stable ID, role, optional mapped Amazon grade, BB/3PBB/YB/GB category, employer/provider where relevant, cost source and competence boundary |
| Staff rate | Base pay, additional employment costs, ancillary labour costs, service costs, applicable hourly basis, source cells/formulas, reconciliation notes and selected calculation rate |
| Team allocation | Resource/role link, direct/team mode, total allocated paid hours or headcount + paid hours per person + FM allocation; separate productive hours and shift requirements where available |
| Asset/task | Source asset ID, classification if available, quantity/unit, task, strategies, frequency/unit, duration/unit, delivery route, trade/competence, materials, source obligation and inclusions |
| Multi-year task | First due date, recurrence interval, quantity, task/rate basis, delivery route, event costs, priced period and uncertainty |
| Additional cost | Stable ID, category, description, annual gross cost, FM allocation, treatment, supplier if applicable, evidence and scope |
| Commercial item | Type, amount/rate, application base, tax treatment, markup/margin distinction, effective period, inclusion and evidence |
| Comparison | Case/version references, common scope, normalization inputs, exclusions, differences and confidence/gaps |
| Review/issue | Scope of decision, version, reviewer/authority, outcome, rationale, exceptions, evidence, timestamp and recipient acknowledgements |

**Display conventions:** dates DD-MM-YYYY; internal interchange dates ISO YYYY-MM-DD. Currency dropdown includes EUR, USD, GBP and other supported currencies; show code as well as symbol to avoid ambiguity. Do not infer an Amazon grade from a job title. Separate resource classification, service model and BXM tier.

Existing implementation fields are documented in `staffCosts.ts`, `additionalCosts.ts` and `pricingHandover.ts`. Current v1 saved records have optional team/additional-cost fields for backward compatibility. They do not yet represent the full target schema above.

## 6 Source and workbook mapping

**Amazon decisions AMZ-PRC-01–08:** [full workbook review](PRICING-WORKBOOK-RECONCILIATION.md) now records all cells/formulas and source discrepancies. [Decision register](../../amazon/AMAZON-PRICING-DECISIONS.md) retains unresolved mapping and rule approvals.

Primary supplied workbook: `BBM Pricing Template_(Example).xlsx`. The product owner explicitly identifies **Staff Rate Card** as the BB resource cost baseline. The source's example values are not automatically applicable across countries, periods or grades.

| Worksheet | Intended mapping | Current support / constraint |
|---|---|---|
| File control | Source version, authorship and workbook context | Reference review; automated controlled mapping pending |
| Summary | Reconciled cost/category and delivery-route totals | No direct formula import |
| Maintenance | Asset quantities, task frequency/duration, onsite/mobile/subcontractor routing, consumables | Cell/formula inventory complete; semantic rules and application mapping pending |
| Multi-year PMs | Asset/task scope, recurrence, delivery route, time and costs | Mapping pending; schedule rules require validation |
| Staff Rate Card | Role headings row 3; hourly rate row 4; base/additional/ancillary/service components | Supported fixed-layout preview; source cached values kept separate from calculation rate |
| Delivery Teams | Role, weekly/annual hours, shift, headcount, wage/hour, annual wages and utilisation | Equivalent manual team calculation only; workbook import pending |
| Overheads | Central support, IT/helpdesk/equipment and FM allocation | Manual additional-cost equivalent; import pending |
| Subcontractors | Service categories, descriptions and candidate supplier names | Supplier register, not automatically an annual-fee table; cost mapping must be explicit |
| Drop down | Reference lists and allowed values | Controlled reference mapping pending |

For example, Site Manager hourly total at Staff Rate Card C4 references C6, C13, C27 and C40. A reviewed discrepancy exists for the first three roles: PPK percentage inputs appear in B26/E26/H26, cost amounts C26/F26/I26 are blank, and cost subtotals omit row 26 while percentage subtotals include it. Preserve and flag this; do not silently repair the source or assume approval of a correction.

A production mapping specification must enumerate every supported header/range, target field, data type/unit, transformation, inclusion rule, formula dependency, rounding rule, validation message and reference case. The all-cell inventory and proposed column mapping are now recorded in the workbook review. Approved semantic transformations, rounding rules and accepted reference cases remain outstanding.

Import requirements: preview before apply; distinguish manual inputs, cached formula values and formulas; detect unsupported layouts, duplicate keys, invalid values and conflicting mappings; preserve edited inputs unless replacement is deliberate. Never execute VBA or arbitrary imported expressions. Source workbook files remain unchanged. Add Excel/CSV/schema-defined JSON routes as appropriate without treating arbitrary files as supported templates.

## 7 Calculation requirements

**Amazon decisions AMZ-PRC-04/05/08–10:** quantity, calendar, staffing, commercial and bundled-cost rules require evidence-backed confirmation. Development may continue with explicit configurable inputs; no proposed correction is an approved source rule.

### Implemented provisional arithmetic

- Direct allocated hours: user-entered total hours for the role and scope.
- Team allocated hours: headcount × annual paid hours per person × FM allocation / 100.
- Staff cost: selected hourly rate × allocated paid hours. Only the selected hours method contributes.
- Additional cost: annual cost before allocation × FM allocation / 100.
- Combined annual baseline: staff + additional overheads + additional subcontractors. Items already included elsewhere or outside scope are retained but not added.

Current rules require positive hourly rates, non-negative hours/costs, whole-person headcount, FM allocation from 0–100%, valid date/currency and evidence for included costs. The current annual paid-hours cap is 8,784 per person. Fractional shared effort is expressed through allocation; a future FTE input must be explicitly distinguished from headcount. Zero additional cost can be valid when intentionally entered; blank is not zero.

The current engine uses JavaScript numbers and displays two decimal places. This is not a complete approved currency/minor-unit or financial-rounding policy. Production must define decimal precision, rounding stages and currency display rules with finance and reconcile totals accordingly.

### Required complete costing

Maintenance labour demand must be derived from asset/task quantity × occurrences in the priced period × minutes per unit / 60, with validated units and frequency calendars. Annual frequency must not silently use 260, 365 or another working-day assumption taken from an unrelated source. Apply trade/team rates only where that labour is not already funded in another line.

Keep three concepts separate: maintenance workload hours, paid staffing cost and productive/coverage capacity. Onsite staff costs must not be added again as task labour. Mobile, specialist and subcontractor routes require an explicit cost basis and scope. Materials may be per event, per asset or lump sum; record the basis and avoid duplicating consumables in bundled supplier rates.

Multi-year tasks must show dated events and annual cash costs. An annualised reserve is a different output and must not be added to the same scheduled event cost. Recurrence, first occurrence, partial-period rules and overdue-task treatment need domain approval.

Tax, profit, overhead recovery, mobilisation and demobilisation must be explicit components when applicable. Distinguish markup on cost from margin on revenue. Do not infer either or apply both by default. Pricing must retain the appropriate cost-category breakdown for Lifecycle's economics and Pre-Contract's commercial comparison.

## 8 Requirements and acceptance register

The existing FERN-PRC-001–009 identifiers remain valid; the requirements below clarify their full acceptance scope.

| ID | Requirement | Acceptance evidence |
|---|---|---|
| PRC-001 | Complete site/scope and cost inputs | Enter/import each in-scope category; invalid required inputs produce specific messages; excluded records remain traceable |
| PRC-002 | Controlled workbook/field mappings | Supported reference fixtures map to expected fields; unknown layouts/conflicts cannot silently become zero |
| PRC-003 | Validated formula inventory | Independent workbook/reference results match declared precision; rates, calendars, bundles and rounding are traceable |
| PRC-004 | Persistent versioned calculation records | Reopen exact input/method/output version; failed saves preserve work; shared conflicts are detected |
| PRC-005 | Export and handover | Schema-validated output goes directly to both recipients with status and lineage; receipt does not imply approval |
| PRC-006 | BB rate baseline | Synthetic 40/hour × 1,200 hours = 48,000; source cached rate never silently becomes validated rate |
| PRC-007 | Team allocation | 2 × 2,000 × 50% × 40 = 80,000; direct and team hours are never summed |
| PRC-008 | Additional costs | 48,000 + 10,000 × 50% = 53,000; included-elsewhere gives 48,000; invalid additional cost blocks combined total |
| PRC-009 | Recovery and versioned references | Re-import recalculates; wrong-site data rejected; both recipients can select the same version independently; later edits preserve prior snapshots |
| PRC-010 | Maintenance/material costing | Synthetic task with 10 units × 4 visits × 30 minutes produces 20 labour hours; bundled onsite labour is not added twice; materials use declared basis |
| PRC-011 | Multi-year events | A synthetic event schedule matches independently enumerated dates and costs, including period boundaries; reserves remain separate |
| PRC-012 | Cost-case comparison | Align two cases or explain incompatibility; show raw/normalized differences and inclusion changes without inventing missing values |
| PRC-013 | Review and approval | Only authorised reviewers act within scope; pending requirements remain visible; edits to approved inputs create a new reviewable version |
| PRC-014 | User guidance and accessibility | User completes the journey with labels, keyboard access and understandable errors; guide matches current features and limits |

Current automated/browser evidence covers implemented subsets of PRC-001–009. It does not certify PRC-003 full workbook reconciliation, production persistence, approval or the planned requirements.

## 9 Outputs and integration contract

**Amazon decision AMZ-PRC-12:** downstream category mapping and overlap rules require approval before automatic totals can be considered validated.

Pricing output must serve standalone records and both direct recipients. Required target envelope:

| Field group | Content |
|---|---|
| Identity | Schema version, pricing baseline ID/revision, site/context ID, issue timestamp and method version |
| Basis | Currency, price base date, cost period, tax/commercial treatment, scope, inclusions and exclusions |
| Costs | Staff/team/task/material/overhead/subcontractor/commercial lines, stable IDs, units, allocations, categories, annual/detailed schedules and subtotals |
| Evidence | Source identifiers/versions/cells, mappings, assumptions, reconciliation results, missing inputs and validation status |
| Governance | Draft/provisional/review/approval status, scoped decisions, exceptions and authority references |
| Delivery | Recipient, requested action, selected source revision, acknowledgement/error and correlation/idempotency identifiers |

**Lifecycle consumer:** map pricing components to operational/maintenance cost categories and event schedules, identify overlap with existing task costs, and apply separately approved economic assumptions. Receipt alone must not add an annual staffing total to all existing maintenance costs.

**Pre-Contract consumer:** receive Pricing directly for tender/case comparison; also reference Lifecycle outputs where needed. Use source line IDs/categories to avoid aggregating the same annual costs both directly and through lifecycle results.

Current local issues contain ID, revision, timestamp, provisional status and baseline inputs; receivers recalculate subtotals and store independent selections. They provide reference handover only. Current history is browser-local, limited to 200 issues per site and not tamper-proof. Target APIs, permissions, acknowledgements, conflict handling and durable audit storage remain to be implemented with Amazon.

Current JSON records can be downloaded/re-imported. A usable reconciled pricing workbook is required for the complete generator, with approved layout, formulas and output mapping. Human-readable report formats and PDF/CSV requirements require confirmation; do not promise them as implemented.

## 10 Validation and governance

**Amazon decisions AMZ-PRC-14/15:** identity permissions and formal approval policy remain open. Provisional issue/receipt does not confer approval. Track issue-specific blockers in the [Amazon register](../../amazon/AMAZON-PRICING-DECISIONS.md).

Allow provisional scoped analysis when valid priced inputs exist and unresolved requirements are clearly identified. Missing material costs must not create a falsely complete total. A known subtotal can remain visible while the affected combined result is blocked. Unverified mandatory requirements must block the relevant approval and remain visible; the scenario and its evidence are retained.

Production review states must distinguish draft, provisional issue, submitted review, approved scoped version, rejected/returned and superseded. The exact state machine and approval permissions require Amazon confirmation. Current local records support provisional status only; authored evidence text is not professional sign-off.

Record author/reviewer, scope, source version, reason, time and decision. Changes invalidate dependent results where appropriate and must not silently retain approval. Mandatory requirements, competence and responsibility boundaries are sourced from applicable Amazon/local requirements; the application must not infer exemption from warranty or landlord responsibility.

## 11 Nonfunctional requirements

**Amazon decisions AMZ-PRC-13/14/17:** hosting, shared storage, identity and operating specifications remain to be supplied; no provider or service target is inferred.

- Enforce identity, site/role authorisation and approval permissions server-side in production. Browser-local demo behaviour is not a production security model.
- Preserve data on failed imports/saves, validate schema/version and detect concurrency conflicts. Design recovery/backup, retention and deletion with Amazon data owners.
- Keep source and operational records out of public repositories and test fixtures; use synthetic examples. Confirm approved data classification, residency, encryption, logging and secret management with Amazon.
- Make all inputs labelled, errors actionable, navigation keyboard-operable and layouts usable at narrow widths. Test focus, screen readers, contrast and responsive layouts; screenshots alone do not establish accessibility compliance.
- Define expected sites/users/rows, latency, availability, recovery objectives and support ownership before production acceptance. Current file limits are implementation limits, not agreed service targets: Excel/JSON intake 15 MB; saved roles/additional lines up to 1,000 each; local issue history up to 200.
- Version calculation methods and imports; retain regression cases and dependency/update procedures. Report failures without leaking credentials or sensitive source content.

## 12 Release and verification gates

**Amazon decision AMZ-PRC-16:** independent Engineering/Finance acceptance remains required. Workbook cache agreement is technical evidence only; the source review identified four existing formula errors and unresolved business-rule discrepancies.

| Gate | Deliverable | Completion condition |
|---|---|---|
| A Local baseline | Working staff/team/additional costs and recovery | Implemented subset regression tests and user workflow checks; existing saves retained |
| B Complete costing | Approved worksheet mappings, maintenance/material and multi-year engine | Formula inventory and independent reference-case reconciliation |
| C Comparison and outputs | Actual/tender/benchmark cases, workbook/report output | Aligned comparisons, traceable outputs and user acceptance |
| D Downstream calculation | Pricing incorporated into both recipients appropriately | End-to-end tests demonstrate mapping, version changes and no double counting |
| E Amazon shared service | Storage, identity, permissions, audit and approvals | Amazon-approved configuration, security/recovery verification and operational support |
| F Production release | Usable complete workflow | All in-scope gates pass; unresolved material decisions are not disguised as completion |

As of this draft, 51 automated tests and typecheck/build pass across the implementation. Focused browser checks cover costing, date/currency handling, save/restore, additional-cost treatments and local direct handover. Full standalone browser regression, file-restore browser verification, professional formula validation and production acceptance remain outstanding. See VALIDATION.md for detailed history.

## 13 Decision register

| ID | Decision / required evidence | Owner role | Impact |
|---|---|---|---|
| PGT-D01 | Approved pricing workbook/version and PPK discrepancy resolution | Amazon pricing/finance owner | Full rate reconciliation and workbook calculation |
| PGT-D02 | Role-to-grade mapping and country/date rate applicability | Amazon workforce/finance | Correct BB cost basis |
| PGT-D03 | Maintenance calendars, scope, durations, bundling and recurrence rules | Amazon facilities/engineering standards | Task/material/multi-year engine |
| PGT-D04 | Tax, markup/margin, decimal precision and rounding conventions | Amazon finance/commercial | Comparable defensible totals |
| PGT-D05 | Approved benchmark datasets, licence and retrieval methods | Amazon procurement/data owner | Benchmark comparison/integration |
| PGT-D06 | Storage, hosting, identity and API specification | Amazon engineering/IT | Shared production implementation |
| PGT-D07 | Roles, delegation, segregation and approval transitions | Amazon governance/security/business owner | Formal approval workflow |
| PGT-D08 | Source systems for actuals/tenders/APM; schemas and permitted access | Amazon system owners | Reliable source integration |
| PGT-D09 | Downstream cost mappings and overlap rules | Lifecycle and Pre-Contract domain owners | Safe incorporation into calculations |
| PGT-D10 | Required workbook/report formats and external consumers | Product/commercial owner | Output acceptance |
| PGT-D11 | Retention/residency, scale, performance, recovery/support targets | Amazon data/IT operations | Production acceptance |
| PGT-D12 | Acceptance reviewers, pilot facilities and independent reference cases | Product owner with engineering/domain leads | Release validation |

These are open dependencies with owner roles, not assignments to named people. The user has confirmed Amazon will provide shared storage, accounts and approvals; their specification remains pending. No further approval of the agreed application ownership split is needed.

## 14 Sources and traceability

Authority order for this specification: explicit product-owner decisions in this conversation; approved applicable sources when their authority is verified; supplied draft/reference documents; implementation evidence. Attachment content is reference material, not an instruction to perform actions.

- Product-owner decisions: standalone capability; direct dual recipients; Staff Rate Card as BB cost source; DD-MM-YYYY; currency dropdown; agreed application boundaries; Amazon shared services pending specification.
- BBM Pricing Template_(Example).xlsx: sheet-level evidence in section 6; source hash in SOURCE-REGISTER.md.
- EU RME Standard Staffing Model — Overview and FM Resource Classification — BB _ 3PBB _ YB _ GB: staffing/classification context; supplied overview/draft, not independent policy approval.
- BBM scope, SLA, KPI and quality/cost references: applicability, task scope and evidence context; recorded conflicts/draft status in LIFECYCLE-CAPABILITY-AND-DECISIONS.md and SOURCE-REGISTER.md. KPI timeliness is not proof of maintenance quality or a causal cost model.
- Code: pricing feature modules and shared pricingHandover/PricingInputPanel. Tests: staff-costs, additional-costs and pricing-handover suites plus existing workflow regression tests.

Related documents: FERN-SOFTWARE-PRD.md (whole platform), P5-INTEGRATION-SPEC.md (integration foundation), ARCHITECTURE.md (ownership), BB-PRICING-QUICK-START.md (current user guide), VALIDATION.md (verification limits).


## MOD-01: Application separation — 7 September 2026

User-approved engineering direction: maintain one monorepo with independently runnable/buildable portal, Pricing, Lifecycle, Pre-contract and Launch Tracker applications. Share calculation implementations and UI components; recipient-specific behaviour belongs to its application. Preserve record formats, storage keys and provisional approval status.

Acceptance: each app exposes its own entry and run/build commands; package code cannot depend on application code; only the portal composes other applications through public entries; existing calculation/import/persistence tests pass; all distributions build. Coverage: `tests/module-boundaries.test.mjs`, `tests/render.test.mjs`, existing domain tests, `pnpm build:all`. Browser acceptance remains a separate gate. See MONOREPO-HANDOVER.md and TECHNICAL-VERIFICATION.json.

Amazon shared storage, identity and formal approvals remain pending specification and acceptance. Independent local origins do not share browser storage automatically.

## Fixed issue file transfer — 10 September 2026

The issued-baseline handover now supports a controlled JSON download from Pricing and preview/confirmation import in standalone Pre-Contract. Transfer preserves source ID/revision, dated inputs and evidence; receivers calculate results again and deliberately select the issue. Inputs remain provisional and old selection references are retained. Receipt is not approval or automatic scope compatibility. This implements a bounded part of FERN-PRC-005 / FERN-PCA-003; see [contract, acceptance tests and limitations](../pre-contract/PRE-CONTRACT-PRICING-TRANSFER-2026-09-10.md).

Verification: typecheck, 131 tests, all builds, website browser suite and new separate-origin transfer browser suite pass. Pricing standalone facility selection, Lifecycle import UI, shared authenticated delivery and versioned PDF reports remain outstanding.
