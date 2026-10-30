import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {homeApplications} from '../apps/portal/src/features/dashboard/homeApplications.ts';
import {appPages} from '../apps/portal/src/app/portalRoutes.ts';
const source=fs.readFileSync('apps/portal/src/app/integratedApps.tsx','utf8');
test('Integrated applications load only behind the build flag and through public entries',()=>{
 const guard=source.indexOf("import.meta.env.VITE_FERN_APPS==='on'?[");
 assert.ok(guard>0,'flag guard is missing');
 const imports=[...source.matchAll(/import\('([^']+)'\)/g)];
 assert.deepEqual(imports.map(m=>m[1]).sort(),['../../../launch-tracker/src/index.ts','../../../lifecycle/src/index.ts','../../../pre-contract/src/index.ts','../../../pricing/src/index.ts']);
 for(const m of imports)assert.ok(m.index>guard&&m.index<source.indexOf(']:[];'),m[1]+' is outside the flag guard');
 assert.doesNotMatch(source,/^import .*\/(pricing|lifecycle|pre-contract|launch-tracker)\/src/m);
});
test('Every integrated application has a home description and a restorable route',()=>{
 const names=[...source.matchAll(/\{name:'([^']+)'/g)].map(m=>m[1]);
 assert.equal(names.length,4);
 for(const name of names){
  assert.ok(homeApplications.some(app=>app.name===name),name+' has no home description');
  assert.ok(Object.values(appPages).includes(name),name+' has no route');
 }
 assert.deepEqual(Object.values(appPages).sort(),[...names].sort());
});
