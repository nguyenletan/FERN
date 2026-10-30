import type {StaffBaseline} from './staffCosts.ts';
export interface PricingComparison {
 id:string; name:string; kind:'actual'|'original-tender'|'incumbent-tender'|'new-tender'|'benchmark';
 amount:string; currency:string; priceDate:string; periodMonths:string; evidence:string;
 confirmedBasis:string;
}
export interface ComparisonBasis {scope:string;serviceLevel:string;taxBasis:string;}
export function comparisonSignature(b:StaffBaseline){
 const {comparisons:_,...inputs}=b;
 return JSON.stringify(inputs);
}
export function validateComparisons(value:unknown): asserts value is PricingComparison[]{
 if(!Array.isArray(value)||value.length>200)throw Error('Invalid saved pricing comparisons.');
 const ids=new Set();
 for(const row of value){
  for(const key of ['id','name','amount','currency','priceDate','periodMonths','evidence','confirmedBasis'])if(typeof row?.[key]!=='string')throw Error('Invalid saved comparison.');
  if(!row.id||ids.has(row.id)||!['actual','original-tender','incumbent-tender','new-tender','benchmark'].includes(row.kind))throw Error('Invalid comparison identity or category.');ids.add(row.id);
 }
}
export function comparePricing(b:StaffBaseline,baselineTotal:number|null){
 return (b.comparisons??[]).map(c=>{
  const gaps:string[]=[];
  if(baselineTotal===null||!Number.isFinite(baselineTotal)||baselineTotal<0)gaps.push('Complete the pricing baseline.');
  if(!b.comparisonBasis?.scope.trim()||!b.comparisonBasis?.serviceLevel.trim()||!b.comparisonBasis?.taxBasis.trim())gaps.push('Define baseline scope, service/maintenance level and tax basis.');
  if(!c.name.trim())gaps.push('Name the comparison.');
  if(!c.amount.trim()||!Number.isFinite(Number(c.amount))||Number(c.amount)<0)gaps.push('Enter a non-negative comparable cost.');
  if(c.currency!==b.currency||!c.currency)gaps.push('Currency must match; no automatic FX conversion.');
  if(c.priceDate!==b.baseDate||!c.priceDate)gaps.push('Price date must match; document any manual rebasing.');
  if(Number(c.periodMonths)!==12)gaps.push('Use a comparable 12-month cost; no automatic annualisation.');
  if(!c.evidence.trim())gaps.push('Record source/version, original period and scope, and any adjustments.');
  if(c.confirmedBasis!==comparisonSignature(b))gaps.push('Review comparability against the current baseline and confirm matching scope, service level and tax basis.');
  const difference=Number(c.amount)-(baselineTotal??0);
  const percent=baselineTotal===0?null:difference/baselineTotal!*100;
  if(!Number.isFinite(difference)||(percent!==null&&!Number.isFinite(percent)))gaps.push('Comparison exceeds calculation limits.');
  return {id:c.id,name:c.name,kind:c.kind,gaps,difference:gaps.length?null:difference,percent:gaps.length?null:percent,amount:gaps.length?null:Number(c.amount)};
 });
}
