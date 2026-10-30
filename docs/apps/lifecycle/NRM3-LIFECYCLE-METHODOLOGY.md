# FERN Lifecycle Assessment: NRM3 methodology baseline

**Source review update:** DSA2 is a real Amazon building, confirmed by the product owner. The supplied macro template, 2026 logic table and Appendix E/F files require revision of import, asset structure and reporting. [Review findings and revised baseline](NRM3-TEMPLATE-REVIEW.md) supersede earlier assumptions that these sources were unavailable or unreconciled. The workbench remains an initial implementation.


**Implementation update, 6 September 2026:** Lifecycle now has a working local assessment: FERN JSON import, editable asset records, explicit browser save/restore, backup download, recurring renewal and simplified task-rate maintenance calculations, annual CSV profile and a JSON calculation record. See [quick start and limits](LIFECYCLE-QUICK-START.md). Earlier statements below about unconnected primitives/reference UI describe the baseline before this increment. Full NRM3 scope, economic evaluation and multi-user governance remain outstanding.

Draft v0.1, 6 September 2026. Product direction: the Lifecycle & Asset Analysis application must follow NRM3 principles and methodology. This instruction is confirmed by the product owner; project-specific inputs and professional validation are separate matters.

## Authoritative method and reference data

The supplied **NRM 3 Introduction.pdf** is the complete 668-page RICS NRM3 second edition, October 2021, effective 1 December 2021. Page references below distinguish printed pagination from physical PDF pages. RICS states that the October 2022 reissue changed its category to practice information without material content changes. The current RICS page also provides a 2026 Logic and Level Table, which should be version-checked when implementing classification; it has not yet been reconciled to this workbook. [RICS NRM source page](https://www.rics.org/profession-standards/rics-standards-and-guidance/sector-standards/construction-standards/nrm).

The supplied **NRM3_Asset_Register_DSA2_Main_FC_v1.1.xlsx** is a project input/reference register. It is not the NRM3 standard, a validated calculation engine or proof that its classifications, service lives and source claims are correct. The workbook contains 127 main asset rows and no Excel formulas. No asset records or full RICS publication have been copied into the GitHub handover package.

## Required method

| Requirement | Implementation and acceptance | NRM3 source |
|---|---|---|
| FERN-NRM-001: agree the brief | Record purpose, scope, exclusions, facilities, estimate/cost-plan stage, base date, currency, horizon and reporting basis. No fixed universal 25-year horizon | §§2.5–2.7; printed pp37–41 / PDF pp44–48 |
| FERN-NRM-002: elemental structure | Preserve group element, element, sub-element and maintainable component, plus code-table version. Validate mapping and separate local extensions from standard codes | §2.4 and Part 6 |
| FERN-NRM-003: renewal and maintenance scope | Store separate R and M scope, actions, quantities, units and cost categories. C/O/E and other wider costs enter only through explicit scope and remain distinguishable | §§2.2–2.5 and Appendix B |
| FERN-NRM-004: service-life evidence | Store RSL value/source/version and assumptions, project life factors and supporting evidence; multiply factors to obtain predicted life. Do not equate a condition label with an automatic universal factor | §5.3, Table 5.2; printed pp110–112 / PDF pp117–119 |
| FERN-NRM-005: existing asset condition | Retain installation-date provenance, survey date, condition, remaining-life/PARL evidence, proposed action and renewal extent. Distinguish full predicted life from remaining life of an existing asset | §4.7 and §5.4, Table 5.3 |
| FERN-NRM-006: repeat renewals | Generate every applicable renewal event within the agreed horizon, with first-event and subsequent-cycle rules separately defined. Preserve partial renewals/subcomponents; prevent parent/child double counting | §5.2, Table 5.1 and §5.4; PDF pp115–122 |
| FERN-NRM-007: renewal pricing | Use renewal quantity × renewal unit rate per event. If deriving a renewal rate from construction, retain rate adjustment and renewal uplift separately; allow evidenced direct renewal rates | §5.2, Table 5.1; PDF pp115–117 |
| FERN-NRM-008: maintenance pricing | Support task quantities, frequency, time, trade, normal/out-of-hours labour, site/access adjustments and consumables/plant as applicable. A direct task-rate model must state what its rate includes | §5.5, Table 5.4; PDF pp123–127 |
| FERN-NRM-009: allowances and economic basis | Separate on-costs, fees, risk, inflation and taxation where applicable. Record exclusions/inclusions and consistent real/nominal basis. Discount only for the stated evaluation purpose, using an explicit rate | Parts 3–4, Appendix B, Appendix C |
| FERN-NRM-010: reports and review | Report R/M by asset and hierarchy, annual event/cost profiles, assumptions, gaps, source versions and calculation lineage. Support comparisons on equivalent scope and client review of final output | §2.5, §§5.6–5.7, Appendices E/F |

## Calculation definitions

Rates/factors below are decimal values, not percentage integers. These equations do not select or approve project inputs.

- Overall life factor = product of the applicable individual life factors.
- Predicted life = reference service life × overall life factor. NRM3 Table 5.2: 25 × 1.1 × 1 × 1 × 1 × 0.8 × 1 × 0.8 = 17.6 years, displayed in the example as about 18. Preserve full precision; establish the project's date/year-bucketing convention explicitly.
- Renewal quantity = asset quantity × renewal extent.
- Derived renewal unit rate = construction unit rate × construction-rate adjustment × (1 + renewal uplift).
- Renewal event cost = renewal quantity × renewal unit rate.
- Total renewal cost at a constant unit rate = cost per event × occurrences in scope. With changing rates/indexation, sum separately calculated event costs.
- Maintenance cost must follow the selected pricing basis. The workbook's rate × quantity × annual frequency is a simplified task-rate model, not a substitute for NRM3's full trade/time approach in every case.
- Discount factor = 1/(1+r)^t; present cost = event cost × discount factor. The supplied Appendix C2 contains an ambiguous first PV equation, but explicitly prints the reciprocal discount factor. Verify the full economic implementation against an agreed reference calculation before use; no financial engine is enabled by this update.

The new `src/features/lifecycle/nrm3Calculations.ts` implements tested primitives for life factors, renewal quantities/rates/costs and recurring event timing. It is not yet wired to editable records, imports, persistence, a complete costing run or reports. Currency rounding, inflation/discounting, labour costing, remaining-life assessment and client approval are not silently added.

## Workbook mapping

| Sheet / range | FERN target and handling |
|---|---|
| 1. Cover Page A5:B19 | Site/context, provenance, version, scope and horizon; date/build assumptions stay labelled as assumptions |
| 2. NRM3 Hierarchy A1:D119 | Versioned classification/mapping; verify against the selected authoritative logic table |
| 3. Asset Register A1:W128 | Main asset records; retain stable row reference and code as text; separate quantity/UoM, OEM/CIBSE RSL, condition, installation year, rates, renewal years, review state and location |
| 4A. Supplementary A1:L23 | Parent/component relationships and independent scope; do not add subcomponent costs twice |
| 5. Maintenance Schedule A1:P128 | Applied maintenance standard, APM/SFG20 references, frequency, quantity/rate, statutory flag and review state; validate missing or ambiguous values |
| 6. 25-Yr Renewal Schedule A1:AG128 | Reference schedule 2026–2050 inclusive; regenerate recurring events using a documented method rather than importing it as a complete calculation |
| 7. Cost Summary A1:F6 | Reporting shape; its Combined column cannot mix one-off renewal cost and annual maintenance without an agreed common period/basis |
| 8. Lookups A1:E15 | Project lookup/condition rules, kept separate from the NRM3 methodology |
| O&M Source A1:I226 | One-to-many evidence links, including document and section references; referenced files have not been verified in this task |
| Gap & Review Summary A1:K119 | Distinguish an evidenced record needing completion from an expected item not evidenced |
| Change Log A1:E15 | Import provenance and change history; retain source assertions without converting them into approval |

## Reconciliation findings

1. **Costs unavailable:** Asset Register I2:I128, P2:Q128 contain TBC quantities and rates for all 127 rows. Import these as missing with source reason, never zero. Cost totals remain unavailable until the relevant inputs are validated.
2. **Review states:** Asset Register V2:V128 contains 102 Review, 16 Undetermined and 9 Auto records. Auto is the source workbook's classification state, not an independently verified asset or method approval.
3. **Condition heuristic:** Lookups A3:B6 leaves grades 1–2 unchanged, advances grade 3 to 2026 + 75% of remaining life, and places grade 4 in 2026. These are workbook-specific rules. NRM3 §5.3 instead establishes evidenced life factoring, and §5.4 uses condition/remaining-life evidence. Do not present the workbook heuristic as a universal NRM3 requirement or apply it again on top of an already adjusted life without justification.
4. **Recurring events omitted in examples:** Renewal Schedule row 25, Ref 24, shows RSL 5, installation 2025 and only a 2030 TBC entry. With an unchanged five-year cycle and continuing scope, subsequent events fall in 2035, 2040, 2045 and 2050. This is a recurrence test, not confirmation of the asset's true life or costs. Similar first-event-only patterns appear on other short-life rows.
5. **Missing source coverage:** Cover Page A29:A33 and Change Log record unrecovered/scanned source limitations and default installation-year assumptions. Preserve completeness gaps. The register is not evidence that all maintainable assets are present.
6. **No executable workbook formulas:** All sheets were inspected in formula mode. Renewal years/schedules are stored values and costs are placeholders/text. Use the workbook for ingestion structure and reconciliation, not as a tested engine.
7. **Reference claims require verification:** The cited CIBSE 2026 life table, BBM/SFG20 mappings, O&M documents and local code extensions need their actual source versions and applicability checked. The supplied workbook alone does not establish those matters.

## Acceptance cases

- Reproduce the NRM3 Table 5.2 life-factor result, retaining 17.6 before display rounding.
- Preserve an explicit neutral factor of 1; reject missing/empty factor sets rather than silently assuming it.
- Calculate partial renewal extent and a separately evidenced uplift with independently calculated expected values.
- Include every repeated event in the horizon and test events exactly on each boundary; the first event is explicitly supplied, not inferred from condition alone.
- Keep TBC, N/A, absent data and zero distinct. Reject missing rates/quantities for cost calculations.
- Validate parent/child scope, separate renewal/maintenance units and rate basis before totals.
- Preserve source/version and changed-input lineage; mark results out of date when inputs or methodology change.
- Produce comparable annual R/M cost profiles and a reviewable report without implying approval or full NRM3 conformance from these primitive tests alone.

## Remaining implementation work

Build the importer, editable asset/assumption records, persistence, project method configuration, R/M costing, economic evaluation, sensitivity, report/export and handover. Establish reference-table versions, cost basis, input evidence, condition/PARL assessment, recurrence/date conventions and review authority. NRM3 is now the selected method foundation; these are project configuration and implementation tasks, not a reason to invent missing inputs.
