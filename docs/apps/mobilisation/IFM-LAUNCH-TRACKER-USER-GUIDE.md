# FM Mobilisation & Transition Tracker user guide

FERN · Version 1.2 · 7 September 2026

This guide explains the purpose, intended users and practical operation of the current FM Mobilisation & Transition Tracker. It describes the software available today and distinguishes it from the proposed governance workflow.

## 1. Purpose

The FM Mobilisation & Transition Tracker helps coordinate a change in how facilities-management services are delivered: **what needs to change, who is responsible, when it must happen, what evidence is needed and what remains unresolved**.

Its purpose extends from preparation through handover and early operation, including internal Blue Badge, IFM, IFM Hybrid and Fully Contained arrangements. AFM can be recorded as a proposed model while its definition remains pending Amazon confirmation. Mixed arrangements can be described without forcing every asset into the facility's service model or tier.

The current software is a manual, provisional plan and task register. It can help organise preparation, ownership clarification and handover follow-up. It does not verify that the plan contains every mandatory requirement, approve a model, calculate staffing or authorise service to go live.

Expected benefits include clearer responsibilities, visibility of blockers, more traceable handover references and continuity of attention after the start date. These depend on users maintaining accurate records; they are not measured or guaranteed outcomes.

## 2. Who it is for

The following are suggested users and responsibilities, not configured application permissions.

| User | How the tool can help |
| --- | --- |
| Launch or mobilisation coordinator | Maintain the plan, collect updates, identify blockers and prepare review meetings. |
| Site or facilities manager | Review actions affecting the facility and clarify responsibilities or missing information. |
| Incoming FM provider | Supply progress and evidence references for agreed mobilisation tasks through the plan coordinator. |
| Outgoing provider or handover lead | Identify information, records and activities still needed for transition. |
| Amazon retained team or BB resource lead | Record actions concerning retained responsibilities, capacity, competence and coverage. |
| Engineering, standards or compliance specialist | Identify required checks and review evidence outside the current tool's approval mechanism. |
| Commercial or procurement lead | Track actions following an agreed contract or service-scope decision. |
| Business owner or programme sponsor | Use the recorded information to inform review discussions and request action. |

The current version has demo sign-in. Entering a person's name does not give them access, assign an authenticated account or send a notification. It does not provide simultaneous team editing. A practical interim arrangement is for one coordinator to maintain the master plan and collect updates from others.

## 3. What it can be used for

All examples below are possible uses of today's manual register, not approved task templates or automated workflows.

| Situation | What to record | Benefit to the team |
| --- | --- | --- |
| New facility or FM service | Preparation actions, agreed service boundaries and information gaps. | A visible list of what still needs attention before service begins. |
| Provider transition | Handover records, outgoing/incoming responsibilities and unresolved actions. | Less opportunity for information to be overlooked between parties. |
| Insourcing, outsourcing or a mixed model | Current/target arrangement and actions for retained and external scope. | A clearer connection between the intended model and its implementation. |
| Ownership uncertainty | An action to obtain confirmation of responsibility for a named asset or service. | Visibility of gaps between Amazon, landlord, developer and provider assumptions. |
| Staffing and access preparation | Confirmation actions for agreed coverage, competence, contacts and access. | Earlier discussion of unresolved delivery preparations. |
| Asset-data or maintenance-information handover | Reconciliation actions and references to the relevant records. | An organised list of information that must be corrected or obtained. |
| Scope or tier change | Affected services/assets and actions following the agreed change. | Better visibility of facility and asset-specific exceptions. |
| Refurbishment or equipment handover | FM actions concerning manuals, maintenance responsibilities and training references. | A link between project outputs and operational FM needs. |
| Early-service stabilisation | Residual handover actions and follow-up on issues reported by the team. | Open issues stay visible after mobilisation. |
| Demobilisation or service exit | Agreed records, access-removal requests and responsibility-transfer actions. | A documented list of matters to resolve before exit. |
| Lessons from a transition | Actions to document an issue, lesson and proposed improvement. | Useful references for later planning. |

For exit or an unusual change, use **Other** as the transition type and explain the scope. Leave target model blank if no listed target applies. The tool does not yet have a dedicated closure model. Never select a misleading model merely to fill a field.

