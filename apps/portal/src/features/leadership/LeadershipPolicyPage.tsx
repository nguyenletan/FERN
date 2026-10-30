import Button from '@cloudscape-design/components/button';
import { Card, Section, usePortalNavigation } from '../../app/ui';
import { openStandardCollection } from '../reference/standardContext';
import { categories, commitments, decisionSteps, leadershipBehaviours, topics } from './leadershipContent';

export default function LeadershipPolicyPage() {
  const { go: onNavigate } = usePortalNavigation();
  return (
    <div className="fern-practice">
      <Card>
        <p className="lead-subtitle">
          A clear direction for safer, more reliable and better-informed facilities decisions.
        </p>
        <p>
          Understand the purpose of FM, the principles behind good decisions and the responsibilities that connect
          policy, service delivery and assurance.
        </p>
        <p className="lead-note">
          This page provides guidance. Use the applicable published policy, standard or contractual requirement to
          establish what is mandatory and who has decision authority.
        </p>
      </Card>
      <Card title="How the pieces connect">
        <ol aria-label="FM governance relationship">
          <li>
            <strong>Direction</strong>
            <span>Purpose and outcomes</span>
          </li>
          <li>
            <strong>Policy</strong>
            <span>Principles and responsibilities</span>
          </li>
          <li>
            <strong>Standards</strong>
            <span>Applicable requirements</span>
          </li>
          <li>
            <strong>Delivery</strong>
            <span>Work and supporting evidence</span>
          </li>
          <li>
            <strong>Assurance</strong>
            <span>Review and learning</span>
          </li>
        </ol>
        <p>An explanatory view of the relationship; authority and obligations come from the applicable sources.</p>
      </Card>
      <nav aria-label="On this page" className="fern-inline-links">
        <a href="#fm-direction">Purpose &amp; Mission</a>
        <a href="#fm-principles">Policy Principles</a>
        <a href="#fm-leadership">Leadership in Practice</a>
        <a href="#fm-decision-route">Decision Route</a>
        <a href="#bxm-expertise">BXM Expertise</a>
        <a href="#fm-guidance">Policies &amp; Sources</a>
        <a href="#fm-topics">FM Governance Topics</a>
        <a href="#fm-clarification">Responsibilities &amp; Review</a>
      </nav>
      <Card id="fm-direction" title={<>FM Purpose &amp; Mission</>}>
        <p className="lead-emphasis">
          Support safe, reliable, efficient and sustainable facilities through clear evidence, accountable decisions and
          verified outcomes.
        </p>
        <div className="fern-grid">
          <div>
            <h3>Purpose</h3>
            <p>
              Help facilities support people and operations while protecting applicable requirements, long-term asset
              value and customer outcomes.
            </p>
          </div>
          <div>
            <h3>Mission</h3>
            <p>
              Turn authoritative FM information into understandable choices, clear responsibilities and outcomes that
              can be checked.
            </p>
          </div>
          <div>
            <h3>Vision</h3>
            <p>
              A material FM decision can be traced from the original need and applicable requirements through its
              evidence, rationale, delivery and review.
            </p>
          </div>
          <div>
            <h3>FERN’s Role</h3>
            <p>
              FERN’s direction is to connect guidance and evidence across the FM decision process. This website provides
              guidance and access points; operational records and transactions remain in APM and other authorised
              systems of record.
            </p>
          </div>
        </div>
      </Card>
      <Card id="fm-principles" title={<>FM Policy Principles</>}>
        <p>
          Use these principles to frame an FM discussion. They explain the intended approach; they do not create a new
          mandatory policy, approve expenditure or replace an applicable Amazon requirement.
        </p>
        <div className="fern-grid">
          {commitments.map(([title, text]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card id="fm-leadership" title={<>Leadership in Practice</>}>
        <p>
          Amazon’s Leadership Principles provide the behavioural reference. The examples below show how that thinking
          can inform FM work; they do not replace the official principles.
        </p>
        <div className="fern-grid">
          {leadershipBehaviours.map(([title, text]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card id="fm-decision-route" title={<>From Need to Verified Outcome</>}>
        <p>
          Use this sequence to understand how the parts of an FM decision connect. It is a guidance route, not an active
          assessment or approval workflow on this website.
        </p>
        <ol className="lead-decision-route">
          {decisionSteps.map(([title, text]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <Section header={<>Understand the Cost Before Comparing Options</>}>
          <p>
            Separate the cost of closing a requirement gap from costs that can legitimately be optimised. Also examine
            unclear scope, duplicate charges, weak cost records or other cost-governance issues. These are different
            problems and may need different actions.
          </p>
          <p>
            Check the baseline, period, attribution and lifecycle consequences with the authorised Finance or commercial
            owner before reporting a saving. No universal target or saving is assumed.
          </p>
        </Section>
        <Section header={<>Keep Delivery Model and Service Tier Separate</>}>
          <p>
            The delivery model describes how the service is delivered; the service tier describes its intensity.
            Resource classification describes who provides the work. Compare these separately and retain applicable
            requirements in every option.
          </p>
          <p>
            Definitions, scope and responsibilities follow the applicable approved source and contract. A model’s
            inclusion in guidance does not approve its use.
          </p>
        </Section>
      </Card>
      <Card id="bxm-expertise" title={<>BXM FM Expertise</>}>
        <p className="lead-emphasis">
          BXM develops and maintains FM Policies, BBM Standards, FM practices and methodologies within its remit.
        </p>
        <p>
          BXM provides specialist FM expertise from early life management through operation to end of life, including
          service-model, KPI/SLA and operational audit and assessment methodologies.
        </p>
        <p>
          Specialist advice is distinct from operational delivery and approval authority. Use the applicable policy or
          service arrangement to identify those responsibilities. Sustainability, Finance, Procurement, Legal and other
          functions retain their respective authority.
        </p>
      </Card>
      <Card id="fm-guidance" title={<>Policies, BBM Standards &amp; Guidance</>}>
        {onNavigate && (
          <p>
            <Button
              onClick={() => {
                openStandardCollection('all');
                onNavigate('Standards & Reference Library');
              }}
            >
              Explore BBM Standards →
            </Button>
          </p>
        )}
        <p>
          Understand the type of information you are using before applying it. The Reference Library provides guidance
          on source status, version and applicability; source access depends on the authorised catalogue.
        </p>
        <div className="fern-grid">
          {categories.map(([title, text]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <Section header={<>How BBM Standards Support FM Direction</>}>
          <p>
            FM policy sets direction and expectations. BBM Standards support their practical application through
            maintenance and compliance guidance for building systems and equipment.
          </p>
          <p>
            Applying a standard means understanding its scope, arranging suitable competence and retaining the evidence
            required to review the work. The delivery arrangement should make clear who carries out the activity, who
            reviews the evidence and how identified issues are followed up.
          </p>
          <p>
            Read the applicable source before making a decision. A summary helps explain the requirement; it does not
            replace the original document or the specialist judgement needed to apply it.
          </p>
        </Section>
        <Section header={<>How to Use External References</>}>
          <p>
            External standards, including ISO 41001, can inform the structure of FM guidance. A reference does not
            establish Amazon adoption, conformity, certification or a contractual commitment.
          </p>
          <p>
            Check the source, edition, permitted use and applicable requirements. External guidance does not
            automatically become an Amazon requirement.
          </p>
        </Section>
      </Card>
      <Card id="fm-topics" title={<>FM Governance Topics</>}>
        <p>
          Explore how the principles apply across FM. Workspace pages explain the subjects; operational records and
          approvals remain in the relevant authorised systems.
        </p>
        {topics.map((t) => (
          <Section key={t.title} header={<>{t.title}</>} description={<>{t.intro}</>}>
            <p>{t.text}</p>
            <ul>
              {t.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Section>
        ))}
      </Card>
      <Card id="fm-clarification" title={<>Responsibilities &amp; Review</>}>
        <p>
          Before acting, establish the decision owner, service delivery responsibility, specialist adviser and approval
          authority from the applicable policy, contract or delegation. A draft, supplier submission or tool
          recommendation does not itself constitute approval.
        </p>
        <Section header={<>When Evidence or Authority Is Unclear</>}>
          <p>
            Keep the conflicting sources and their versions visible. Record the question and refer it to the owner or
            specialist identified in the applicable source. Do not silently overwrite a contradiction, average
            incompatible evidence or assume a missing approval.
          </p>
          <p>
            High-consequence, irreversible or externally binding decisions need the relevant authorised review. Do not
            invent delegation limits or treat a lower service tier as permission to omit a mandatory requirement.
          </p>
        </Section>
        <Section header={<>Use AI With Accountable Judgement</>}>
          <p>
            AI assistance can help retrieve, compare and explain permitted information when the approved service is
            available. Review the cited evidence and its limitations. An AI answer does not decide legal applicability,
            grant authority or replace professional judgement.
          </p>
        </Section>
        <Section header={<>Review Outcomes and Learn</>}>
          <p>
            Review service outcomes, evidence gaps, repeat failures, corrective-action effectiveness, lifecycle effects
            and user effort. Check whether the original decision remains valid when requirements or conditions change.
          </p>
          <p>
            A meaningful measure needs a purpose, owner, definition, scope, source, baseline, review period and decision
            trigger. Use confirmed targets; distinguish task completion from verified closure and a local improvement
            from an approved wider change.
          </p>
          <p>
            Review responsibilities and timing follow the applicable governance arrangement. Source owners maintain the
            published version and authorised contact route.
          </p>
        </Section>
      </Card>
    </div>
  );
}
