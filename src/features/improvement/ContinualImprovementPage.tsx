import GuidanceRoute from '../visual/GuidanceRoute';
import { Card, Section } from '../../app/ui';

const sources = [
  [
    'Performance & Service Experience',
    'Recurring failures, service issues, increasing backlog or reporting discrepancies can identify a need for review.',
  ],
  [
    'Audit & Evidence',
    'Repeat findings, ineffective corrective actions and recurring evidence gaps can reveal issues beyond a single record.',
  ],
  [
    'Assets & Risk',
    'Unexpected asset life, deterioration or changed operating conditions can prompt a review of maintenance and lifecycle assumptions.',
  ],
  [
    'People & Practices',
    'User feedback, unclear guidance, duplicated work and successful local practices can provide useful improvement signals.',
  ],
];
const stages = [
  [
    'Detect & Gather Evidence',
    'Describe what has been observed and retain the supporting records. Identify the facility, asset, service, population and period affected.',
  ],
  [
    'Assess & Review',
    'Examine impact, recurrence, dependencies, risks and information gaps. Distinguish evidence from assumptions and potential contributing factors.',
  ],
  [
    'Decide & Implement',
    'Record the decision through the applicable process and carry out the agreed change. A proposed improvement remains separate from an approved activity.',
  ],
  [
    'Verify & Learn',
    'Compare the outcome with the starting point using an appropriate measure. Capture what was learned and where the evidence supports using that learning again.',
  ],
];
const lessonFields = [
  ['Context', 'Where did the experience occur, and what facility, asset or service was involved?'],
  ['Observation', 'What happened, and why did it matter?'],
  ['Evidence', 'Which records support the conclusion, and what limitations remain?'],
  ['Learning', 'What should be understood or done differently in future?'],
  ['Outcome', 'What changed, and did the evidence demonstrate the intended result?'],
  ['Applicability', 'Where else might the lesson be relevant, and what needs review before using it?'],
];
const journeySteps = [
  [
    'Evidence',
    'Gather the facts',
    'Identify the issue and collect the records that describe it.',
    'improvement-evidence',
  ],
  [
    'Insight',
    'Understand the issue',
    'Look for patterns, contributing factors and missing information.',
    'improvement-insight',
  ],
  [
    'Opportunity',
    'Describe the improvement',
    'Explain the proposed change and the outcome you expect.',
    'improvement-journey',
  ],
  [
    'Review',
    'Review before acting',
    'Consider impact, risks, requirements and the appropriate decision process.',
    'improvement-review',
  ],
  [
    'Action',
    'Carry out the agreed change',
    'Implement the change through the applicable process.',
    'improvement-action',
  ],
  [
    'Verification',
    'Check what changed',
    'Compare the outcome with the starting point using evidence.',
    'improvement-verify',
  ],
  [
    'Learning',
    'Capture and share the lesson',
    'Record what worked and review where it could be used again.',
    'improvement-lessons',
  ],
];
export default function ContinualImprovementPage() {
  return (
    <div className="fern-practice">
      <Card>
        <p className="improvement-intro">Turn FM evidence and experience into better future decisions.</p>
        <p>
          Use performance, asset history, audit findings and service experience to understand what could improve. Review
          the opportunity, verify the outcome and retain the learning.
        </p>
        <GuidanceRoute
          title="How to Work Through an Improvement"
          id="improvement-route-title"
          steps={journeySteps as [string, string, string, string][]}
        >
          <p>
            <a href="#improvement-practice">After learning: inform future FM practice</a>
          </p>
        </GuidanceRoute>
      </Card>

      <Card id="improvement-evidence" title={<>Start With Evidence</>}>
        <p className="improvement-empty">
          No improvement or lessons-learned records are available on this page. Use the guidance below to prepare and
          review an improvement opportunity.
        </p>
        <p>
          Begin with what is being observed before selecting a solution. These examples describe possible sources of
          learning, not current facility findings.
        </p>
        <div className="fern-grid">
          {sources.map(([title, text]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <Section header={<>Corrective Action or Continual Improvement?</>}>
          <p>
            A corrective action addresses a specific issue. Continual improvement examines the wider approach. For
            example, resolving a missing record addresses the immediate gap; repeated missing records may also warrant
            review of guidance, training, process or system usability.
          </p>
        </Section>
      </Card>
      <Card id="improvement-journey" title={<>Develop an Improvement Opportunity</>}>
        <p>
          Define the observed problem, affected context and supporting evidence. Explain the proposed change, expected
          outcome, dependencies and possible unintended effects.
        </p>
        {stages.map(([title, text], index) => (
          <Section
            id={index === 1 ? 'improvement-review' : index === 2 ? 'improvement-action' : undefined}
            key={title}
            header={<>{title}</>}
          >
            <p>{text}</p>
          </Section>
        ))}
        <Section id="improvement-insight" header={<>Investigate Recurring Issues</>}>
          <p>
            Check whether similar issues occur across the same asset type, service, practice or comparable facilities.
            Retain the population, common characteristics and exceptions. A recurring pattern can justify investigation
            but does not prove a root cause or a systemic issue.
          </p>
        </Section>
        <Section header={<>Prioritise With Context</>}>
          <p>
            Consider mandatory requirements, safety, operational impact, criticality, recurrence, evidence strength and
            effort. Use the applicable prioritisation method rather than inventing weights or assuming the largest
            potential saving should come first.
          </p>
        </Section>
      </Card>
      <Card id="improvement-verify" title={<>Verify the Outcome</>}>
        <p>
          Implementation and success are separate steps. Compare before and after using a relevant measure and
          sufficient evidence.
        </p>
        <Section header={<>Establish the Baseline</>}>
          <p>
            Retain the baseline period, measured population, source, method, assumptions and exclusions. Check that the
            comparison period and operating conditions are suitable. Without a reliable starting point, an improvement
            claim may not be supportable.
          </p>
        </Section>
        <Section header={<>Assess Benefits Beyond Cost</>}>
          <p>
            Benefits may include reliability, service quality, resilience, evidence quality, reduced repeat failure,
            less administration or improved user experience. Record what changed, how it was measured and whether the
            result was sustained.
          </p>
        </Section>
        <Section header={<>Keep Financial Claims Evidence-Based</>}>
          <p>
            Distinguish potential benefit from validated financial benefit. Use the authorised baseline, calculation
            method and attribution basis. A theoretical failure exposure or avoided-cost scenario is not automatically a
            realised saving.
          </p>
        </Section>
        <p>
          If the evidence is insufficient, retain the outcome as unverified and identify what further information is
          needed.
        </p>
      </Card>
      <Card id="improvement-lessons" title={<>Capture Lessons Learned</>}>
        <p>
          Explain what the experience teaches, not simply what happened. Use these prompts to prepare a useful lesson.
        </p>
        <dl className="fern-grid">
          {lessonFields.map(([term, text]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
        <Section header={<>Review Before Wider Use</>}>
          <p>
            A local success is a candidate for wider review, not automatically a new standard. Compare facility type,
            asset population, operating environment, service scope and mandatory requirements. Check that the result was
            sustained and whether other factors contributed.
          </p>
        </Section>
      </Card>
      <Card id="improvement-practice" title={<>Inform Future FM Practice</>}>
        <p>
          Evidence and lessons can identify reasons to review FM Policies, BBM Standards, practices, methodologies,
          training or systems. An improvement may result in local action, clearer guidance, further investigation or no
          change.
        </p>
        <Section header={<>Connect Learning to the Relevant Source</>}>
          <p>
            Keep the improvement evidence linked to the practice or methodology it may affect. Record the review outcome
            and any resulting version change through the applicable process. Do not silently change an existing
            requirement or assessment method.
          </p>
        </Section>
        <Section header={<>Respect Responsibilities and Interfaces</>}>
          <p>
            BXM contributes FM expertise within its remit. Establish decision and implementation responsibilities
            through the relevant process, including input from other functions where needed. An improvement involving
            Sustainability, Finance, Procurement or Technology does not transfer that function’s responsibility to BXM.
          </p>
        </Section>
        <h3>Close the Learning Loop</h3>
        <p>
          Use verified outcomes to inform future performance review, risk assessment, lifecycle analysis and service
          decisions. Continue to monitor whether the change remains effective as conditions and requirements evolve.
        </p>
      </Card>
    </div>
  );
}
