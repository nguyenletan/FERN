"""Rebuild immutable BBM reading data. Run with --sources DIR --workspace DIR.
Requires pdfplumber, pypdf, pypdfium2. Does not fetch current standards.
"""
from pathlib import Path
import argparse,base64,hashlib,json,re,io
from collections import Counter
import pdfplumber,pypdfium2
from pypdf import PdfReader,PdfWriter
p=argparse.ArgumentParser();p.add_argument('--sources',type=Path,required=True);p.add_argument('--workspace',type=Path,required=True);args=p.parse_args()
root=args.workspace; repo=Path(__file__).resolve().parents[2];dest=repo/'src/features/reference/generated';dest.mkdir(exist_ok=True)
cache=root/'work/bbm-full/cache';cache.mkdir(parents=True,exist_ok=True)
pdfout=root/'output/pdf/bbm-standards';pdfout.mkdir(parents=True,exist_ok=True)
# PDFs ship as static files (public/bbm → dist/bbm); pdf-files.json maps entry id → file name.
site_pdfs=repo/'public/bbm';site_pdfs.mkdir(parents=True,exist_ok=True)
config=[('Compliance','BBM Compliance Standards_25.04.2024.pdf','April 2024',218),('PM','BBM PM Standards_2025.03.13.pdf','March 2025',130)]
# Glyph repairs verified against PM pages 2, 4, 5, 6, 43 and Compliance 69.
GLYPHS={3:' ',4:'A',17:'B',18:'C',24:'D',38:'F',39:'G',44:'H',47:'I',60:'K',62:'L',68:'M',69:'N',75:'O',87:'P',90:'R',94:'S',100:'T',104:'U',116:'W',120:'•',127:'Z',258:'a',271:'b',272:'c',282:'d',286:'e',296:'f',336:'g',346:'h',349:'i',364:'k',367:'l',373:'m',374:'n',381:'o',393:'p',395:'q',396:'r',400:'s',410:'t',415:'ti',437:'u',448:'v',449:'w',454:'x',455:'y',460:'z',853:',',855:':',856:'.',876:'/',882:'-',884:'–',894:'(',895:')',918:"'",1006:'2',1093:'>'}
def clean(s):return re.sub(r'\(cid:(\d+)\)',lambda m:GLYPHS.get(int(m[1]),m[0]),s or '')
sha=lambda b:hashlib.sha256(b).hexdigest()
all_entries=[];pages={};files={};checks=[];issues=[]
def table_block(cells):
 xs=sorted(set(round(v,2) for c,t in cells for v in (c[0],c[2])));ys=sorted(set(round(v,2) for c,t in cells for v in (c[1],c[3])))
 # PDF grid intersection coordinates are rounded consistently for span calculation.
 rows=[[] for y in ys[:-1]]
 for c,t in cells:
  x0,y0,x1,y1=map(lambda x:round(x,2),c)
  rows[ys.index(y0)].append({'text':clean(t),'col':xs.index(x0),'colSpan':xs.index(x1)-xs.index(x0),'rowSpan':ys.index(y1)-ys.index(y0)})
 for r in rows:r.sort(key=lambda c:c['col'])
 return {'type':'table','widths':[(xs[i+1]-xs[i])/(xs[-1]-xs[0])*100 for i in range(len(xs)-1)],'rows':rows,'header':any(re.search(r'Task\s*Index|Relevant legislation',c['text']) for c in rows[0]) if rows else False}
def extract(pg,kind,n):
 blocks=[];tables=pg.find_tables();boxlist=[t.bbox for t in tables]
 for t in tables:
  raw=t.extract();cells=[]
  for row,vals in zip(t.rows,raw):
   for c,txt in zip(row.cells,vals):
    if c is not None:cells.append((c,txt))
  cells=list({tuple(c):(c,v) for c,v in reversed(cells)}.values())
  # Split at full-width section headings and task headers to keep each grid readable.
  bands=[];current=[]
  for y in sorted(set(c[1] for c,v in cells)):
   row=[(c,v) for c,v in cells if c[1]==y]
   single=len(row)==1 and row[0][0][2]-row[0][0][0] > .95*(t.bbox[2]-t.bbox[0])
   value=clean(row[0][1]) if single else ''
   heading=single and len(value)<130 and '\n' not in value and bool(value.strip())
   taskstart=any(re.search(r'Task\s*Index',clean(v)) for c,v in row)
   if heading or taskstart:
    if current:bands.append((current[0][0][1],table_block(current)));current=[]
   if heading:bands.append((y,{'type':'heading','text':value}))
   else:current.extend(row)
  if current:bands.append((current[0][0][1],table_block(current)))
  blocks.extend(bands)
 outside=pg.filter(lambda o:not(o.get('object_type')=='char' and any(b[0]-0.1<=(o['x0']+o['x1'])/2<=b[2]+0.1 and b[1]-0.1<=(o['top']+o['bottom'])/2<=b[3]+0.1 for b in boxlist)))
 # Preserve text outside grids in reading order, including page titles and footnotes.
 for line in outside.extract_text_lines():blocks.append((line['top'],{'type':'text','text':clean(line['text'])}))
 blocks.sort(key=lambda b:b[0]);transcript=clean(pg.extract_text())
 cid=re.findall(r'\(cid:\d+\)',transcript)
 if cid:issues.append({'kind':kind,'page':n,'unresolvedGlyphs':sorted(set(cid))})
 return {'number':n,'text':transcript,'blocks':[b for y,b in blocks]}
