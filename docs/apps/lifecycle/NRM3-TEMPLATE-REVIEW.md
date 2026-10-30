# NRM3 source review and revised development baseline

**Current implementation increment:** Excel intake with preview, preservation of edited records, loaded NRM3 hierarchy selection, structured source evidence, multiple direct-rate maintenance tasks, independent R/M scope and draft Appendix E/F grouping CSV reports are now implemented. Existing saved projects are retained. [Current workflow and remaining limits](LIFECYCLE-QUICK-START.md) supersede earlier future-work descriptions for these features. Full time/trade costing, formatted workbook reports and shared professional review remain outstanding.


6 September 2026. Decision: revise the Lifecycle application's import, asset model and reporting structure around the supplied NRM3 sources. Retain independently tested calculation primitives. The current local assessment remains a limited implementation, not the final data model or proof of NRM3 compliance.

## Building and source status

The product owner confirms that DSA2 is a real Amazon building. Its asset register is real project input, not a synthetic demonstration dataset. Individual quantities, rates, classifications and source assertions still require verification; real provenance does not make incomplete values complete. The generic BHX4 application shell remains demonstration context and must not be confused with the DSA2 assessment. DSA2 data remains separate from the engineering ZIP.

The supplied macro-enabled blank template describes itself as based on the January 2026 RICS logic table. Its provenance as an unmodified RICS-authored costing tool has not been independently established. Its formulas and VBA are implementation evidence, not automatically mandatory NRM3 rules. Instructions in the workbook were read as reference; setup commands and macros were not executed. All originals remain unchanged.

## Files reviewed

| Source | Role and observed structure |
|---|---|
| Copy of NRM3_Asset_Register_BLANK_Template_Macro_enabled1.xlsm | Eight sheets: instructions, lookups, hierarchy, asset register, supplementary components, maintenance, renewals and cost summary. Embedded VBA includes TransferApplicableItems. Formula-enabled template, unlike the populated DSA2 workbook previously inspected |
| nrm_3_logic_and_levels_table.xlsx | Sixteen sheets, including 2021 and January 2026 classifications, supplementary components, functional types, elemental structure, worked examples and report structures. January 2026 classification sheet contains 2,633 populated code rows |
| nrm_3_appendices_e_and_f.xls | Two reporting templates: Appendix E condensed Level 1, Appendix F expanded Level 2. A genuine legacy Excel binary file, read without conversion or editing |

## Findings requiring action

| Finding | Evidence | FERN implication |
|---|---|---|
| Full hierarchy is available | Blank template: 2. NRM3 Hierarchy A1:J2634. Logic file: 4. NRM3 Logic&Levels Table 2026 A6:P2638. All 2,633 template codes match a code in the 2026 table | Store a versioned classification reference with L1–L5, separate R/M units, product/material and work package. Exact code membership is not proof that an asset has been assigned the correct description |
| Macro does not populate the grouping key | Template instructions D64 say the macro fills U; embedded Module1.TransferApplicableItems writes through column 11 plus formulas in 18/19 but has no write to column 21/U. Asset Register U2:U501 is blank. Cost Summary D2 and D21 depend on U | Derive and validate hierarchy keys in application code. Do not use this template's zero summary as a reconciliation oracle without correcting the missing key |
| Macro replaces existing inputs | VBA clears register B2:Q[last] and T2:T[last], then transfers Applicable rows. It does not reconcile asset identity or preserve entered values. Formulas and dependent schedule coverage are fixed through row 501 | Use previewed append/update import with stable asset identifiers, retained input provenance, conflict reporting and explicit replacement choice. Handle capacity beyond 500 assets |
| Template renewals only include one event | Renewal Schedule J2:AH2 compares each calendar year to the adjusted first renewal year; no repeat-cycle calculation | Keep the FERN recurring-event engine. Validate it against independent worked cases, not equality with a first-event-only schedule |
| Missing costs can appear as zero | Maintenance Schedule O2 returns zero for absent quantity/rate; Renewal Schedule D2:I2 turns missing inputs into zero and J2:AH2 suppresses costs | Preserve missing/TBC/N/A/zero as different states. Report coverage and incomplete totals explicitly |
| Condition and date rules are template-specific | Asset Register R2 uses installation + column L; S2 fixes grade 4 to 2026 and reduces grade 3 remaining life by a rounded 25%. Column M is not used as an automatic fallback | Model installation, survey date, condition evidence, selected RSL source, remaining life and first intervention separately. Make project assumptions explicit; do not label the template's heuristic a universal NRM3 rule |
| Maintenance needs tasks, not just one flat asset rate | Template Maintenance H1:M1 and O2 encode D/W/M/Q/HY/Y using 365/52/12/4/2/1. Logic sheet 9.NRM3 Maintain off ARegister L7:R8 separates standard/amended minutes, access adjustment, out-of-hours minutes, frequency and trade | Support multiple tasks per asset, with a task-rate basis and a distinct time/trade basis. Do not apply one rate indiscriminately to different maintenance tasks |
| Supplied reference includes mixed-age worked examples | Logic workbook release notes identify the 2026 classification update; tabs 9–14 identify examples extracted from the first edition effective 2015. Tab 12 has #REF! at K4/K5 and within formulas including Q11 and V176 | Version each reference independently. Do not copy broken formulas or infer that all tabs were updated in 2026. Formula results were inspected statically, not recalculated in Excel |
| Reports require more than an annual total | Appendices E/F B7:O13 contain project, base date, horizon, functional unit, asset classification, operating hours, storeys, GIFA, maintainable area and location/index context. E reports L1; F reports L2 with separate R and M sections | Add project metadata and hierarchical R/M rollups, plus the annual profile. Calculate £/m²/year only with a validated GIFA and consistent scope/horizon |
| DSA2 requires classification reconciliation | Exact-code comparison found 125 of 127 main rows in the supplied 2026 table. Asset Register B19 (Ref 18: 2.8.3.1) and B91 (Ref 90: 8.1.1.1) were absent | Flag both for mapping review. Do not guess replacements. The other 125 matches still need semantic/unit/level review |

## Revised implementation sequence

1. **Excel intake:** accept .xlsx and .xlsm asset registers locally without executing macros. Recognise the blank-template and DSA2 variants, show detected sheets and mapped fields, preserve source values/formulas/cached-value status, and preview additions/conflicts. JSON remains backup/restore under an advanced control. The .xls E/F source is a reporting reference, not an asset import schema.
2. **Structured asset records:** separate building/site, asset instance, versioned classification, supplementary component, evidence, condition assessment and RSL selection. Retain existing local backups during schema migration. A classification row is a type, not automatically one physical asset.
3. **Maintenance and renewal services:** use one-to-many maintenance tasks, explicit R/M scope, remaining-life/first-intervention decisions, repeat cycles, rate basis and exclusions. Preserve tested missing-data safeguards. Add hierarchy scope checks to prevent parent/component double counting.
4. **Reports:** implement Appendix E and F output structures and retain detailed annual/event drill-down. Add reference reconciliation before declaring the reports conformant.
5. **Real-building pilot:** reconcile DSA2 records and complete evidence/inputs, with professional review of classifications, service lives and assumptions. Keep synthetic test fixtures separate. Introduce production identity, durable server storage, audit/version history and shared review before team operational use.

## What changes now and what remains

This review and the PRD/source baseline are updated. No original workbook, macro, source building record or saved local assessment has been overwritten. No macro was run. The current local workbench and its tested calculations remain available while the replacement Excel import and richer asset model are developed. These next implementation steps are specified here; they have not been implemented by this review.