A task's responsible owner is the person coordinating that action; it does not by itself establish the party legally or contractually responsible for the service. Obtain the appropriate confirmation outside the tool and record its reference.

The register does not connect to APM, revoke access, verify competence, certify equipment or handle incidents. These examples mean tracking the associated preparation or follow-up actions only.

## 4. How it relates to other FERN applications

| FERN application | Relationship to launch tracking |
| --- | --- |
| FM Contract & Service Model | Intended to inform what arrangement is being implemented and which responsibilities are retained or outsourced. |
| FM Pre-Contract / Pre-Tender Assessment | Intended to inform the selected scope and commitments that subsequently need mobilisation. |
| Pricing Template Generator | Provides cost-planning information that may be referenced in relevant launch actions. |
| Lifecycle & Asset Analysis | May identify asset-information or maintenance actions relevant to handover. |

These relationships describe the intended business flow. **The current Launch Tracker does not automatically import staffing plans, pricing, assessment decisions or lifecycle results.** Record an accurate reference in the task notes when relevant. Do not assume an item has transferred because it exists elsewhere in FERN.

The supplied BB staffing and resource-classification documents can inform later resourcing requirements, subject to their applicable scope and Amazon validation. They do not automatically create tasks or calculate required staffing in this version.

## 5. Before you begin

Identify the facility, the arrangement being launched, the person maintaining the plan and the sources from which tasks will be agreed. Bring the available contract/scope references, key dates, responsible contacts and evidence locations.

You can begin with incomplete information. Use draft tasks and notes to identify gaps. Do not fill a missing requirement or approval with an assumption presented as fact.

Use the same browser and exact web address each time if you want to restore its saved data. The portal and standalone tool use separate storage when their addresses differ.

## 6. Start or continue

Open the FERN portal at http://127.0.0.1:4173/, use the current demo sign-in `demo` / `demo`, and select **FM Mobilisation & Transition Tracker**. The independent development tool remains at http://127.0.0.1:4177/ when its server is running. Different addresses have separate browser storage.

The opening screen now offers **Start a new plan** and, when one is saved, **Continue saved plan**. The saved-plan card shows the plan name, task count and last-save time where available. Older files without timestamps say the time was not recorded; none is invented.

Choose Continue to open the saved tasks directly. Choose Start a new plan for a fresh draft. If a saved copy already exists, confirm **Start new draft**; the old saved copy remains until you save the replacement. One saved plan per site is still the limit.

Check the displayed site, region and facility type. To change the portal site, expand **Ask FERN and change site context** below the tracker and use its site selector. The standalone tool uses BHX4 demonstration context. Save before changing sites.

**About readiness and approvals — planned governance** is a secondary disclosure. It contains the future source/approval workflow, not prerequisites to using the manual register.

## 7. Four-step setup

The numbered setup buttons and Back/Next controls let you move between steps. Unknown values may remain blank; missing information is identified at review without preventing a provisional draft. **Save draft** remains available at the top. **Go to tasks** lets you leave setup without saving; the draft remains unsaved until you save it.

| Step | What to enter |
| --- | --- |
| 1. Facility & purpose | Check the displayed site, enter the Launch plan name and select the Mobilisation / transition type. |
| 2. Delivery arrangement | Select Current delivery model, Target delivery model and Facility service tier. |
| 3. Affected scope | Describe Affected services and service boundaries and Affected assets or equipment groups. Open Asset-specific exceptions (optional) for asset-level models, tiers and rationale. |
| 4. Review | Read the summary and outstanding information, then choose Save draft and open tasks. |

Models include Full Blue Badge, IFM, IFM Hybrid, Fully Contained, AFM pending definition and Other / mixed. No existing arrangement is available for the current model only. Fully Contained terminology remains subject to confirmation; AFM is not automatically classified. Model choices do not calculate staffing or approve suitability.

Transition types include new-facility mobilisation, provider transition, bringing services in-house, outsourcing, model change, scope/tier change and Other. For demobilisation or an unusual change, choose Other and explain scope rather than selecting a misleading model.

Facility tiers are Prime, Plus, Core or Mixed / asset-specific. Asset exceptions are descriptive notes, not structured allocation calculations. The portal's demonstration service model is separate from your user-entered plan context. Legacy plans open with new context fields blank where they were never recorded.

