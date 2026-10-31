import Alert from '@cloudscape-design/components/alert';
const lessons: Record<string, { heading: string; text?: string; steps?: [string, string][]; example?: string }[]> = {
  'Understanding FERN': [
    {
      heading: 'Four questions to ask',
      steps: [
        ['What do we know?', 'Identify the asset, facility, service or decision and the information available.'],
        [
          'Can we rely on it?',
          'Check who supplied the information, its date and scope, and whether anything is missing or conflicting.',
        ],
        [
          'What does it mean?',
          'Consider the information alongside the relevant requirements and operating conditions.',
        ],
        [
          'What happens next?',
          'Identify the evidence, review or decision needed. Do not treat an output as permission to act.',
        ],
      ],
    },
    {
      heading: 'An asset’s age is only one input',
      example:
        'Illustrative example: an air-handling unit is recorded as 17 years old. Age alone does not decide whether it should be replaced. Condition, failure history, maintenance cost, remaining life, redundancy, parts availability and operational consequences may change the decision.',
    },
    {
      heading: 'A useful result can include a gap',
      text: 'Incomplete information does not make every part of an assessment useless. Retain what is known, state the assumption or gap and identify which conclusion needs more evidence. Never turn an unknown quantity or cost into zero just to produce a total.',
    },
    {
      heading: 'Try it',
      text: 'Choose a decision you are considering. Write down what you know, the source of each input, what is uncertain and who needs to review the outcome. Use Get started to find the relevant guidance.',
    },
  ],
  'Service models explained': [
    {
      heading: 'Separate delivery from service level',
      steps: [
        ['Delivery model', 'Describes who organises and delivers the service and how responsibilities are allocated.'],
        [
          'Service tier',
          'Describes the level of service being considered. The tier does not decide who employs the people delivering it.',
        ],
      ],
    },
    {
      heading: 'Read the arrangement, not just its name',
      text: 'Blue Badge refers to Amazon internal resources. IFM uses external FM provision; IFM Hybrid combines internal and external resources. Fully contained is described in the current guidance as an output-based arrangement. Actual scope, responsibilities and contractual obligations must be checked against the applicable source. AFM is not classified here as a confirmed selectable alternative.',
    },
    {
      heading: 'Prime, Plus and Core',
      text: 'Prime is the highest service tier, Plus is intermediate and Core is the basic tier. All must respect the applicable mandatory requirement floor. A lower tier does not remove life-safety, compliance, OEM, warranty or other applicable requirements. Run-to-failure requires justification and must be permitted for the asset and activity.',
    },
    {
      heading: 'One facility can need different treatments',
      example:
        'Illustrative example: two facilities use the same external delivery model, but one operates continuously with limited backup equipment. Their appropriate service levels may differ. Within either facility, critical plant may need a different maintenance approach from less critical equipment.',
    },
    {
      heading: 'Before comparing options',
      text: 'Record the service scope, operating hours, asset population, responsibilities, capability and mandatory requirements. Compare the model and tier together, explain differences and retain any asset-level exceptions. A cheaper package is not automatically equivalent service.',
    },
  ],
  'From tender to transition': [
    {
      heading: 'Follow the decision through its stages',
      steps: [
        ['Understand', 'Identify the facility needs, current arrangement, available history and gaps.'],
        ['Define', 'Establish service scope, responsibilities, requirements and expected outcomes.'],
        ['Compare', 'Review delivery and service options with their operational consequences.'],
        ['Price', 'Prepare a consistent cost basis and explain scope, service-level and timing differences.'],
        [
          'Source and contract',
          'Use the authorised procurement and contractual process. A FERN comparison does not award a contract.',
        ],
        ['Mobilise', 'Plan tasks, responsibilities, evidence and handover for the selected arrangement.'],
        [
          'Operate and review',
          'Use operational records, performance and assurance evidence to identify issues and improvements.',
        ],
      ],
    },
    {
      heading: 'Keep the handover traceable',
      text: 'Carry forward the selected scope, pricing version, assumptions, unresolved issues and the actual decision. Newer pricing must not silently replace the version used for an earlier assessment. If inputs change, review the comparison again.',
    },
    {
      heading: 'What the planned tools will support',
      text: 'Pre-Contract will support assessments and service alternatives. Pricing will issue fixed provisional pricing versions that can be selected in Pre-Contract and Lifecycle. Mobilisation will support a manual transition plan. Moving between these tools will not automatically transfer an approved decision or establish readiness.',
    },
    {
      heading: 'Before starting mobilisation',
      text: 'Check that the selected arrangement, responsibilities, acceptance criteria and outstanding issues are understood by the responsible people. Completing a task is different from verifying its evidence or approving a launch.',
    },
  ],
};
export default function IntroductoryLearning({ topic }: { topic: string }) {
  return (
    <>
      {(lessons[topic] ?? []).map((lesson) => (
        <section key={lesson.heading}>
          <h3>{lesson.heading}</h3>
          {lesson.text && <p>{lesson.text}</p>}
          {lesson.example && (
            <Alert type="info" header="Example">
              {lesson.example}
            </Alert>
          )}
          {lesson.steps && (
            <ol>
              {lesson.steps.map(([title, detail]) => (
                <li key={title}>
                  <strong>{/[.?!]$/.test(title) ? title : title + '.'}</strong> {detail}
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}
    </>
  );
}
