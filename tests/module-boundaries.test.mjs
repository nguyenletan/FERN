import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()&&e.name!=='node_modules'?files(path.join(dir,e.name)):e.isFile()&&/\.tsx?$/.test(e.name)?[path.join(dir,e.name)]:[]);}
test('Application and package imports respect ownership boundaries',()=>{
 const violations=[];
 for(const file of [...files('apps'),...files('packages')]){
  const source=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true);
  function visit(node){
   let spec;
   if((ts.isImportDeclaration(node)||ts.isExportDeclaration(node))&&node.moduleSpecifier&&ts.isStringLiteral(node.moduleSpecifier))spec=node.moduleSpecifier.text;
   if(ts.isCallExpression(node)&&node.expression.kind===ts.SyntaxKind.ImportKeyword&&ts.isStringLiteral(node.arguments[0]))spec=node.arguments[0].text;
   if(spec?.startsWith('.')){
    const target=path.relative(process.cwd(),path.resolve(path.dirname(file),spec)).split(path.sep);
    const owner=file.split(path.sep);
    if(owner[0]==='packages'&&target[0]==='apps')violations.push(`${file} imports application ${spec}`);
    if(owner[0]==='apps'&&target[0]==='apps'&&owner[1]!==target[1]&&(owner[1]!=='portal'||!spec.endsWith('/src/index.ts')))violations.push(`${file} bypasses application public entry ${spec}`);
    if(owner[0]==='packages'&&owner[1].endsWith('-core')&&target[0]==='packages'&&!['core','pricing-core','lifecycle-core','pre-contract-core'].includes(target[1]))violations.push(`${file} imports UI ${spec}`);
   }
   ts.forEachChild(node,visit);
  }visit(source);
 }assert.deepEqual(violations,[]);
});
test('Every application has its own entry and run/build commands',()=>{
 for(const name of ['portal','pricing','lifecycle','pre-contract','launch-tracker']){
  const manifest=JSON.parse(fs.readFileSync(`apps/${name}/package.json`,'utf8'));
  assert.ok(manifest.scripts.dev.includes(`--mode ${name}`));
  assert.ok(manifest.scripts.build.includes(`--mode ${name}`));
  assert.ok(fs.existsSync(`apps/${name}/index.html`));
  assert.ok(fs.existsSync(`apps/${name}/src/main.tsx`));
 }
});