## 8. Run the task workspace

After setup, the task workspace shows the plan name, save state, task counts, **Edit plan setup**, **Save draft**, search, status filtering and **Add launch task**.

Each task is a compact row showing its description, owner, deadline and status. Click the row to edit or close it. Search matches descriptions, owners and notes; status filtering shows All tasks, Not started, In progress, Blocked or Complete. Filtering does not remove tasks or change saved data. Adding a task clears the filters so the new task can be seen. Up to 200 tasks are supported.

| Field | What to record |
| --- | --- |
| Task description | A specific action with an observable outcome. |
| Responsible owner | The person or role accountable for this action. This does not assign an authenticated account or send a notification. |
| Deadline (DD-MM-YYYY) | A real calendar date, such as 30-09-2026. An unfinished draft can leave it blank. |
| Evidence reference / progress or blocker notes | Progress, what prevents action, or enough information to locate completion evidence in the authorised source system. |
| Task status | Not started, In progress, Blocked or Complete. |

Complete requires description, owner, valid deadline and evidence. Attempting to complete an incomplete task displays errors next to the affected fields and a task-level explanation. It does not accept Complete until the fields are present. Removing required information later from a completed task flags it for correction. This is an information-completeness check, not evidence acceptance or launch approval.

The totals describe entered tasks only. They do not assess whether all required work is included. The tool does not calculate a readiness percentage, automatically detect overdue tasks, send reminders or receive work-order updates.

## 9. Save and protect your draft

The prominent **Save draft** button stays at the top of the active setup/task workspace. The adjacent status distinguishes Unsaved changes, Not saved yet and Saved in this browser. New saves include a local save timestamp. Timestamps are not signed audit evidence.

Save writes one plan for this site at this exact browser address. It replaces the previously saved copy. There is no autosave, shared Amazon storage or full version history. Read the success or error message. Invalid dates or incomplete records marked Complete prevent a successful save; the task needing correction is opened where identifiable.

The portal warns before changing application, changing site or signing out with an unsaved mobilisation draft. The standalone sign-out also warns, and a browser close/reload warning is requested for unsaved drafts. Browser warning behaviour is controlled by the browser and is not a substitute for saving or keeping backups.

If another tab has changed the saved record since this workspace loaded it, Save refuses to overwrite that newer copy. Download your draft, restore the latest saved copy, and reconcile the differences manually. The tool does not merge concurrent edits.

Use **Edit plan setup** to change context after creating tasks. Returning to tasks retains those changes in the draft; save them when ready.

## 10. Backups, import and recovery

Expand **Backups and recovery** below the active work area. These actions are secondary to normal saving.

- **Download launch plan backup** exports `FERN-launch-plan.json`. Download does not update the browser-saved copy. Keep dated copies in your chosen folder; retain the `.json` extension if renaming them.
- **Restore saved launch plan** opens a replacement warning. Choose **Replace draft with saved plan** or **Cancel**. Successful restore opens the saved task workspace; failed restore retains the current draft.
- **Import launch plan backup** accepts a compatible JSON file for the displayed site, up to 2 MB. It first presents the plan name, site and task count. Choose **Replace draft with backup** to apply it, or Cancel. Import does not save automatically; review and Save draft afterward.

Save or download your draft before confirming replacement. Excel/CSV files, source documents and exports from other FERN apps are not supported by this importer. Invalid records are rejected. Older compatible plans retain their tasks and optional context; missing save timestamps are left unrecorded.

## 11. Removing tasks and sharing

Inside an expanded task, choose **Remove task**, then **Confirm removal**, or **Keep task**. The latest removed task can be recovered using **Undo last removal** while this workspace remains open. Only the latest removal is retained for undo; it is not a recycle bin or deletion history. Download a backup before major changes. Saving after removal updates the saved plan; undoing afterward changes the draft and requires another save.

For team use, nominate one master-plan coordinator and share JSON backups through an agreed channel. Recipients need the app and matching site context. The current tool cannot merge changes, grant access or establish which file is formally approved. Evidence references may be internal, so use the appropriate sharing arrangements.

The engineering source ZIP does not include browser-saved plans. Download plan backups separately when handing over work.

