# Pricing workbook mapping and formula reconciliation

6 September 2026 · Technical review complete for this supplied file; business-rule approval outstanding.

## Result and limits

All nine worksheets and 15,288 populated cells were inventoried. All 6,980 formulas were evaluated with a constrained independent interpreter: 6,976 numeric results agree with the saved workbook values and four reproduce saved division-by-zero errors. There were no unsupported formulas or numeric mismatches for this file. This is cache reconciliation, **not proof that the business rules are correct**, an Excel certification or a completed application implementation.

The original workbook was not changed. No macros or external workbook expressions were executed. The interpreter covers this workbook's arithmetic, SUM, SUMPRODUCT, wildcard SUMIF and lazy IFS; numeric comparison uses absolute tolerance 0.000001 or relative tolerance 0.000000001. Five elementary known-answer cases and the synthetic quantity case below passed. The inventory preserves cell coordinates, formulas, direct reference tokens, cached/recalculated results, number formats, input values and lock flags. Lock flags are source metadata, not approval evidence. Formatting, validation lists and protection behaviour have not been certified in Excel.

Source: `BBM Pricing Template_(Example).xlsx`.

SHA-256: `438ae6467a5414b125aa184beb84b3b036f0f3ff97edca21c4dfc2086e463ea4`.

## Coverage and proposed application mapping

| Sheet | Populated cells | Formulas | Proposed destination and boundary |
|---|---:|---:|---|
| File control | 6 | 0 | Source provenance; authoritative version requires AMZ-PRC-01 |
| Summary | 295 | 180 | Derived summaries by service/route; reconcile to underlying lines, never treat cached zero as evidence of a free service |
| Maintenance | 13,231 | 6,008 | Task definitions, asset quantities, route, time, consumables and annual cost lines |
| Multi-year PMs | 282 | 139 | Recurring/event task costs; recurrence and quantity rules need approval |
| Staff Rate Card | 967 | 541 | Role-specific pay components and hourly rates; supported preview already exists |
| Delivery Teams | 173 | 103 | Assigned hours and annual labour cost, with FTE separated from headcount |
| Overheads | 81 | 9 | Allocated overhead lines; four formula errors require explicit resolution |
| Subcontractors | 58 | 0 | Supplier/service reference register; annual supplier fees are separate inputs |
| Drop down | 195 | 0 | Candidate reference values; governed code lists need confirmation |

### Maintenance columns

Row 4/5 headers define B description, C comment, D vendor scope, E APM object, F manufacturer, G model, H unit, I quantity and J route. K:P contain onsite duration inputs by daily/weekly/monthly/quarterly/half-yearly/yearly frequency; Q is weighted annual minutes, R quantity-adjusted hours and S consumables per unit. T:Y contain mobile duration inputs; Z annual minutes, AA quantity-adjusted hours, AB hourly rate, AC consumables and AD unit cost. AE:AJ contain subcontractor duration inputs; AK minutes, AL hours, AM hourly rate and AN combined unit cost. AO:AQ hold route totals and AR the selected route cost excluding onsite labour. AS:AU hold consumable description, comments and ownership; AV:BC contain change/impact information.

Preserve each row's explicit unit. For example R7 = Q7 × I7 / 60 / 100, and AR7 applies /100 after route selection. These divisors must not become a universal rule for every asset. Row 1 daily weights are 365 onsite and 260 for mobile/subcontractor. Store duration, recurrence, quantity, unit divisor and calendar independently in the target schema. Confirm their applicability under AMZ-PRC-05 and bundled-cost treatment under AMZ-PRC-10.

### Multi-year PM columns
Row 2: B:J identify task/asset/unit/quantity/route; K is “How often”. L:Q onsite frequency durations, R annual minutes, S hours and T consumables. U:Z mobile durations, AA minutes, AB hours, AC hourly rate, AD consumables and AE labelled unit cost. AF:AK subcontractor durations, AL minutes, AM hours, AN rate and AO combined unit cost. AP:AR are route totals; AS selected route cost excluding onsite labour. Confirm how the recurrence field produces dated events; annualised frequency arithmetic alone does not specify a 5/10/15/20/25-year cash-flow schedule.

