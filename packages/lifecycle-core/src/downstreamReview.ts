import type {Project} from './assetModel.ts';
import type {PricingIssue,PricingStore} from '../../pricing-core/src/pricingHandover.ts';
import {combineLifecyclePricing,type OverlapMode} from './downstreamPricing.ts';
export interface DownstreamReview {
 version:1; site:string; issueId:string; issueRevision:number; mode:OverlapMode;
 evidence:string; binding:string; confirmed:boolean; savedAt:string; status:'provisional';
}
// Order-independent object serialization; array order remains material.
function canonical(value:unknown):unknown {
 if(Array.isArray(value))return value.map(canonical);
 if(value!==null&&typeof value==='object')return Object.fromEntries(Object.entries(value).filter(([,v])=>v!==undefined).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>[k,canonical(v)]));
 return value;
}
export function reviewBinding(project:Project,issue:PricingIssue,mode:OverlapMode,evidence:string){
 return JSON.stringify(canonical({project,issue,mode,evidence}));
}
const key=(site:string)=>`fern.lifecycle.pricing-review.v1.${encodeURIComponent(site)}`;
export function saveDownstreamReview(store:PricingStore,project:Project,issue:PricingIssue,mode:OverlapMode,evidence:string,confirmed:boolean,savedAt:string){
 if(project.site!==issue.baseline.site)throw Error('Cannot save a combined review for different sites.');
 if(!['additional','replace-maintenance'].includes(mode)||!Number.isFinite(Date.parse(savedAt)))throw Error('Invalid combined assessment review.');
 const valid=combineLifecyclePricing(project,issue,mode,evidence,confirmed).total!==null;
 const record:DownstreamReview={version:1,site:project.site,issueId:issue.id,issueRevision:issue.revision,mode,evidence,binding:reviewBinding(project,issue,mode,evidence),confirmed:confirmed&&valid,savedAt,status:'provisional'};
 const raw=JSON.stringify(record);
 if(raw.length>20_000_000)throw Error('Combined review exceeds the local save limit. Download the assessment record.');
 store.setItem(key(project.site),raw);return record;
}
export function restoreDownstreamReview(store:PricingStore,project:Project,issue:PricingIssue){
 const raw=store.getItem(key(project.site));if(!raw)throw Error('No saved combined review for this site.');
 if(raw.length>20_000_000)throw Error('Saved combined review exceeds the local limit.');
 const r=JSON.parse(raw);
 if(r?.version!==1||r.site!==project.site||r.status!=='provisional'||!['additional','replace-maintenance'].includes(r.mode)||typeof r.evidence!=='string'||typeof r.binding!=='string'||typeof r.confirmed!=='boolean'||typeof r.issueId!=='string'||!Number.isInteger(r.issueRevision)||r.issueRevision<1||typeof r.savedAt!=='string'||!Number.isFinite(Date.parse(r.savedAt)))throw Error('Invalid saved combined review. Existing draft retained.');
 const record=r as DownstreamReview;
 const matches=record.issueId===issue.id&&record.issueRevision===issue.revision&&record.binding===reviewBinding(project,issue,record.mode,record.evidence);
 const confirmed=matches&&record.confirmed&&combineLifecyclePricing(project,issue,record.mode,record.evidence,true).total!==null;
 return {record,matches,confirmed};
}
