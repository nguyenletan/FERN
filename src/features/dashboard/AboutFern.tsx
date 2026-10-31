import SpaceBetween from '@cloudscape-design/components/space-between';
import { Card, NavButton, NavLink, Page, Terms } from '../../app/ui';

export default function AboutFern() {
  return (
    <Page
      title="About FERN"
      description="Facility Expert Reference Network brings FM guidance and decision-support tools together. Its purpose is to help you understand the information behind a facility, asset or service decision and identify the next useful step."
    >
      <Card title="Start with your question">
        <p>
          A maintenance decision may depend on condition, previous failures, operating demands, requirements and cost. A
          contract decision may depend on scope, responsibilities, service levels and supplier capability. FERN helps
          you organise those questions rather than treating one figure as the whole answer.
        </p>
        <SpaceBetween direction="horizontal" size="l">
          <NavLink to="Get started">Find your starting point: choose the task or decision you need help with</NavLink>
          <NavLink to="Learn">Understand the FM concepts: explore learning topics before using a tool</NavLink>
        </SpaceBetween>
      </Card>
      <Card
        title="Who is FERN for?"
        description="Your role describes the work you do; access to information still depends on the permissions provided by your organisation."
      >
        <Terms
          items={[
            [
              'Facility, FM and engineering teams',
              'Review assets, maintenance, service needs and the evidence behind technical decisions.',
            ],
            [
              'Business owners and regional teams',
              'Understand options, operational consequences and the decisions requiring review.',
            ],
            [
              'Procurement and finance teams',
              'Review scope, pricing assumptions, service arrangements and longer-term costs.',
            ],
            [
              'Compliance and assurance specialists',
              'Connect requirements, evidence, findings and the actions needed.',
            ],
            [
              'New and occasional users',
              'Find guidance and learn the concepts without first understanding every application.',
            ],
          ]}
        />
      </Card>
      <Card title="A practical path through FERN">
        <ol>
          <li>
            <strong>Define the question.</strong> Decide what you need to understand or compare.
          </li>
          <li>
            <strong>Explore the guidance.</strong> Browse Workspace topics, learning and reference guidance to
            understand your next step. No facility selection is needed.
          </li>
          <li>
            <strong>Check the information.</strong> Identify sources, dates, scope, assumptions and gaps.
          </li>
          <li>
            <strong>Use the relevant tool once it is released.</strong> FERN applications are coming soon. Each will
            show its inputs and how its results are calculated.
          </li>
          <li>
            <strong>Review the result.</strong> Consider the evidence and limitations with the appropriate specialist or
            decision owner.
          </li>
        </ol>
      </Card>
      <Card title="Read results with their evidence">
        <p>
          A requirement, a supporting reference and a FERN explanation serve different purposes. Check the original
          source and its applicability. A recommendation is an option to review, not an approval.
        </p>
        <p>
          Missing information is not zero and does not demonstrate that a requirement has been met. Sometimes the
          appropriate outcome is that more evidence or specialist review is needed before deciding.
        </p>
      </Card>
      <Card title="FERN and your operational systems">
        <p>
          FERN is intended to support understanding and decisions alongside systems that record and execute operational
          work. A closed maintenance work order alone does not establish that all required evidence exists or that no
          further action is needed.
        </p>
        <p>
          This website provides guidance and learning, with previews of the applications. Application access, facility
          records, Amazon system connections, shared accounts and formal approvals are not available here.
        </p>
      </Card>
      <Card
        title="Need help?"
        description="Explore Help & Guidance if you are unsure which area to use or how to interpret information."
        actions={<NavButton to="Help & Guidance">Open Help &amp; Guidance</NavButton>}
      />
    </Page>
  );
}
