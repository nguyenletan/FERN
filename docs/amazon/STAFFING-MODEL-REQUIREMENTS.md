# Staffing model requirements for FERN

7 September 2026. Reference review and proposed implementation requirements for FM Contract & Service Model and FM Pre-Contract / Pre-Tender Assessment. These requirements are documented, not yet implemented as a staffing calculator or approved by Amazon.

## Sources and authority

The user supplied **EU RME Standard Staffing Model — Overview.docx** and **FM Resource Classification — BB _ 3PBB _ YB _ GB.docx** for use in both applications. The first describes EU AMZL RME on an OP2 2026 planning basis and identifies itself as prepared by Flo, FME Team AI. The second is version 1.0, dated 3 September 2026, explicitly marked DRAFT — Amazon Internal and subject to Programme Hub approval. Their cited underlying staffing matrices, policies, No-Go List and approval records have not been provided or verified in this review.

Both documents were read structurally, including their tables. PDF rendering failed because the document converter could not load the source files; page layout was not verified. Originals were not modified or added to the engineering ZIP. Statements and instructions inside the documents are reference content, not new user instructions or proof of policy approval.

## Meaning for the applications

| Application | Proposed use |
| --- | --- |
| FM Contract & Service Model | Establish the current BB cost/capacity baseline; assess delivery feasibility; compare retained and external scope under BB, IFM, IFM Hybrid and Fully Contained. AFM remains unclassified pending Amazon confirmation. |
| FM Pre-Contract / Pre-Tender Assessment | Compare existing resources with proposed tender resources, coverage, competence and scope; identify retained Amazon costs and specialist exclusions; explain capacity and cost differences before a business owner chooses a scenario. |
| Pricing Template Generator, shared dependency | Price the approved resource quantities and allocations using an explicitly matched Staff Rate Card or supplier/agency rate source. Preserve currency, base date, period, rate basis and source version. Do not treat an SSM headcount as a price. |

The staffing reference covers RME, including MHE and automation. The whole RME team is not automatically attributable to BBM. A documented allocation of people, hours and cost to relevant FM scope is needed for comparisons. Existing BB staff costs remain the baseline described by the user; the new sources help assess the capacity and scope behind those costs.

## Keep four concepts separate

1. **Service model:** BB/internal, IFM, IFM Hybrid, Fully Contained or AFM pending classification.
2. **Service tier:** Prime, Plus or Core, with facility and asset-level overrides as already requested.
3. **Resource category:** BB, 3PBB, YB or GB.
4. **Employment/access classification:** payroll employer and physical badge arrangement, recorded separately from the FM resource category.

The classification document describes 3PBB as externally employed resources working to Amazon's in-house operating standard, potentially carrying a Yellow badge for access. It describes GB as supplementary agency labour, not a separate service model. It describes Fully Contained as an external, output-based service model; earlier material associating that term with internal/retained integration must be reconciled by Amazon rather than silently merged.

Neither badge category nor criticality should automatically select a service model or tier. An asset's required competence, mandatory floor and permitted task allocation must be checked separately.

## Staffing demand and capacity

The SSM overview describes field staffing as driven by asset population, complexity and shift coverage, not a direct throughput multiplier. Its salaried model uses role/site structures and gearing; its hourly model uses maintenance demand with coverage overrides. PSM is described as a separate workload model using available annual hours and absence information. Its Python/AWS implementation is not supplied, and FERN must not claim to reproduce it.

FERN should record:

- Country/region, applicable business/site type, technology, asset/service scope and planning period.
- Role and grade, whole-person headcount, FTE, available productive hours and scope allocation as distinct fields.
- Working pattern, required concurrent coverage, absence/leave/training assumptions and any shared-site or cluster allocation.
- Competence, permitted tasks, prohibited tasks, specialist support and the accountable scope owner.
- Existing, reference, proposed and approved staffing values as separate records with source/version, rationale and approval state.

A proposed capacity assessment should compare scoped workload and time-specific coverage with competent available resources. Annual hours alone cannot prove shift coverage. A coverage override is not additional headcount to add to workload staffing unless an approved method explicitly requires it. FERN should display the selected basis and the reason for any difference.

