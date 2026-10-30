# Amazon pricing specification and approval register

6 September 2026 · Prepared for sharing with Amazon · All items below remain open unless explicitly resolved with evidence.

FERN development will continue where the intended behaviour is known. This register identifies the specifications, source decisions and professional validation required from Amazon. Owner names and dates are not yet assigned. No approval is inferred from workbook formulas, draft documents or a local software test.

## Requested Amazon response

For each ID, provide a named owner, applicable source/version, decision, evidence, approval authority/date and any country/facility restrictions. Record changes against the same ID. A response may confirm the source rule, authorise a documented correction or identify the authoritative replacement. Keep the original evidence and the prior decision history.

| ID | Specification or approval required | Suggested Amazon owner | Evidence / question | Affected work | Interim FERN treatment |
|---|---|---|---|---|---|
| AMZ-PRC-01 | Authoritative workbook version and approved correction process | Pricing/Finance | Confirm supplied example versus production template; provide approved reference cases | All full-workbook costing | Preserve original and inventory; source does not automatically become approved method |
| AMZ-PRC-02 | Staff Rate Card PPK treatment | Payroll/Finance | Row 26 percentages present, related amount cells blank, cost subtotal excludes row 26 | Hourly rates | Warn; require reconciled rate evidence |
| AMZ-PRC-03 | Summary role/rate mappings | Pricing/Workforce | Summary C32:C39 refer to blank Staff Rate Card cells; C37 repeats C36 reference; B29 role differs from source heading | Summary staff-rate output | Do not automatically use Summary rates; map by explicitly confirmed role/grade |
| AMZ-PRC-04 | Multi-year mobile quantity and consumable basis | Facilities Engineering/Pricing | AB4 includes quantity; AE4 uses AB4; AQ4 multiplies by quantity again. Synthetic case gives 8,000 versus 800 under a single-quantity basis | Multi-year task costing | Record discrepancy; no silent correction or approved total |
| AMZ-PRC-05 | Frequency calendars, units and schedule conventions | Facilities Standards/Engineering | Maintenance daily weights differ by route (365 onsite, 260 mobile/subcontractor); some rows divide by 100; multi-year K “How often” is separate from frequency blocks | Maintenance/time/material/event costing | Preserve explicit unit and calendar; no universal 260/365 default |
| AMZ-PRC-06 | Compliance summary scope | Facilities Standards/Compliance | Maintenance R3/AA3/AL3 criteria ranges end at 605 while sum ranges end at 626 | Compliance hours | Flag unequal ranges and confirm intended population |
| AMZ-PRC-07 | Zero denominator and blank/zero policy | Pricing/Finance | Overheads F15:F18 reproduce #DIV/0!; some literal error-like strings also exist | Overhead allocation | Missing/undefined allocation stays unresolved, not plausible zero |
| AMZ-PRC-08 | Hourly rate basis, grade mapping and staffing measures | Workforce/Finance | Delivery Teams E2 = C2/2080 is an FTE-like ratio, not necessarily a whole-person headcount; confirm 2080 and pay/absence allocation | Delivery team import | Keep ratio separate from user-entered headcount; do not force into current headcount field |
| AMZ-PRC-09 | Tax, margin/markup and rounding rules | Finance/Commercial | Confirm taxable base, recoverability, rounding precision/stages, bundled overhead and profit | Comparable final prices | No automatic tax/profit/FX; identify component basis |
| AMZ-PRC-10 | Bundled scope and task-rate interpretation | Facilities/Pricing | Onsite labour, mobile time, consumables and subcontractor package overlap | Cost aggregation | Do not duplicate team labour in task costs |
| AMZ-PRC-11 | Actual/tender sources and licensed benchmark access | Procurement/Data owners | Approved datasets, effective dates, licence terms and interfaces | Cost-case comparisons | User-supplied traceable inputs only; no assumed subscription/API |
| AMZ-PRC-12 | Downstream cost mapping and overlap rules | Lifecycle and Pre-Contract domain owners | Approved line/category mapping and handling costs already in lifecycle outputs | Automatic downstream calculations | Issued references work; automatic aggregation remains pending |
| AMZ-PRC-13 | Amazon storage/hosting specification | Amazon IT/Engineering | Storage API, tenancy, regions, encryption, backup/recovery, deployment environments | Shared persistence | Browser-local operation only |
| AMZ-PRC-14 | Identity and access specification | Amazon Identity/Security | Identity provider, groups, site permissions, external access, session policy | Production user accounts | Demo sign-in is not production authentication |
| AMZ-PRC-15 | Formal approval policy | Governance/Finance/Business owner | Review roles, delegation, scope, thresholds, segregation, state transitions and immutable audit requirements | Approval workflow | Provisional only; issue/receipt is not approval |
| AMZ-PRC-16 | Independent domain acceptance | Engineering/Finance review leads | Named validators, approved populated examples, boundary cases, expected outputs and signed outcomes | Domain validation/release | Technical tests do not substitute for sign-off |
| AMZ-PRC-17 | Nonfunctional and operating requirements | IT Operations/Data owner | Retention/deletion, residency, expected scale, accessibility target, service/recovery/support targets | Production release | Document current limits; do not claim production readiness |

