# Lifecycle capability review and product-owner decisions

## Pricing output recipients

Product-owner clarification: Pricing Template Generator supplies its output directly to both Lifecycle Analysis and FM Pre-Contract / Tender Assessment. Lifecycle uses the pricing baseline for lifecycle cost calculations; Pre-contract uses the same pricing baseline for tender/commercial comparisons, alongside lifecycle results when relevant. Pre-contract must not depend on Lifecycle merely to receive Pricing output.

Both recipients must reference the same pricing baseline identifier and version, with site, scope, currency, price base date, line items, allocations, subtotals, source evidence, exclusions, validation gaps and provisional/approval status. Revised pricing must be identified as newer; existing assessments retain their referenced snapshot until deliberately updated. Handover does not imply approval. Avoid counting the same pricing costs again when combining direct pricing and lifecycle results.

Status: this is the agreed integration requirement and description for the future consolidated User Guide. The current application supports local saving and a downloadable calculation record; direct handover to either recipient is not yet implemented.

**Implemented BB pricing increment (6 September 2026):** Pricing now has a local Staff Rate Card import preview, source formula/PPK warnings, manual role/rate/hour/evidence inputs, provisional annual staff-cost calculation, site-keyed browser save/restore and a downloadable calculation record. Cached source rates are not automatically accepted. Cross-application handover, staffing feasibility, general workbook formula execution and professional approvals remain outstanding. See [BB pricing quick start](../pricing/BB-PRICING-QUICK-START.md).

6 September 2026. Review of the current implementation and supplied NRM3/BBM references. This is a requirements and source review, not a certification of NRM3 compliance or Amazon approval. No application behaviour changed in this review.

## What the current calculator does

The current FERN calculator is an initial renewal and direct maintenance-cost engine. NRM3 is the adopted calculation-method baseline; it is not the boundary of the intended Lifecycle application. Distinguish the NRM3 publication, its supporting spreadsheets, and the subset implemented in FERN.

| Requirement | Current implementation | Required extension |
|---|---|---|
| Asset quantity and classification | Editable physical records, imported hierarchy and classification lookup | Partial APM population, coverage by applicable system, arbitrary intake mappings |
| Age, condition, OEM life | Installation year, condition and reference-life evidence can be stored; numerical life/factors entered separately | Derived age, validated remaining life and engineer review; condition does not currently drive costs |
| Renewal costs and timing | Quantity × renewal extent × direct rate; recurring events at adjusted reference-life intervals after an explicit first renewal | Evidence-driven first renewal, approval history, more complete cost build-up |
| Maintenance costs | Multiple tasks; task quantity × direct rate × annual frequency, summed each year | Task duration, trade rates, competence, material/plant costs, quality and concurrent strategies |
| Site hours, environment and base date | Metadata can be retained | No automatic climate, operating-hours or economic adjustment exists |
| Five horizons | A user-selected calendar-year period, one run at a time | Simultaneous 5/10/15/20/25-year comparisons |
| Economics | Constant-price, undiscounted direct costs displayed in GBP | User-selected currencies, inflation, discount rates and discounted NPC |
| Failure and maintenance metrics | Not calculated | MTBI, MTBF, repair time, downtime, availability, repeat failures and reactive-work frequency |
| Blue Badge baseline and tenders | Not connected to BBM pricing workbook | Internal cost baseline, actual costs, original/renewal/new tenders and benchmark comparisons |
| Models, BXM tiers and strategy | Reference screens; no operational scenario engine | Facility defaults plus plant/equipment overrides, concurrent strategies and traceable comparison |
| Mandatory floor and approvals | Input validation and scope safeguards, no substantive compliance governance | Issue-specific provisional results, source applicability, competence and approval restrictions |
| Risk, resilience and ranking | Not calculated | Configurable evidenced framework, visible weights/calculations, decision record |
| Intake and persistence | Specific XLSX/XLSM schemas, FERN JSON backup, manual edits, explicit browser save | CSV, general JSON mappings, BBM pricing adapter, APM interface and shared audited storage |
| Reports | Annual direct-cost profile and draft Level 1/2 renewal/maintenance CSV grouping | Full lifecycle decision outputs, financial comparison and formatted reports |

