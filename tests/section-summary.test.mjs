import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { sectionSummary } from '../apps/portal/src/features/framework/sectionSummary.ts';
const data = JSON.parse(
  fs.readFileSync(new URL('../apps/portal/src/features/framework/frameworkContent.json', import.meta.url), 'utf8'),
);
test('Closed Workspace sections show a readable plain-text summary', () => {
  for (const page of data.pages)
    for (const section of page.sections) {
      const summary = sectionSummary(section);
      const where = `${page.title} > ${section.title}`;
      assert.ok(summary.length >= 25, `${where}: summary too short ("${summary}")`);
      assert.doesNotMatch(summary, /^\s*(?:[-*#|]|\d+\.)/, `${where}: summary starts with markdown ("${summary}")`);
      assert.doesNotMatch(summary, /\*\*|\]\(|\|/, `${where}: summary contains markdown ("${summary}")`);
    }
});
test('Summaries strip list markers, bold and links', () => {
  assert.equal(
    sectionSummary({ body: '1. **Identify the Context:** business needs.\n2. Next.' }),
    'Identify the Context: business needs.',
  );
  assert.equal(
    sectionSummary({ body: '- **Start:** read [the guide](#x) first. More.' }),
    'Start: read the guide first.',
  );
  assert.equal(sectionSummary({ body: '| A | B |\n|---|---|', summary: 'Written summary.' }), 'Written summary.');
});