### Rate card and teams
Staff Rate Card row 3 role headings and row 4 calculated hourly rates use repeated three-column blocks. C4 combines C6, C13, C27 and C40 for Site Manager. Preserve component and subtotal dependencies from the cell inventory; do not import each subtotal as an additional cost. Delivery Teams examples B2 = 20−3 weekly hours, C2 = B2×52 annual hours, E2 = C2/2080, F2 = Staff Rate Card C4, G2 = F2×C2. E2 is an FTE-like ratio and cannot be mapped uncritically to the current application's integer headcount. These source conventions require AMZ-PRC-08.

## Findings requiring Amazon decisions

| Evidence | Implication | Decision |
|---|---|---|
| Staff Rate Card B26/E26/H26 PPK percentages have blank C26/F26/I26 amounts; cost subtotal rows omit 26 | Source rates may omit a component; retain current warning | AMZ-PRC-02 |
| Summary C32:C39 point to Q4/T4/W4/Z4/AC4/AC4/AI4/AL4, all blank rate cells | Cached zeros are not reconciled role rates. Candidate rate positions are R4/U4/X4/AA4/AD4/AG4/AJ4/AM4; Amazon must confirm mapping | AMZ-PRC-03 |
| Summary B29 role name differs from Staff Rate Card I3 | Confirm role/grade equivalence rather than guessing | AMZ-PRC-03/08 |
| Summary H5/I5/J5 link to blank Maintenance R44/AA44/AL44 | Confirm whether blank group aggregate is intentional | AMZ-PRC-01/06 |
| Multi-year AB4 already contains quantity; AE4 uses AB4×AC4+AD4; AQ4 multiplies AE4 by I4 | Potential repeated quantity multiplier; see controlled example | AMZ-PRC-04 |
| Maintenance R3/AA3/AL3 SUMIF criteria end at row 605, sum ranges at 626 | Different range lengths; rows after 605 are outside the aligned criteria population | AMZ-PRC-06 |
| Overheads F15:F18 calculate 0/0 and reproduce #DIV/0!; F4:F7 contain literal error-like text | Undefined allocations need resolution, not replacement by zero | AMZ-PRC-07 |

### Synthetic quantity test

In memory only, set ten assets, quarterly 30 minutes per asset, mobile labour 40 currency units/hour and zero consumables in Multi-year row 4. The source gives AB4 = 20 hours and AQ4 = 8,000. An independent single-quantity calculation is 10 × 4 × 30 / 60 × 40 = 800. This demonstrates the quantity-basis discrepancy when the headings are interpreted literally. It does **not** authorise changing the workbook. The review pack includes exact test inputs/results.

## Development contract and next increment

The all-cell inventory and proposed sheet/column mapping are complete for this example. Approved semantic mapping, corrected reference outputs and full application formula parity remain outstanding. Pricing currently implements staff/team and additional annual costs; it does not execute the whole workbook. No application calculation was changed by this review.

Continue implementation using explicit task quantities, durations, unit bases, frequency calendars, material costs and recurrence; retain provenance and separate source calculations from any proposed corrected calculation. Test both rather than silently replacing source behaviour. Keep task labour separate from already-costed staff teams and bundled subcontractor fees. All unresolved rules remain provisional and gate the affected approval only. The cost-case comparison and downstream aggregation need separate scope/currency/date compatibility and overlap checks. Storage, identity and formal approvals require the Amazon contracts listed below.

See [Amazon decisions](../../amazon/AMAZON-PRICING-DECISIONS.md) for AMZ-PRC-01–17, [Pricing PRD](PRICING-TEMPLATE-GENERATOR-PRD.md), [integration requirements](../../amazon/P5-INTEGRATION-SPEC.md) and [validation record](../../verification/VALIDATION.md). Domain acceptance requires approved populated examples and independent Amazon Engineering/Finance review under AMZ-PRC-16.

## Review evidence

The separate Amazon review pack contains `BBM-workbook-formula-inventory.json` and `BBM-synthetic-reconciliation-case.json`. The inventory includes values from the supplied internal workbook; it is kept out of the engineering baseline ZIP intended for software handover. The source workbook itself is not bundled.
