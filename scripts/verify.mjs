import {spawn} from 'node:child_process';
import {mkdir,writeFile,readFile,rm} from 'node:fs/promises';
import {createServer} from 'vite';
import {fileURLToPath} from 'node:url';
process.chdir(fileURLToPath(new URL('..',import.meta.url)));
const coreOnly=process.argv.includes('--core');
const report={startedAt:new Date().toISOString(),scope:coreOnly?'core-only':'core-and-browser',status:'running',checks:[],limitations:['Technical verification does not constitute Amazon domain approval.']};
let server;
function run(script,env={}){
 return new Promise((resolve,reject)=>{
  const entry=process.env.npm_execpath;
  const child=entry?spawn(process.execPath,[entry,'run',script],{stdio:'inherit',env:{...process.env,...env}}):spawn('pnpm',['run',script],{stdio:'inherit',env:{...process.env,...env}});
  child.once('error',reject);child.once('exit',(code,signal)=>code===0?resolve():reject(Error(`${script} failed (${signal??code}).`)));
 });
}
try{
 for(const name of ['typecheck','test','build']){
  const row={name,status:'running'};report.checks.push(row);
  try{await run(name);row.status='passed';}catch(error){row.status='failed';throw error;}
 }
 if(!coreOnly){
  const row={name:'test:browser',status:'running'};report.checks.push(row);
  try{
   server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:false,open:false}});
   await server.listen();const address=server.httpServer.address();
   if(!address||typeof address==='string')throw Error('Cannot resolve verification server port.');
   await rm('test-results/browser-launch.json',{force:true});
   await run('test:browser',{FERN_TEST_URL:`http://127.0.0.1:${address.port}`});row.status='passed';
  }catch(error){row.status='failed';try{row.browserLaunch=JSON.parse(await readFile('test-results/browser-launch.json','utf8'));}catch{}throw error;}
 }else report.limitations.push('Browser and download checks were not run in core-only mode.');
 report.status='passed';
}catch(error){report.status='failed';report.error=error.message;process.exitCode=1;}
finally{
 if(server)await server.close();
 report.finishedAt=new Date().toISOString();await mkdir('test-results',{recursive:true});
 await writeFile('test-results/verification.json',JSON.stringify(report,null,2));
 console.log(`Verification ${report.status} (${report.scope}). Details: test-results/verification.json`);
}