def normalise_pm_tables(page):
 blocks=[]
 labels=['Task Index','Component','Tasks','Daily','Weekly','Monthly','3 Monthly','6 Monthly','12 Monthly','24 Monthly','36 Monthly','48 Monthly','60 Monthly']
 for b in page['blocks']:
  if b['type']!='table' or len(b['widths'])!=13:
   blocks.append(b);continue
  first=next((i for i,row in enumerate(b['rows']) if row and row[0]['col']==0 and row[0]['text'].strip().isdigit()),None)
  if first is None:blocks.append(b);continue
  preceding=b['rows'][:first]
  for row in preceding:
   if len(row)==1 and row[0]['text'].strip() and 'Tasks Nested' not in row[0]['text']:
    blocks.append({'type':'text','text':row[0]['text']})
  blocks.append({'type':'heading','text':'Tasks and Frequencies'})
  if any('Tasks Nested' in c['text'] for row in preceding for c in row):blocks.append({'type':'text','text':'Tasks Nested for frequencies > weekly'})
  # The PDF's dark header background is detected as an overlapping full-width cell.
  # Recreate the 13 visually confirmed source headers, retaining every task cell.
  header=[{'text':text,'col':i,'colSpan':1,'rowSpan':1} for i,text in enumerate(labels)]
  blocks.append({**b,'header':True,'rows':[header]+b['rows'][first:]})
 return {**page,'blocks':blocks}
for kind,name,edition,total in config:
 path=args.sources/name;data=path.read_bytes();digest=sha(data)
 expected={'PM':'d5906aa9ece2d8e7d5938a30452448c67deb9299becb55593223ccfb1b66096d','Compliance':'0e43f0235ab015604316065424b74fde1ccc81d0796605f6f6f7689f0d63ac21'}
 assert digest==expected[kind], 'Source edition changed: update approved edition metadata and indexes before regeneration'
 (site_pdfs/name).write_bytes(data);files[kind]=name
 entries=[]
 index=(Path(__file__).parent/f'{kind}-TASK-INDEX.md').read_text()
 for start,end,title,code in re.findall(r'^\| (\d+)[–-](\d+) \| (.*?) \| (.*?) \|$',index,re.M):
  entries.append({'id':kind+'-'+code,'kind':kind,'title':title,'code':code,'page':int(start),'endPage':int(end),'edition':edition})
 assert len(entries)==(91 if kind=='Compliance' else 103)
 intro={'id':kind+'-introduction','kind':kind,'title':'Document Introduction and Guidance','code':'INTRODUCTION','page':1,'endPage':entries[0]['page']-1,'edition':edition}
 entries.insert(0,intro);assert entries[-1]['endPage']==total
 for i,e in enumerate(entries):
  if i:assert entries[i-1]['endPage']+1==e['page']
 with pdfplumber.open(path) as doc:
  assert len(doc.pages)==total;pages[kind]=[]
  for n,pg in enumerate(doc.pages,1):
   f=cache/f'v3-{digest[:10]}-{n}.json'
   if f.exists():page=json.loads(f.read_text())
   else:
    page=extract(pg,kind,n)
    # Retain substantive source illustrations in addition to native text/tables.
    figures=[]
    for im in pg.images:
     if (im['x1']-im['x0'])*(im['bottom']-im['top'])>15000:
      source=pypdfium2.PdfDocument(str(path));pil=source[n-1].render(scale=1.5).to_pil()
      crop=pil.crop((int(im['x0']*1.5),int(im['top']*1.5),int(im['x1']*1.5),int(im['bottom']*1.5)))
      buf=io.BytesIO();crop.save(buf,format='PNG');figures.append('data:image/png;base64,'+base64.b64encode(buf.getvalue()).decode());source.close()
    page['figures']=figures
    f.write_text(json.dumps(page,ensure_ascii=False))
   if kind=='PM':page=normalise_pm_tables(page)
   pages[kind].append(page)
   if n%25==0:print(kind,'extracted',n,flush=True)
 reader=PdfReader(path);render=pypdfium2.PdfDocument(str(path));covered=[]
 for e in entries:
  nums=list(range(e['page'],e['endPage']+1));covered+=nums
  e['searchText']=' '.join(pages[kind][n-1]['text'] for n in nums)
  if e['code']!='INTRODUCTION':assert e['code'] in pages[kind][e['page']-1]['text'],e
  writer=PdfWriter()
  for n in nums:writer.add_page(reader.pages[n-1])
  buf=io.BytesIO();writer.write(buf);b=buf.getvalue();fname='FERN-'+re.sub(r'[^\w.-]','-',e['id'])+'.pdf';(pdfout/fname).write_bytes(b)
  extracted=pypdfium2.PdfDocument(b)
  for i,n in enumerate(nums):
   a=render[n-1].render(scale=.75).to_pil();z=extracted[i].render(scale=.75).to_pil();assert a.size==z.size and a.tobytes()==z.tobytes(),(kind,n)
  (site_pdfs/fname).write_bytes(b);files[e['id']]=fname
  checks.append({'id':e['id'],'pages':nums,'pdfSha256':sha(b),'sourcePixelMatch':True})
  extracted.close()
 assert covered==list(range(1,total+1));render.close();all_entries+=entries
 print(kind,'PDF extracts verified',len(entries),flush=True)
manifest={'sources':[{'kind':k,'file':n,'edition':e,'pageCount':t,'sha256':sha((args.sources/n).read_bytes())} for k,n,e,t in config],'entries':checks,'extractionIssues':issues}
(dest/'standards.json').write_text(json.dumps({'entries':all_entries,'pages':pages},ensure_ascii=False,separators=(',',':')))
(dest/'pdf-files.json').write_text(json.dumps(files,indent=1)+'\n')
(dest/'verification.json').write_text(json.dumps(manifest,indent=2))
print('Complete:',len(all_entries),'entries;',sum(len(v) for v in pages.values()),'pages;',len(issues),'glyph issues',flush=True)