Implementation evidence: `src/features/lifecycle/assetModel.ts`, `nrm3Calculations.ts`, `excelImport.ts`, `elementalReports.ts`, and the associated structure/editor panels. Displayed fields are not proof of implemented calculations.

Adjusted recurrence life is reference life multiplied by entered adjustment factors. First renewal is supplied explicitly; it is not inferred from condition or installation date. Maintenance costs repeat each full calendar year. Missing required data in any included asset currently blocks the assessment total, which differs from the newly requested issue-specific provisional workflow. Unknown values must remain unknown in the extension; a subtotal must disclose its coverage and cannot imply a complete site cost.

The supplied blank macro workbook provides register/classification support and formula-based scheduling, not the whole reliability/scenario product. Prior source review found fixed-date condition logic and scheduling limits requiring care. The DSA2 workbook is real-building evidence, not a complete priced reference case. See [NRM3 template review](NRM3-TEMPLATE-REVIEW.md).

## Product-owner requirements accepted for the next specification

These requirements record the user's instructions. They do not claim Amazon has approved supporting data, formulas or role definitions.

1. NRM3 remains the calculation baseline only. No requirement to populate every catalogue item. Actual site assets and documented population gaps define coverage.
2. Fully Blue Badge is the internal-staff cost baseline. IFM, IFM Hybrid and Fully Contained are comparison models. AFM remains unclassified pending Amazon confirmation.
3. A model combined with a tier is a scenario. Compare short-, medium- and long-term cost and consequences transparently; do not silently substitute tiers. Facility and individual plant/equipment can each have a model and tier assignment, with explicit overrides.
4. Amazon Facilities Standards and Compliance supplies/validates BBM mandatory requirements; higher local legal/regulatory requirements take precedence. Record jurisdiction, applicability, source version and owner. Unverified requirements retain provisional analysis with visible gaps and block the affected approval. Known violations cannot be offset by a better cost score.
5. Multiple maintenance strategies may coexist. Record the relevant task, asset, environment, frequency, competence and evidence. Core does not override mandatory maintenance. Planned run-to-failure requires an explicit permissible scope and rationale.
6. Record asset ownership, landlord/developer responsibility, warranty status and BB/YB task competence independently. Unclear responsibility is an open issue, not an exemption. The user's historical examples are context, not independently verified incident findings.
7. Develop an editable criticality/consequence framework covering safety, compliance, business interruption, redundancy, failure consequences and recovery capability. Mark it proposed until validated; explain dimensions and weights and preserve versions.
8. MTBI means mean time between incidents. Seek APM, Standards/Compliance and other available evidence, including BMS. Confirm source metric definitions, event deduplication, observation windows and timestamps before computation. Work-order closure time is not automatically repair duration or downtime. No recorded events does not imply infinite reliability when coverage is unknown.
9. Engineers approve OEM-life and maintenance-frequency adjustments based on operating hours, environment, condition and maintenance history. Preserve original OEM values, proposed values, evidence, rationale and approval.
10. Compare relevant historical FM costs, original tender prices, incumbent renewal and new bids with applicable benchmarks on aligned scope, service quality, price dates and currency. Prevent double-counting bundled labour and direct task rates. Cost/failure correlations do not establish cause.
11. User-entered economic inputs are the initial route: base date, currency, country inflation, discount rates and benchmark sources. Show undiscounted cash flow and discounted NPC at all five horizons. Clearly distinguish constant and nominal prices and consistent discount-rate bases; record timing conventions. Do not invent rates or treat a country choice as an approved rate feed.
12. Present cost, risk, resilience, compliance and confidence, with transparent recommendations and ranking. The site/facility business owner makes the final decision. Missing evidence is visible and cannot improve a score.

## Findings from the new BBM references

