export const deliveryModels=['Full Blue Badge','IFM','IFM Hybrid','Fully Contained','AFM — definition pending','No existing arrangement','Other / mixed'] as const;
export const transitionTypes=['New-facility mobilisation','Provider transition','Bring services in-house','Outsource existing services','Change delivery model','Change scope or service tier','Other'] as const;
export const serviceTiers=['Prime','Plus','Core','Mixed / asset-specific'] as const;
export type PlanContext={currentModel:string;targetModel:string;transitionType:string;services:string;assets:string;facilityTier:string;assetTiers:string};
export const emptyContext=():PlanContext=>({currentModel:'',targetModel:'',transitionType:'',services:'',assets:'',facilityTier:'',assetTiers:''});
function parseContext(value:unknown):PlanContext{
 if(value===undefined)return emptyContext();
 if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid mobilisation context.');
 const c=value as Record<string,unknown>;const result=emptyContext();
 for(const key of Object.keys(result) as (keyof PlanContext)[]){if(typeof c[key]!=='string'||(c[key] as string).length>10000)throw Error('Invalid mobilisation context fields.');result[key]=c[key] as string;}
 for(const [key,allowed] of [['currentModel',deliveryModels],['targetModel',deliveryModels.filter(x=>x!=='No existing arrangement')],['transitionType',transitionTypes],['facilityTier',serviceTiers]] as const){if(result[key]&&!allowed.some(x=>x===result[key]))throw Error('Unsupported mobilisation context selection.');}
 return result;
}
export const statuses=['Not started','In progress','Blocked','Complete'] as const;
export type Task={id:string;title:string;owner:string;due:string;status:typeof statuses[number];evidence:string};
export type LaunchPlan={version:1;site:string;name:string;context?:PlanContext;savedAt?:string;tasks:Task[]};
export const emptyPlan=(site:string):LaunchPlan=>({version:1,site,name:'',context:emptyContext(),tasks:[]});
export const emptyTask=(id:string):Task=>({id,title:'',owner:'',due:'',status:'Not started',evidence:''});
export function validDate(value:string){
 if(!/^\d{2}-\d{2}-\d{4}$/.test(value))return false;
 const [d,m,y]=value.split('-').map(Number);
 return y>=1900&&y<=9999&&m>=1&&m<=12&&d>=1&&d<=new Date(Date.UTC(y,m,0)).getUTCDate();
}
export function completionGaps(t:Task){return [!t.title.trim()&&'Task description is required.',!t.owner.trim()&&'Owner is required.',!validDate(t.due)&&'A valid deadline in DD-MM-YYYY is required.',!t.evidence.trim()&&'Completion evidence or reference is required.'].filter(Boolean) as string[];}
export function parsePlan(raw:string,site:string):LaunchPlan{
 if(raw.length>2_000_000)throw Error('Plan exceeds the 2 MB text limit.');
 const p=JSON.parse(raw);
 if(!p||p.version!==1||p.site!==site||typeof p.name!=='string'||p.name.length>500||!Array.isArray(p.tasks)||p.tasks.length>200)throw Error('Invalid plan version, site or size.');
 if(p.savedAt!==undefined&&(typeof p.savedAt!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(p.savedAt)||!Number.isFinite(Date.parse(p.savedAt))||new Date(p.savedAt).toISOString()!==p.savedAt))throw Error('Invalid saved timestamp.');
 const ids=new Set();
 for(const t of p.tasks){
  if(!t||!['id','title','owner','due','status','evidence'].every(k=>typeof t[k]==='string'&&t[k].length<=10000)||!t.id||ids.has(t.id)||!statuses.includes(t.status))throw Error('Invalid task fields, duplicate task IDs or status.');
  if(t.due&&!validDate(t.due))throw Error('Use a valid deadline in DD-MM-YYYY, or leave it blank for a draft.');
  if(t.status==='Complete'&&completionGaps(t).length)throw Error('Completed tasks require description, owner, deadline and evidence.');
  ids.add(t.id);
 }
 return {version:1,site,name:p.name,...(p.savedAt?{savedAt:p.savedAt}:{}),context:parseContext(p.context),tasks:p.tasks.map((t:Task)=>({id:t.id,title:t.title,owner:t.owner,due:t.due,status:t.status,evidence:t.evidence}))};
}
export const storageKey=(site:string)=>`fern.launch.plan.v1.${site}`;
export function savePlan(storage:Pick<Storage,'setItem'>,plan:LaunchPlan){const checked=parsePlan(JSON.stringify(plan),plan.site);storage.setItem(storageKey(plan.site),JSON.stringify(checked));}
export function restorePlan(storage:Pick<Storage,'getItem'>,site:string){const raw=storage.getItem(storageKey(site));if(!raw)throw Error('No saved launch plan for this site in this browser.');return parsePlan(raw,site);}
