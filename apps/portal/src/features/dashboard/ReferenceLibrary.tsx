import ReadingControls from '../reading/ReadingControls';
import ComplianceLibrary from '../reference/ComplianceLibrary';
import './get-started.css';

const collections = [
 ['FM Policies & BBM Standards', 'Policies explain FM direction. BBM Standards describe Base Building Maintenance requirements within their stated scope. Check the original source and applicability before using either.'],
 ['Practices, Methodologies & Service Models', 'Practical guidance and structured methods explain how to approach FM work. Distinguish a delivery model from a service tier, and an explanation from a mandatory requirement.'],
 ['Performance, Risk & Assurance', 'Measure definitions, compliance guidance and assessment methods explain the basis of a result. Check the definition, population, period, exclusions and supporting evidence.'],
 ['Assets & Lifecycle', 'Source material supports condition assessment, maintenance and lifecycle planning. Service-life assumptions, methods and cost evidence need to be appropriate to the asset and operating context.'],
 ['Guides & Templates', 'Guides explain a task; templates help structure information. A completed template does not by itself confirm approval, compliance or an accepted decision.'],
 ['External References', 'Professional, regulatory and technical sources retain their original authorship. Their authority depends on the source and applicability; inclusion does not itself establish Amazon adoption.'],
];

export default function ReferenceLibrary(){
 return <div className="fern-get-started fern-reference-library">
  <ComplianceLibrary/>
  <details className="fs-library-help"><summary>About the library and how to use sources</summary><p>Search the supplied Maintenance and Compliance Standards above. Other collections below provide guidance only; a connected Amazon document catalogue is not available here.</p><div data-reading-scope><ReadingControls label="Reference Library guidance"/><details className="fern-reading-detail"><summary><h3 id="reference-collections">Understand the Collections</h3></summary><p>Expand a topic to understand the types of material it covers. These explanations are not document listings.</p>
   {collections.map(([title,description])=><details key={title}><summary>{title}</summary><p>{description}</p></details>)}
  </details>
  <details className="fern-reading-detail"><summary><h3 id="reference-bbm">Understanding BBM Standards</h3></summary>
   <p>Base Building Maintenance (BBM) Standards help explain the maintenance and compliance activities associated with building systems and equipment. Use them alongside the applicable local requirements, manufacturer instructions and site arrangements.</p>
   <details><summary>Preventative Maintenance Standards</summary><p>These describe maintenance tasks and system checks. They identify the equipment or system, planned activities, relevant intervals and supporting information needed to plan and review the work.</p></details>
   <details><summary>Compliance Standards</summary><p>These describe compliance-related activities, the records needed to demonstrate them and relevant regional considerations. They are a guide to the areas covered and do not replace a review of all requirements that apply to the activity or location.</p></details>
   <p>Maintenance may contribute to meeting a compliance requirement. Check whether it covers the full requirement and whether the supporting evidence is sufficient.</p>
   <details><summary>Read the Task and Its Conditions Together</summary><p>Identify the equipment, activity and location to which the standard applies. Read the task together with its conditions, required competence and evidence. Distinguish when the work must be carried out from when evidence must be uploaded.</p></details>
  </details>
  <details className="fern-reading-detail"><summary><h3 id="reference-check">Before You Use a Source</h3></summary>
   <ol>
    <li><strong>Identify it.</strong> Check the title, document identifier, source and content type.</li>
    <li><strong>Check the version.</strong> Review its status, effective date and last review. Look for a replacement if it has been superseded.</li>
    <li><strong>Check where it applies.</strong> Consider the country, service, asset, facility type and relevant time period.</li>
    <li><strong>Read the original.</strong> Follow the authorised source and its access conditions. A FERN summary does not replace it.</li>
    <li><strong>Ask the right person.</strong> Use the record’s authorised owner or specialist contact for questions about interpretation.</li>
   </ol>
  </details>
  <details><summary>Understand Document Status</summary>
   <dl>{[
    ['WIP / Draft','Content is being developed; it is not an approved position.'],
    ['Review','Content is undergoing review or validation.'],
    ['Approved','Approval applies within the documented scope. Check applicability and the approval record.'],
    ['Superseded','A later version has replaced this one. It may still be relevant to a historical question.'],
    ['Archived','Retained for historical reference; do not assume that it is a current requirement.'],
   ].map(([term,meaning])=><div key={term}><dt>{term}</dt><dd>{meaning}</dd></div>)}</dl>
   <p>Supporting reference material is a source type, not proof of approval. Its publication status and authority should be considered separately.</p>
  </details>
  <details><summary>When Information Is Missing or Conflicts</summary><p>If the authoritative source is unavailable, do not treat a secondary explanation as the requirement. If sources disagree, retain both references and seek the appropriate specialist review. Do not silently choose the version that gives the preferred result.</p><p>Missing source or contact information should be identified clearly. No specialist contact directory is available here.</p></details>
  <details><summary>Using Sources With AI-Assisted Search</summary><p>Check the cited source, version and applicability before relying on an answer. Current questions need current applicable material; historical questions may need an earlier version. A generated answer does not approve a decision or resolve conflicting requirements.</p></details>
 </div></details></div>;
}
