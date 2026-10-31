import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
function files(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory()
        ? files(path.join(dir, e.name))
        : e.isFile() && /\.tsx?$/.test(e.name)
          ? [path.join(dir, e.name)]
          : [],
    );
}
test('Relative imports stay inside src', () => {
  const violations = [];
  for (const file of files('src')) {
    const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    function visit(node) {
      let spec;
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      )
        spec = node.moduleSpecifier.text;
      if (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword &&
        ts.isStringLiteral(node.arguments[0])
      )
        spec = node.arguments[0].text;
      if (spec?.startsWith('.')) {
        const target = path.relative('src', path.resolve(path.dirname(file), spec));
        if (target.startsWith('..')) violations.push(`${file} imports ${spec} outside src`);
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  assert.deepEqual(violations, []);
});
test('The website is a single Vite application in src', () => {
  // FERN applications and the CMS live elsewhere; this repository is the portal only (WEB-SCOPE-03).
  for (const removed of ['apps', 'packages', 'vite.app.config.ts'])
    assert.ok(!fs.existsSync(removed), removed + ' should not exist');
  // pnpm-workspace.yaml holds pnpm settings only (pnpm 11 reads settings there); it must not declare workspace packages.
  if (fs.existsSync('pnpm-workspace.yaml'))
    assert.doesNotMatch(fs.readFileSync('pnpm-workspace.yaml', 'utf8'), /^packages\s*:/m);
  assert.match(fs.readFileSync('index.html', 'utf8'), /src="\/src\/main\.tsx"/);
  assert.ok(fs.existsSync('src/main.tsx'));
});
