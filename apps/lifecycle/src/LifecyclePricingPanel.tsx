import SensitivityPanel from "./SensitivityPanel.tsx";
import {sensitivityResults} from "../../../packages/lifecycle-core/src/sensitivity.ts";
import EconomicAnalysisPanel from "./EconomicAnalysisPanel.tsx";
import {economicProfile} from "../../../packages/lifecycle-core/src/economics.ts";
import {reviewBinding,saveDownstreamReview,restoreDownstreamReview} from "../../../packages/lifecycle-core/src/downstreamReview.ts";
import {useState} from 'react';
import PricingInputPanel from '../../../packages/pricing-ui/src/PricingInputPanel.tsx';
import {combineLifecyclePricing,type OverlapMode} from '../../../packages/lifecycle-core/src/downstreamPricing.ts';
import type {PricingIssue} from '../../../packages/pricing-core/src/pricingHandover.ts';
import type {Project} from '../../../packages/lifecycle-core/src/assetModel.ts';
const field='border rounded p-2 w-full';
function download(record:unknown){const url=URL.createObjectURL(new Blob([JSON.stringify(record,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='FERN-downstream-pricing-calculation.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export default function LifecyclePricingPanel({site,project}:{site:string;project:Project}){
 const [issue,setIssue]=useState<PricingIssue|null>(null),[mode,setMode]=useState<OverlapMode>('additional'),[evidence,setEvidence]=useState(''),[confirmation,setConfirmation]=useState('');
 const [reviewMessage,setReviewMessage]=useState('');
 const signature=project&&issue?reviewBinding(project,issue,mode,evidence):'';
 const lifecycle=project&&issue?combineLifecyclePricing(project,issue,mode,evidence,confirmation===signature):null;
 return <section className="space-y-3" aria-label="Downstream pricing calculation">
 <PricingInputPanel site={site} recipient="lifecycle" onSelect={setIssue}/>
 {issue&&project&&<div className="border rounded p-4 bg-white space-y-3"><h3 className="font-bold">Combine asset Lifecycle and issued pricing</h3>
 <p>Uses pricing version {issue.revision}. Constant {project.currency??"GBP"}, undiscounted; no inflation or discounting. The asset-only report remains separate. This combined output includes pricing once.</p>
 <label className="block">Pricing overlap treatment<select className={field} value={mode} onChange={e=>setMode(e.target.value as OverlapMode)}><option value="additional">Add pricing — scope is additional to all asset costs</option><option value="replace-maintenance">Replace ALL asset maintenance costs with pricing; retain renewals</option></select></label>
 <p className="text-sm">For partial overlap, reconcile the pricing/asset scope first. Replacement excludes every asset-maintenance cost from this combined output; asset data is retained. Both modes retain asset renewals, so pricing must exclude those renewal costs.</p>
 <label className="block">Price basis, scope and overlap evidence<textarea className={field} value={evidence} onChange={e=>setEvidence(e.target.value)} placeholder="Confirm same constant price date and tax treatment. Identify costs retained, excluded and included elsewhere; explain why no renewal or maintenance costs are duplicated."/></label>
 <label className="block"><input type="checkbox" checked={confirmation===signature} onChange={e=>setConfirmation(e.target.checked?signature:'')}/> I reviewed matching price/tax basis, period and scope and the selected overlap treatment (provisional).</label>
 {lifecycle?.gaps.length?<ul className="list-disc pl-5">{lifecycle.gaps.map(g=><li key={g}>{g}</li>)}</ul>:lifecycle?.years&&<><p className="font-bold">Combined horizon total: {lifecycle.currency} {lifecycle.total!.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</p><div className="overflow-x-auto"><table className="w-full text-left"><thead><tr><th>Year</th><th>Renewal</th><th>Retained maintenance</th><th>Excluded maintenance</th><th>Pricing</th><th>Total</th></tr></thead><tbody>{lifecycle.years.map(y=><tr key={y.year}><td>{y.year}</td><td>{y.renewal.toLocaleString()}</td><td>{y.retainedMaintenance.toLocaleString()}</td><td>{y.excludedMaintenance.toLocaleString()}</td><td>{y.pricing.toLocaleString()}</td><td>{y.total.toLocaleString()}</td></tr>)}</tbody></table></div><button className={field} onClick={()=>download({method:'FERN-combined-pricing-lifecycle-v1',issue,project,result:lifecycle,economics:economicProfile(lifecycle.years,project.economics),sensitivityCases:sensitivityResults(lifecycle.years,project.economics,project.sensitivities??[])})}>Download combined pricing and Lifecycle record</button></>}
 <EconomicAnalysisPanel context={{site:project.site,source:"Combined costs",basis:project.basis,pricingIssue:{id:issue.id,revision:issue.revision,overlapTreatment:mode,overlapEvidence:evidence}}} source="Combined costs" currency={project.currency??"GBP"} years={lifecycle?.years??null} economics={project.economics}/>
 <SensitivityPanel years={lifecycle?.years??null} baseline={project.economics} cases={project.sensitivities??[]} currency={project.currency??"GBP"} context={{site:project.site,source:"Combined costs",basis:project.basis,pricingIssue:{id:issue.id,revision:issue.revision,overlapTreatment:mode,overlapEvidence:evidence}}}/>
 <div className="flex flex-wrap gap-2">
 <button className={field} onClick={()=>{try{const saved=saveDownstreamReview(localStorage,project,issue,mode,evidence,confirmation===signature,new Date().toISOString());setReviewMessage(saved.confirmed?'Combined assessment review saved in this browser. Status: provisional.':'Combined assessment draft saved; review is still required.');}catch(e){setReviewMessage(e instanceof Error?e.message:'Save failed; draft retained.');}}}>Save combined assessment review</button>
 <button className={field} onClick={()=>{try{const restored=restoreDownstreamReview(localStorage,project,issue);setMode(restored.record.mode);setEvidence(restored.record.evidence);setConfirmation(restored.confirmed?reviewBinding(project,issue,restored.record.mode,restored.record.evidence):'');setReviewMessage(restored.confirmed?'Saved provisional review restored for matching inputs. Totals recalculated.':restored.matches?'Draft restored. Complete the review before calculating.':'Evidence and treatment restored, but project or pricing inputs differ. Review again before calculating.');}catch(e){setReviewMessage(e instanceof Error?e.message:'Restore failed; draft retained.');}}}>Restore combined assessment review (replace draft)</button>
 </div>
 <p className="text-sm">Stores one combined review per site in this browser. Save the asset project separately. Restore replaces only the overlap treatment and evidence; it does not replace assets or switch pricing versions. A saved review is reusable only when every input matches.</p>
 {reviewMessage&&<p role="status">{reviewMessage}</p>}
 <p className="text-sm text-amber-900">AMZ-PRC-12/16: mapping and domain approval remain open. Review confirmation resets when the source version, project, evidence or treatment changes. Download the record to retain this combined assessment.</p>
 </div>}

 </section>;
}
