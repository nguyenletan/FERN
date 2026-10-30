# FERN Software Product Requirements Document

## Economic sensitivity — 6 September 2026

Users can add up to 30 named economic sensitivity cases, each with explicit inflation, nominal discount rate and rationale/source. Cases retain baseline currency, location, timing and cost scope. They do not modify baseline economic inputs. The asset view permits editing; the combined view evaluates the same cases against the reviewed combined schedule.

Each valid case shows undiscounted cost, net present cost, absolute and percentage difference from baseline NPC, and five horizon results where covered. Zero baseline NPC has no percentage. Missing baseline or case inputs withhold that comparison without blocking valid base calculations. Cases are scenarios, not forecasts, probabilities, recommendations or approved country rates.

Project save/restore and JSON calculation records preserve cases. Each case can export a CSV with its assumptions, baseline rates/evidence, case identity and (for combined scope) pricing reference and overlap evidence. Adding/changing cases changes the project snapshot and therefore requires fresh combined review under the existing binding rule. AMZ-PRC-16/18 remain open for domain and economic-method approval.

Verification: 87 automated tests, typecheck and build pass. Browser synthetic case: baseline NPC EUR 400; alternative 10% inflation / 0% discount yields NPC EUR 537.02, delta EUR 137.02 (34.26%). Tests cover no baseline mutation, invalid inputs, zero denominator, unavailable horizons, CSV provenance and backup validation. The standalone Playwright executable remains absent, so complete browser/download automation is not reported as passed.


## Economic cash-flow increment — 6 September 2026

Asset and combined Lifecycle views now calculate nominal annual cash flows and net present cost from user-entered location, inflation, nominal discount rate, timing and source evidence. No rates are prefilled. The implemented provisional convention uses a 1 January analysis base date, base prices in year 1, uniform annual inflation from year 2, and end-of-year discounting. Nominal year n = base cost × (1 + inflation)^(n−1); present cost = nominal ÷ (1 + nominal discount)^n. No intermediate rounding. All included cost categories use the same rates. Currency amounts are not converted.

Zero is valid when explicitly entered; negative rates must be greater than −100%. Missing/invalid economic inputs withhold economic results while leaving valid base-cost estimates available. The profile supports 1–25 consecutive annual periods. All five horizon rows are displayed; uncovered horizons remain unavailable rather than extrapolated. This increment does not include varying annual/category rates, residual values, mid-year payments or approved country-rate feeds.

Economic assumptions persist in project saves/backups. Asset and combined JSON calculation records include recalculated economic results and the assumptions in the project. Existing CSVs remain base-price profiles. Combined review bindings include economic inputs; changing them requires the combined review again. Formal source and method validation remain open under AMZ-PRC-18 and AMZ-PRC-16.

Verification: 78 automated tests, typecheck and build pass. In-app browser verified zero-rate EUR 400 cash flow/NPC and synthetic 10% inflation/10% nominal discount giving EUR 537.02 cash flow and EUR 363.64 NPC. The standalone browser suite still cannot launch because its executable is absent; no browser download-content assertion is claimed as passed.


## User-facing terminology — 6 September 2026

User direction: use plain FERN Lifecycle terminology on application screens. NRM3 naming has been removed from authored headings, configuration text, asset classification controls, import instructions and validation messages. The user guide and engineering methodology retain NRM3 attribution and traceability. Existing workbook sheet/header mappings, calculation methods and source records are unchanged. Original uploaded filenames and user-entered evidence remain source data rather than rewritten product labels. This wording change does not assert Amazon authorship or approval of the underlying standard.

Verification: 68 tests, typecheck and build pass. The browser regression locator now uses Asset classification code. The standalone browser suite remains unavailable because its executable is missing.


## Amazon pricing review — 6 September 2026

The Pricing PRD now cross-references Amazon specifications and domain approval dependencies. AMZ-PRC-01–17 remain open and must be retained through implementation and software handover. See [workbook review](../apps/pricing/PRICING-WORKBOOK-RECONCILIATION.md); cache reconciliation is not completed product validation.

See [Amazon specification and approval register](../amazon/AMAZON-PRICING-DECISIONS.md) for evidence requests, proposed owner roles and interim treatment. All items remain open until explicitly resolved.

**Pricing specification consolidated:** [Pricing Template Generator PRD v1.0](../apps/pricing/PRICING-TEMPLATE-GENERATOR-PRD.md) is the current review draft for Pricing. It supersedes conflicting historical Pricing descriptions below and consolidates PRC-001–009, complete-costing requirements, recipient contracts, acceptance gates and Amazon decisions. It does not imply completed implementation or formal approval.

## Pricing recovery and handover fixes

Pricing can now issue fixed provisional snapshots to a local, site-specific history. Both Lifecycle and Pre-Contract have a direct Pricing input panel: Load issued pricing baselines, select a version, inspect costs and evidence. Each recipient stores its own selection and retains it when newer issues appear. Identical consecutive drafts reuse the existing issue; changed drafts create the next revision. This is reference handover only, not automatic cash-flow/tender aggregation or formal approval. Local storage is not a tamper-proof audit service.

Downloaded v1/v2 FERN pricing records can be re-imported with a preview before replacing the draft. Inputs and site are validated; exported totals/approval claims are not trusted and totals are recalculated.

Verification: 51 automated tests, typecheck and build passed for these changes. An isolated localhost browser test issued a synthetic GBP 48,000 version and selected the identical version independently in both recipients. User storage at 127.0.0.1 was untouched. Browser file-restore end-to-end remains unverified; parser, site checks and recalculation have automated coverage.

Amazon environment decision: the product owner confirms shared storage, user accounts and formal approvals will be provided within Amazon; hosting, identity, interfaces and approval policy remain to be confirmed by Amazon. Do not invent configuration or describe the browser-local implementation as production integration.

## Pricing output recipients

Product-owner clarification: Pricing Template Generator supplies its output directly to both Lifecycle Analysis and FM Pre-Contract / Tender Assessment. Lifecycle uses the pricing baseline for lifecycle cost calculations; Pre-contract uses the same pricing baseline for tender/commercial comparisons, alongside lifecycle results when relevant. Pre-contract must not depend on Lifecycle merely to receive Pricing output.

Both recipients must reference the same pricing baseline identifier and version, with site, scope, currency, price base date, line items, allocations, subtotals, source evidence, exclusions, validation gaps and provisional/approval status. Revised pricing must be identified as newer; existing assessments retain their referenced snapshot until deliberately updated. Handover does not imply approval. Avoid counting the same pricing costs again when combining direct pricing and lifecycle results.

Status: this is the agreed integration requirement and description for the future consolidated User Guide. The current application supports local saving and a downloadable calculation record; direct handover to either recipient is not yet implemented.

**Overheads and subcontractors implemented:** Pricing accepts manually entered annual overhead and subcontractor lines with FM allocation, source/scope notes and explicit additional / already-included / outside-scope treatment. Only additional lines contribute. Staff, additional overheads and additional subcontractors are shown separately with a combined provisional annual total. Incomplete included costs block that combined total and download, while the separate valid staff subtotal remains visible. Lines persist with the baseline and are included in the v2 calculation record. This does not import Overheads/Subcontractors worksheet formulas or add tax, profit, inflation, or FX conversion. Existing saved baselines remain compatible.

Verification: browser test produced staff 48,000 + allocated overhead 5,000 = GBP 53,000; changing the overhead to already included restored GBP 48,000; invalid allocation blocked the combined total. Unsaved synthetic data was discarded by restoring the existing baseline. Typecheck, 48 automated tests and build pass. Full standalone browser suite remains unverified.

