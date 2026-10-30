# Pricing Template Generator user guide

Choose the assessment currency at the start: EUR (€), GBP (£), USD (US$) or another dropdown option. Lifecycle and Pricing use the same choices. All amounts must be entered in that currency; the dropdown does not convert rates. Existing legacy Lifecycle projects retain GBP until deliberately changed.

FERN builds a provisional annual FM cost baseline for a facility. Use it independently for cost planning or issue a version for Lifecycle and FM Pre-Contract / Tender Assessment to reference. Limited downstream calculations are now available as described at the end of this guide; full economic integration remains outstanding.

## 1 Basis and sources

Choose the currency from the dropdown and enter the price date as DD-MM-YYYY. Currency selection labels entered amounts; it does not convert them. Use a consistent currency, price-date and tax basis across all lines. Missing or invalid dates block totals; valid dates permit calculation.

Import an XLSX Staff Rate Card or add staff roles manually. Review the preview before replacing draft roles. Source formula results are retained as reference evidence, not automatically accepted. Source warnings such as missing PPK amounts require reconciliation. Importing staff roles preserves additional-cost lines; review their applicability to the replacement staff scope.

## 2 Staff and delivery teams

Select included roles, enter applicable rates and source/reconciliation rationale, and optionally map grades. Choose either total annual allocated paid hours or headcount × annual paid hours per person × FM allocation percentage. Do not count both methods or multiply by headcount again. This estimates cost, not required staffing, productive capacity or competence.

## 3 Additional costs

Enter overhead/subcontractor descriptions, annual costs, FM allocations and source/scope notes. Choose additional, already included elsewhere, or outside scope. Only additional items contribute. No entered lines does not establish that the site has no such costs. Tax, profit, inflation and exchange conversion are not added automatically.

## Maintenance, materials and multi-year work

Use **Add maintenance task** in section 3. Enter quantity and units covered by each rate (1 for per-asset pricing, or an evidenced measure such as 100 m²). Specify event count per active year, first year and repeat interval. Year 1 is the first twelve months from the price date. For annual work use first year 1 and interval 1; for work starting in year 5 and repeated every five years, use first year 5 and interval 5. These are examples, not assumed maintenance standards.

Enter labour minutes per rate unit per event, hourly rate and material cost per rate unit per event. If labour is already costed in staff or a contractor package, select **Labour already included**. If materials are bundled elsewhere, enter zero explicitly and identify that cost line in the evidence. Record the basis for units, frequency and overlap. Excluded tasks remain in the draft but contribute no cost. You can prepare a maintenance-only baseline without adding staff.

Example: 10 assets × 4 annual events × (30 minutes ÷ 60 × 40/hour + 2 materials) = 880 each active year. Quantity is not multiplied twice. With annual recurrence, five years totals 4,400. Values are illustrative.

Review the year 1 total, five horizon totals and expanded annual schedule. Staff/annual additional costs repeat; tasks occur only in their scheduled years. These are constant-price, undiscounted costs, not inflation-adjusted lifecycle results. All schedules remain provisional pending Amazon review. Save, download and issue include task inputs; both recipient apps can inspect the schedule without automatically adding it to their calculations.

## 4 Review and save

Review separate staff, overhead and subcontractor subtotals and the combined annual baseline. Resolve invalid included inputs before download or issue. Valid staff subtotals remain visible if an additional cost blocks the combined total.

Save BB baseline explicitly in this browser. Restore saved BB baseline replaces the current draft for that site. Download BB calculation record creates a JSON record including source inputs and calculations. Restore from downloaded pricing record accepts supported FERN pricing JSON; inspect the preview and choose Replace draft with pricing record. Wrong-site records are rejected and totals are recalculated. Save explicitly after restoring a file.

## 5 Issue to Lifecycle and Pre-Contract

Choose Issue pricing baseline to both applications once inputs are valid. This creates a fixed provisional version in the same browser. Reissuing unchanged inputs reuses the latest version; changed inputs create a new version. Draft changes do not alter issued snapshots.