## Additional economic decision — open

**AMZ-PRC-18 — Economic method and rate applicability.** Suggested owners: Amazon Finance and Facilities Engineering. Confirm location/currency-specific inflation and nominal discount sources, effective dates, whether rates vary by year/category, price base date, payment timing, residual-value policy and approved examples. The implemented provisional convention uses first-year base prices, subsequent annual escalation and year-end discounting. Uniform manual rates are allowed for scenario analysis; they do not imply an approved country rate or Amazon policy. Formal approval remains blocked pending evidence under AMZ-PRC-16/18. This adds an eighteenth item to the original seventeen-item register.

## Confirmed product-owner direction

Staff Rate Card is the BB cost source. Pricing supports standalone use and feeds both Lifecycle and Pre-Contract directly. Date entry is DD-MM-YYYY; users choose currency. Shared storage, user accounts and formal approvals will be provided within Amazon, with details to be confirmed. These decisions do not need to be re-asked.

## Links to relevant specifications

- [Pricing PRD](../apps/pricing/PRICING-TEMPLATE-GENERATOR-PRD.md): PGT-D01–12 are retained; this register expands them into concrete Amazon requests.
- [Workbook mapping and reconciliation](../apps/pricing/PRICING-WORKBOOK-RECONCILIATION.md): evidence for AMZ-PRC-01–10 and current implementation implications.
- [P5 integration specification](P5-INTEGRATION-SPEC.md): AMZ-PRC-12–15 and 17.
- [Validation record](../verification/VALIDATION.md): AMZ-PRC-16 and release limitations.

Cross-reference: PGT-D01 → 01–07; D02 → 03/08; D03 → 04–06/10; D04 → 07/09; D05 → 11; D06 → 13; D07 → 14/15; D08 → 11; D09 → 12; D10 → 01/12; D11 → 17; D12 → 16.

## Development update — maintenance cost increment

AMZ-PRC-04/05/10 remain open. The application now offers an explicit provisional quantity/time/material schedule without modifying the source workbook. Its inputs and limitations are recorded in the Pricing PRD and User Guide. Implementing this method does not resolve the source-rule approvals. AMZ-PRC-12 downstream automatic aggregation and AMZ-PRC-13–17 production/domain requirements remain outstanding.

## Development update — manual cost comparisons

Manual actual/tender/benchmark comparisons are now implemented with compatibility gates and explicit review. AMZ-PRC-11 and AMZ-PRC-16 remain open: Amazon must confirm authoritative sources, licences, applicability and accepted domain cases. No external benchmark data access or business approval is inferred.

## Development update — downstream calculation

AMZ-PRC-12/16 remain open. Provisional whole-baseline addition or full asset-maintenance replacement is implemented under explicit site/currency/period/scope gates. Pre-contract recalculates eligible issued comparisons. Amazon must still approve category mappings, partial-overlap rules and independent reference cases. Economic adjustment, shared persistence and formal approval remain outstanding.

## Confirmed multi-currency requirement

The product owner explicitly requires currency selection at setup, including EUR, GBP, USD and others. This is implemented in Lifecycle and Pricing; matching selected currencies permit downstream combination. The prior GBP-only implementation restriction is removed. This product requirement is confirmed, not awaiting Amazon approval. Exchange-rate sources, conversions and economic assumptions remain separate from this selection.


## Staffing reference update — 7 September 2026

See [Staffing model requirements](STAFFING-MODEL-REQUIREMENTS.md) for the two user-supplied staffing/resource documents, proposed use in FM Contract & Service Model and FM Pre-Contract / Pre-Tender Assessment, and open Amazon decisions STF-01–08. These are documented requirements, not implemented staffing rules or formal policy approval.
