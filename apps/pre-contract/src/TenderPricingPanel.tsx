import {useState} from 'react';
import PricingInputPanel from '../../../packages/pricing-ui/src/PricingInputPanel.tsx';
import {tenderPricing} from '../../../packages/pre-contract-core/src/tenderPricing.ts';
import type {PricingIssue} from '../../../packages/pricing-core/src/pricingHandover.ts';
const field='border rounded p-2 w-full';
function download(record:unknown){const url=URL.createObjectURL(new Blob([JSON.stringify(record,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='FERN-downstream-pricing-calculation.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export default function TenderPricingPanel({site,selectionId,onSelection}:{site:string;selectionId?:string;onSelection?:(id:string)=>void}){
 const [issue,setIssue]=useState<PricingIssue|null>(null);
 const tender=issue?tenderPricing(issue):null;
 return <section className="space-y-3" aria-label="Downstream pricing calculation">
 <PricingInputPanel site={site} recipient="pre-contract" selectionId={selectionId} onSelect={i=>{setIssue(i);if(i&&i.id!==selectionId)onSelection?.(i.id);}}/>
 {tender&&<div className="border rounded p-4 bg-white space-y-3"><h3 className="font-bold">Pre-contract cost comparison from issued pricing</h3><p>Version {issue!.revision}; year 1 baseline: {issue!.baseline.currency} {tender.baseline?.toLocaleString()}. Eligible source comparisons are recalculated from issued inputs.</p><p className="text-sm">Cost rank orders eligible comparison amounts only, lowest first; equal amounts tie. It does not rank service suitability or recommend a contract. Actual and benchmark references are identified by type.</p><table className="w-full text-left"><thead><tr><th>Cost rank</th><th>Source / type</th><th>Cost</th><th>Difference</th></tr></thead><tbody>{tender.ranked.map(c=><tr key={c.id}><td>{c.costRank}</td><td>{c.name} / {c.kind}</td><td>{c.amount?.toLocaleString()}</td><td>{c.difference?.toLocaleString()} ({c.percent===null?'percentage unavailable':c.percent.toFixed(2)+'%'})</td></tr>)}</tbody></table>{!tender.ranked.length&&<p>No comparisons meet the required pricing-basis checks.</p>}{tender.pending.map(c=><p key={c.id}>Pending: {c.name} — {c.gaps.join(' ')}</p>)}<button className={field} onClick={()=>download({method:'FERN-precontract-pricing-comparison-v1',status:'provisional',issue,result:tender})}>Download pre-contract pricing comparison</button><p className="text-sm">AMZ-PRC-11/12/16 remain open. This cost comparison does not add Lifecycle costs or supply risk, compliance, quality or formal approval.</p></div>}
 </section>;
}
