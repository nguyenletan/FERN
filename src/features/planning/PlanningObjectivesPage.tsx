import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import { Card, Section, Terms, usePortalNavigation, TextGrid } from '../../app/ui';
import GuidanceRoute, { openGuidanceSection } from '../visual/GuidanceRoute';
import { openStandardCollection } from '../reference/standardContext';

const needs = [
  [
    'Facility & business',
    'Changes in operating hours, facility use or business needs can change the FM service required.',
  ],
  [
    'Assets & maintenance',
    'Condition, repeat failures and future renewal needs can identify where maintenance or lifecycle review is needed.',
  ],
  [
    'Service & contract',
    'An approaching renewal or a change in service scope can trigger a review of delivery options.',
  ],
  [
    'Requirements & evidence',
    'Changed requirements, incomplete records or unclear applicability can create a need for further assessment.',
  ],
];
const objectiveFields = [
  ['Outcome', 'Describe what needs to be achieved and why it matters.'],
  ['Scope', 'Identify the facility, portfolio, service or asset population affected.'],
  ['Evidence', 'Record the source, baseline, date and limitations supporting the objective.'],
  [
    'Success measure',
    'Define the measure, reporting period and target from the applicable requirement or agreed plan.',
  ],
  ['Timeframe', 'Establish when the outcome is needed and the basis for that timing.'],
  ['Resources & dependencies', 'Identify people, capability, information, funding, access and other requirements.'],
  ['Risks & constraints', 'Explain what could prevent delivery and which mandatory requirements apply.'],
  ['Review', 'Record progress, changed assumptions and the evidence needed to assess the outcome.'],
];
const horizons = [
  ['Immediate & near term', 'Address service failures, overdue actions, evidence gaps and emerging asset risks.'],
  [
    'Annual & operating plans',
    'Connect service performance, maintenance, data quality and capability needs to operating priorities.',
  ],
  ['Contract & service planning', 'Consider renewal, tendering, delivery-model review, mobilisation and transition.'],
  [
    'Asset & lifecycle planning',
    'Consider maintenance, repair, refurbishment and replacement alongside future cost and resilience.',
  ],
  [
    'Portfolio & strategic planning',
    'Review recurring issues and shared needs across comparable facilities, services and regions.',
  ],
];
const tools = [
  ['Lifecycle & Asset Analysis', 'Review condition, maintenance history, renewal needs and lifecycle alternatives.'],
  ['FM Contract & Service Model', 'Explore service scope, delivery arrangements and responsibility interfaces.'],
  [
    'FM Pre-Contract / Pre-Tender Assessment',
    'Compare the current arrangement with future service options and pricing evidence.',
  ],
  ['Pricing Template Generator', 'Prepare the cost inputs needed for a service or resource comparison.'],
];

