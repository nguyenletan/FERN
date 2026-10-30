export interface AdditionalCost {
  id: string;
  category: 'overhead' | 'subcontractor';
  description: string;
  annualCost: string;
  allocation: string;
  treatment: 'additional' | 'included' | 'excluded';
  evidence: string;
}
export function additionalTotals(items: AdditionalCost[]) {
  const errors: string[]=[];
  let overhead=0, subcontractor=0;
  const rows=items.filter(i=>i.treatment==='additional').map(i=>{
    if(!i.description.trim())errors.push('An additional cost needs a description.');
    if(!i.annualCost.trim()||!Number.isFinite(Number(i.annualCost))||Number(i.annualCost)<0)errors.push(`${i.description||'Cost item'}: enter a non-negative annual cost.`);
    if(!i.allocation.trim()||!Number.isFinite(Number(i.allocation))||Number(i.allocation)<0||Number(i.allocation)>100)errors.push(`${i.description||'Cost item'}: enter FM allocation from 0 to 100%.`);
    if(!i.evidence.trim())errors.push(`${i.description||'Cost item'}: record the source and scope of this cost.`);
    const cost=Number(i.annualCost)*Number(i.allocation)/100;
    if(!Number.isFinite(cost))errors.push(`${i.description||'Cost item'}: cost exceeds calculation limits.`);
    if(i.category==='overhead')overhead+=cost;else subcontractor+=cost;
    return {id:i.id,description:i.description,category:i.category,cost};
  });
  if(!Number.isFinite(overhead+subcontractor))errors.push('Additional costs exceed calculation limits.');
  return {errors,rows,overhead:errors.length?null:overhead,subcontractor:errors.length?null:subcontractor,total:errors.length?null:overhead+subcontractor};
}
export function validateAdditional(items: unknown): asserts items is AdditionalCost[] {
 if(!Array.isArray(items)||items.length>1000)throw new Error('Invalid saved additional costs.');
 const ids=new Set();
 for(const i of items){
  for(const key of ['id','description','annualCost','allocation','evidence'])if(typeof i?.[key]!=='string')throw new Error('Invalid saved cost item.');
  if(ids.has(i.id)||!['overhead','subcontractor'].includes(i.category)||!['additional','included','excluded'].includes(i.treatment))throw new Error('Invalid saved cost category, treatment or identifier.');
  ids.add(i.id);
 }
}
