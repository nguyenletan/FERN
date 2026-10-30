import {economicProfile,type Economics} from './economics.ts';
import {currencies} from '../../core/src/currencies.ts';
export interface EconomicReportContext {
 sensitivity?:{id:string;name:string;baselineInflation:string;baselineDiscount:string;baselineEvidence:string};
 site:string; source:'Asset costs'|'Combined costs'; basis:string;
 pricingIssue?:{id:string;revision:number;overlapTreatment:string;overlapEvidence:string};
}
// Quote CSV cells and keep user-supplied text from being interpreted as spreadsheet formulas.
function cell(value:string|number){
 const text=typeof value==='number'?String(value):(/^[\s]*[=+@-]|^[\t\r\n]/.test(value)?"'"+value:value);
 return '"'+text.replace(/"/g,'""')+'"';
}
export function economicCsv(years:{year:number;total:number}[]|null,e:Economics|undefined,currency:string,context:EconomicReportContext){
 const result=economicProfile(years,e);
 if(result.gaps.length||!result.years||!result.horizons||!e)throw Error('Complete the economic inputs and underlying cost calculation before exporting.');
 if(!context.site.trim()||!context.basis.trim()||!currencies.some(([code])=>code===currency))throw Error('A site, cost basis and supported currency are required for the report.');
 if(context.source==='Combined costs'&&(!context.pricingIssue?.id.trim()||!Number.isInteger(context.pricingIssue.revision)||context.pricingIssue.revision<1||!['additional','replace-maintenance'].includes(context.pricingIssue.overlapTreatment)||!context.pricingIssue.overlapEvidence.trim()))throw Error('Combined report requires a pricing version and overlap evidence.');
 const rows:(string|number)[][]=[
 ['FERN economic cash-flow report'],['Status','Provisional — Amazon validation and approval pending'],
 ['Site',context.site],['Scope',context.source],['Currency',currency],['Cost basis',context.basis],
 ['Base date',`01-01-${result.years[0].year}`],['Analysis years',result.years.length],['Economic location',e.country],
 ['Annual inflation percent',Number(e.inflation)],['Annual nominal discount percent',Number(e.discount)],['Timing','End of each analysis year'],['Rate sources and applicability',e.evidence],
 ['Method','Nominal(n) = base cost(n) × (1 + inflation)^(n−1); present cost(n) = nominal(n) / (1 + nominal discount)^n. Rates divided by 100; no intermediate rounding.'],
 ['Limitations','Uniform rates; first-year base prices; no FX, residual value or category-specific escalation. Uncovered horizons are unavailable.'],
 ];
 if(context.sensitivity)rows.push(['Sensitivity case ID',context.sensitivity.id],['Sensitivity case name',context.sensitivity.name],['Baseline inflation percent',context.sensitivity.baselineInflation],['Baseline nominal discount percent',context.sensitivity.baselineDiscount],['Baseline rate evidence',context.sensitivity.baselineEvidence]);
 if(context.pricingIssue)rows.push(['Pricing issue ID',context.pricingIssue.id],['Pricing revision',context.pricingIssue.revision],['Overlap treatment',context.pricingIssue.overlapTreatment],['Overlap evidence',context.pricingIssue.overlapEvidence]);
 rows.push([],['Year',`Base-price cost ${currency}`,`Nominal cash flow ${currency}`,`Present cost ${currency}`]);
 for(const y of result.years)rows.push([y.year,y.total,y.nominal,y.presentCost]);
 rows.push(['Total',result.years.reduce((n,y)=>n+y.total,0),result.total!,result.npc!],[],['Horizon years',`Nominal total ${currency}`,`Net present cost ${currency}`]);
 for(const h of result.horizons)rows.push([h.horizon,h.nominal??'Unavailable — outside assessment horizon',h.npc??'Unavailable — outside assessment horizon']);
 return '\uFEFF'+rows.map(row=>row.map(cell).join(',')).join('\r\n');
}
