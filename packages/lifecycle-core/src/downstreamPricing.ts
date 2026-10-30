import {costSummary,type PricingIssue} from '../../pricing-core/src/pricingHandover.ts';
import {calculate,type Project} from './assetModel.ts';
export type OverlapMode='additional'|'replace-maintenance';
export function combineLifecyclePricing(project:Project,issue:PricingIssue,mode:OverlapMode,evidence:string,confirmed:boolean){
 const pricing=costSummary(issue.baseline),lifecycle=calculate(project),gaps:string[]=[];
 if(project.site!==issue.baseline.site)gaps.push('Pricing and Lifecycle sites must match.');
 if(!issue.baseline.currency||issue.baseline.currency!==(project.currency??'GBP'))gaps.push('Pricing and Lifecycle currencies must match; no automatic currency conversion is applied.');
 if(issue.baseline.baseDate!==`${project.start}-01-01`)gaps.push('Pricing must start on 01-01 of the Lifecycle start year to align its 12-month periods with calendar years.');
 if(lifecycle.issues.length)gaps.push('Complete the asset Lifecycle calculation before combining costs.');
 if(!pricing.years)gaps.push('Pricing inputs are invalid.');
 if(lifecycle.years.length>25)gaps.push('Pricing supports at most 25 years; shorten the Lifecycle horizon.');
 if(!['additional','replace-maintenance'].includes(mode))gaps.push('Select an overlap treatment.');
 if(!evidence.trim()||!confirmed)gaps.push('Record and confirm matching price/tax basis and scope, including overlap treatment.');
 const years=gaps.length||!pricing.years?null:lifecycle.years.map((y,index)=>({year:y.year,renewal:y.renewal,retainedMaintenance:mode==='additional'?y.maintenance:0,excludedMaintenance:mode==='replace-maintenance'?y.maintenance:0,pricing:pricing.years![index].total,total:y.renewal+(mode==='additional'?y.maintenance:0)+pricing.years![index].total}));
 const total=years?.reduce((n,y)=>n+y.total,0)??null;
 if(total!==null&&!Number.isFinite(total))gaps.push('Combined cost exceeds calculation limits.');
 return {gaps,years:gaps.length?null:years,total:gaps.length?null:total,currency:project.currency??'GBP',issueId:issue.id,revision:issue.revision,mode,evidence,status:'provisional' as const};
}
