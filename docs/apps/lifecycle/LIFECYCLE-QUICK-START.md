# Lifecycle assessment — Excel workflow

Choose the assessment currency at the start: EUR (€), GBP (£), USD (US$) or another dropdown option. Lifecycle and Pricing use the same choices. All amounts must be entered in that currency; the dropdown does not convert rates. Existing legacy Lifecycle projects retain GBP until deliberately changed.

6 September 2026. Local working implementation of Excel intake, structured asset evidence, direct-rate maintenance tasks, NRM3 renewal calculations and draft elemental reporting. DSA2 is real Amazon building input. This is not yet a production or fully NRM3-conformant application.

## Coverage

The NRM3 catalog is a reference, not a required complete asset checklist. Amazon APM may cover only selected systems for a building. The exact remit is to be confirmed. Current totals cover included assessment records only and do not establish building-wide completeness. Excel remains available; CSV and versioned asset JSON intake and a prospective APM API are tracked requirements in APM-ASSET-COVERAGE-AND-INTAKE.md.

## Import and review

1. Open the local HTTP preview and choose Lifecycle & Asset Analysis. Existing saved projects restore automatically. Demo sign-in remains demo/demo.
2. Set the assessment site. Choose Excel workbook under **Import Excel asset register or NRM3 reference**. Supported inputs are the supplied DSA2 .xlsx register, the supplied blank-template .xlsm layout (blank or populated), and the 2026 logic and levels .xlsx reference. Arbitrary spreadsheet layouts, password-protected workbooks and legacy .xls asset registers are not supported.
3. Review the file name, detected sheets, row count, source warnings and first 20 assets. Nothing changes until Apply to this assessment. Cancel leaves records untouched.
4. Applying adds new asset references and retains existing edited fields. For matching reference, code and description, missing structured source details are attached. Existing structured details are retained. Imported tasks are not activated if they would override conflicting legacy maintenance fields. Same-reference conflicts are retained for manual review, not silently overwritten. Use a downloaded backup and manual corrections to reconcile changed source values.
5. Import the supplied 2026 logic and levels workbook to load its 2,633 classifications. It replaces the current reference catalog only after the import preview is applied. This reference is saved locally with the assessment, not bundled as operational data in the engineering repository.
6. Use **Add an asset from the NRM3 hierarchy** to find the most specific applicable type and create an editable physical asset record. The blank template's macro is replaced by this selection workflow. A catalog entry is not proof of an installed asset. Supplementary worksheets are detected but not automatically turned into assets; components can be added manually with a parent reference after scope review.

Macros are never executed. Mapped formula cells are not used as calculation inputs, even if Excel contains a cached number. Their original formula and cached value remain visible under Original Excel values and formulas. Missing, TBC, N/A and zero remain distinct. The source workbook is unchanged. This is not a lossless workbook editor: arbitrary sheets, formatting, macros, full evidence archives and spreadsheet formulas are not reproduced.

## Complete an assessment

- Confirm the horizon and constant-price cost basis, including base date, rate evidence, inclusions/exclusions and parent/component scope.
- Select an asset. Review classification level, group, element, sub-element, material, location, installation year, condition and original OEM/CIBSE life assertions. Select an evidenced RSL in the working field; the importer does not decide between sources.
- Enter life factors as comma-separated decimals, explicit first renewal year, extent 0–1, quantity and direct renewal rate. Condition labels do not automatically change dates. Resolve overdue renewals explicitly.
- Include renewal and maintenance independently. A parent and child cannot both contribute to the same cost scope; exclude one from that scope before totals. This check requires explicit parent references and does not discover all duplicate scope automatically.
- Add or edit maintenance tasks. Every task has its own quantity, unit, rate per visit, annual frequency, standard/reference and source. When tasks exist, their sum replaces the legacy single-rate maintenance inputs. If there are no tasks, the original single-rate fields continue to work for saved-project compatibility.
- Resolve validation messages. Costs remain unavailable while required inputs are missing. The panel reports the first blocking issue per asset. Source validity and engineering assumptions still require review.

## Save, restore and export

Save project before leaving, refreshing or closing. One project is retained in this browser/origin. JSON is an optional project backup: Download project backup creates it, and Restore a saved backup opens the JSON picker. Existing version 1 backups still work; new backups also retain structured details, tasks, report metadata and classification catalog. Keep downloaded backups for additional projects or computer/browser changes.

The annual cost-profile CSV and calculation-record JSON remain available once calculation inputs are complete. The calculation record contains inputs, source details, event timing and results.

For elemental reports, expand Report project information and enter title, cost plan number and price base date. Add GIFA, functional unit, operating hours, storeys, maintainable area, classification and location/index context as available. Choose Appendix E (Level 1) or Appendix F (Level 2). The CSV has separate R and M rows by group/year, totals and GIFA metrics only when a positive GIFA is supplied. Missing GIFA is unavailable, not zero. The loaded classification must contain every included asset code and grouping key. Two current DSA2 codes require mapping review before these reports can be generated.

These are draft CSV data structures aligned to E/F grouping, not replicas of the formatted .xls templates and not signed professional reports. Groups without scoped assets are omitted, not presented as zero-cost complete scope.

## Calculation limits