| Source and locator | Finding and implication |
|---|---|
| BBM Pricing Template_(Example), Summary A26:E44; Staff Rate Card rows 6–40; Delivery Teams A1:G28; Overheads | Useful wage, employment-cost, team-hour and overhead structure. Summary explicitly labels vendor rates and profit. The product owner subsequently confirmed Staff Rate Card as the BB cost/grade baseline. Preserve that designation alongside source version, role mapping and applicability; vendor labels elsewhere do not invalidate the owner’s clarification. The current importer does not support this pricing schema. |
| EU-UK BBM SLA table V5 Feb2026, EUK_CF-ATS and EUK_AMZL-AGS | Business-line-specific response/resolution rules and distinct clock definitions. Requires versioned applicability, not one global SLA. |
| CF-ATS MBR-QBR KPI Template 2025, APM data calc D5–D8 | Reactive-WO KPI describes timely completion, not reactive share of all work. Some deadlines differ from the 2026 SLA source; Amazon must confirm applicable rules. Contractual performance scores are separate from asset criticality. |
| BBM_Scope_AMZL_V1.6, maintenance/WO definitions and planning sections | Supports task/frequency/labour planning and specialist competence. CM appears in both proactive and reactive groupings; resolve mapping before metric calculations. Labour-hour ratios must not be confused with cost ratios. |
| Framework for BBM service quality and cost draft V3 | Proposes commercial/quality development and quantified improvement hypotheses. These are not calibrated default savings or life-extension factors. |
| New BBM_KPI_proposal_gap_analysis V1, slides 2–4 | Describes proposed new metrics, duplicate metrics and options alongside existing contractual KPIs. Treat proposal status explicitly. |
| BBM_fixed_scope_KPIs_SLA_for_FME Apr2026, slides 2–5, 10, 12–13 | Quantity × frequency × task duration, team allocation, limited reactive scope, diagnostic metrics and skills framework. These support a future time/trade cost engine; they are not currently wired into FERN. |
| BBM_fixed_scope_2024+BBM KPI V1.4 AU, slides 4–10 | Regional context, layered maintenance standards, task-hour costing and output metrics. Do not assume the AU presentation applies to every jurisdiction. |
| BBM_activites quality assurance for BBM Summit V1, slides 2–6 | Distinguishes work quality from record quality and transactional KPI performance. Reported percentages and savings are source claims/estimates, not global defaults. |
| BBM tasks quality assurance + APM mobile enhance V5 August2025, slides 4, 8–9 | Proposes task-appropriate photographic/measured evidence and pilots. A closed WO or a photograph alone does not prove competent, complete maintenance. |

Review used workbook cells/formulas and document/slide text. Embedded image-only charts were not independently transcribed, and Excel formulas/macros were not executed. Draft dates, filename dates and proposed rollouts do not independently establish current approval. Original supplied files remain unchanged and are not included in the engineering pack.

## Proposed industry framework and application boundaries

