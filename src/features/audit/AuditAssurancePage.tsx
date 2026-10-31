import Button from '@cloudscape-design/components/button';
import { Card, Section, usePortalNavigation, TextGrid } from '../../app/ui';
import GuidanceRoute from '../visual/GuidanceRoute';
import { openStandardCollection } from '../reference/standardContext';

const concepts = [
  ['Assessment', 'A structured review of a requirement, service, activity or evidence.'],
  ['Audit', 'A formal examination using the applicable methodology, criteria and evidence.'],
  [
    'Assurance',
    'The confidence that the assessment and evidence provide about whether the expected outcome has been achieved.',
  ],
];
const evidenceChecks = [
  [
    'Source & traceability',
    'Keep the source system, record identifier, date, version and facility or service relationship available. Review the originating record without overwriting it through the assessment.',
  ],
  [
    'Completeness & relevance',
    'Check that the evidence covers the correct requirement, activity, asset and assessment period. Where required, check the competence of the person carrying out the work, the inspection or test record and any certificate. A closed work order alone may not contain everything needed to reach a conclusion. Distinguish incomplete, conflicting, out-of-date and unverified records.',
  ],
  [
    'Missing evidence',
    'Record what is unavailable. Missing evidence cannot support a positive conclusion; whether it constitutes a requirement failure depends on the applicable assessment methodology.',
  ],
  [
    'Sampling & limitations',
    'Where sampling is used, retain the population, sample size, selection method, period and exclusions. Apply the relevant sampling methodology and describe the limits of the conclusion.',
  ],
];
const findings = [
  ['Requirement gap', 'Evidence indicates that an applicable requirement has not been achieved.'],
  ['Evidence gap', 'There is insufficient acceptable evidence to reach a conclusion.'],
  ['Information conflict', 'Relevant sources provide materially different information.'],
  ['Performance issue', 'Evidence does not support the expected performance result.'],
  ['Improvement observation', 'An opportunity is identified without necessarily representing a requirement failure.'],
];
export default function AuditAssurancePage() {
  const { go: onNavigate } = usePortalNavigation();
  return (
    <div className="fern-practice">
      <Card>
        <p className="audit-intro">Check whether FM requirements and expected outcomes are supported by evidence.</p>
        <p>
          Understand what was assessed, what the evidence shows and what follow-up is needed. Keep each conclusion
          connected to its requirement and the information used to reach it.
        </p>
        <GuidanceRoute
          title="How to work through an assessment"
          id="audit-route"
          steps={[
            [
              'Requirement',
              'Identify what applies',
              'Find the relevant policy, standard or agreed requirement.',
              'audit-prepare',
            ],
            [
              'Assessment',
              'Define the assessment',
              'Set the scope, period and method before reviewing results.',
              'audit-scope',
            ],
            [
              'Evidence',
              'Check the supporting records',
              'Review whether the records are relevant, complete and traceable.',
              'audit-evidence',
            ],
            [
              'Finding',
              'Explain what you found',
              'Connect each conclusion to its requirement and evidence.',
              'audit-findings',
            ],
            [
              'Action',
              'Plan the follow-up',
              'Identify the action, responsibility and evidence needed for closure.',
              'audit-actions',
            ],
            [
              'Verification',
              'Check the outcome',
              'Review completion and effectiveness before treating an issue as resolved.',
              'audit-verification',
            ],
            [
              'Learning',
              'Learn from repeat findings',
              'Use recurring issues and supported learning to improve future decisions.',
              'audit-learning',
            ],
          ]}
        />
      </Card>

      <Card id="audit-overview" title={<>Review priorities</>}>
        <p className="audit-empty">
          No assessment or finding records are available on this page. Use the guidance below to understand the
          assessment process and evidence needed.
        </p>
        <p>
          When reviewing assessment information, look for material findings, evidence gaps, overdue actions, repeat
          issues and actions requiring verification.
        </p>
        <TextGrid>
          {concepts.map(([title, text]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </TextGrid>
      </Card>
      <Card id="audit-prepare" title={<>Prepare an assessment</>}>
        <h3>Start with the requirement</h3>
        {onNavigate && (
          <p>
            <Button
              iconName="arrow-right"
              iconAlign="right"
              onClick={() => {
                openStandardCollection('all');
                onNavigate('Reference Library');
              }}
            >
              Read a supporting BBM standard
            </Button>
          </p>
        )}
        <p>
          Identify the applicable FM Policy, BBM Standard, service or contractual requirement, KPI/SLA definition or
          other authorised source before deciding what to assess.
        </p>
        <Section id="audit-scope" header={<>Define the scope</>}>
          <p>
            Establish the facility, region, service, asset or system, delivery model, assessment period and methodology
            version. Identify the assessment type and relevant source material. Self-assessment and formal or
            independent audit should remain distinguishable.
          </p>
        </Section>
        <Section header={<>Use clear, traceable questions</>}>
          <p>
            Connect each question to its requirement, applicability, version, assessment method and expected evidence.
            For example: “Is there sufficient evidence that the required service was delivered for the assessment
            period?” Retain the specific source behind that question.
          </p>
        </Section>
        <Section header={<>Apply the relevant FM methodology</>}>
          <p>
            BXM develops FM audit and assessment methodologies within its remit and provides specialist guidance on
            their application. Use criteria suited to the service and delivery arrangement; do not assume one question
            set applies to every facility.
          </p>
        </Section>
      </Card>
      <Card id="audit-evidence" title={<>Review evidence</>}>
        <p>
          Evidence may include work orders, inspection records, certificates, test results, service reports, photographs
          and site observations. Select the evidence required by the assessment, rather than treating every available
          record as sufficient.
        </p>
        {evidenceChecks.map(([title, text]) => (
          <Section key={title} header={<>{title}</>}>
            <p>{text}</p>
          </Section>
        ))}
      </Card>
      <Card id="audit-findings" title={<>Understand findings</>}>
        <p>
          A finding explains what was identified, against which requirement and using which evidence. Keep its
          assessment reference and affected context traceable.
        </p>
        <Section header={<>Distinguish the type of finding</>}>
          <p>
            These descriptions help distinguish issues. Use the categories defined by the applicable assessment
            methodology when recording a finding.
          </p>
          <dl>
            {findings.map(([term, text]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </Section>
        <Section header={<>Interpret scores and severity carefully</>}>
          <p>
            Use scores, severity and confidence classifications only where the applicable methodology defines them and
            the evidence supports them. An overall result must not hide a material mandatory exception. Finding severity
            and risk assessment are separate measures.
          </p>
        </Section>
        <Section header={<>Compare like with like</>}>
          <p>
            Before comparing facilities, services or providers, check criteria, methodology versions, populations and
            evidence quality. A result obtained from different criteria or limited evidence may not support a direct
            comparison.
          </p>
        </Section>
        <Section header={<>Establish responsibility</>}>
          <p>
            A finding at a facility does not automatically establish supplier responsibility. Review service scope,
            contractual boundaries, retained responsibilities, shared interfaces and evidence before attributing an
            issue.
          </p>
        </Section>
      </Card>
      <Card id="audit-actions" title={<>Action &amp; verification</>}>
        <h3>Connect findings to follow-up</h3>
        <p>
          Identify the required action, its finding reference, the responsible party established by the applicable
          arrangement, due date and evidence needed for closure. Where work identifies a defect, keep the follow-up
          action connected to the original asset and finding. The assessment team and the party addressing the issue may
          be different.
        </p>
        <Section id="audit-verification" header={<>Verify completion and effectiveness</>}>
          <p>
            Review completion evidence, its date and the verification result where the methodology requires it. An
            action marked complete does not by itself establish verified closure or prove that the underlying issue has
            been resolved.
          </p>
        </Section>
        <Section id="audit-learning" header={<>Learn from repeat findings</>}>
          <p>
            Review recurrence at the same facility, asset or service, including after previous action. Repetition can
            signal a need for further investigation; it does not establish a root cause on its own. Use supported
            learning to inform future FM decisions.
          </p>
        </Section>
        <Section header={<>Preserve assessment history</>}>
          <p>
            Keep previous findings, actions, evidence and the methodology version used at the time. When requirements
            change, identify affected questions and assessments without silently recalculating historical results
            against the new requirement.
          </p>
        </Section>
        <h3>Support wider review</h3>
        <p>
          Bring together significant findings, unresolved actions and material evidence gaps for the relevant review
          process. Keep decisions and supporting evidence linked to their source assessment.
        </p>
      </Card>
    </div>
  );
}