export default function PlanningObjectivesPage() {
  const { go: onNavigate } = usePortalNavigation();
  return (
    <div className="fern-practice">
      <Card>
        <p className="planning-intro">Turn FM priorities into clear, evidence-based plans and measurable outcomes.</p>
        <p>
          Start with the need, define the outcome and identify what must be in place to achieve it. Use evidence to
          review progress and understand when the plan needs to change.
        </p>
        <GuidanceRoute
          title="How to build an FM plan"
          id="planning-route"
          steps={[
            [
              'Business need',
              'Explain what is needed',
              'Identify the problem or change and the people, assets or services affected.',
              'planning-need',
            ],
            [
              'FM requirement',
              'Check what must be met',
              'Identify applicable requirements, resources and dependencies.',
              'planning-requirements',
            ],
            [
              'Objective',
              'Define a clear outcome',
              'Describe success, its scope, measure and timeframe.',
              'planning-objective',
            ],
            [
              'Plan',
              'Prepare for delivery',
              'Consider responsibilities, options and what must be in place.',
              'planning-delivery',
            ],
            [
              'Evidence',
              'Establish the starting point',
              'Record the source, baseline, date and limitations behind the objective.',
              'planning-baseline',
            ],
            [
              'Review',
              'Check progress and adjust',
              'Use evidence to review the outcome and explain any changes.',
              'planning-review',
            ],
          ]}
        />
        <nav aria-label="More planning guidance">
          <SpaceBetween direction="horizontal" size="l">
          <span>Also explore:</span>
          <Link
            href="#planning-horizons"
            onFollow={(event) => {
              event.preventDefault();
              openGuidanceSection('planning-horizons');
            }}
          >
            Planning horizons
          </Link>
          <Link
            href="#planning-tools"
            onFollow={(event) => {
              event.preventDefault();
              openGuidanceSection('planning-tools');
            }}
          >
            Supporting tools
          </Link>
          </SpaceBetween>
        </nav>
      </Card>

      <Card id="planning-need" title={<>Start with the need</>}>
        <p>
          Establish the requirement or problem before creating an activity list. The examples below illustrate planning
          needs; they are not live facility findings.
        </p>
        <TextGrid>
          {needs.map(([title, text]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </TextGrid>
        <p>
          Consider facility type, operating conditions, service scope, asset population and criticality. Compare
          facilities only where their context and evidence support a meaningful comparison.
        </p>
      </Card>
      <Card id="planning-objective" title={<>Define the objective</>}>
        <p>
          A useful objective explains the outcome, its purpose and how it will be assessed. Use these prompts to prepare
          the information for your plan.
        </p>
        <Terms
          columns={4}
          items={objectiveFields.map(([term, text]) => [
            term === 'Evidence' ? <span id="planning-baseline">{term}</span> : term,
            text,
          ])}
        />
        <Section header={<>Example: make an objective specific</>}>
          <p>
            Instead of “Improve maintenance performance”, identify the maintenance outcome, the asset or service
            population, the evidence baseline and the measure that will demonstrate improvement. Add the target and
            timeframe from the applicable requirement or agreed plan.
          </p>
        </Section>
      </Card>
      <Card id="planning-horizons" title={<>Planning horizons</>}>
        <p>
          Match the planning period to the decision. Short-term activity should take account of longer-term asset and
          service consequences.
        </p>
        {horizons.map(([title, text]) => (
          <Section key={title} header={<>{title}</>}>
            <p>{text}</p>
          </Section>
        ))}
      </Card>
      <Card id="planning-delivery" title={<>Prepare for delivery</>}>
        <h3 id="planning-requirements">Requirements, resources &amp; dependencies</h3>
        <p>
          Identify applicable requirements before considering optimisation options. Check the information, people,
          competence, budget, access and specialist support the plan needs. Record availability and unresolved
          dependencies rather than assuming they are in place.
        </p>
        <h3>FM expertise &amp; responsibilities</h3>
        {onNavigate && (
          <p>
            <Button
              iconName="arrow-right"
              iconAlign="right"
              onClick={() => {
                openStandardCollection('PM');
                onNavigate('Reference Library');
              }}
            >
              Review maintenance standards
            </Button>
          </p>
        )}
        <p>
          BXM-developed FM Policies, BBM Standards, practices and methodologies can inform planning. Establish delivery
          responsibilities and decision authority through the relevant policy, requirement or contractual arrangement.
        </p>
        <h3>Options &amp; financial context</h3>
        <p>
          Where alternatives are needed, compare their assumptions, evidence, cost, risk, constraints and confidence. A
          cost estimate informs a decision; funding and financial approval follow the applicable decision process.
        </p>
      </Card>
      <Card id="planning-review" title={<>Review progress &amp; changes</>}>
        <p>
          Assess progress against the defined measure and supporting evidence. Keep the baseline population, period,
          method and exclusions visible so that comparisons remain meaningful.
        </p>
        <Section header={<>Questions for a planning review</>}>
          <ul>
            <li>Is the original need still valid?</li>
            <li>Have requirements, operations, asset condition or service arrangements changed?</li>
            <li>Are resources and dependencies in place?</li>
            <li>Does the evidence support the reported progress?</li>
            <li>Are the objective, timeframe and success measure still appropriate?</li>
          </ul>
        </Section>
        <p>
          Record why a plan changes, the evidence supporting the change and the resulting decision. Completing an
          activity and demonstrating the intended outcome are separate steps.
        </p>
      </Card>
      <Card id="planning-tools" title={<>Supporting tools</>}>
        <p>
          When these tools are released, use the relevant one for detailed analysis, then use its results as evidence
          for the planning decision.
        </p>
        <TextGrid>
          {tools.map(([title, text]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
              <p>
                <strong>Coming soon to the FERN website</strong>
              </p>
            </div>
          ))}
        </TextGrid>
      </Card>
    </div>
  );
}