**Delivery-team costing implemented:** Each staff role can use direct allocated hours or a delivery-team calculation: headcount × annual paid hours per person × FM allocation percentage ÷ 100. The selected method alone contributes to costs. Direct hours are retained when switching methods, and older saved baselines remain compatible. Blank, negative, non-finite or out-of-range inputs block included-role totals; headcount is a whole-person count and allocation ranges from 0 to 100%. Annual paid hours per person cannot exceed 8,784 (the hours in a leap year). Team fields are saved/restored and included in the calculation record. This is cost allocation, not an approved staffing/shift-coverage or competence assessment.

Browser verification: 2 people × 2,000 paid hours × 50% allocation × GBP 40/hour produced GBP 80,000. Allocation 101% removed the total. Temporary values were removed without saving; the existing baseline was restored. Typecheck, 45 automated tests and build pass.

**Current date and currency behaviour:** User-facing date entry is DD-MM-YYYY (for example 06-09-2026). Saved dates retain their existing ISO representation, so prior records remain compatible. Valid dates allow totals; missing, malformed or impossible dates block totals. Currency is user-selected from a dropdown including EUR (€), USD (US$), GBP (£) and other listed currencies. A saved currency outside the list remains available on restore. Changing currency labels the entered rates and totals; no exchange conversion is applied. Browser verification confirmed 06-09-2026 with 40 × 1,200 gives 48,000 under EUR, USD and GBP selections; 30-02-2026 blocks calculation. Temporary values were not saved. Typecheck, 44 automated tests and build pass. This supersedes earlier YYYY-MM-DD entry guidance below; the standalone full browser suite remains unverified.

**Date-entry fix verified in the running app:** Price base date now accepts explicit YYYY-MM-DD text with format guidance and calendar validation. The stale local Vite server was restarted on the same 127.0.0.1:4173 address. In the browser, 2026-09-06 with a synthetic rate of 40 and 1,200 hours produced GBP 48,000.00; 2026-02-30 removed the total and displayed a date error; 2028-02-29 restored the correct total. Unsaved test roles were removed and the existing saved draft restored. No test inputs were saved. Typecheck, 43 automated tests and build pass. This resolves the date-control and focused browser-calculation blockers recorded below; the standalone full browser suite remains unavailable in this execution environment.

**Latest browser verification:** With explicit user authorization, local demo Save/Restore passed. No saved BB baseline existed before the test. A temporary role with hourly rate 40 and annual allocated paid hours 1,200 was saved; the draft role name and rate were changed (rate 50); Restore recovered the original role name, rate 40, hours 1,200 and evidence text. The temporary role was then removed and the cleared draft saved. After navigating to Lifecycle and back, Restore recovered the cleared baseline and no test roles remained. Existing asset records were not changed. Native date-entry automation and the full browser suite remain unresolved; installed Chrome failed to launch under the execution environment. This verifies save/restore, not a complete browser-calculation pass.

**Implemented BB pricing increment (6 September 2026):** Pricing now has a local Staff Rate Card import preview, source formula/PPK warnings, manual role/rate/hour/evidence inputs, provisional annual staff-cost calculation, site-keyed browser save/restore and a downloadable calculation record. Cached source rates are not automatically accepted. Cross-application handover, staffing feasibility, general workbook formula execution and professional approvals remain outstanding. See [BB pricing quick start](../apps/pricing/BB-PRICING-QUICK-START.md).

## Agreed application responsibilities

Product-owner decision, 6 September 2026. The three applications share underlying data and a versioned calculation engine. This is the agreed target structure; implementation and professional validation remain separate work.

| Application | Responsibility |
|---|---|
| Lifecycle | Assets, maintenance strategies, reliability, service-life adjustments and five-horizon lifecycle costs |
| Pricing | Internal BB costs, contractor costs, staffing/team/overhead build-ups, tenders and benchmarks |
| Pre-contract assessment | Compare scenarios and record the business owner’s decision using the shared results |

Shared evidence and governance preserve input versions, applicability, gaps and scoped approvals. Pricing passes the same versioned cost baseline directly to both Lifecycle and Pre-contract; Pre-contract also consumes lifecycle scenario outputs without maintaining a competing calculation method. Revisions must identify affected results and require recalculation before those results are presented as current. Source-specific policies, rates and scoring rules still require their own validation.


