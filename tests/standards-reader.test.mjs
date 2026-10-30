import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {findStandards} from '../apps/portal/src/features/reference/standardsSearch.ts';
const base=new URL('../apps/portal/src/features/reference/generated/',import.meta.url);
const data=JSON.parse(fs.readFileSync(new URL('standards.json',base),'utf8'));
const files=JSON.parse(fs.readFileSync(new URL('pdfs.json',base),'utf8'));
const verification=JSON.parse(fs.readFileSync(new URL('verification.json',base),'utf8'));
test('Standards search covers both editions, full requirement wording and document filters',()=>{
 assert.equal(findStandards(data.entries,'').length,194);
 assert.equal(findStandards(data.entries,'','Compliance').length,91);
 assert.equal(findStandards(data.entries,'','PM').length,103);
 assert.ok(findStandards(data.entries,' CT.FIRE.DOORS ','Compliance').some(e=>e.code==='CT.FIRE.DOORS'));
 assert.ok(findStandards(data.entries,'LIGHT.SAFETY','PM').some(e=>e.code==='LIGHT.SAFETY'));
 assert.ok(findStandards(data.entries,'maintenance logbook','Compliance').length>0);
 assert.equal(findStandards(data.entries,'nonexistent-xyz-9265').length,0);
});
test('Every source page belongs to exactly one standard or introduction; downloads match verified extracts',()=>{
 for(const [kind,total] of [['Compliance',218],['PM',130]]){
  const entries=data.entries.filter(e=>e.kind===kind);let expected=1;
  for(const e of entries){assert.equal(e.page,expected);expected=e.endPage+1;assert.ok(files[e.id]);const check=verification.entries.find(c=>c.id===e.id);assert.equal(check.sourcePixelMatch,true);assert.deepEqual(check.pages,Array.from({length:e.endPage-e.page+1},(_,i)=>i+e.page));assert.equal(createHash('sha256').update(Buffer.from(files[e.id].data,'base64')).digest('hex'),check.pdfSha256);}
  assert.equal(expected,total+1);assert.equal(data.pages[kind].length,total);
  const source=verification.sources.find(s=>s.kind===kind);assert.equal(createHash('sha256').update(Buffer.from(files[kind].data,'base64')).digest('hex'),source.sha256);
 }
});
test('HTML grids preserve merged cells without overlap or missing grid positions',()=>{
 for(const [kind,pages] of Object.entries(data.pages))for(const p of pages)for(const b of p.blocks){if(b.type!=='table')continue;
  const occupied=new Set();
  b.rows.forEach((row,y)=>row.forEach(c=>{assert.ok(c.colSpan>0&&c.rowSpan>0);for(let dy=0;dy<c.rowSpan;dy++)for(let dx=0;dx<c.colSpan;dx++){const x=c.col+dx;assert.ok(x<b.widths.length);assert.ok(y+dy<b.rows.length);const key=`${y+dy},${x}`;assert.ok(!occupied.has(key),`${kind} page ${p.number} overlap ${key}`);occupied.add(key);}}));
  assert.equal(occupied.size,b.widths.length*b.rows.length,`${kind} page ${p.number} missing grid positions`);
 }
});
test('Source glyph repairs, safety-lighting continuation and introduction illustrations are retained',()=>{
 assert.equal(verification.extractionIssues.length,0);
 assert.ok(!JSON.stringify(data.pages).includes('(cid:'));
 assert.match(data.pages.PM[42].text,/AMZ.DOCK.SUB/);
 assert.match(data.pages.PM[125].text,/July 2023/);
 assert.ok(data.pages.PM[3].figures.length>0);
 assert.match(data.pages.PM[5].text,/Nesting/);
});
test('Full conversion preserves every task cell and frequency from the four approved samples',()=>{
 const sample=JSON.parse(fs.readFileSync(new URL('./fixtures/bbm-approved-sample-tasks.json',import.meta.url),'utf8'));
 const tidy=rows=>rows.map(row=>row.map(cell=>cell.replace(/\s+/g,' ').trim()));
 for(const s of sample){
  const indexColumn=s.kind==='PM'?0:1;
  const rows=s.pages.flatMap(n=>data.pages[s.kind][n-1].blocks.filter(b=>b.type==='table').flatMap(b=>b.rows)).filter(row=>row.length===(s.kind==='PM'?13:14)&&/^\d+$/.test(row[indexColumn]?.text.trim())).map(row=>row.map(c=>c.text));
  assert.deepEqual(tidy(rows),tidy(s.rows),s.code);
 }
});

import {standardMatch} from '../apps/portal/src/features/reference/standardsSearch.ts';
import {standardOverview,relatedStandards,standardLocation,readStandardLocation} from '../apps/portal/src/features/reference/standardContext.ts';
test('Exact codes and titles rank above incidental source wording; empty search preserves catalogue order',()=>{
 const make=(id,title,code,searchText)=>({id,title,code,searchText,kind:'PM'});
 const entries=[make('body','Other','OTHER.CODE','pump safety'),make('title','Pump safety','PUMP.SAFETY','pump safety'),make('partial','Pump safety inspection','OTHER.TWO','pump safety')];
 assert.deepEqual(findStandards(entries,'pump safety').map(e=>e.id),['title','partial','body']);
 assert.equal(standardMatch(entries[1],'PUMP.SAFETY').score,5);
 assert.deepEqual(findStandards(entries,'').map(e=>e.id),['body','title','partial']);
});
test('Source relationships resolve exact codes only and preserve unresolved references',()=>{
 const e=data.entries.find(e=>e.code==='CT.ELEC.EMERGENCYAC');
 const blocks=data.pages[e.kind][e.page-1].blocks;
 assert.equal(relatedStandards(blocks,e,data.entries).find(r=>r.code==='LIGHT.SAFETY').target.code,'LIGHT.SAFETY');
 const door=data.entries.find(e=>e.code==='CT.FIRE.DOORS');
 const unresolved=relatedStandards(data.pages[door.kind][door.page-1].blocks,door,data.entries).find(r=>r.code==='FIRE.DOOR');
 assert.ok(unresolved);assert.equal(unresolved.target,undefined);
 const fields=standardOverview(blocks,e.kind);
 assert.ok(fields.some(f=>f.label==='Standard revision (source)'&&f.text==='abr-24'));
 assert.ok(fields.some(f=>f.label==='Scope (source)'&&f.text.length>0));
});
test('Standard URLs preserve edition, collection, search and unrelated parameters; unavailable versions never substitute',()=>{
 const e=data.entries.find(e=>e.code==='LIGHT.SAFETY');
 const url=standardLocation('?review=yes',e,'emergency lighting','PM');
 assert.equal(new URLSearchParams(url).get('review'),'yes');
 assert.deepEqual(readStandardLocation(url,data.entries),{country:'',includeUnspecified:true,selected:e.id,query:'emergency lighting',kind:'PM',error:''});
 const invalid=readStandardLocation(standardLocation('',{...e,edition:'unknown'},'','PM'),data.entries);
 assert.equal(invalid.selected,'');assert.match(invalid.error,/not available/);
 const back=readStandardLocation(standardLocation(url,undefined,'emergency lighting','PM'),data.entries);
 assert.equal(back.selected,'');assert.equal(back.query,'emergency lighting');
});
