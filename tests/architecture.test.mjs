import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

function files(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)]));
}

test("React state hooks are never invoked inside JSX callbacks or IIFEs", () => {
  const violations = [];
  for (const file of [...files("src"), ...files("apps"), ...files("packages")].filter((f) => /\.tsx$/.test(f))) {
    const sf = ts.createSourceFile(
      file,
      fs.readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    function visit(n) {
      if (ts.isCallExpression(n) && /^(React\.)?useState$/.test(n.expression.getText(sf))) {
        for (let p = n.parent; p && p !== sf; p = p.parent) {
          if (ts.isJsxExpression(p))
            violations.push(file + ":" + sf.getLineAndCharacterOfPosition(n.pos).line);
        }
      }
      ts.forEachChild(n, visit);
    }
    visit(sf);
  }
  assert.deepEqual(violations, []);
});
