import Button from '@cloudscape-design/components/button';
import { Card, Section, usePortalNavigation } from '../../app/ui';

const areas = [
  [
    'Performance Requiring Attention',
    'Performance exceptions and trends are not available.',
    'Read Performance Guidance',
    'Performance & KPIs',
  ],
  [
    'Mandatory Requirement Exceptions',
    'Requirement exceptions and applicability assessments are not available.',
    'Read Requirements Guidance',
    'Risk & Compliance',
  ],
  [
    'Material FM Risks',
    'Risk assessments and material risk summaries are not available.',
    'Read Risk Guidance',
    'Risk & Compliance',
  ],
  [
    'Audit Findings & Corrective Actions',
    'Findings, action status and verification records are not available.',
    'Read Assurance Guidance',
    'Audit & Assurance',
  ],
  [
    'Asset & Lifecycle Exposure',
    'An overview of lifecycle exposure is not available. Lifecycle analysis will be available through the application.',
    'Read Asset Guidance',
    'Learn',
  ],
  [
    'Evidence & Data Gaps',
    'An aggregated evidence-gap assessment is not available.',
    'Read Evidence Guidance',
    'Audit & Assurance',
  ],
  [
    'Improvement Signals',
    'Recurring-issue summaries and verified improvements are not available.',
    'Read Improvement Guidance',
    'Continual Improvement',
  ],
];
export default function FmOverviewPage() {
  const { go: onNavigate } = usePortalNavigation();
  return (
    <div className="fern-practice">
      <Card>
        <p className="overview-intro">
          See the FM information that needs attention and find the right place to investigate.
        </p>
        <p>
          Review performance, requirements, risk, assurance and lifecycle information together. Detailed guidance and
          analysis remain in the relevant Workspace areas and applications.
        </p>
      </Card>

      <Card title={<>What Needs Attention?</>}>
        <p className="overview-empty">
          Operational summaries are not available on this website. This does not mean that no issues exist or that an
          assessment has been completed.
        </p>
        <p>Use the areas below to review guidance for the topic.</p>
        <div className="fern-grid">
          {areas.map(([title, text, action, destination]) => (
            <div key={title} className="fern-block">
              <h3>{title}</h3>
              <p>{text}</p>
              <Button onClick={() => onNavigate(destination)}>
                {action}
                <span aria-hidden="true"> →</span>
              </Button>
            </div>
          ))}
        </div>
      </Card>
      <Card title={<>Read the Overview With Its Evidence</>}>
        <Section header={<>Keep Mandatory Issues Separate</>}>
          <p>
            Applicable mandatory requirements remain visible separately from general performance. An overall positive
            result does not cancel an individual mandatory exception.
          </p>
        </Section>
        <Section header={<>Compare Trends Only When Supported</>}>
          <p>
            Check reporting periods, definitions, populations and evidence quality before comparing results. Without
            comparable history, a trend cannot be established.
          </p>
        </Section>
        <Section header={<>Trace Each Conclusion</>}>
          <p>
            Review the source, period, applicability and limitations behind a result. An overview summarises
            information; the originating records and relevant assessment methods provide the basis for a decision.
          </p>
        </Section>
      </Card>
    </div>
  );
}
