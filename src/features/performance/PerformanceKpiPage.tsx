import { Card, Section } from '../../app/ui';
import GuidanceRoute from '../visual/GuidanceRoute';

const measures = [
  [
    'Planned maintenance',
    'Understand delivery of required scheduled maintenance.',
    'Check the due population, completion timing, authorised deferrals and required evidence. A closed work order alone does not establish satisfactory maintenance.',
  ],
  [
    'Mandatory compliance',
    'Keep applicable mandatory obligations visible.',
    'Review the requirement, its applicability and supporting evidence separately from overall service performance. Unrelated positive results must not offset a mandatory exception.',
  ],
  [
    'Reactive response',
    'Measure response or attendance after a qualifying event.',
    'Identify the event population, priority, clock start and stop, attendance definition and exclusions.',
  ],
  [
    'Operational restoration',
    'Measure the return of the required operational function.',
    'Distinguish restoration from acknowledgement, attendance and permanent repair. Use the applicable service expectation and supporting timestamps.',
  ],
  [
    'Critical-system availability',
    'Understand availability during the required service period.',
    'Define the system boundary, required operating period, downtime, attribution and exclusions before interpreting availability.',
  ],
  [
    'Corrective-action closure',
    'Review completion of agreed corrective actions.',
    'Check due dates, completion evidence and effectiveness review where required. Completion and effectiveness are separate outcomes.',
  ],
  [
    'Repeat failure',
    'Identify recurrence after an issue has been addressed.',
    'Use stable asset identification, a defined fault classification, an agreed repeat window and reliable failure history.',
  ],
  [
    'Backlog & overdue work',
    'Understand deferred and ageing maintenance work.',
    'Review the starting baseline, age bands, criticality, authorised deferrals and exclusions alongside the total population.',
  ],
  [
    'BMS critical alarms',
    'Review the treatment of qualifying building-system alarms.',
    'Define qualifying alarms, classification and suppression rules, and retain links to the relevant work orders.',
  ],
  [
    'Evidence completeness',
    'Check whether activity has the expected supporting records.',
    'Use the evidence specified by the applicable requirement, such as readings, test results, certificates or photographs. Keep each item traceable to its source.',
  ],
  [
    'Asset-data quality',
    'Assess information needed to understand the asset population.',
    'Establish the required fields, baseline and responsibility for maintaining the data before attributing a deficiency.',
  ],
  [
    'Reporting accuracy',
    'Check reported performance against underlying records.',
    'Reconcile the reported result to the authorised source. Retain discrepancies and their evidence rather than selecting the more favourable result.',
  ],
];
const checks = [
  [
    'What needs attention?',
    'Review material service exceptions and keep applicable mandatory requirements visible. Establish the requirement and evidence before assigning a result or responsibility.',
  ],
  [
    'What changed?',
    'Compare equivalent periods, populations and calculation rules. Without sufficient comparable history, a trend cannot be established.',
  ],
  [
    'Can the result be relied on?',
    'Check source records, missing evidence, exclusions and conflicting reports. Missing information is not a zero result or evidence of satisfactory performance.',
  ],
];
export default function PerformanceKpiPage() {
  return (
    <div className="fern-practice">
      <Card>
        <p className="performance-intro">Understand how FM services are performing and what needs attention.</p>
        <p>
          Connect the expected outcome with the recorded result, its calculation and the evidence behind it. Use that
          context to investigate exceptions and decide what follow-up is needed.
        </p>
        <GuidanceRoute
          title="How to review FM performance"
          id="performance-route"
          steps={[
            [
              'Requirement',
              'Check what applies',
              'Identify the scope, period and applicable service requirement.',
              'performance-context',
            ],
            [
              'Measure',
              'Understand the measure',
              'Read what the KPI or SLA examines before interpreting a result.',
              'performance-measures',
            ],
            [
              'Evidence',
              'Review the records',
              'Identify missing, incomplete or conflicting information.',
              'performance-records',
            ],
            [
              'Result',
              'Interpret the outcome',
              'Check the result against the applicable threshold and definition.',
              'performance-result',
            ],
            [
              'Exception',
              'Identify what needs attention',
              'Keep material issues and mandatory requirements visible.',
              'performance-review',
            ],
            [
              'Action',
              'Decide the follow-up',
              'Connect the issue to responsibilities and evidence of effectiveness.',
              'performance-actions',
            ],
          ]}
        />
      </Card>

      <Card id="performance-review" title={<>Review performance</>}>
        <p className="performance-empty">
          No performance records are available on this page. Use the guidance below to understand measures and the
          evidence needed to review a result.
        </p>
        <div className="fern-grid">
          {checks.map(([title, text]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card id="performance-context" title={<>Understand the context</>}>
        <p>
          Before interpreting a result, identify the facility, service, asset or system, delivery model, reporting
          period and applicable requirement. Include the service tier where the measure uses it.
        </p>
        <p>
          Prime, Plus and Core do not automatically change every KPI or SLA. Use tier-specific targets only where the
          applicable methodology defines them. Mandatory requirements continue to apply regardless of tier.
        </p>
        <Section header={<>What to check in a measure definition</>}>
          <ul>
            <li>Purpose, scope, unit and measured population.</li>
            <li>Calculation rule, reporting frequency and exclusions.</li>
            <li>Target or threshold, with its source, version and applicability.</li>
            <li>Clock start, clock stop and event classification for time-based measures.</li>
            <li>Required evidence, assumptions and information gaps.</li>
          </ul>
        </Section>
      </Card>
      <Card id="performance-measures" title={<>KPI &amp; SLA guide</>}>
        <p>
          A KPI measures an important aspect of FM performance. An SLA sets an applicable service expectation; its
          measures show whether that expectation was met.
        </p>
        <p>
          The measure families below explain what to examine. They do not establish a current contractual definition,
          target or score for a facility.
        </p>
        {measures.map(([title, purpose, detail]) => (
          <Section key={title} header={<>{title}</>} description={<>{purpose}</>}>
            <p>{detail}</p>
          </Section>
        ))}
      </Card>
      <Card id="performance-evidence" title={<>Results &amp; evidence</>}>
        <Section id="performance-result" header={<>Read a result alongside its threshold</>}>
          <p>
            A recorded result can exist without an established assessment threshold. Do not interpret it as red, amber
            or green without the applicable definition. Check the source and version of the target before judging
            performance.
          </p>
        </Section>
        <Section id="performance-records" header={<>Check missing or conflicting evidence</>}>
          <p>
            Incomplete timestamps can prevent an SLA assessment. Unavailable maintenance evidence does not automatically
            prove either successful delivery or failure; use the applicable requirement. Where reports disagree, compare
            both results and their underlying evidence.
          </p>
        </Section>
        <Section header={<>Compare trends fairly</>}>
          <p>
            Check reporting periods, operating hours, facility type, asset population, service scope, delivery model,
            exclusions and calculation rules. A lower result at a different facility does not by itself establish poorer
            service performance.
          </p>
        </Section>
        <Section header={<>Distinguish definition status</>}>
          <p>
            Check whether a definition is current, developing, proposed, reference material or superseded. An existing
            measure in one contract is not automatically applicable to another. Critical Performance Indicators (CrPI)
            are a proposed classification. Confirm the applicable definition and its status before using it to assess a
            result.
          </p>
        </Section>
      </Card>
      <Card id="performance-actions" title={<>Follow-up &amp; responsibilities</>}>
        <h3>From exception to action</h3>
        <p>
          Identify the affected requirement, evidence and service context. Link the issue to the relevant action and
          review the evidence of completion and effectiveness. Repeated issues can inform further investigation and
          continual improvement without establishing a root cause on their own.
        </p>
        <h3>FM expertise &amp; service responsibility</h3>
        <p>
          BXM develops and maintains FM KPI and SLA frameworks and methodologies within its remit. Establish
          responsibility for delivery, recording, reporting and follow-up from the applicable service arrangement. A
          facility-level issue does not automatically establish supplier responsibility.
        </p>
        <h3>Contractual outcomes</h3>
        <p>
          Service credits, payments or other commercial outcomes depend on the applicable contract and authorised
          commercial source. A KPI result alone does not establish a contractual consequence.
        </p>
      </Card>
    </div>
  );
}