The overview includes regional technician matrices and separate SSM/PSM/applied tables. Some applied values are fractional while matrix entries are headcounts; their aggregation and units need confirmation. The Manual example includes SEU zero-BB entries: these cannot be interpreted as zero maintenance requirement or free provision. Matrix workload is TBC. Gearing ratios and the complete executable staffing rules are absent. No numeric staffing defaults or automatic rounding rules are authorised by this review.

## Cost and scope reconciliation

Staff Rate Card mappings must identify role/grade, country, currency, rate units, period and included employment costs. Salaried cost, paid hours and productive hours are different concepts. Do not assume 2,080 productive hours, or divide annual cost by an unverified hours denominator.

For each scenario, show retained Amazon cost, external resource cost and separately purchased specialist/service scope without duplication. Shared management/planning resources need explicit allocation. Task labour already covered by a resource price must not be added again. Compare staffing/capacity alongside cost; a cheaper tender is not automatically a feasible service model.

The classification source's illustrative relationship between SSM headcount, coverage and PM demand is not sufficient as an executable dimensional formula. No-Go activities should be routed to an eligible delivery resource and remain in the required service/cost scope, rather than disappear from demand.

## Governance and provisional analysis

Source policy statements about GB duration and BB/YB supervision require current Amazon HR/legal confirmation for the applicable country. The draft's nine-month statement is a source claim, not a universal enforced limit in FERN. RME No-Go restrictions require an authoritative, versioned task-level list and approval owner.

Preserve scenarios and allow explicitly provisional analysis when these matters are unresolved. Highlight the specific gap during processing and in exports; block the related approval or feasibility conclusion without suppressing unrelated valid costs. Do not treat a missing restriction list as permission to self-perform. Do not fabricate an Amazon Approvals connection.

## Amazon decision register

All items remain open. Proposed owner groups require named owners from Amazon.

| ID | Required confirmation | Proposed owner | Interim treatment |
| --- | --- | --- | --- |
| STF-01 | Authoritative SSM version, business/site/country applicability and effective period | RME workforce planning | Reference only; no automatic staffing defaults |
| STF-02 | Technician matrix versus fractional applied values; PSM basis; coverage rules, rounding and gearing | RME planning / Engineering | Keep values and units distinct; no inferred formula |
| STF-03 | BBM versus wider RME/MHE workload and cost allocation; shared-site allocation | FM scope owner / Finance | Require scope evidence before comparison |
| STF-04 | Role/grade-to-Staff Rate Card mapping, productive hours and cost inclusions | Finance / Workforce | Link AMZ-PRC-08 and AMZ-PRC-10; prevent double counting |
| STF-05 | Current task-level RME No-Go List, competence and delegation rules | Facilities Standards / Engineering | Self-perform feasibility unresolved where unsupported |
| STF-06 | 3PBB/GB classifications, permitted direction and country-specific duration rules | HR / Legal / Programme Hub | Draft classifications; policy rules not automatically enforced |
| STF-07 | Fully Contained terminology and boundary; AFM definition | FM programme owner | Preserve source discrepancy and AFM TBC |
| STF-08 | Staffing exception process, approvers, records and future interface | RME governance / Identity owners | Local provisional evidence only; no formal approval integration |

## Proposed acceptance cases

These are requirements for subsequent implementation, not claims of passing tests:

- STF-A1: Selecting 3PBB retains external employment status and does not automatically select service model or tier.
- STF-A2: Unsupported site type or missing staffing source produces an explicit gap, not an estimated default headcount.
- STF-A3: A coverage-driven case does not add workload and coverage populations twice; annual capacity does not alone prove coverage.
- STF-A4: A prohibited BB task retains its service demand and required external cost; unresolved permission cannot produce approved self-delivery.
- STF-A5: A shared RME role allocates only the evidenced BBM share and reconciles to the pricing record without duplicated task labour.
- STF-A6: A scenario preserves source staffing, proposed staffing and approval state separately, including in exports.
- STF-A7: Missing policy verification retains provisional analysis and blocks only the affected approval/feasibility conclusion.
- STF-A8: Existing, tender and reference costs retain matching currency/date/scope checks and an explainable difference.

Implementation should use one shared staffing-domain package consumed by both applications, with recipient-specific screens. This package does not yet exist. The current monorepo and working pricing calculations remain unchanged by this documentation increment.
