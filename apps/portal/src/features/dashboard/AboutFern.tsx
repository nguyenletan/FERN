import {VisualGuide} from '../visual/VisualGuide';
import type { HomePanel } from './HomeNavigation.tsx';
import './get-started.css';

export default function AboutFern({onPanel}:{onPanel:(panel:HomePanel)=>void}) {
 return <div className="fern-get-started"><VisualGuide art="people" steps={["People", "Guidance", "Better decisions"]}/>
  <p><strong>Facility Expert Reference Network</strong> brings FM guidance and decision-support tools together. Its purpose is to help you understand the information behind a facility, asset or service decision and identify the next useful step.</p>
  <section><h3>Start With Your Question</h3>
   <p>A maintenance decision may depend on condition, previous failures, operating demands, requirements and cost. A contract decision may depend on scope, responsibilities, service levels and supplier capability. FERN helps you organise those questions rather than treating one figure as the whole answer.</p>
   <div className="fern-start-choices">
    <button onClick={()=>onPanel('guide')}><strong>Find Your Starting Point</strong><span>Choose the task or decision you need help with →</span></button>
    <button onClick={()=>onPanel('learn')}><strong>Understand the FM Concepts</strong><span>Explore learning topics before using a tool →</span></button>
   </div>
  </section>
  <section><h3>Who Is FERN For?</h3>
   <dl>
    <div><dt>Facility, FM and Engineering Teams</dt><dd>Review assets, maintenance, service needs and the evidence behind technical decisions.</dd></div>
    <div><dt>Business Owners and Regional Teams</dt><dd>Understand options, operational consequences and the decisions requiring review.</dd></div>
    <div><dt>Procurement and Finance Teams</dt><dd>Review scope, pricing assumptions, service arrangements and longer-term costs.</dd></div>
    <div><dt>Compliance and Assurance Specialists</dt><dd>Connect requirements, evidence, findings and the actions needed.</dd></div>
    <div><dt>New and Occasional Users</dt><dd>Find guidance and learn the concepts without first understanding every application.</dd></div>
   </dl>
   <p>Your role describes the work you do; access to information still depends on the permissions provided by your organisation.</p>
  </section>
  <section><h3>A Practical Path Through FERN</h3>
   <ol className="fern-learning-steps">
    <li><strong>Define the question.</strong> Decide what you need to understand or compare.</li>
    <li><strong>Explore the guidance.</strong> Browse Workspace topics, learning and reference guidance to understand your next step. No facility selection is needed.</li>
    <li><strong>Check the information.</strong> Identify sources, dates, scope, assumptions and gaps.</li>
    <li><strong>Use the relevant tool.</strong> Enter or select the inputs and review how the result is calculated.</li>
    <li><strong>Review the result.</strong> Consider the evidence and limitations with the appropriate specialist or decision owner.</li>
   </ol>
  </section>
  <section><h3>Read Results With Their Evidence</h3>
   <p>A requirement, a supporting reference and a FERN explanation serve different purposes. Check the original source and its applicability. A recommendation is an option to review, not an approval.</p>
   <p>Missing information is not zero and does not demonstrate that a requirement has been met. Sometimes the appropriate outcome is that more evidence or specialist review is needed before deciding.</p>
  </section>
  <section><h3>FERN and Your Operational Systems</h3>
   <p>FERN is intended to support understanding and decisions alongside systems that record and execute operational work. A closed maintenance work order alone does not establish that all required evidence exists or that no further action is needed.</p>
   <p>This website provides guidance and learning, with previews of the applications. Application access, facility records, Amazon system connections, shared accounts and formal approvals are not available here.</p>
  </section>
  <section><h3>Need Help?</h3><p>Explore Help &amp; Guidance if you are unsure which area to use or how to interpret information.</p><button className="fern-outline" onClick={()=>onPanel('help')}>Open Help &amp; Guidance</button></section>
 </div>;
}
