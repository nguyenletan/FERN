/** Explicit provisional build-up; not execution or correction of the BBM workbook. */
export interface MaintenanceCost {
  id: string;
  description: string;
  quantity: string;
  unitsPerRate: string;
  eventsPerActiveYear: string;
  firstYear: string;
  intervalYears: string;
  minutesPerUnit: string;
  hourlyRate: string;
  materialCostPerUnit: string;
  labourTreatment: 'additional' | 'included';
  included: boolean;
  evidence: string;
}
export const pricingHorizons = [5, 10, 15, 20, 25] as const;
export function validateMaintenance(items: unknown): asserts items is MaintenanceCost[] {
  if (!Array.isArray(items) || items.length > 1000) throw Error('Invalid saved maintenance costs.');
  const ids = new Set<string>();
  for (const i of items) {
    for (const key of ['id','description','quantity','unitsPerRate','eventsPerActiveYear','firstYear','intervalYears','minutesPerUnit','hourlyRate','materialCostPerUnit','evidence'])
      if (typeof i?.[key] !== 'string') throw Error('Invalid saved maintenance item.');
    if (!i.id || ids.has(i.id) || typeof i.included !== 'boolean' || !['additional','included'].includes(i.labourTreatment)) throw Error('Invalid maintenance identity or treatment.');
    ids.add(i.id);
  }
}
export function maintenanceTotals(items: MaintenanceCost[]) {
  const errors: string[] = [];
  const years = Array.from({length:25}, (_,i) => ({year:i+1, labour:0, materials:0, total:0}));
  const rows = items.filter(i=>i.included).map(i=>{
    const label=i.description.trim() || 'Maintenance task';
    if (!i.description.trim()) errors.push('An included maintenance task needs a description.');
    if (!i.evidence.trim()) errors.push(`${label}: record source, units, schedule and scope evidence.`);
    for (const [key,title,minimum,maximum,integer] of [
      ['quantity','quantity',0,Infinity,false], ['unitsPerRate','units per rate',Number.MIN_VALUE,Infinity,false],
      ['eventsPerActiveYear','events per active year',1,366,true], ['firstYear','first year',1,25,true],
      ['intervalYears','repeat interval in years',1,25,true], ['materialCostPerUnit','material cost per rate unit per event',0,Infinity,false],
      ...(i.labourTreatment==='additional' ? [['minutesPerUnit','minutes per rate unit per event',0,Infinity,false],['hourlyRate','hourly rate',0,Infinity,false]] : []),
    ] as [keyof MaintenanceCost,string,number,number,boolean][]) {
      const raw=i[key],n=Number(raw);
      if(typeof raw!=='string'||!raw.trim()||!Number.isFinite(n)||n<minimum||n>maximum||(integer&&!Number.isInteger(n))) errors.push(`${label}: enter valid ${title}${integer?` (whole number ${minimum}–${maximum})`:''}.`);
    }
    const units=Number(i.quantity)/Number(i.unitsPerRate);
    const materials=units*Number(i.materialCostPerUnit)*Number(i.eventsPerActiveYear);
    const labour=i.labourTreatment==='included'?0:units*Number(i.minutesPerUnit)/60*Number(i.hourlyRate)*Number(i.eventsPerActiveYear);
    const activeYears=years.filter(y=>y.year>=Number(i.firstYear)&&(y.year-Number(i.firstYear))%Number(i.intervalYears)===0);
    if(!Number.isFinite(labour+materials)) errors.push(`${label}: cost exceeds calculation limits.`);
    for(const y of activeYears){y.labour+=labour;y.materials+=materials;y.total=y.labour+y.materials;}
    return {id:i.id,description:i.description,labour,materials,activeYearCost:labour+materials,activeYears:activeYears.map(y=>y.year)};
  });
  if(years.some(y=>!Number.isFinite(y.total))||!Number.isFinite(years.reduce((n,y)=>n+y.total,0))) errors.push('Maintenance schedule exceeds calculation limits.');
  return {errors,rows,years:errors.length?null:years,firstYear:errors.length?null:years[0].total};
}