Use a documented failure-mode/consequence assessment as the starting point for criticality. [IEC 60812:2018](https://webstore.iec.ch/en/publication/26359) describes FMEA/FMECA and prioritisation based on failure effects and criticality. It does not supply an Amazon-approved logistics scoring matrix. Proposed FERN design: separate safety/compliance restrictions from a configurable business comparison; show raw dimensions, evidence, uncertainty and ranking sensitivity. Numerical scales, weights and thresholds require review.

For service-life adjustments, [ISO 15686-8](https://www.iso.org/standard/39070.html) provides a reference-life/factor-method framework but explicitly does not supply the modification-factor values. It therefore does not justify invented Dubai/sand/24-hour multipliers. Use engineer-approved asset-specific evidence and preserve uncertainty.

[RSMeans maintenance and repair data](https://www.rsmeans.com/2026-facilities-maintenance-repair-costs-book) describes in-house/outside-contractor costs, work frequencies and supporting location information. [BCIS OpX](https://www.bcis.co.uk/product/bcis-opx/) describes operating/maintenance costs, component-life information and UK regional/date adjustments. These are candidate benchmark sources; neither public product page establishes Amazon access, an API entitlement, or suitability for every country. Manual sourced entries remain the initial requirement.

Application division agreed by the product owner on 6 September 2026:

- Lifecycle owns asset evidence, maintenance/life assumptions, reliability, renewal and economic scenario calculations.
- Pricing owns staff/team/overhead build-ups and actual/tender/benchmark cost normalization, passing versioned inputs to Lifecycle.
- Pre-contract assessment consumes those results for commercial option comparison and the business-owner decision record.
- Shared governance owns requirements, applicability, competence, evidence gaps and scoped approvals. One versioned calculation engine serves the applications; avoid independent conflicting implementations.

Build in increments: first structured site/asset/requirements data and approved cost mappings; then scenario and task costing; then five-horizon economics; then defined reliability metrics and engineer-reviewed adjustments; finally transparent ranking and decision workflow. Each increment needs independently checked reference cases and explicit acceptance criteria before being called functional.

## Remaining targeted decisions

- Resolved by product owner: use the pricing workbook’s Staff Rate Card for BB costs/resource-grade cost bases. Remaining implementation details are role-to-grade mapping, applicable country/currency/date and handling source formula discrepancies.
- Resolved by product owner: Lifecycle, Pricing and Pre-contract ownership split, sharing underlying data and a versioned calculation engine.
- Amazon follow-ups: AFM classification; precise model boundaries including Fully Contained; applicable SLA/BBM versions and validators; APM access/schema/metric definitions; source coverage; licensed benchmarks; engineering approval authority and scoring policy. These are tracked gaps, not grounds to discard a provisional scenario.

## Subsequent clarification on BB costs and staffing

The product owner explicitly identifies `BBM Pricing Template_(Example).xlsx`, `Staff Rate Card`, as the source of BB costs/cost bases for Amazon resource grades. This resolves the previous source-selection question. It does not mean every example value is applicable to every country, date, grade or facility.

Inspected rate structure: row 3 holds role names; row 4 is hourly cost. For Site Manager, C4 = C6 + C13 + C27 + C40: base pay, additional costs, ancillary labour costs and service costs. Onsite Technician and Senior Technician follow the equivalent F/I columns. Preserve source role labels and explicit grade mappings; the worksheet’s role names alone do not establish Amazon L-level equivalence. Keep supplier profit and separate contract overheads identifiable and prevent double counting.

Source discrepancy: B26/E26/H26 contain a PPK percentage, C26/F26/I26 are blank, and C27/F27/I27 sum rows 16–25 while their percentage subtotals include row 26. Consequently that PPK line does not contribute to these role-cost totals as written. Preserve the original and flag this for validation; do not silently repair or treat the resulting hourly rate as fully reconciled. No source workbook was saved or altered.

Two new reference documents were reviewed by text/table extraction:

- **EU RME Standard Staffing Model — Overview:** describes salaried site-type/gearing requirements, technician maintenance workload, shift-coverage overrides and PSM inputs. FERN should distinguish staffing demand/coverage from cost rates and productive hours. The document identifies itself as an AI-prepared overview using OP2 2026 sources; the underlying approved matrix/model has not been supplied or independently verified. Do not hardcode its regional headcounts, growth figures or thresholds as universal rules.
- **FM Resource Classification — BB _ 3PBB _ YB _ GB:** explicitly marked draft. It separates employment/badge category, resource type, delivery model and tier. It describes BB as internal payroll, 3PBB as external resources working to an Amazon-defined scope, YB as external supplier resources and GB as agency support. It defines Fully Contained as external output-based delivery, rather than internal delivery, and leaves AFM unconfirmed. Record this as a draft source clarification for reconciliation with the earlier diagram. Workforce category must not automatically assign a tier or establish task competence.

Proposed data fields informed by these sources: resource category; employer/provider; role; Amazon grade where mapped; rate source/cell/version; currency and effective date; paid and productive hours; shift coverage; allocated FTE; service scope; competence/restricted tasks; delivery model; service tier. Staffing shared with MHE or other activities requires explicit FM allocation. Draft employment-duration and direction-of-work statements remain source assertions requiring applicable Amazon policy confirmation, not automatically enforced global rules.

The product owner subsequently agreed the proposed Lifecycle, Pricing and Pre-contract structure, including shared underlying data and calculation engine. This approves the product structure; it does not establish approval of the reference documents’ draft policies or imply that the expanded functionality is implemented.
