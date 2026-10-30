// WEB-SCOPE-01 guard: the website build contains no application workflow; the integrated build contains all four.
import {build} from 'vite';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const markers={
 pricing:'Unsupported Staff Rate Card layout',
 lifecycle:'Restored the last saved local project.',
 'pre-contract':'Local provisional assessment · No formal approval or live Amazon connection.',
 mobilisation:'Unsupported mobilisation context selection.',
};
async function bundleText(mode){
 const outDir=await fs.mkdtemp(path.join(os.tmpdir(),`fern-${mode}-`));
 try{
  await build({root,configFile:path.join(root,'vite.config.ts'),mode,logLevel:'warn',build:{outDir,emptyOutDir:true}});
  const files=(await fs.readdir(outDir,{recursive:true})).filter(file=>file.endsWith('.js'));
  return (await Promise.all(files.map(file=>fs.readFile(path.join(outDir,file),'utf8')))).join('\n');
 }finally{await fs.rm(outDir,{recursive:true,force:true});}
}
const failures=[];
const website=await bundleText('production');
for(const [app,marker] of Object.entries(markers))if(website.includes(marker))failures.push(`Website build contains ${app} application code.`);
const integrated=await bundleText('integrated');
for(const [app,marker] of Object.entries(markers))if(!integrated.includes(marker))failures.push(`Integrated build is missing ${app} application code.`);
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
else console.log('Bundle check passed: website excludes all applications; integrated build includes all four.');
