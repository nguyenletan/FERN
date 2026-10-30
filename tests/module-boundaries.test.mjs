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
   }
   ts.forEachChild(node,visit);
  }visit(source);
 }assert.deepEqual(violations,[]);
});
test('The website repository contains only the portal and its shared platform',()=>{
 // Application workflows are maintained in a separate private repository; the portal lists them as "Coming soon".
 assert.deepEqual(fs.readdirSync('apps'),['portal']);
 assert.deepEqual(fs.readdirSync('packages'),['platform']);
 const manifest=JSON.parse(fs.readFileSync('apps/portal/package.json','utf8'));
 assert.ok(manifest.scripts.dev.includes('--mode portal'));
 assert.ok(manifest.scripts.build.includes('--mode portal'));
 assert.ok(fs.existsSync('apps/portal/index.html'));
 assert.ok(fs.existsSync('apps/portal/src/main.tsx'));
});