## 12. Suggested operating routine

Start each review with Continue saved plan. Search or filter the task list to find relevant actions, confirm owners and deadlines, discuss blockers and record accurate evidence references. Use Edit plan setup only when scope changes. Save after updates and download a dated backup when needed.

Keep residual handover work visible after service starts. The nominal start date does not automatically complete tasks. Optional task-description prefixes such as Preparation, Handover, Stabilisation or Exit can help naming, but phases, milestones and dependencies are not yet structured features.

One saved slot per site is not one slot per plan name. Renaming a plan does not create a second stored plan. Preserve prior work in backups before saving a new plan for that site.

## 13. Troubleshooting

| Issue | What to do |
| --- | --- |
| Local page will not open | Ask the person running FERN to start its server; a bookmark does not start it. |
| Continue saved plan is missing | Confirm the same site, browser and exact address. Inspect any storage error, or import a backup. |
| A task is not visible | Clear Search tasks and select All tasks; expand its row to edit it. |
| Complete will not be accepted | Check the field-level messages for missing owner, description, deadline or evidence. |
| Save fails on a date | Enter a valid DD-MM-YYYY date, or leave the field blank for an unfinished draft. |
| Another tab changed the saved plan | Download your draft before restoring the latest saved record. Reconcile manually. |
| Import rejects the backup | Use a compatible Launch Tracker JSON file for this site within the 2 MB limit. |
| You need an older version | Use an external backup; only the latest browser-saved plan is retained. |
| Colleagues do not see updates | Shared storage is not connected. Agree a coordinator and a backup-transfer process. |

## 14. Current scope and future development

Working today: current/target delivery model, transition type, service/asset scope and tier notes; guided setup and saved-plan continuation; searchable/filterable task rows; confirmed removal with last-removal undo; owners, deadlines, statuses and notes; completion-field checks; counts; site-specific browser save/restore; JSON backup/import; light-theme screens.

Still to be developed: controlled source intake and validation; approved requirement templates; dependencies and milestone gates; staffing/resource integration; verified evidence; multiple saved plans per site; shared editing, identity and permissions; audit history; reminders; configured readiness assessment; formal review and approval; final assurance reports and Amazon interfaces.

The planned workflow panels illustrate the intended sequence. Their unavailable states and disabled controls are not completed operational features. “Source readiness not ready” concerns the missing controlled source/governance process; it does not mean the manual task register is unavailable or that a particular facility has failed an assessment.

### Potential future benefits and how to judge them

With further development, the tracker could support accountable handover acceptance, dependencies and milestones, shared team updates and reusable lessons. Useful measures might include completion against agreed dates, critical blockers at handover, evidence accepted on first review and actions carried into early operation.

These measures are not calculated today. They require completion timestamps, stable baselines, criticality rules, review records and agreed definitions. Current task counts cannot prove readiness, compliance, cost savings or successful transition. The reviewed development priority remains richer plan/history controls, accountable handover, shared delivery and authorised integrations. The new setup and task workspace improve usability but do not supply those wider governance capabilities.

## 15. Amazon decisions needed

Before controlled launch governance can be implemented, Amazon needs to confirm the applicable mobilisation/transition scope, task catalogue and source versions; responsibility assignments; evidence acceptance criteria; dependencies and milestone rules; readiness method; approval authorities; shared-storage and identity arrangements; record-retention and audit requirements.

These decisions should retain named owners, scope, effective versions and approval evidence. Until they are resolved, the manual register remains provisional and the final operational decision remains with the responsible authorised people.

## 16. Verification and guide basis

This guide was checked against the current LaunchPlanWorkbench and launch-plan validation code. The current increment has 97 passing automated tests and successful typechecking/builds. In-app browser checks covered task entry, missing-completion blocking and save/restore. Full automated browser/download testing remains blocked by the local browser-launch environment (missing Playwright browser; installed Chrome exits before execution); it is not claimed as complete acceptance or Amazon domain approval.

For your first use, follow [the start-up guide](FM-MOBILISATION-START-UP-GUIDE.md). Read [the purpose and benefits review](FM-MOBILISATION-PURPOSE-AND-BENEFITS.md) for potential benefits, proposed measures and development priorities. These proposals are not additional working features.
