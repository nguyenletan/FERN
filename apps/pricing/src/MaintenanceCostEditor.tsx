import {maintenanceTotals,type MaintenanceCost} from '../../../packages/pricing-core/src/maintenanceCosts.ts';
const field='border border-slate-300 rounded p-2 bg-white text-slate-900 w-full';
const button='border border-slate-300 rounded px-3 py-2 bg-blue-50 text-blue-950';
export default function MaintenanceCostEditor({items,onChange,currency}:{items:MaintenanceCost[];onChange:(items:MaintenanceCost[])=>void;currency:string}){
 const patch=(id:string,values:Partial<MaintenanceCost>)=>onChange(items.map(i=>i.id===id?{...i,...values}:i));
 const result=maintenanceTotals(items);
 return <section aria-label="Maintenance and materials" className="border rounded p-3 space-y-3">
 <h3 className="font-semibold text-lg">Maintenance, materials and scheduled work</h3>
 <p className="text-sm">Enter costs in {currency||'the selected currency'} at the price base date. Year 1 starts at that date; later years are successive 12-month periods. Specify the first active year, repeat interval and event count within each active year. No operating calendar or service-life adjustment is assumed.</p>
 <p className="text-sm text-amber-900">Provisional rules: Amazon must confirm quantity, calendar and bundled scope under AMZ-PRC-04/05/10. This explicit build-up does not reproduce or correct the source workbook automatically.</p>
 <button className={button} onClick={()=>onChange([...items,{id:crypto.randomUUID(),description:'',quantity:'',unitsPerRate:'',eventsPerActiveYear:'',firstYear:'',intervalYears:'',minutesPerUnit:'',hourlyRate:'',materialCostPerUnit:'',labourTreatment:'additional',included:true,evidence:''}])}>Add maintenance task</button>
 {items.map((i,index)=><fieldset key={i.id} className="border rounded p-3 space-y-3"><legend>{i.description||`Maintenance task ${index+1}`}</legend>
 <label className="block"><input type="checkbox" checked={i.included} onChange={e=>patch(i.id,{included:e.target.checked})}/> Include task in this pricing scope</label>
 <div className="grid sm:grid-cols-2 gap-3">
 <label>Task description<input className={field} value={i.description} onChange={e=>patch(i.id,{description:e.target.value})}/></label>
 <label>Task labour treatment<select className={field} value={i.labourTreatment} onChange={e=>patch(i.id,{labourTreatment:e.target.value as MaintenanceCost['labourTreatment']})}><option value="additional">Add task labour cost</option><option value="included">Labour already included in staff / contractor cost</option></select></label>
 {([
 ['quantity','Task quantity'],['unitsPerRate','Units covered by each rate (e.g. 1 asset or 100 m²)'],
 ['eventsPerActiveYear','Events per active year (1–366)'],['firstYear','First active year (1–25)'],['intervalYears','Repeat every (years, 1–25)'],
 ...(i.labourTreatment==='additional'?[['minutesPerUnit','Labour minutes per rate unit per event'],['hourlyRate','Task hourly labour rate']]:[]),
 ['materialCostPerUnit','Materials cost per rate unit per event'],
 ] as [keyof MaintenanceCost,string][]).map(([key,label])=><label key={key}>{label}<input className={field} type="number" step="any" min="0" value={String(i[key])} onChange={e=>patch(i.id,{[key]:e.target.value})}/></label>)}
 </div>
 <p className="text-sm">Active-year cost = quantity ÷ units covered × events × (minutes ÷ 60 × hourly rate + materials). Labour contributes zero when included elsewhere. Enter zero materials explicitly when appropriate; if materials are bundled elsewhere, enter zero and identify that line in the evidence.</p>
 <label className="block">Task source, units, schedule and overlap evidence<textarea className={field} value={i.evidence} onChange={e=>patch(i.id,{evidence:e.target.value})}/></label>
 <button className={button} onClick={()=>onChange(items.filter(x=>x.id!==i.id))}>Remove maintenance task {index+1}</button>
 </fieldset>)}
 {!items.length&&<p className="text-sm">No maintenance tasks entered. This does not establish that maintenance costs are zero.</p>}
 {result.errors.length>0&&<ul className="list-disc pl-5" aria-live="polite">{result.errors.map((e,i)=><li key={i}>{e}</li>)}</ul>}
 {result.years&&items.some(i=>i.included)&&<ul className="text-sm">{result.rows.map(r=><li key={r.id}>{r.description}: {currency} {r.activeYearCost.toLocaleString(undefined,{maximumFractionDigits:2})} per active year (labour {r.labour.toLocaleString()}, materials {r.materials.toLocaleString()}); years {r.activeYears.join(', ')}.</li>)}</ul>}
 </section>;
}
