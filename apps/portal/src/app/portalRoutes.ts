import type {HomePanel} from '../features/dashboard/HomeNavigation.tsx';

const pages: Record<string,string> = {
 home:'Home', workspace:'Workspace', mission:'Mission & Pillars', leadership:'Leadership & Policy',
 overview:'FM Overview', planning:'Planning & Objectives', performance:'Performance & KPIs',
 risk:'Risk & Compliance', assurance:'Audit & Assurance', improvement:'Continual Improvement',
};
// Application pages resolve only in integrated mode; the website falls back to Home (WEB-SCOPE-01).
export const appPages: Record<string,string> = {
 pricing:'Pricing Template Generator', lifecycle:'Lifecycle & Asset Analysis',
 'pre-contract':'FM Pre-Contract / Pre-Tender Assessment', mobilisation:'FM Mobilisation & Transition Tracker',
};
const panels: Record<string,HomePanel> = {about:'about', 'getting-started':'guide', learn:'learn', reference:'reference', help:'help', updates:'updates', facility:'facility'};
export const lessonTitles = ['Understanding FERN','Service Models Explained','From Tender to Transition','Assets, Condition and Lifecycle','Risk, Criticality and Maintenance','Performance, KPIs and SLAs','Sources and Evidence','Policies, BBM Standards and Requirements','Assurance and Continual Improvement'];
const slug = (title:string) => title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export type PortalRoute = {page:string;panel:HomePanel;lesson?:string;pillar?:number};
export function readPortalRoute(search:string,{apps=false}:{apps?:boolean}={}):PortalRoute {
 const params=new URLSearchParams(search);
 if(params.has('bbm')||params.has('bbmKind'))return {page:'Home',panel:'reference'};
 const key=params.get('page')??'home';
 const pillar=key==='mission'&&/^[1-8]$/.test(params.get('pillar')??'')?Number(params.get('pillar')):undefined;
 const panel=Object.prototype.hasOwnProperty.call(panels,key)?panels[key]:null;
 const page=Object.prototype.hasOwnProperty.call(pages,key)?pages[key]:apps&&Object.prototype.hasOwnProperty.call(appPages,key)?appPages[key]:'Home';
 return {page,panel,pillar,lesson:panel==='learn'?lessonTitles.find(title=>slug(title)===params.get('lesson')):undefined};
}
export function portalLocation(search:string,route:PortalRoute) {
 const params=new URLSearchParams(search);
 if(route.panel!=='reference')for(const key of ['bbm','bbmKind','bbmQuery','bbmCountry','bbmUnspecified'])params.delete(key);
 const key=route.panel?Object.keys(panels).find(key=>panels[key]===route.panel):Object.keys(pages).find(key=>pages[key]===route.page)??Object.keys(appPages).find(key=>appPages[key]===route.page);
 if(key&&key!=='home')params.set('page',key);else params.delete('page');
 const lesson=lessonTitles.find(title=>title.toLowerCase()===route.lesson?.toLowerCase());
 if(route.panel==='learn'&&lesson)params.set('lesson',slug(lesson));else params.delete('lesson');
 if(route.page==='Mission & Pillars'&&!route.panel&&route.pillar!==undefined&&Number.isInteger(route.pillar)&&route.pillar>=1&&route.pillar<=8)params.set('pillar',String(route.pillar));else params.delete('pillar');
 return params.size?'?'+params.toString():'';
}
