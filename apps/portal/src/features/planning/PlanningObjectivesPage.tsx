import FernAISearch from '../search/FernAISearch';
import GuidanceRoute, {openGuidanceSection} from '../visual/GuidanceRoute';
import {PageArtwork} from '../visual/VisualGuide';
import {openStandardCollection} from '../reference/standardContext';
import './planning.css';

const needs = [
  ['Facility & Business', 'Changes in operating hours, facility use or business needs can change the FM service required.'],
  ['Assets & Maintenance', 'Condition, repeat failures and future renewal needs can identify where maintenance or lifecycle review is needed.'],
  ['Service & Contract', 'An approaching renewal or a change in service scope can trigger a review of delivery options.'],
  ['Requirements & Evidence', 'Changed requirements, incomplete records or unclear applicability can create a need for further assessment.'],
];
const objectiveFields = [
  ['Outcome', 'Describe what needs to be achieved and why it matters.'],
  ['Scope', 'Identify the facility, portfolio, service or asset population affected.'],
  ['Evidence', 'Record the source, baseline, date and limitations supporting the objective.'],
  ['Success Measure', 'Define the measure, reporting period and target from the applicable requirement or agreed plan.'],
  ['Timeframe', 'Establish when the outcome is needed and the basis for that timing.'],
  ['Resources & Dependencies', 'Identify people, capability, information, funding, access and other requirements.'],
  ['Risks & Constraints', 'Explain what could prevent delivery and which mandatory requirements apply.'],
  ['Review', 'Record progress, changed assumptions and the evidence needed to assess the outcome.'],
];
const horizons = [
  ['Immediate & Near Term', 'Address service failures, overdue actions, evidence gaps and emerging asset risks.'],
  ['Annual & Operating Plans', 'Connect service performance, maintenance, data quality and capability needs to operating priorities.'],
  ['Contract & Service Planning', 'Consider renewal, tendering, delivery-model review, mobilisation and transition.'],
  ['Asset & Lifecycle Planning', 'Consider maintenance, repair, refurbishment and replacement alongside future cost and resilience.'],
  ['Portfolio & Strategic Planning', 'Review recurring issues and shared needs across comparable facilities, services and regions.'],
];
const tools = [
  ['Lifecycle & Asset Analysis', 'Review condition, maintenance history, renewal needs and lifecycle alternatives.'],
  ['FM Contract & Service Model', 'Explore service scope, delivery arrangements and responsibility interfaces.'],
  ['FM Pre-Contract / Pre-Tender Assessment', 'Compare the current arrangement with future service options and pricing evidence.'],
  ['Pricing Template Generator', 'Prepare the cost inputs needed for a service or resource comparison.'],
];

