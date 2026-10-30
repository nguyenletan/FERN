# FM Mobilisation and Transition Tracker purpose and benefits review

7 September 2026 · Product review · Proposed direction, not an implementation or approval claim

## Recommended purpose

Use the tracker to coordinate a change in how FM services are delivered, from preparation through handover and early operation. Its central question should be: **what must change, who is responsible, what must be evidenced, and what remains unresolved?** This applies to internal, outsourced and mixed delivery models.

The current register provides a starting point: delivery context, task descriptions, owners, deadlines, statuses, evidence notes and portable backups. The benefits below depend on the quality and completeness of the information people enter. They are expected benefits, not measured outcomes or proof of operational readiness.

## Wider purposes and practical benefits

| Purpose | Example action | Potential benefit | Support today and next requirement |
| --- | --- | --- | --- |
| Mobilise a new facility or service | Confirm service boundaries and required handover information. | Make preparation actions and missing information visible before service starts. | Manual context and tasks work today. Approved templates and milestone gates are future work. |
| Transfer between providers | Obtain outgoing-provider records and identify unresolved handover actions. | Reduce the chance that information or responsibilities are lost during transition. | Record actions and references now. Structured transfer and acceptance records are not implemented. |
| Bring services in-house or outsource them | Confirm the split of retained and external responsibilities. | Make the intended operating arrangement explicit to the teams delivering it. | Model selections and scope notes work now. No automated feasibility or staffing determination. |
| Resolve service-ownership gaps | Obtain written confirmation of who maintains a specified asset: Amazon, landlord, developer or provider. | Help expose the responsibility gaps previously described by the user. | Record owner-confirmation tasks now. The task owner is not automatically the maintenance duty holder; a structured responsibility register is future work. |
| Prepare people and operational capability | Confirm coverage, competence, access and named contacts for agreed work. | Surface unresolved preparations affecting practical delivery. | Manual tasks only. No staffing calculation, HR assignment, competence verification or access-system connection. |
| Improve asset and maintenance information at handover | Reconcile an asset list with the agreed service scope and record missing maintenance information. | Make data-remediation work visible and assignable before it affects service delivery. | References and follow-up tasks now. No APM/CMMS sync, asset reconciliation engine or verified record migration. |
| Change service scope, model or tier | Record the actions needed after an authorised change to facility or asset service arrangements. | Translate a business decision into a visible implementation plan. | Current/target context and descriptive asset exceptions now. No automatic task generation or approval of the change. |
| Coordinate replacement or refurbishment handover | Confirm manuals, maintenance responsibilities and training references for affected equipment. | Connect project handover with FM operational needs. | Manual FM handover actions now. This is not a construction programme, commissioning or technical-certification system. |
| Stabilise service after mobilisation | Track unresolved handover actions and early-service corrective actions. | Keep attention on issues that remain after the nominal start date. | Manual tasks now. No incident feed, SLA/KPI calculation or automatic escalation. |
| Manage demobilisation or facility/service exit | Identify records, access-removal requests and responsibility-transfer actions. | Make exit obligations and residual responsibilities visible. | Use Other and describe exit scope; target model may remain blank where none applies. There is no dedicated closure model or account-revocation automation. |
| Capture lessons for the next transition | Record an action to document a recurring handover issue and its proposed improvement. | Support learning from completed transitions. | External reference and manual notes now. No lessons library, reusable approved templates or cross-site analytics. |

## Recommended working structure

A useful future lifecycle is: define the change; agree scope and responsibilities; prepare resources and information; coordinate mobilisation; review handover; stabilise service; close or demobilise and capture lessons. Some projects will omit stages or use a different order.

Today this can be represented with short task-description prefixes such as “Preparation”, “Handover” or “Stabilisation”. These are a suggested naming convention, not implemented phases, filters or approval gates. Keep one clearly bounded change in the master plan. The current storage supports one saved plan per site, so it is not suitable for treating several concurrent programmes as separately managed records.

## Benefits worth measuring later

FERN should eventually show whether the process improves handover quality and service continuity. It should not infer that from a high count of completed tasks.

| Candidate measure | Additional information required |
| --- | --- |
| Tasks completed by their agreed due date | Actual completion timestamps, agreed scope/baseline and a policy for changes to due dates. |
| Outstanding critical blockers at a handover gate | Approved criticality criteria, structured blockers, dependency relationships and gate dates. |
| Evidence accepted on first review | Reviewer decisions, evidence versions, acceptance criteria and review history. |
| Time taken to resolve responsibility gaps | Typed gap records, opened/resolved timestamps and confirmation of the responsible parties. |
| Actions carried into early operation | An agreed handover baseline, actual handover date and tracked closure history. |
| Mobilisation cost against the agreed baseline | Approved scope and currency/date basis, cost imports and a rule preventing double counting. |

These measures are proposals. The current tool has neither the structured data nor the calculations to report them reliably. Targets and denominators need Amazon agreement before use. No financial savings, compliance improvement or reduction in failure rates has been demonstrated by this review.

## Recommended development order

1. **Make the manual register dependable for larger changes.** Add multiple plans per site, explicit phases/milestones, task identifiers visible to users, dependency/blocker links, change history and completion dates. Validate restore/import behaviour as these records expand.
2. **Make handover accountable.** Add separately identified task owners, service-responsibility holders and evidence reviewers; controlled evidence references; acceptance criteria; and explicit handover decisions. Agree Amazon's role and approval model first.
3. **Enable coordinated delivery.** Implement the confirmed Amazon identity and shared-storage environment, access permissions, concurrent editing and notifications. Do not treat today's demo accounts or free-text owners as those capabilities.
4. **Connect and learn.** Add authorised interfaces to relevant FERN records and APM/CMMS, then approved readiness methods, cost reconciliation, benefits reporting and reusable lessons. Avoid copying unverified data into a readiness conclusion.

This is a proposed sequence for discussion. The user requested a review and guide update; none of these additional capabilities is implemented by this documentation change.

## Scope boundaries and Amazon decisions

Keep the application focused on delivering FM change. Routine work-order dispatch, maintenance execution, payroll, procurement transactions, emergency response and statutory certification require their appropriate systems and accountable people. Their outputs may be referenced by transition tasks; the tracker does not replace them.

Amazon should confirm which use cases are in scope first, the phase/task catalogue, service-responsibility boundaries, evidence and acceptance rules, readiness/decision authorities, multiple-plan and record-retention requirements, staffing/APM interfaces and how benefits will be measured. Existing unresolved definitions, including AFM and the applicability of draft resource rules, remain open.

## Review basis

Reviewed against the current launch-plan schema and workbench, the existing user guides, and the user's descriptions of FM delivery, staffing and responsibility gaps. No external benchmark study was performed. This is a product-specific assessment of plausible uses and required capabilities, not an assertion of an industry standard or Amazon-approved workflow.
