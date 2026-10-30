import React, {type ComponentType} from 'react';
import type {SiteConfig} from '../features/context/prototypeSites.ts';

// Integrated mode (`pnpm dev:integrated` / `pnpm build:integrated`) composes the application workflows into the portal
// on one origin, so issued pricing reaches Lifecycle and Pre-contract through the same browser storage.
// The default website build leaves the flag undefined; the dead branch removes every application chunk (WEB-SCOPE-01).
export type AppContext={site:string;facilityType:string;serviceModel:string;tier:string;region:string;onNavigate:(destination:string)=>void;onDirtyChange?:(dirty:boolean)=>void};
export type IntegratedApp={name:string;Page:React.LazyExoticComponent<ComponentType<AppContext>>};

export const integratedApps:IntegratedApp[]=import.meta.env.VITE_FERN_APPS==='on'?[
 {name:'Pricing Template Generator',Page:React.lazy<ComponentType<AppContext>>(()=>import('../../../pricing/src/index.ts'))},
 {name:'Lifecycle & Asset Analysis',Page:React.lazy<ComponentType<AppContext>>(()=>import('../../../lifecycle/src/index.ts'))},
 {name:'FM Pre-Contract / Pre-Tender Assessment',Page:React.lazy<ComponentType<AppContext>>(()=>import('../../../pre-contract/src/index.ts'))},
 {name:'FM Mobilisation & Transition Tracker',Page:React.lazy<ComponentType<AppContext>>(()=>import('../../../launch-tracker/src/index.ts'))},
]:[];
export const appsEnabled=integratedApps.length>0;
export const integratedApp=(name:string)=>integratedApps.find(app=>app.name===name);

export function IntegratedAppView({app,context,onNavigate,onDirtyChange}:{app:IntegratedApp;context:SiteConfig;onNavigate:(destination:string)=>void;onDirtyChange:(dirty:boolean)=>void}){
 const {Page}=app;
 return <div className="space-y-4">
  <p role="note" className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-900">Integrated demonstration · {context.site} · {context.region} · {context.facilityType} · {context.serviceModel} · {context.tier}. Pricing, Lifecycle and Pre-contract share this browser's local storage on this address. Amazon accounts, shared storage and approvals are not connected.</p>
  <Page key={context.site} site={context.site} facilityType={context.facilityType} serviceModel={context.serviceModel} tier={context.tier} region={context.region} onNavigate={onNavigate} onDirtyChange={onDirtyChange}/>
 </div>;
}
