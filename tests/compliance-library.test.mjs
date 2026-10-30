import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {findCompliance} from '../apps/portal/src/features/reference/complianceSearch.ts';
const entries=JSON.parse(fs.readFileSync(new URL('../apps/portal/src/features/reference/compliance-index.json',import.meta.url),'utf8'));
test('Compliance search supports topic words, case, whitespace and exact object codes',()=>{
 assert.equal(findCompliance(entries,'  FIRE   doors ')[0].code,'CT.FIRE.DOORS');
 assert.equal(findCompliance(entries,'emergency lighting')[0].page,15);
 assert.equal(findCompliance(entries,'CT.WATER.LEGIONELLA')[0].page,185);
 assert.equal(findCompliance(entries,'unknown test topic').length,0);
 assert.equal(findCompliance(entries,' ').length,91);
});
test('Compliance index preserves unique source codes and all task continuation pages',()=>{
 assert.equal(new Set(entries.map(e=>e.code)).size,91);
 assert.equal(entries[0].page,3);assert.equal(entries.at(-1).endPage,218);
 entries.forEach((entry,i)=>{assert.ok(entry.page<=entry.endPage);if(i)assert.equal(entries[i-1].endPage+1,entry.page);});
});
test('Bundled compliance PDF is byte-identical to the reviewed source edition',()=>{
 const bytes=fs.readFileSync(new URL('../apps/portal/src/features/reference/assets/bbm-compliance-april-2024.pdf',import.meta.url));
 assert.equal(createHash('sha256').update(bytes).digest('hex'),'0e43f0235ab015604316065424b74fde1ccc81d0796605f6f6f7689f0d63ac21');
});