GBP, constant prices, undiscounted. Every full calendar year from start through end is included. Fractional renewal timing is retained and grouped into its calendar year. Subsequent interval = RSL × explicit life factors; first intervention remains separate from interval. Direct renewal cost = quantity × extent × rate. Maintenance = sum of task quantity × task rate × annual frequency, repeated for every full year. Floating-point precision is retained internally and displayed to two decimals.

Time/trade and out-of-hours maintenance costing, inflation/discounting, construction-rate derivation in the UI, automatic PARL/condition assessment, partial-year maintenance, scenario comparison, sensitivity, review approvals, durable shared storage and API handover remain outstanding. Classification membership does not certify the semantic mapping or professional approval.

## Engineering verification

37 automated tests pass, including Excel XML reading, source/formula retention, duplicate rejection, preservation of edited records, task migration, multiple-task costing, parent/component scope, independent R/M scope, Level 1/2 reconciliation and report metadata/GIFA handling. TypeScript and production build pass. Real-file read-only checks confirmed 127 DSA2 assets, 2,633 reference entries, source preservation and backup round-trip. In-app browser import/save checks supplement these tests; the standalone browser suite remains constrained by the local Chromium sandbox.

Parser dependencies: [JSZip](https://stuk.github.io/jszip/documentation/api_jszip/load_async.html) and [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser). The adapter reads only local file contents; it implements no data upload or macro execution.

## Use issued pricing in downstream calculations

**Lifecycle:** load issued pricing in the combined calculation section, select the version and choose either additional non-overlapping costs or replacement of all asset maintenance. Record and confirm matching price/tax basis and overlap evidence. Renewals are retained in both modes. The implementation requires pricing in the same selected currency starting on 1 January of the Lifecycle start year, matching site and a horizon no longer than 25 years. Correct mismatches or reconcile scope before combining; partial-overlap mapping is not automated. The table shows excluded maintenance explicitly. Asset-only reports remain separate. Download the combined record to retain this assessment; existing project saving does not save the session's overlap confirmation.

**Pre-contract:** load and select the pricing version. The cost comparison recalculates eligible sources, differences and a cost-only rank; incomplete comparisons keep their reasons. Download the comparison record for the selected version. Ranking is not a recommendation, and no Lifecycle costs are added here.

Both outputs remain constant-price and provisional. Amazon AMZ-PRC-12/16 decisions remain open. The issued reference stays fixed when newer pricing versions appear; select an update deliberately and review it again.

## Methodology reference and screen terminology

The application uses “Lifecycle working assessment”, “asset classification” and “asset renewal and maintenance”. Its calculation baseline remains NRM3; see [methodology and limitations](NRM3-LIFECYCLE-METHODOLOGY.md). Users do not need to know the standard name to enter assets or review costs. Source workbook header mappings and original evidence are retained for traceability.

## Save a combined assessment review

Save the asset project, then use **Save combined assessment review** to retain the overlap treatment and evidence separately. On returning, load the same issued pricing version and select **Restore combined assessment review (replace draft)**. Matching inputs restore the provisional review and recalculate the result. If project or pricing inputs differ, the evidence and treatment return but you must review them again before a total is available.

Only one combined review is retained per site in this browser. Saving replaces that site's previous review; download calculation records for separate historical copies. This does not provide shared Amazon storage or formal approval.

## Inflation and discounted costs

In **Asset costs: cash flow and present cost**, enter the economic country/location, annual inflation, annual nominal discount rate and source/applicability evidence. Select the year-end timing convention. Enter zero explicitly if you intend no inflation or discounting. Use rates appropriate to the assessment currency; FERN supplies no national defaults.

The first year uses base prices. Later years compound inflation, and each nominal annual cost is discounted to 1 January of the first year at the chosen nominal rate. This is a provisional uniform-rate scenario, not an approved rate model. Review both undiscounted cash flow and net present cost, expand annual calculations, and extend the project horizon if you need longer results. Missing rates affect the economic output only.

Save the project to retain these assumptions. Combined pricing uses the same economic inputs after the overlap review; changes require a fresh combined review. Download calculation records to retain economic outputs; existing CSV cost profiles continue to show base-price costs. Amazon AMZ-PRC-18/16 decisions remain open.

## Download economic cash flows

Complete the economic inputs, then choose **Download asset economic cash-flow CSV** in the asset economic panel. For combined costs, first complete the pricing overlap review and use **Download combined economic cash-flow CSV**. These files contain nominal cash flows and net present costs, with assumptions and evidence; combined files also contain the pricing issue and overlap treatment.

The existing cost-profile CSV is still the base-price report. Longer economic horizons are marked unavailable when outside the assessment period. CSV amounts retain calculation precision; spreadsheet display formatting may show fewer decimals. All reports remain provisional pending Amazon review.

## Compare economic sensitivity cases

Complete baseline economic inputs first. Select **Add economic sensitivity case**, name the scenario, enter its alternative inflation and nominal discount rates and record the rationale/source. No rates are prefilled. Review NPC and its change from the baseline; expand horizon totals or download the case CSV. A lower cost is not a recommendation.

Save the asset project to retain cases. The combined assessment applies the same cases to its own cost schedule after overlap review. CSVs identify the case, its rates and the baseline evidence. Changes to cases require the combined project/pricing review again. These scenarios do not change asset quantities, maintenance strategies, service lives, country or currency.
