# FERN on-screen results and PDF report requirements

Status: user-agreed product requirement, 7 September 2026. Implementation pending. This specification applies to Lifecycle & Asset Analysis and FM Pre-Contract / Pre-Tender Assessment. It does not claim that report export, shared storage or formal approvals already work. Final illustrated user guides remain paused while UI reviews continue.

## User journey

Complete or update inputs → Review results → inspect the report within the application → Return to inputs if corrections are needed → Save report version → Download PDF.

Review results must show useful supported results and explain unavailable sections. It must not require formal approval just to inspect or export a clearly labelled provisional report. Saving a report is separate from saving an editable assessment draft; the interface explains which has been saved. PDF download is a real generated report file, not an image of the screen or an instruction to print a page.

## Shared requirements

| ID | Requirement | Acceptance criterion |
|---|---|---|
| FERN-RPT-001 | Display a readable report inside each application after input, with summary, inputs, results, comparisons, findings/actions and evidence/status. | A user can read the supported calculation output without downloading a file and return to the relevant editable inputs. |
| FERN-RPT-002 | Generate the on-screen report and PDF from the same versioned report data, using the same calculation results and rounding policy. | Values, scope, assumptions, selected scenarios and statuses agree between the saved screen version and its PDF. No independent PDF-only financial calculation. |
| FERN-RPT-003 | Offer Return to inputs, Save report version and Download PDF. | Controls perform their named operations, show progress/success/failure and preserve the draft if saving/export fails. |
| FERN-RPT-004 | Identify assessment/report ID, revision, site, scope, currency, base date, analysis period, generation time and selected source versions. | The PDF and on-screen report identify exactly what was analysed. Filenames identify application, assessment, revision and status without exposing unnecessary personal information. |
| FERN-RPT-005 | Preserve saved report versions; input changes mark the current draft as changed since the saved report. | Editing inputs does not silently change an old PDF or report record. A new calculation/report revision is required; an older approved report cannot approve changed inputs. |
| FERN-RPT-006 | Support clearly labelled provisional reports with assumptions, unsupported measures and outstanding issues. | Invalid calculation inputs withhold the affected totals; absent data is not represented as zero. Valid independent results remain available where appropriate. Calculation-valid does not mean evidence-validated or approved. |
| FERN-RPT-007 | Permit a final approved report only through the applicable authorised validation/review/approval workflow. | Local names or confirmation checkboxes cannot confer approval. Until Amazon identity and approval services exist, final approved status is unavailable. Retain issue-specific restrictions and any authorised exceptions with source and rationale. |
| FERN-RPT-008 | Provide readable tables and charts with text explanations and accessible numerical alternatives. | PDF pages have no clipped columns or charts; multi-page tables repeat headings, include page numbers and identify currency/units. Text is selectable; charts do not rely on colour alone. Verify long reports, empty states and different currencies. |
| FERN-RPT-009 | Retain calculation and evidence traceability. | Each reported result can be traced to source inputs, method/version, assumptions and source record versions. Include detailed calculation information in an appendix or accompanying structured record. |
| FERN-RPT-010 | Use shared presentation components and a common report contract across both applications. | Application-specific results are supplied by their owning calculation modules; a report renderer does not import or duplicate another application's business logic. PDFs and source JSON/CSV outputs remain distinct. |

## Lifecycle report contents

- Facility and assessment summary, source-register coverage and exclusions; no claim of complete building coverage from a partial APM register.
- Asset population and included renewal/maintenance scope; service-life inputs, adjustments and evidence status.
- Annual renewal and maintenance costs, renewal-event schedule and capital peaks where supported.
- Separate asset-only and combined-pricing views. A combined view identifies retained/excluded maintenance, pricing issue and overlap treatment, avoiding double counting.
- Constant-price cost profile distinguished from nominal undiscounted cash flow and discounted net present cost.
- 5/10/15/20/25-year results where the assessed period supports them. Uncovered horizons remain unavailable, not extrapolated.
- Inflation, nominal discount, timing convention, currency, date and economic-source evidence.
- Sensitivity cases with assumptions and differences from the baseline. Rate sensitivity is not presented as a complete service-model or engineering scenario comparison.
- Key findings, limitations, unresolved data/engineering issues and proposed actions; unsupported risk conclusions are withheld.

## Pre-Contract report contents

- Purpose, facility, decision scope, current arrangement, owner and decision date where recorded.
- Current baseline and each retained alternative: delivery arrangement, tier, service/asset exceptions, responsibilities and maintenance strategy where available.
- Comparable pricing and supported lifecycle evidence with their source versions and applicability.
- Cost differences with their basis and calculation explanation; cost-only rank distinguished from service suitability or overall recommendation.
- Risk, resilience, compliance, service quality and confidence supported by evidence; unavailable measures labelled explicitly. No invented scores or weights.
- Trade-offs, recommendation rationale where supported, assumptions, constraints and open issues.
- Human review and business decision shown separately, with conditions, exceptions and applicable authority evidence. No inferred procurement approval.

## Data, status and approval handling

A report version is a snapshot of a specific assessment revision and calculation run, including selected Pricing/Lifecycle references. Opening an older report must not silently load newer source values. The record must distinguish draft/provisional/final-approved status from whether it has been superseded. Immutable local snapshots are useful development behavior but are not a tamper-proof audit system.

A PDF does not replace the versioned Lifecycle → Pre-Contract data package. Pre-Contract must consume controlled structured evidence, while the PDF provides a human-readable companion. Do not add a pricing issue directly and again through a combined Lifecycle result.

## Amazon decisions retained

- Shared storage, report retention, access restrictions, identity and audit-history requirements.
- Approval roles, workflow, evidence checks, materiality rules and authorised exception handling.
- Branding, confidentiality labels and any mandated final-report template.
- Calculation/domain reconciliation, economic sources, criticality/comparison methods and licensing constraints on reproducing benchmark/source material.

Pending these decisions, develop explicitly provisional reporting using supplied inputs. Do not manufacture approver identities, statutory conclusions, source endorsements or Amazon sign-off.

## Verification before release

Compare screen/PDF values against the same snapshot; exercise rounding and zero-denominator cases; include long asset lists and multi-page tables; test all five horizons, unavailable horizons, missing inputs, stale reports and different currencies. Verify failed downloads/saves, recovery and multiple report versions. Render and visually inspect representative PDF pages. Confirm a change to inputs or source versions requires fresh report review. PDF appearance alone does not complete domain acceptance.