**BB cost source confirmed by product owner:** use `BBM Pricing Template_(Example).xlsx` → `Staff Rate Card` as the BB resource cost baseline. Preserve role/grade mapping, effective date, currency, source formulas and validation gaps. Staffing quantities/coverage are separate from rates; resource category, delivery model and BXM tier are separate fields. See the [BB clarification and source findings](LIFECYCLE-CAPABILITY-AND-DECISIONS.md#subsequent-clarification-on-bb-costs-and-staffing). This is a specification update, not an implemented importer.

**Product-owner clarification, 6 September 2026:** [Lifecycle capability review and accepted requirements](../apps/lifecycle/LIFECYCLE-CAPABILITY-AND-DECISIONS.md) records the latest requirements for partial asset coverage, facility/asset scenarios, BB baseline, concurrent strategies, scoped provisional approvals, reliability, engineer-approved life adjustments and five-horizon economics. These supersede conflicting earlier scope assumptions; they are requirements, not implemented features.

**Current implementation increment:** Excel intake with preview, preservation of edited records, loaded NRM3 hierarchy selection, structured source evidence, multiple direct-rate maintenance tasks, independent R/M scope and draft Appendix E/F grouping CSV reports are now implemented. Existing saved projects are retained. [Current workflow and remaining limits](../apps/lifecycle/LIFECYCLE-QUICK-START.md) supersede earlier future-work descriptions for these features. Full time/trade costing, formatted workbook reports and shared professional review remain outstanding.


**Source review update:** DSA2 is a real Amazon building, confirmed by the product owner. The supplied macro template, 2026 logic table and Appendix E/F files require revision of import, asset structure and reporting. [Review findings and revised baseline](../apps/lifecycle/NRM3-TEMPLATE-REVIEW.md) supersede earlier assumptions that these sources were unavailable or unreconciled. The workbench remains an initial implementation.


**Implementation update, 6 September 2026:** Lifecycle now has a working local assessment: FERN JSON import, editable asset records, explicit browser save/restore, backup download, recurring renewal and simplified task-rate maintenance calculations, annual CSV profile and a JSON calculation record. See [quick start and limits](../apps/lifecycle/LIFECYCLE-QUICK-START.md). Earlier statements below about unconnected primitives/reference UI describe the baseline before this increment. Full NRM3 scope, economic evaluation and multi-user governance remain outstanding.

Version 0.3 · Draft for product and engineering review · 6 September 2026

**Approval status: unverified.** This is a new source-based draft, not a replacement for an approved whole-platform PRD. The prior chat reported a draft update pack, but its full contents were not available for reconciliation. No requirement below should be described as Amazon-approved solely because it appears here.

## 1. Product purpose and success

FERN is intended to provide a facility-management workspace for authorised users to assemble evidence, prepare and assess service arrangements, evaluate asset/lifecycle exposure, prepare pricing information, and govern IFM launch or transition activities. It supports accountable human decisions with traceable data, methods and review records.

The product owner explicitly requires **every application inside FERN to be fully functional and usable**. A navigation link, static section, empty register, status badge or preview panel alone does not meet this requirement.

A usable application lets an intended user complete its defined task with permitted data, recover saved work, understand and resolve validation failures, produce an evidence-supported result where prerequisites are satisfied, and complete the applicable review/handover. Production readiness additionally requires real identity, access controls, supported integrations, operating procedures and agreed service targets.

Success measures to baseline with the product owner: completion rate for each end-to-end workflow, saved-work recovery, output correctness against approved reference cases, provenance coverage, user time to complete tasks, accessibility findings and operational reliability. Numerical thresholds remain open; none are invented in this draft.

## 2. Scope and users

Scope is the whole FERN product, informed by Programme Hub and P0–P5. The supplied implementation includes five FERN Apps destinations, a dashboard, Ask FERN, governance pages, settings and help. Four apps have detailed prototype layouts; the fifth and most supporting destinations are placeholders.

Candidate user responsibilities, subject to validation: site/FM operations user; asset/lifecycle specialist; commercial/pricing specialist; assessment author; evidence/source validator; launch coordinator; authorised reviewer/decision-maker; platform administrator; read-only auditor. These are proposed responsibilities, not an approved permission model. Internal and external engineering participation does not itself grant operational data access.

The source hierarchy proposed in the earlier scope discussion is: approved Programme Hub baseline and decisions; approved P0 requirements; approved P1–P4 domain deliverables; approved P5 integration documents; supporting prototypes and discussions. Owners must verify that hierarchy and the approval/version of each source. Design behaviour and historical prompts are evidence of intent, not proof of approved business rules.

## 3. Current implementation baseline

Source: DesignFERNHomepageLayout-main.zip, received 6 September 2026. Provenance and hashes are recorded in SOURCE-REGISTER.md.

- React/TypeScript frontend with Tailwind and Vite.
- Client-side demo/demo sign-in, one prototype site (BHX4) and in-memory navigation.
- Scripted Ask FERN answers selected using keywords, not retrieval or model inference.
- Detailed lifecycle, pricing, pre-contract and launch screens, mostly future field descriptions and unavailable states.
- The original App.tsx had no operational calculation or persistence. The current Lifecycle increment has local browser persistence, supported Excel/FERN JSON intake, direct-cost calculations and CSV outputs. No backend or live operational API is implemented.
- Source wording and UI evidence are not independently validated against Programme Hub/P0–P5 documents.

## 4. Functional completion standard — all applications

**FERN-CORE-001 — Complete usable workflows.** Every application must implement its agreed primary workflow end to end. Acceptance: an intended user completes the application's scenario in FUNCTIONALITY-MATRIX.md using entered/imported data, saves and reopens the work, resolves a deliberately invalid input, obtains the applicable output and finishes required review. Static previews do not satisfy this test. Source: current user requirement.

**FERN-CORE-002 — Context isolation.** Every record and operation must have an explicit authorised site/business context. Acceptance: changing context updates all applicable queries; records from another context cannot leak through stale UI state or direct API access. Source: prototype context controls; proposed production extension.

**FERN-CORE-003 — Persistent records.** Create, edit, save, reopen and version workflow records. Acceptance: saved changes survive logout/restart; conflicting edits are detected; material decisions and approved records cannot be silently overwritten. Source: prototype history/traceability controls; proposed implementation.

**FERN-CORE-004 — Import with validation.** Each applicable workflow supports agreed structured imports and manual entry where authorised. Acceptance: invalid types, missing required fields, duplicate IDs and unsupported versions produce actionable row/field errors; rejected imports do not partially alter accepted records. Formats and size limits are to be agreed.

**FERN-CORE-005 — Evidence and provenance.** Link records and outputs to source ID, source version, author/provider, retrieval or effective date and validation state. Acceptance: a reviewer can trace an output to its source inputs and method; missing evidence is visible and does not become fact.

**FERN-CORE-006 — Distinct states.** Preserve missing, unconnected, stale, conflicting and unvalidated data as distinct conditions. Acceptance: missing cost is not displayed as zero; no connection is not equivalent to no risks; application readiness is not a finding about the site.

**FERN-CORE-007 — Human review.** Record applicable authorisation, reviewer identity, outcome, rationale, evidence and date. Acceptance: an unauthorised actor cannot approve by manipulating the client; material approval actions create durable audit events. The authority matrix remains to be confirmed.

**FERN-CORE-008 — Output and export.** Produce versioned report/data exports only when the applicable prerequisites are met; explicitly label permitted draft outputs. Acceptance: export matches the selected saved version and includes context, evidence, methodology, gaps and review state. Required formats are open. Disabled prototype exports are not implementation.

**FERN-CORE-009 — Workflow recovery.** Explain loading, empty, failed, disconnected and permission-denied states. Acceptance: save/import failures preserve unsaved work and permit a safe retry; repeated submissions do not duplicate records.

**FERN-CORE-010 — Cross-application handover.** Send a versioned, validated output to the appropriate receiving workflow and record receipt/rejection. Acceptance: lifecycle/pricing handovers retain source and method lineage, detect outdated versions and never silently replace an accepted assessment input.

## 5. Application requirements

### Lifecycle & Asset Analysis

**Confirmed asset coverage direction:** NRM3 is a classification reference, not a requirement to populate every asset class from Amazon data. Amazon APM is expected to supply a partial, building-specific inventory; its exact coverage and interface require Amazon confirmation. Retain Excel, CSV, JSON and manual intake alongside a prospective APM API. See [APM asset coverage and intake requirements](../amazon/APM-ASSET-COVERAGE-AND-INTAKE.md).

**FERN-LCA-006 — Scope-aware coverage.** Distinguish reference catalog, source inventory and assessment scope. Missing unrelated NRM3 classes must not block a scoped assessment; an omitted record is not confirmed absence. Reports state covered/excluded systems and unresolved material gaps.

**FERN-LCA-007 — Multiple intake routes.** Support validated Excel, CSV and versioned JSON asset imports plus manual input, with an authorised APM ingestion adapter when the actual interface is established. File intake remains available after API integration. Reconcile source/site asset IDs and preserve manual corrections. Current CSV and arbitrary asset JSON ingestion are requirements, not implemented features.

**Methodology selected by the product owner: RICS NRM3.** Apply the [NRM3 Lifecycle Methodology](../apps/lifecycle/NRM3-LIFECYCLE-METHODOLOGY.md), including requirements FERN-NRM-001–010 and the supplied DSA2 register mapping. The NRM3 method source is now available; project inputs, lookup versions and specific calculation conventions still require validation. The current local workflow includes Excel intake, editing, task-rate costing and draft reports; fuller costing and shared review remain outstanding.

Primary flow: select context → enter/import assets and evidence → validate baseline → configure assumptions and analysis method → construct renewal/maintenance events and scenarios → calculate supported exposure → compare and test sensitivity → human review → report and handover.

| ID | Requirement and acceptance condition |
|---|---|
| FERN-LCA-001 | Capture asset IDs, scope, quantities, condition, maintenance/cost evidence and applicable criticality. Reject invalid or ambiguous records; show source and validation per material field. |
| FERN-LCA-002 | Maintain analysis horizon, assumptions, event timing and scenario versions. Reopen exactly the saved scenario and identify changes that invalidate a prior run. |
| FERN-LCA-003 | Execute only a validated, versioned lifecycle/financial methodology. Match approved reference cases and declared rounding, currency, price basis and discount assumptions; block unsupported combinations and missing required inputs. |
| FERN-LCA-004 | Compare scenarios and sensitivity runs on an explicit common basis. Trace each difference to inputs or assumptions; do not present invented cost, risk or weighted rankings. |
| FERN-LCA-005 | Record recommendation, human review and decision separately; export a versioned lifecycle assessment and hand it to pre-contract assessment with acceptance tracking. |

Current implementation: local editable records, explicit save/restore, supported Excel intake, initial calculations and draft CSV outputs. See LIFECYCLE-QUICK-START.md for limits. Complete shared review, APM integration and handover remain outstanding.

### Pricing Template Generator

Primary flow: establish site/scope → import approved workbook and input records → map fields → validate source, units and versions → enter maintenance, labour, delivery team and commercial inputs → run controlled formulas → reconcile results → review → export/handover.

| ID | Requirement and acceptance condition |
|---|---|
| FERN-PRC-001 | Capture pricing inputs for assets, maintenance, multi-year tasks, staff rates, delivery teams, overheads, subcontractors and applicable commercial items. Validate requiredness, quantities, currency, units and period before calculation. |
| FERN-PRC-002 | Map source fields to a versioned target workbook schema. Flag unmapped, duplicate and conflicting fields; store mapping tests and acceptance. |
| FERN-PRC-003 | Implement an authorised formula inventory and calculation lineage. Reconcile outputs to owner-approved workbook examples, including boundary and rounding cases. Do not infer formulas from visual labels. |
| FERN-PRC-004 | Persist calculation inputs, method/version, outputs, exceptions and reconciliation results as one reproducible run. Updating inputs marks previous results out of date. |
| FERN-PRC-005 | Provide review, controlled workbook/report generation and pre-contract handover. Never treat pricing generation as supplier selection or procurement approval. |

Sources: features/pricing. The ZIP contains design prompt files referencing workbook requirements, not the authoritative workbook and validated formula specification needed to implement them.

### FM Pre-Contract / Pre-Tender Assessment

Primary flow: define current arrangement → assemble validated pricing, service, asset, lifecycle, risk and compliance evidence → record credible alternatives → compare equivalent scopes → identify gaps and tradeoffs → prepare recommendation → authorised review → record business decision and report.

| ID | Requirement and acceptance condition |
|---|---|
| FERN-PCA-001 | Save the current service baseline and explicit inclusions, exclusions and source evidence. Missing context prevents a complete assessment rather than creating a default result. |
| FERN-PCA-002 | Create and version alternatives, with eligibility/exclusion rationale based on validated rules. Reopen scenarios without losing source references. |
| FERN-PCA-003 | Receive accepted lifecycle/pricing outputs; compare cost, operational service, lifecycle, risk and compliance on an explicit compatible basis. Flag scope/period/version mismatches. |
| FERN-PCA-004 | Explain recommendation readiness and unresolved gaps/conflicts. Any scoring or weighting requires a configured approved method; absence of a method cannot generate a ranking. |
| FERN-PCA-005 | Separate analyst recommendation, reviewer findings and authorised decision. Produce a reproducible assessment report with conditions, evidence and outstanding actions. |

Sources: features/pre-contract. Observed: layout, lifecycle navigation and preview; business workflow implementation remains outstanding.

### IFM Launch Tracker Tool

Primary flow: register sources → validate applicability and versions → extract candidate requirements → human validation → configure requirements, responsibilities, milestones, dependencies and evidence → accept configuration → activate/update tracking records → assess readiness → go-live review → authorised human review → record decision → report.

| ID | Requirement and acceptance condition |
|---|---|
| FERN-LCH-001 | Store source identity, applicability, validation and supersession. Requirements retain exact source/version and distinguish quoted facts from derivations. |
| FERN-LCH-002 | Promote candidate requirements only after required validation; map accepted requirements into versioned tracking configuration with explicit responsibilities and applicable criteria. |
| FERN-LCH-003 | Activate and update records, milestones, dependencies and evidence. Validate transitions, preserve history and reassess downstream impact when a dependency or requirement changes. |
| FERN-LCH-004 | Calculate readiness only under an authorised configured method. Missing criteria/evidence blocks findings; no percentage, RAG or aggregate is manufactured. Record completion does not approve launch. |
| FERN-LCH-005 | Present assessment → go-live review → human review → decision → report in order. Enforce gates in application services, record the authorised decision and produce a report of the selected version. |

Sources: features/launch-tracker; latest review discussion identified the section/state defects corrected in this baseline. No real launch is assessed by the prototype's NOT READY application state.

### FM Contract & Service Model

This destination has no detailed implementation in the supplied source. Its relationship to pre-contract assessment and the P1/P2 outputs must be resolved before duplicating functionality.

| ID | Requirement and acceptance condition |
|---|---|
| FERN-CSM-001 | Define and persist current contract/service scope, applicable facility context and source documents. Users can create, validate, save and reopen a baseline. Exact fields require P1/P2 source validation. |
| FERN-CSM-002 | Evaluate permitted service-model options using controlled definitions and eligibility rules. A supplied reference case produces the expected result and explanation; unavailable rules block automated findings. |
| FERN-CSM-003 | Record review and controlled handover to pre-contract/pricing workflows. Clarify ownership so users do not enter conflicting contract baselines in multiple apps. |

Sources: navigation/card descriptions and current product-owner completion requirement. These are proposed requirements, not observed functionality.

## 6. Shared and supporting product capabilities

| ID | Capability and acceptance condition |
|---|---|
| FERN-AI-001 | Ask FERN retrieves only authorised context and evidence; distinguish fact, recommendation, assumption, gap and conflict. Source links must resolve to records actually consulted. Scripted answers and arbitrary source counts do not meet this requirement. |
| FERN-AI-002 | Evaluate the assistant against grounded-answer, insufficient-evidence, conflicting-source and cross-context access cases. No fabricated inspection, evidence or approval; users can inspect provenance and limitations. Model/provider choice remains open. |
| FERN-DASH-001 | Dashboard attention, status, changes and next actions derive from actual accessible records, with freshness and navigation to source. Empty connections show unavailable data, not an all-clear state. |
| FERN-GOV-001 | Implement each governance destination as an agreed usable workflow: leadership/policy, objectives, performance/KPIs, risk/compliance, audit/assurance and continual improvement. Required forms, records, reviews and outputs appear in the functionality matrix; approved P0–P4 rules are dependencies. |
| FERN-ADM-001 | Administrators maintain authorised sites, service models/tiers, operating configuration and versioned reference tables; changes are validated and audited. Users cannot select contexts they cannot access. |
| FERN-IAM-001 | Implement approved sign-in, sign-out, sessions and role/context access. Server-side denial tests cover unauthorised viewing, editing, exporting and approval. Demo credentials cannot serve as production identity. |
| FERN-HELP-001 | Provide usable getting-started guidance, controlled framework documents, glossary, FAQs and a working support route. Every displayed help action reaches relevant content or submits a traceable support request. |

## 7. Data and integration requirements

Proposed entities: SiteContext, SourceDocument/Version, EvidenceReference, Asset, ContractBaseline, ServiceModelDefinition, Assessment, Scenario, MethodDefinition/Version, CalculationRun, ValidationFinding, Review, Decision, LaunchRequirement, TrackingConfiguration/Version, TrackingRecord, Milestone, Dependency, Handover, ReportVersion and AuditEvent.

Each entity needs a stable identity, context, lifecycle/version fields and a defined owner. Exact schemas, retention, deletion and permissions require source and engineering agreement. See P5-INTEGRATION-SPEC.md for the proposed contracts and failure behaviour. No APM, GAT, BMS or other connection is claimed to exist.

## 8. Non-functional requirements

| ID | Requirement | Evidence required before production acceptance |
|---|---|---|
| FERN-NFR-001 | Accessibility and supported-device usability | Agreed accessibility target; keyboard, focus, labels, errors, contrast and responsive-layout tests with representative users |
| FERN-NFR-002 | Security and access enforcement | Threat model for actual architecture; tested server-side authorisation, session management, secret handling and upload controls |
| FERN-NFR-003 | Performance and scale | Agreed users, concurrent sessions, record/import sizes and response targets; measured representative workload tests |
| FERN-NFR-004 | Reliability and recovery | Agreed availability, backup, restore and data-loss targets; demonstrated recovery and failure handling |
| FERN-NFR-005 | Operability | Assigned support owner, monitoring, diagnostic correlation, incident process and deployment/rollback instructions |
| FERN-NFR-006 | Testability and traceability | Requirements linked to test cases; reference calculation cases, integration contracts, permission tests and end-to-end workflow evidence |

Targets are unresolved product/engineering decisions. Listing these requirements does not establish conformance.

## 9. Release approach and acceptance

Release target is awaiting the product owner's choice: local application with persistent entered/imported data first, or Amazon-connected deployment from the outset. The modular prototype delivered here is a preparatory baseline in either case.

Proposed delivery order: (1) confirm sources and app boundaries; (2) implement identity/context, persistence, evidence and audit; (3) complete one app end to end against approved fixtures; (4) complete remaining apps and handovers; (5) complete governance/settings/help; (6) integrate, validate usability, and operationalise. Release order is a proposal, not a reduction of the requirement that all apps eventually work.

An application can be marked functional only after its matrix scenario passes with saved data and real outputs. A production release additionally requires confirmed environment/access, validated methods, security/access tests, reference-case reconciliation, agreed operational targets and accountable release sign-off. UI extraction, compilation and report-preview tests alone are insufficient.

## 10. Outstanding decisions

See DEVELOPMENT-BACKLOG.md. The first decisions are deployment/data approach, authoritative source versions and owners, approved calculation/assessment methods, the Contract & Service Model boundary, roles/approval authority, integration interfaces and priority order. The user is not expected to invent engineering details; the software team and domain owners should resolve their respective decisions.

## FERN PRC 006 BB staff cost baseline

Implement a scoped provisional BB staff-cost baseline from Staff Rate Card or manual entries. Require currency, price base date, positive hourly rates, non-negative allocated paid hours and source/reconciliation rationale for included roles. Preserve source values/formulas separately; do not automatically execute formulas or imply professional approval. Explicitly select included roles; calculate rate × total allocated paid hours without a second headcount multiplier. Save/restore by site and export source-linked calculation records. Acceptance: synthetic 40/hour × 1,200 hours = 48,000; invalid inputs block totals/download; excluded incomplete rows do not block a scoped total; saved data rejects site mismatch; import flags missing PPK amounts. Implemented in this increment; browser interaction verification is awaiting demo-login authorization.


Browser follow-up: the user authorized the local demo login, which succeeded. Pricing and its input-validation state were observed in the browser. Full interaction verification remains incomplete: automatic approval review blocked Restore in the existing browser; the browser-control date input did not produce a valid date for the synthetic calculation; and the standalone Playwright suite could not launch because its Chromium executable was missing. Unsaved synthetic role/currency inputs were removed; no pricing baseline was saved or overwritten. Earlier sign-in-authorization blockers are resolved, but save/restore and successful browser calculation are not claimed as passed.

## FERN PRC 007 Delivery team allocation

Allow explicit direct-hours or team-derived hours for each staff rate. Calculate allocated hours from headcount, annual paid hours per person and FM allocation, preserving entered inputs and source evidence. Do not add direct and derived hours together or apply a second headcount multiplier. Existing saved records without a mode use direct hours. Acceptance: two people, 2,000 hours each, 50% allocation and rate 40 produce 80,000; invalid allocation blocks the total; save/restore round-trips team fields. This increment does not determine required headcount or validate shift coverage.

## FERN PRC 008 Additional costs

Capture overhead/subcontractor description, annual cost, FM allocation, treatment and source/scope. Retain costs already included elsewhere without adding them twice; excluded items remain visible. Compute category subtotals and a combined staff-plus-additional-cost total only when included inputs are valid. Preserve older saved records and export source-linked cost lines. Acceptance: 48,000 staff + 10,000 overhead at 50% = 53,000; already-included overhead gives 48,000; invalid additional input blocks combined total/export. Manual intake only in this increment.

## Pricing usability update

The live Pricing screen now explains standalone cost planning and intended outputs to Lifecycle and Pre-Contract. Four section links lead to basis/sources, staff/teams, additional costs and review/save. An expandable in-app user guide covers current inputs, worked examples, saving, source warnings and limitations. The old not-ready context and workflow descriptions remain inside the collapsed reference section. Navigation starts closed below 768px and closes after choosing a destination; the toggle has an accessible name and state. Main content padding is reduced on narrow screens. Calculation methods and saved-data formats are unchanged.

Verification: 48 automated tests, typecheck and build passed. Current browser screenshots were inspected for the initial crowded layout, expanded guide and review/save area. Section navigation and narrow-screen menu behaviour were checked. This is a targeted usability improvement, not a complete accessibility certification; desktop/mobile full regression suite remains outstanding.

## FERN PRC 009 Pricing recovery and recipient references

Issue validated provisional pricing snapshots with site, revision and source inputs to both recipients. Preserve earlier versions; recipient selections are independent and deliberate. Show newer-version notices without silently replacing an assessment reference. Restore downloaded pricing records only after preview, structural/site validation and recalculation from inputs. Acceptance: both recipients select the same 48,000 baseline; changing source rates leaves issued values unchanged; repeated unchanged issue is idempotent; wrong-site references and invalid costs are rejected. Amazon shared services remain a separate integration dependency.


## MOD-01: Application separation — 7 September 2026

User-approved engineering direction: maintain one monorepo with independently runnable/buildable portal, Pricing, Lifecycle, Pre-contract and Launch Tracker applications. Share calculation implementations and UI components; recipient-specific behaviour belongs to its application. Preserve record formats, storage keys and provisional approval status.

Acceptance: each app exposes its own entry and run/build commands; package code cannot depend on application code; only the portal composes other applications through public entries; existing calculation/import/persistence tests pass; all distributions build. Coverage: `tests/module-boundaries.test.mjs`, `tests/render.test.mjs`, existing domain tests, `pnpm build:all`. Browser acceptance remains a separate gate. See MONOREPO-HANDOVER.md and TECHNICAL-VERIFICATION.json.

Amazon shared storage, identity and formal approvals remain pending specification and acceptance. Independent local origins do not share browser storage automatically.


## Staffing reference update — 7 September 2026

See [Staffing model requirements](../amazon/STAFFING-MODEL-REQUIREMENTS.md) for the two user-supplied staffing/resource documents, proposed use in FM Contract & Service Model and FM Pre-Contract / Pre-Tender Assessment, and open Amazon decisions STF-01–08. These are documented requirements, not implemented staffing rules or formal policy approval.


## FERN-LCH-006 — Manual launch-plan register

First working Launch Tracker increment: site-scoped provisional tasks with descriptions, owners, DD-MM-YYYY deadlines, status and evidence notes; validated completion; save/restore and JSON backup/import. No readiness percentage or formal approval. See LAUNCH-TRACKER-QUICK-START.md for limits, acceptance coverage and open Amazon decisions. This implements only the manual tracking subset of FERN-LCH-003; source governance, dependencies, history and approvals remain outstanding.


## FERN-LCH-007 — FM mobilisation and transition across delivery models

User-approved scope broadens the former IFM-only name to FM Mobilisation & Transition Tracker. Plans capture current/target model, transition type, service and asset scope, facility tier and descriptive asset-level overrides. Internal BB, IFM, Hybrid, Fully Contained and AFM pending definition are supported as recorded choices; no staffing or requirement rule is inferred. New-facility and provider mobilisation, insourcing, outsourcing and changes of scope/tier can be recorded.

Existing v1 plans restore with blank optional context; storage keys and task records remain unchanged. Tests in launch-plan.test.mjs cover legacy restoration, model round trips and invalid selections. Browser coverage includes an IFM-to-BB transition and exported context. Amazon source/governance approval and automatic requirement generation remain outstanding.


## FERN-LCH-008 — Guided setup and dependable continuation

User-approved UI review recommendations: Start/Continue entry, four-step setup, context review, task workspace with search/filter, prominent save state, local field validation and secondary recovery/governance panels. Legacy plans remain compatible; optional savedAt metadata records new saves only. Import/restore requires confirmation; removal requires confirmation and retains one undo. Unsaved portal navigation/site change/sign-out warns; browser-close warning is requested. Concurrent browser updates are detected before save rather than silently overwritten. These are local draft safeguards, not production identity, immutable history or approval.

Acceptance: render and domain tests, valid/invalid timestamp cases, browser setup/continue/task-validation/undo/download journey. Browser execution evidence is tracked separately. Existing storage keys and source-calculation behaviour are unchanged.


## FERN-RPT-001–010 — On-screen results and PDF reports

User agreed on 7 September 2026: Lifecycle & Asset Analysis and FM Pre-Contract / Pre-Tender Assessment must present readable results inside the application and export the same saved report version as a PDF. The flow is Review results → Return to inputs if needed → Save report version → Download PDF.

[Shared report requirements](../apps/reports/RESULTS-AND-PDF-REPORT-REQUIREMENTS.md) define report contents, snapshot/version behavior, screen/PDF consistency, calculation traceability, provisional output, authorised final approval and acceptance criteria. These extend the existing Lifecycle reporting and FERN-PCA-005 requirements. **Requirement agreed; implementation pending.** Final user guides remain paused.


## Pre-Contract first implementation increment — 7 September 2026

Implemented named, site-specific provisional assessments with four steps: Purpose & scope, Current arrangement, Pricing evidence, Review & save. Current arrangement is an editable interim snapshot pending the Contract & Service Model application. Each assessment saves its own fixed pricing issue reference, without changing the legacy application-wide selection. Working pricing comparisons remain available; contradictory placeholder panels are removed.

Storage: `fern.precontract.assessments.v1.<encoded site>`, version 1, maximum 200 records per site, one current saved revision per assessment. Stale saves reject rather than overwrite a newer revision; malformed stored records prevent writes. Draft JSON download exists; re-import, full revision history, shared storage and account-backed ownership are not implemented. Local storage is specific to the browser address. Names are required to save; unknown context may remain blank and provisional; entered dates must be actual DD-MM-YYYY dates.

Still pending: delivery alternatives, integrated Lifecycle handover, evidence-based service/risk comparison, saved calculation reports and PDF, authorised decisions and Amazon integration. Amazon must confirm hosting, identity, permissions, retention, approval authority, delivery-model definitions and domain rules. A typed owner name is not account assignment or approval. Final illustrated guides remain paused until the complete workflow is settled.

Verification: typecheck, 103 automated tests and all application builds pass. Isolated browser checks confirm invalid-date handling, separate saved assessments, reopening inputs and pricing-reference restoration. Full automated browser suite is blocked by a missing Playwright executable. See TECHNICAL-VERIFICATION.json for exact scope and limits.

FERN-PCA-006: Support multiple named assessments per site, explicit draft saves, separate pricing selections, field validation, save-failure messages and stale-revision protection. Implemented for local provisional storage in this increment; shared persistence and full history remain pending.


## Shared facility workspace — 7 September 2026

## Use it

1. Open the FERN portal at http://127.0.0.1:4173/ and refresh it.
2. Use **Choose your facility** above the application. Search existing site codes or registered names.
3. To register a building, select **Add a facility**, enter code, name, country, type and location, and choose existing or planned building. Save and select it. Registration is local and unverified.
4. Expand **Facility history — inputs and saved records**. Refresh after saving in a tool. Open individual records to inspect the stored source data, or open the owning tool to continue its workflow.
5. In Pre-Contract, start a new assessment or continue one of that facility's saved assessments. Select pricing versions explicitly. History is not automatically copied into a new assessment.

## Implemented scope

The common portal facility selector is available above every tool. New facilities receive a permanent local ID; site code remains fixed as the compatibility key for existing application stores. Legacy site keys are discovered without rewriting their data. Duplicate registrations are rejected, including sites already discovered from local saves. Legacy sites without registered metadata remain marked unverified; metadata editing and site-code alias/migration controls are future work.

The read-only history panel groups Pre-Contract drafts, issued pricing versions, saved pricing input, Lifecycle project inputs, combined Lifecycle review and mobilisation plan. It exposes recorded timestamps where available and explicitly marks missing dates. Record details currently expose stored fields as JSON for inspection, not a formatted final report. Corrupt or wrong-site records are withheld with a visible error. This is source availability, not domain validation, current applicability or approval.

Lifecycle saves now use a site-specific slot. A matching legacy browser-wide project can still restore; it is retained unchanged. Imports from a different site are rejected. The portal remounts tool workspaces when the facility changes and asks users to save inputs before switching from a tool. Each Lifecycle site still has one current saved project, not complete version history.

## Limits and Amazon decisions

The register and history are shared within the FERN portal on one browser origin. Standalone application addresses and other computers have separate storage; the new portal facility UI is not yet included in standalone shells. Existing standalone storage is not migrated across origins. No Amazon API, shared database, production identity, central facility directory, immutable audit or authorised approvals are claimed.

Amazon must confirm the canonical facility ID/directory, site-code changes/aliases, permitted facility creation/editing, account access, cross-site permissions, storage/retention and audit requirements, APM interfaces and record definitions, source freshness rules, and domain approval responsibilities. These remain open integration requirements.

Contract/decision history, APM failures and maintenance feeds, historic approved reports and automatic Lifecycle-to-Pre-Contract input acceptance are not implemented. Previously exported results are not automatically indexed. Existing tools retain their original restore/select controls. Full input mapping, source acceptance, conflict/freshness policies and report snapshots remain subsequent increments. No historical data is invented when a store is absent.

## Verification

Typecheck, 107 automated tests and all app builds pass. Added tests cover duplicate identity, corrupt registry preservation, legacy discovery, site isolation and wrong-site history rejection. Isolated in-app browser checks found six BHX4 saved records, created TEST-HUB and confirmed its selection in Pre-Contract with no BHX4 assessments. This used synthetic data at port 4189, not the user's port 4173 records. Native change-site confirmation, backup/download and complete end-to-end history reuse were not manually verified. Full automated browser suite was attempted but could not launch because its Playwright executable is missing. No Amazon domain acceptance is asserted.

FERN-FAC-001: Provide local facility registration, discovery and shared portal selection. FERN-FAC-002: Expose available site-specific source history without automatic replacement or approval. These requirements are implemented within the local scope above; central integration remains pending.


## Facility search and confirmation update — 7 September 2026

## Available now

Refresh the FERN portal at http://127.0.0.1:4173/.

1. Select **Amazon facilities** to search local FERN records by site code, name, address or postcode. The connection message explicitly says that APM is not connected.
2. Choose a result. Review the building and address details without changing the current facility.
3. Check **I have checked that this is the correct facility**, then choose **Confirm facility and continue**. The existing facility history stays linked.
4. If no record exists, select **Enter details manually**. Enter the site code, name, country and facility type; add address components where known.
5. Select **Review facility details**. Check any possible existing records before creating a separate record. Shared postcode matches are suggestions, not automatic merges.
6. Confirm and save, or return to edit. New records are local and unverified. Site codes remain fixed.

**Search online** is an explicitly unavailable integration state. It does not make Google requests or display invented search results. It offers manual entry until the approved connection exists. No embedded map or automatic internet address population is implemented in this increment.

The source selector and history panel are shared by tools in the portal. Standalone application origins retain separate storage. Existing local records without new address fields remain readable unchanged.

## Engineering and Amazon connection requirements

FERN-FAC-003: Search/select/review/confirm before changing the facility. Implemented for local records and manual creation. Search supports multiple terms and ignores postcode spacing/punctuation; it is deterministic matching, not an AI search service.

FERN-FAC-004: Support Amazon directory and external place-search providers, preserving source provenance and current facility identity. UI states implemented; provider adapters, credentials and live integration pending.

Amazon must confirm whether APM is the authoritative building directory, the facility ID/alias mapping, available fields, permission-filtered search endpoint, authentication and approved hosting. Internal queries must stay with the internal provider; never fall back silently to a public provider. Historical assets, costs, failures and decisions remain internal-source data.

For Google, Amazon must identify the approved Cloud project, billing owner, enabled services, restricted credentials and deployment configuration. Engineering must implement autocomplete suggestions, selected-place details, map/location confirmation, timeout/no-results/error handling, session lifecycle and field mapping. Do not treat a postcode or business listing as proof of the correct physical building. Existing internal data must not be overwritten by public suggestions. Reuse/link matches deliberately, with authoritative identifiers and user confirmation. Provider attribution, permitted storage/refresh, applicable terms and credential restrictions must be reviewed before enabling the integration; they are not satisfied merely by adding a Google logo.

Official implementation references: [Autocomplete](https://developers.google.com/maps/documentation/places/web-service/place-autocomplete), [Place Details](https://developers.google.com/maps/documentation/places/web-service/place-details), [field masks](https://developers.google.com/maps/documentation/places/web-service/choose-fields). These document Google services; they do not establish that FERN is connected.

Planned normalized result contract: provider, provider record ID, retrieval time, display label, building name, building number, street, address, postcode, city, state/province, country, and optional coordinates. Internal results also need the canonical Amazon facility ID. Map public location fields only; leave site code, facility classification and FM inputs for internal confirmation. Record user edits separately from provider values. Implement and test provider contracts once the approved services are supplied.

## Verification

Typecheck, 110 automated tests and all builds pass. Added tests cover multi-term/name/address/postcode search, possible duplicate buildings sharing a postcode, backward-compatible address fields and malformed address rejection. The full automated browser suite was attempted and blocked before running by a missing Playwright executable. In-app browser inspection confirmed the new source choices and no-results state; the page state changed during subsequent interactions, so a completed browser journey is not claimed. Live APM/Google, map display, full keyboard journey and external autofill remain unverified/unimplemented as described above.


## Connect Google location search

The Google Places autocomplete integration is implemented. It has not been activated against a live Google account or tested with a valid key in this session.

## Connect in FERN

1. Refresh http://127.0.0.1:4173/ and select **Search online** in the facility selector.
2. Enter the approved **Google Maps browser API key** in the connection form.
3. Select **Connect Google search**.
4. Type a building name, address or postcode into Google's search box and choose a suggestion.
5. FERN opens the available building/address fields for review. Enter the internal site code and facility type, correct missing details, check possible duplicates and confirm before saving.

The key is held in page memory and sent to Google's browser SDK. It is not saved in local storage, facility records or the engineering ZIP. Browser API keys are visible in browser requests and require website/API restrictions. Refreshing the page starts a new session. This implementation uses Google's widget and its suggestion attribution; it does not scrape Google Search.

## Google account setup needed

The Google Cloud project owner must supply a browser key with Maps JavaScript API and Places API (New) enabled, billing configured, and HTTP-referrer restrictions permitting the approved FERN addresses (including http://127.0.0.1:4173/* for this local portal). Configure API restrictions and quotas for that project. Do not use an unrestricted server key or a service-account private key in the browser form. No Google project, paid subscription or API credential was created by Codex.

Official setup: [Google Place Autocomplete widget](https://developers.google.com/maps/documentation/javascript/place-autocomplete-new), [load Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/load-maps-js-api). Amazon still needs to confirm ownership, approved deployment domains, billing/quota administration, applicable Google terms and retention permissions before organisational deployment.

## Implemented behavior and limitations

Selecting a prediction fetches only identity/name, formatted address and address components. It maps building number, street, postcode, city (including UK postal town), state and country. Missing fields remain empty. Internal site code, facility type, assets, costs and maintenance/compliance information are never inferred. The returned place ID and a Google source marker accompany the user-reviewed facility record. No existing internal record is automatically overwritten. Public lookup occurs only in the online widget, not in local facility search.

Script timeout/network failures, Google authentication failure, widget errors and selected-place retrieval errors display a status message. Refresh after fixing an invalid key/configuration. Manual entry remains available. Embedded map/satellite preview is not part of this increment. APM connection is unchanged and remains pending. The browser-session key form is a local development connection method, not Amazon's final central credential configuration.

FERN-FAC-005: Implement Google autocomplete-to-address review with explicit confirmation, missing-field handling and source identification. Implementation complete; live provider acceptance requires an approved key and remains pending.

Verification: typecheck, 113 automated tests and all application builds pass. Added tests verify UK and US address component mapping and absent-field handling without fabricated operational fields. Full browser automation was attempted and remains blocked by the missing Playwright browser executable. No live Google result, billing configuration, valid-key journey or provider acceptance is claimed.


## Pre-Contract service alternatives — 7 September 2026

## Try the update

Refresh http://127.0.0.1:4173/ and open FM Pre-Contract / Pre-Tender Assessment. Choose the facility and start or reopen an assessment.

1. Record purpose, scope and the current arrangement.
2. Review pricing evidence where available.
3. Open **4. Service alternatives** and select **Add service alternative**.
4. Name the option and choose its delivery model and tier. Record scope differences, plant/equipment and responsibility exceptions, concurrent maintenance strategies, mandatory-floor evidence, benefits, risks and impacts over user-described short/medium/long periods.
5. Record evidence, gaps and analyst review status (Under review, Shortlisted or Excluded). Explain shortlist/exclusion rationale. Missing rationale remains visibly open.
6. Compare the entered options side by side with the current arrangement. Use **5. Review & save** and save the draft. Reopen it from the assessment list to continue.

Up to 20 options are supported per assessment. Remove an option and use Undo removal while staying on the alternatives step if needed. Only the most recent removal can be undone; it is not a full revision history. Unknown fields can remain blank in a provisional draft. JSON draft download includes the options. Backup re-import is still pending.

## Scope and limitations

FERN-PCA-007: Persist named alternatives with model, tier, exceptions, concurrent maintenance strategies, mandatory-floor evidence, benefits, risks, time impacts, sources, gaps and analyst review rationale. Provide a descriptive comparison without inventing scores or approval. Implemented locally.

Existing version-1 assessment records without alternatives open with an empty list. Saving retains the original baseline and pricing reference and adds the alternatives. Invalid alternative identities, duplicate IDs, unsupported model/tier/status and excessive lists are rejected before storage is changed. Existing stale-save protection remains active.

This is a descriptive comparison of analyst inputs, not calculated economic/risk evaluation. Option-specific pricing selection, compatibility checks for option costs, quantified Lifecycle effects, eligibility rules, weighted ranking, formal decisions, report snapshots and PDF output remain pending. The current pricing-evidence step continues its existing comparison and is not allocated automatically to options. Baseline maintenance strategy detail is still carried through its evidence/responsibility fields; a structured baseline strategy assessment remains pending.

Core does not waive mandatory-floor requirements. Mixed plant/equipment tiers and strategies can be recorded as narrative exceptions; a structured asset-level allocation model remains pending. Excluded options are retained in comparison for traceability. No option is approved or automatically recommended. Amazon definitions, compliance applicability, criticality/economic methods, approval authority and central storage remain documented dependencies.

## Verification

Typecheck, 117 automated tests and all builds pass. New tests cover legacy compatibility, independent option persistence, invalid/duplicate input rejection without overwrite and rendered comparison wording/missing rationale. The browser test scenario was extended for add/save/reopen; the automated browser suite was attempted but could not start because the Playwright executable is missing. The new interaction journey and undo behavior have not been manually validated in-browser in this increment. No domain acceptance is claimed.


## Pre-Contract option pricing — 7 September 2026

## Use the comparison

Refresh http://127.0.0.1:4173/ and open an assessment for the correct facility.

1. Record the current arrangement model and tier.
2. In **3. Pricing evidence**, select the issued pricing version that represents the current arrangement.
3. In **4. Service alternatives**, create the service options and record their models and tiers.
4. Under **Compare first-year option costs**, select **Load option pricing versions**.
5. Choose a pricing version for each option. Prices must first be prepared and issued in Pricing Template Generator for that facility. Every issued price needs scope, service/maintenance level and tax basis.
6. Explain price applicability, asset coverage, differences in service and scope, and the comparable first-year period. Review the displayed sources, then check the confirmation box for that option.
7. Eligible options show current-arrangement cost, option cost and option-minus-current difference for year 1. Save the assessment to retain the price references and review. Reload option pricing versions when reopening the assessment.

A negative difference means lower entered first-year cost, not a confirmed saving. No totals are added across alternatives. Excluded options remain visible for traceability. A zero baseline has no percentage comparison.

## Requirements and implementation

FERN-PCA-008: Link each service alternative to a fixed issued pricing version and calculate a provisional first-year difference only after compatibility and explicit source-to-option review. Implemented locally. Older alternatives receive empty pricing fields when parsed without altering their other inputs.

Facility, currency, price date and tax basis must match. Both pricing records require scope, service level and tax basis; both service scenarios require model and tier. Users must document scope/service differences and confirm the price-to-option mapping and first-year basis. This is comparison of stated packages, not proof of equivalent service or statutory eligibility. Missing records or invalid costs withhold the difference. No automatic currency conversion, rebasing, period conversion or default prices are applied.

The review is bound to the baseline context, alternative fields, evidence and exact issued input records. Changing these invalidates the confirmation. Available new pricing versions do not silently replace selections. Review binding is stored with the assessment under existing local save/conflict handling. Changing even a narrative option field conservatively requires review again. Price records stay owned by Pricing; saving the assessment does not modify them.

The results appear within the alternatives step. A standalone saved calculation report, PDF, multi-year scenario comparison, Lifecycle aggregation, risk/value ranking and formal recommendations remain pending. The read-only descriptive comparison remains separate from the pricing calculations. No recommendation is generated from price alone. Production shared storage, approval authority, price reconciliation, source licensing and Amazon domain acceptance remain open requirements.

## Verification

Typecheck, 122 automated tests and all application builds pass. Added tests cover signed differences, mismatched facility/currency/date/tax, changed-input review invalidation, missing sources, zero baseline and backward-compatible pricing fields. The automated browser suite was attempted but could not start because its Playwright executable is missing; this increment's interactive pricing review journey has not been manually browser-validated. These checks do not constitute Amazon domain approval.


## FERN homepage update — 7 September 2026

The landing page now starts with **How can FERN help you?**, one labelled question field and four suggested tasks. The user receives relevant application links and explicitly chooses where to go. Unmatched questions show a helpful fallback.

Five application cards follow in the agreed priority order: Pre-Contract, Lifecycle, Contract & Service Model, Pricing, Mobilisation. Each explains the task in one sentence and has an action button. Contract & Service Model is identified as being developed. Facility settings and saved history remain in a collapsed section below the cards; other tools retain the full facility selector.

The previous overview/status/demo panels are removed from the landing view. Navigation to the existing applications and saved records remains. White backgrounds, FERN blue, clear labels, responsive cards and touch-sized buttons follow the existing product design.

FERN-HOME-001: Provide a task-first homepage with a single help entry, suggested tasks and five direct application cards. Implemented. Help is deterministic keyword-based routing, not live generative AI, and the interface says so. No questions are sent to an external AI service. Amazon AI integration, access controls and grounded answers are future work.

Verification: typecheck, 124 tests and all builds pass. New tests verify task routing, unique application destinations and unknown-query fallback. In-app browser inspection at port 4192 verified the narrow-screen layout and that selecting Compare FM service options produces the Pre-Contract application link. A navigation click was exercised; full browser-suite acceptance remains blocked by the missing Playwright executable. Other application cards and full desktop/mobile journeys were not exhaustively re-tested.

## HOME-UI-2026-09 — Welcome homepage integration

Approved visual direction: sidebar-open homepage concept, 7 September 2026. The portal landing view after prototype sign-in shall show a corporate facilities photograph, blue fern identity, guided search, five application cards with simple blue icons and Open tool actions, getting-started resources, introductory learning, and a final Need a hand panel. No sitemap footer. Sidebar is open by default at desktop widths (900px+) and collapsible; at smaller widths it is a dismissible drawer. Escape dismisses navigation; mobile tab navigation remains within the open menu.

Implemented in DashboardPage, HomeNavigation and scoped home.css. Existing calculation apps, site identity and local records are retained. Facility selection/history opens the shared FacilityHub. Tool cards navigate to existing destinations; Contract & Service Model retains its existing incomplete status. Introductory learning/help is local text, not a connected training catalog or support service. Guided search uses keywords, not a live AI model.

Acceptance: sidebar toggle; search pricing suggestion; Getting started -> Choose your facility -> existing history panel; all five app destinations; mobile no horizontal overflow; mobile Escape dismissal; Need a hand remains last. Manually verified with the in-app browser at 1536x1024 and 390x844. Re-runnable automated test added at tests/homepage-browser.mjs. See [handover verification](../../../verification/HANDOVER-VERIFICATION.json).

Amazon decisions retained: production identity/storage/permissions, AI provider, support destination, validated reference library and approved training content remain to be confirmed. No approval is inferred from this UI integration.

## Standalone Pre-Contract facility entry — 10 September 2026

FERN-FAC-001 / FERN-PCA-006 now extend to the Pre-Contract standalone entry: require explicit facility confirmation before opening an assessment, reuse local registration/discovery, preserve site-specific saves, disable facility changes while a draft is unsaved, and retain the assessment when cancelling a facility change. Reopening a session requires facility selection again; no records are migrated between browser origins. Other standalone entries and the website boundary are unchanged. This supersedes the historical statement that no standalone shell includes facility selection, for Pre-Contract only.

Acceptance and limitations: [Pre-Contract facility verification](../apps/pre-contract/PRE-CONTRACT-FACILITY-VERIFICATION-2026-09-10.md). Typecheck, 125 automated tests and all builds pass; bounded in-app browser checks pass; complete automated browser execution remains blocked by its missing Chromium runtime. FERN-RPT-001–010 remain pending.

## Pre-Contract pricing transfer — 10 September 2026

FERN-PCA-003 / FERN-PCA-006 and FERN-PRC-005 now include fixed pricing issue file transfer into Pre-Contract, preview and explicit confirmation, no automatic selection changes, preserved source revisions, recalculation from validated inputs, and rejection of wrong-site/conflicting/invalid issues. Received versions feed the existing option comparison with its original compatibility and review gates. [Detailed specification and acceptance](../apps/pre-contract/PRE-CONTRACT-PRICING-TRANSFER-2026-09-10.md) records the boundaries and verification: 131 tests, typecheck, all builds and both browser suites pass. FERN-RPT-001–010 remain pending.


## Website review corrections — 16 September 2026

See [WEB-FIX-01–05 and acceptance evidence](../website/REVIEW-FIXES-2026-09-16.md) for explicit demo access, functional information controls, readable CTA, page/lesson URLs and accurate footer destinations. This supersedes earlier descriptions of in-memory-only baseline navigation.


## Reference Library usability — 17 September 2026

See [LIB-UX-01–05 and acceptance evidence](../website/REFERENCE-LIBRARY-UX-2026-09-17.md) for unified standards search, ranked source excerpts, typo recovery, responsive task reading and return navigation. This supersedes the earlier Reference Library search and reader layout.


## Application icon proportion — 17 September 2026

[ICON-01 and acceptance](../website/APPLICATION-ICON-SIZING-2026-09-17.md): smaller centred application icons relative to card copy.