In either recipient, choose Load issued pricing baselines, then select Pricing version. Both recipients receive Pricing directly and select independently. They can view cost scope and evidence. A newer issue is flagged while the selected version stays in place. Refresh the list to discover new issues. Do not add a pricing baseline to other maintenance costs without reconciling overlapping scope.

## Worked example

Two people × 2,000 annual hours × 50% FM allocation × GBP 40/hour = GBP 80,000. Additional overhead of GBP 10,000 at 50% adds GBP 5,000, giving GBP 85,000. If that is overhead is already in the staff rate, mark it already included and retain GBP 80,000. These are synthetic examples.

## Limits and troubleshooting

- Missing inputs: complete only included roles/additional costs, or explicitly exclude items outside scope. Unknown cost is not zero.
- Wrong date: use DD-MM-YYYY, for example 06-09-2026.
- No issued pricing: issue a valid baseline for the same site in the same browser and origin, then refresh the receiver.
- Save failure: current entries remain available; download valid records and resolve browser storage availability.
- Saved records and issues are local to this browser/origin. They are not Amazon shared records or formal approvals.
- Full workbook costing, maintenance/material/multi-year tasks, tender/actual/benchmark comparisons and automatic downstream calculations remain outstanding.
- Amazon will provide shared storage, accounts and formal approvals; its technical specification and policy are pending confirmation.

## Compare actual, tender and benchmark costs

In Review and save, define the baseline scope/exclusions, service tier/maintenance strategy and tax/commercial basis. Select Add cost comparison, choose the source type and enter its comparable 12-month amount, currency and price date. Describe the source/version, original cost/period/scope and every adjustment. Benchmark inputs are user-supplied; FERN does not fetch licensed SPON’s, RSMeans or other data.

Confirm you have reviewed matching scope, service level, tax and the first-year period. A matching comparison displays the amount and percentage above/below baseline; a gap displays Pending with reasons. Comparison costs are not added to the baseline. A zero baseline has no percentage comparison. Baseline changes require a fresh review confirmation. Save/restore and download preserve comparisons; issued versions retain them for both recipients to inspect.

Example: baseline 880, comparable tender 968 gives 88 above baseline, or 10%. This does not recommend either option. Amazon source/licensing and independent domain approvals AMZ-PRC-11/16 remain open.

## Use issued pricing in downstream calculations

**Lifecycle:** load issued pricing in the combined calculation section, select the version and choose either additional non-overlapping costs or replacement of all asset maintenance. Record and confirm matching price/tax basis and overlap evidence. Renewals are retained in both modes. The implementation requires pricing in the same selected currency starting on 1 January of the Lifecycle start year, matching site and a horizon no longer than 25 years. Correct mismatches or reconcile scope before combining; partial-overlap mapping is not automated. The table shows excluded maintenance explicitly. Asset-only reports remain separate. Download the combined record to retain this assessment; existing project saving does not save the session's overlap confirmation.

**Pre-contract:** load and select the pricing version. The cost comparison recalculates eligible sources, differences and a cost-only rank; incomplete comparisons keep their reasons. Download the comparison record for the selected version. Ranking is not a recommendation, and no Lifecycle costs are added here.

Both outputs remain constant-price and provisional. Amazon AMZ-PRC-12/16 decisions remain open. The issued reference stays fixed when newer pricing versions appear; select an update deliberately and review it again.

## Save a combined assessment review

Save the asset project, then use **Save combined assessment review** to retain the overlap treatment and evidence separately. On returning, load the same issued pricing version and select **Restore combined assessment review (replace draft)**. Matching inputs restore the provisional review and recalculate the result. If project or pricing inputs differ, the evidence and treatment return but you must review them again before a total is available.

Only one combined review is retained per site in this browser. Saving replaces that site's previous review; download calculation records for separate historical copies. This does not provide shared Amazon storage or formal approval.