export default function PlanningObjectivesPage({onNavigate}:{onNavigate:(destination:string)=>void}) {
  return <article className="fern-planning" aria-labelledby="planning-title">
    <header className="planning-card"><PageArtwork art="guides"/>
      <p className="planning-eyebrow">FM Priorities & Outcomes</p>
      <h1 id="planning-title">Planning &amp; Objectives</h1>
      <p className="planning-intro">Turn FM priorities into clear, evidence-based plans and measurable outcomes.</p>
      <p>Start with the need, define the outcome and identify what must be in place to achieve it. Use evidence to review progress and understand when the plan needs to change.</p>
      <GuidanceRoute title="How to Build an FM Plan" id="planning-route" steps={[
 ['Business Need','Explain what is needed','Identify the problem or change and the people, assets or services affected.','planning-need'],
 ['FM Requirement','Check what must be met','Identify applicable requirements, resources and dependencies.','planning-requirements'],
 ['Objective','Define a clear outcome','Describe success, its scope, measure and timeframe.','planning-objective'],
 ['Plan','Prepare for delivery','Consider responsibilities, options and what must be in place.','planning-delivery'],
 ['Evidence','Establish the starting point','Record the source, baseline, date and limitations behind the objective.','planning-baseline'],
 ['Review','Check progress and adjust','Use evidence to review the outcome and explain any changes.','planning-review'],
 ]}/><nav className="planning-related" aria-label="More planning guidance"><span>Also explore:</span><a href="#planning-horizons" onClick={event=>{event.preventDefault();openGuidanceSection('planning-horizons');}}>Planning Horizons</a><a href="#planning-tools" onClick={event=>{event.preventDefault();openGuidanceSection('planning-tools');}}>Supporting Tools</a></nav>
    </header><FernAISearch page="Planning & Objectives"/>

    <section className="planning-card" id="planning-need"><h2>Start With the Need</h2>
      <p>Establish the requirement or problem before creating an activity list. The examples below illustrate planning needs; they are not live facility findings.</p>
      <div className="planning-grid">{needs.map(([title,text])=><div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div>
      <p>Consider facility type, operating conditions, service scope, asset population and criticality. Compare facilities only where their context and evidence support a meaningful comparison.</p>
    </section>
    <section className="planning-card" id="planning-objective"><h2>Define the Objective</h2>
      <p>A useful objective explains the outcome, its purpose and how it will be assessed. Use these prompts to prepare the information for your plan.</p>
      <dl className="planning-grid">{objectiveFields.map(([term,text])=><div id={term==='Evidence'?'planning-baseline':undefined} key={term}><dt>{term}</dt><dd>{text}</dd></div>)}</dl>
      <details><summary>Example: Make an Objective Specific</summary><p>Instead of “Improve maintenance performance”, identify the maintenance outcome, the asset or service population, the evidence baseline and the measure that will demonstrate improvement. Add the target and timeframe from the applicable requirement or agreed plan.</p></details>
    </section>
    <section className="planning-card" id="planning-horizons"><h2>Planning Horizons</h2><p>Match the planning period to the decision. Short-term activity should take account of longer-term asset and service consequences.</p>
      {horizons.map(([title,text])=><details key={title}><summary>{title}</summary><p>{text}</p></details>)}
    </section>
    <section className="planning-card" id="planning-delivery"><h2>Prepare for Delivery</h2>
      <h3 id="planning-requirements">Requirements, Resources &amp; Dependencies</h3><p>Identify applicable requirements before considering optimisation options. Check the information, people, competence, budget, access and specialist support the plan needs. Record availability and unresolved dependencies rather than assuming they are in place.</p>
      <h3>FM Expertise &amp; Responsibilities</h3>{onNavigate&&<p><button type="button" className="fern-outline" onClick={()=>{openStandardCollection('PM');onNavigate('Reference Library');}}>Review Maintenance Standards →</button></p>}<p>BXM-developed FM Policies, BBM Standards, practices and methodologies can inform planning. Establish delivery responsibilities and decision authority through the relevant policy, requirement or contractual arrangement.</p>
      <h3>Options &amp; Financial Context</h3><p>Where alternatives are needed, compare their assumptions, evidence, cost, risk, constraints and confidence. A cost estimate informs a decision; funding and financial approval follow the applicable decision process.</p>
    </section>
    <section className="planning-card" id="planning-review"><h2>Review Progress &amp; Changes</h2><p>Assess progress against the defined measure and supporting evidence. Keep the baseline population, period, method and exclusions visible so that comparisons remain meaningful.</p>
      <details><summary>Questions for a Planning Review</summary><ul><li>Is the original need still valid?</li><li>Have requirements, operations, asset condition or service arrangements changed?</li><li>Are resources and dependencies in place?</li><li>Does the evidence support the reported progress?</li><li>Are the objective, timeframe and success measure still appropriate?</li></ul></details>
      <p>Record why a plan changes, the evidence supporting the change and the resulting decision. Completing an activity and demonstrating the intended outcome are separate steps.</p>
    </section>
    <section className="planning-card" id="planning-tools"><h2>Supporting Tools</h2><p>When these tools are released, use the relevant one for detailed analysis, then use its results as evidence for the planning decision.</p>
      <div className="planning-grid">{tools.map(([title,text])=><div key={title}><h3>{title}</h3><p>{text}</p><p><strong>Coming soon to the FERN website</strong></p></div>)}</div>
    </section>
  </article>;
}
