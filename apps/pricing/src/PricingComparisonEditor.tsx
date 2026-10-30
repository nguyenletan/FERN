import {useState,useEffect} from 'react';
import {currencies,dateForDisplay,dateFromDisplay,type StaffBaseline} from '../../../packages/pricing-core/src/staffCosts.ts';
import {comparePricing,comparisonSignature,type PricingComparison} from '../../../packages/pricing-core/src/comparisons.ts';
const field='border border-slate-300 rounded p-2 bg-white text-slate-900 w-full';
const button='border border-slate-300 rounded px-3 py-2 bg-blue-50 text-blue-950';
function PriceDate({value,onChange}:{value:string;onChange:(value:string)=>void}){
 const [text,setText]=useState(dateForDisplay(value));
 useEffect(()=>{if(dateFromDisplay(text)!==value)setText(dateForDisplay(value));},[value]);
 return <label>Comparison price date (DD-MM-YYYY)<input className={field} placeholder="DD-MM-YYYY" maxLength={10} value={text} onChange={e=>{setText(e.target.value);onChange(dateFromDisplay(e.target.value));}}/></label>;
}
export default function PricingComparisonEditor({baseline,total,onChange}:{baseline:StaffBaseline;total:number|null;onChange:(b:StaffBaseline)=>void}){
 const rows=baseline.comparisons??[],basis=baseline.comparisonBasis??{scope:'',serviceLevel:'',taxBasis:''};
 const results=comparePricing(baseline,total);
 const patch=(id:string,p:Partial<PricingComparison>)=>onChange({...baseline,comparisons:rows.map(c=>c.id===id?{...c,...p,confirmedBasis:p.confirmedBasis??''}:c)});
 return <section aria-label="Pricing comparisons" className="border rounded p-3 space-y-3">
 <h3 className="font-semibold text-lg">Compare actual, tender and benchmark costs</h3>
 <p className="text-sm">Compare each source with this baseline’s first 12 months. Enter a comparable total in the same currency, price date, scope, service level and tax basis. Historical actuals and tenders may need an evidenced manual adjustment. No exchange, inflation or scope adjustment is applied automatically.</p>
 <div className="grid sm:grid-cols-2 gap-3">{([['scope','Baseline scope and exclusions'],['serviceLevel','Baseline service tier and maintenance strategy'],['taxBasis','Baseline tax and commercial basis']] as const).map(([key,label])=><label key={key}>{label}<textarea className={field} value={basis[key]} onChange={e=>onChange({...baseline,comparisonBasis:{...basis,[key]:e.target.value}})}/></label>)}</div>
 <button className={button} onClick={()=>onChange({...baseline,comparisons:[...rows,{id:crypto.randomUUID(),name:'',kind:'actual',amount:'',currency:'',priceDate:'',periodMonths:'',evidence:'',confirmedBasis:''}]})}>Add cost comparison</button>
 {rows.map(c=>{const result=results.find(r=>r.id===c.id)!;return <fieldset key={c.id} className="border rounded p-3 space-y-3"><legend>{c.name||'New cost comparison'}</legend>
 <div className="grid sm:grid-cols-2 gap-3">
 <label>Comparison name<input className={field} value={c.name} onChange={e=>patch(c.id,{name:e.target.value})}/></label>
 <label>Comparison type<select className={field} value={c.kind} onChange={e=>patch(c.id,{kind:e.target.value as PricingComparison['kind']})}><option value="actual">Existing actual cost</option><option value="original-tender">Original tender</option><option value="incumbent-tender">Incumbent renewal tender</option><option value="new-tender">New supplier tender</option><option value="benchmark">Industry benchmark</option></select></label>
 <label>Comparable cost<input className={field} type="number" step="any" min="0" value={c.amount} onChange={e=>patch(c.id,{amount:e.target.value})}/></label>
 <label>Comparison currency<select className={field} value={c.currency} onChange={e=>patch(c.id,{currency:e.target.value})}><option value="">Select currency</option>{currencies.map(([code,label])=><option key={code} value={code}>{label} — {code}</option>)}</select></label>
 <PriceDate value={c.priceDate} onChange={priceDate=>patch(c.id,{priceDate})}/>
 <label>Cost period (months)<input className={field} type="number" value={c.periodMonths} onChange={e=>patch(c.id,{periodMonths:e.target.value})}/></label>
 </div>
 <label className="block">Comparison source and adjustment evidence<textarea className={field} value={c.evidence} onChange={e=>patch(c.id,{evidence:e.target.value})} placeholder="Source/version, original amount/currency/period, scope, exclusions, tier/strategy and any adjustment calculation. For benchmarks include licence and applicability evidence."/></label>
 <label className="block"><input type="checkbox" checked={c.confirmedBasis===comparisonSignature(baseline)} onChange={e=>patch(c.id,{confirmedBasis:e.target.checked?comparisonSignature(baseline):''})}/> I have reviewed matching scope, service level, tax basis and the first-year period against the current baseline (provisional, not approval).</label>
 {result.gaps.length>0?<div aria-live="polite"><p>Comparison pending — baseline calculation remains available.</p><ul className="list-disc pl-5 text-sm">{result.gaps.map(g=><li key={g}>{g}</li>)}</ul></div>:<p aria-live="polite" className="font-semibold">{result.difference===0?'Same cost':result.difference!>0?'Above baseline':'Below baseline'}: {baseline.currency} {Math.abs(result.difference!).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})} · {result.percent===null?'Percentage unavailable: baseline is zero':`${Math.abs(result.percent).toFixed(2)}%`}</p>}
 <button className={button} onClick={()=>onChange({...baseline,comparisons:rows.filter(x=>x.id!==c.id)})}>Remove comparison {c.name||'row'}</button>
 </fieldset>})}
 <p className="text-sm text-amber-900">Differences are comparison cost minus baseline year 1; percentage uses baseline year 1 as denominator. Lower cost is not a recommendation. Risk, compliance, resilience, service quality and final business-owner decisions remain separate. Amazon source/licensing and domain approvals AMZ-PRC-11/16 remain open.</p>
 </section>;
}
