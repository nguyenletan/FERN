import type {AdditionalCost} from '../../../packages/pricing-core/src/additionalCosts.ts';
const field='border border-slate-300 rounded p-2 bg-white text-slate-900 w-full';
const button='border border-slate-300 rounded px-3 py-2 bg-blue-50 text-blue-950';
export default function AdditionalCostEditor({items,onChange}:{items:AdditionalCost[];onChange:(items:AdditionalCost[])=>void}){
 const patch=(id:string,values:Partial<AdditionalCost>)=>onChange(items.map(i=>i.id===id?{...i,...values}:i));
 const add=(category:AdditionalCost['category'])=>onChange([...items,{id:crypto.randomUUID(),category,description:'',annualCost:'',allocation:'',treatment:'additional',evidence:''}]);
 return <section className="border rounded p-3 flex flex-col gap-3" aria-label="Overheads and subcontractors">
 <h3 className="font-semibold text-lg">Overheads and subcontractors</h3>
 <p className="text-sm">Enter annual costs on the same currency, price-date and tax basis as the staff rates. Identify costs already included in staff rates or another line so they are not added again. No tax, profit or currency conversion is applied automatically.</p>
 <div className="flex gap-2"><button className={button} onClick={()=>add('overhead')}>Add overhead</button><button className={button} onClick={()=>add('subcontractor')}>Add subcontractor cost</button></div>
 {items.map((i,n)=><fieldset key={i.id} className="border rounded p-3 flex flex-col gap-2"><legend>{i.category==='overhead'?'Overhead':'Subcontractor'} {n+1}: {i.description||'New cost'}</legend>
 <div className="grid sm:grid-cols-2 gap-3">
 <label>Cost description<input className={field} value={i.description} onChange={e=>patch(i.id,{description:e.target.value})}/></label>
 <label>Cost treatment<select aria-label="Cost treatment" className={field} value={i.treatment} onChange={e=>patch(i.id,{treatment:e.target.value as AdditionalCost['treatment']})}><option value="additional">Add to annual baseline</option><option value="included">Already included in another rate or line</option><option value="excluded">Outside this baseline</option></select></label>
 <label>Annual cost before FM allocation<input className={field} type="number" min="0" step="any" value={i.annualCost} onChange={e=>patch(i.id,{annualCost:e.target.value})}/></label>
 <label>Cost FM allocation (%)<input className={field} type="number" min="0" max="100" step="any" value={i.allocation} onChange={e=>patch(i.id,{allocation:e.target.value})}/></label>
 </div><label>Cost source and scope<textarea className={field} value={i.evidence} onChange={e=>patch(i.id,{evidence:e.target.value})} placeholder="Supplier quote, rate date, scope and tax basis; or identify the rate/line already containing this cost."/></label>
 {i.treatment!=='additional'&&<p className="text-sm">Retained for scope tracking; this line does not contribute to the additional-cost total.</p>}
 <button className={button} onClick={()=>onChange(items.filter(x=>x.id!==i.id))}>Remove cost {i.description||n+1}</button>
 </fieldset>)}
 {!items.length&&<p className="text-sm">No overhead or subcontractor lines entered. This does not establish that the site has none.</p>}
 </section>;
}
