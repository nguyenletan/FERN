// Reproduce the offline portal showcase from this repository.
import { build } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const out=path.join(root,'.build-standalone');
await build({root,configFile:path.join(root,'vite.config.ts'),base:'./',build:{outDir:out,emptyOutDir:true,assetsInlineLimit:100000000,cssCodeSplit:false,modulePreload:false,rolldownOptions:{output:{codeSplitting:false}}}});
let html=await fs.readFile(path.join(out,'index.html'),'utf8');
for(const tag of [...html.matchAll(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/g)]){
 const js=await fs.readFile(path.resolve(out,tag[1]),'utf8');
 html=html.replace(tag[0],()=>'<script type="module">'+js.replace(/<\/script/gi,'<\\/script')+'</script>');
}
for(const tag of [...html.matchAll(/<link\b[^>]*href="([^"]+)"[^>]*>/g)]){
 if(tag[0].includes('stylesheet')){const css=await fs.readFile(path.resolve(out,tag[1]),'utf8');html=html.replace(tag[0],()=>'<style>'+css.replace(/<\/style/gi,'<\\/style')+'</style>');}
}
html=html.replace(/<title>.*?<\/title>/,'<title>FERN — Internal Portal</title>');
const dest=path.join(root,'dist-share','FERN-Internal-Portal.html');await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,html);
console.log('Self-contained portal:',dest,'bytes:',Buffer.byteLength(html));
