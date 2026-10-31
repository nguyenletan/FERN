import { useEffect } from 'react';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { homeApplications } from './homeApplications.ts';
import IntroductoryLearning from './IntroductoryLearning.tsx';
import { Card, ExpandAllControls, NavButton, NavLink, Page, Prose, Section, revealSection } from '../../app/ui';
import { PageBanner } from '../../app/visuals';

const topics = [
  {
    title: 'Understanding FERN',
    what: 'FERN brings facilities guidance and decision-support tools into one workspace.',
    why: 'Start from your question and find the information or tool that helps you answer it.',
    use: 'Use Get started to find Workspace guidance, introductory learning and reference information. No facility selection is needed.',
    limit: 'A tool output is not formal approval. Check the supporting evidence and required review.',
    page: 'FM Overview',
  },
  {
    title: 'Service models explained',
    what: 'A delivery model describes how services are delivered; a service tier describes the required level of service.',
    why: 'Keeping them separate makes comparisons clearer.',
    use: 'Compare internal Blue Badge, external IFM, mixed IFM Hybrid and output-based Fully contained arrangements alongside Prime, Plus and Core tiers.',
    limit:
      'Actual responsibilities follow the applicable arrangement and contract. Mandatory requirements apply at every tier.',
    page: 'Leadership & Policy',
  },
  {
    title: 'From tender to transition',
    what: 'A connected journey from defining an FM requirement to preparing a change in service delivery.',
    why: 'Decisions made before a contract affect resources, pricing, assets and mobilisation.',
    use: 'Start with pre-contract assessment, review service options and pricing, consider lifecycle implications, then plan the transition.',
    limit: 'Moving between tools does not automatically approve a contract or confirm operational readiness.',
    page: 'FM Pre-Contract / Pre-Tender Assessment',
  },
  {
    title: 'Assets, condition and lifecycle',
    what: 'Lifecycle assessment considers an asset’s condition, service needs and future options over time.',
    why: 'Age alone does not establish when replacement is needed.',
    use: 'Review quantities, condition, maintenance history and supported service-life assumptions in Lifecycle & Asset Analysis.',
    limit:
      'Do not infer missing service life, failure history or costs. Engineering review is needed for material adjustments.',
    page: 'Lifecycle & Asset Analysis',
  },
  {
    title: 'Risk, criticality and maintenance',
    what: 'Criticality describes the importance of an asset or service; risk considers what could happen and its consequences.',
    why: 'Operating conditions, redundancy and recovery capability influence maintenance decisions.',
    use: 'Explore risk and compliance guidance alongside the relevant asset and maintenance evidence.',
    limit:
      'A lower cost or service tier cannot remove applicable mandatory requirements. Scores need a validated method.',
    page: 'Risk & Compliance',
  },
  {
    title: 'Performance, KPIs and SLAs',
    what: 'Measures and service commitments help explain whether expected outcomes are being achieved.',
    why: 'A result is meaningful only when its definition, period and evidence are understood.',
    use: 'Read measure definitions, exclusions and evidence requirements before comparing results.',
    limit:
      'Do not assume universal targets. Critical Performance Indicators are a developing classification, not established thresholds.',
    page: 'Performance & KPIs',
  },
  {
    title: 'Sources and evidence',
    what: 'Sources explain where information came from; evidence supports the interpretation or result.',
    why: 'Version, date, status and applicability affect whether information can support your decision.',
    use: 'Review source records and distinguish confirmed information, assumptions and gaps.',
    limit:
      'Missing evidence is not proof that a requirement was met. A secondary explanation does not replace an authoritative source.',
    page: 'Audit & Assurance',
  },
  {
    title: 'Policies, BBM standards and requirements',
    what: 'Policies provide direction; BBM Standards and applicable requirements inform the expected FM outcomes.',
    why: 'Guidance and supporting references have different authority from applicable requirements.',
    use: 'Start with Leadership & Policy and check the original source, version and applicability.',
    limit:
      'External references do not automatically establish Amazon adoption or certification. FERN explanations do not create mandatory requirements.',
    page: 'Leadership & Policy',
  },
  {
    title: 'Assurance and Continual Improvement',
    what: 'Assurance reviews evidence against requirements; improvement uses experience to review how outcomes can be improved.',
    why: 'A finding, corrective action and verified improvement are different stages.',
    use: 'Follow the evidence through findings, actions and verification, then consider lessons for wider review.',
    limit: 'A successful local change does not automatically become a global standard. Claimed benefits need evidence.',
    page: 'Continual Improvement',
  },
];
export const lessonId = (title: string) =>
  'lesson-' +
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export default function Learn({ requestedLesson }: { requestedLesson?: { title: string; request: number } | null }) {
  useEffect(() => {
    if (requestedLesson) revealSection(lessonId(requestedLesson.title));
  }, [requestedLesson]);
  return (
    <Page
      title="Learn"
      description="Understand FERN, explore FM concepts and find guidance for your next decision. You can read these introductory topics without choosing a facility."
    >
      <PageBanner scene="Learn" />
      <Card
        title="Learning topics"
        description="Choose a topic to expand it. Learning explains concepts; it does not create requirements or certify competence."
        actions={<ExpandAllControls label="learning topics" />}
      >
        <SpaceBetween size="s">
          {topics.map((topic) => (
            <Section
              id={lessonId(topic.title)}
              key={topic.title}
              variant="default"
              header={topic.title}
            >
              <Prose>
                <h3>What is it?</h3>
                <p>{topic.what}</p>
                <h3>Why does it matter?</h3>
                <p>{topic.why}</p>
                <h3>How does FERN use it?</h3>
                <p>{topic.use}</p>
                <h3>What should I check?</h3>
                <p>{topic.limit}</p>
                <IntroductoryLearning topic={topic.title} />
                <h3>Related guidance and sources</h3>
                <p>
                  This is an introductory FERN explanation. Check the applicable source and its status before using it
                  for a facility decision.
                </p>
              </Prose>
              <SpaceBetween direction="horizontal" size="l">
                <NavLink to={topic.page}>
                  {homeApplications.some((app) => app.name === topic.page)
                    ? 'About ' + homeApplications.find((app) => app.name === topic.page)?.title + ' (coming soon)'
                    : 'Read ' + topic.page}
                </NavLink>
                <NavLink to="Standards & Reference Library">Standards &amp; Reference Library</NavLink>
              </SpaceBetween>
            </Section>
          ))}
        </SpaceBetween>
      </Card>
      <Card title="Need help finding a starting point?" actions={<NavButton to="Get started">Get started</NavButton>} />
    </Page>
  );
}
