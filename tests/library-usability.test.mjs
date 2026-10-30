import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  discoverStandards,
  suggestSearch,
  matchingSourceText,
  sourceExcerpt,
} from '../src/features/reference/libraryDiscovery.ts';
import { taskReading, sourceGrid } from '../src/features/reference/taskReading.ts';
import { relatedStandards } from '../src/features/reference/standardContext.ts';
const data = JSON.parse(
  fs.readFileSync(new URL('../src/features/reference/generated/standards.json', import.meta.url), 'utf8'),
);
const links = Object.fromEntries(
  data.entries.map((e) => [
    e.id,
    relatedStandards(data.pages[e.kind][e.page - 1].blocks, e, data.entries).flatMap((r) =>
      r.target ? [r.target.id] : [],
    ),
  ]),
);
const pages = (e) => data.pages[e.kind].slice(e.page - 1, e.endPage);
test('Library discovery promotes only source-linked standards after direct matches and respects collection', () => {
  const results = discoverStandards(data.entries, 'emergency lighting', 'all', links);
  assert.equal(results.length, 8);
  assert.deepEqual(
    results.slice(0, 2).map((r) => r.entry.code),
    ['CT.ELEC.EMERGENCYAC', 'LIGHT.SAFETY'],
  );
  assert.equal(results[1].reason, 'Referenced by CT.ELEC.EMERGENCYAC');
  assert.ok(discoverStandards(data.entries, 'emergency lighting', 'PM', links).every((r) => r.entry.kind === 'PM'));
  assert.equal(discoverStandards(data.entries, 'LIGHT.SAFETY', 'all', links)[0].entry.code, 'LIGHT.SAFETY');
  assert.equal(discoverStandards(data.entries, '', 'all', links).length, 194);
  assert.equal(discoverStandards(data.entries, 'nonexistent-xyz-9265', 'all', links).length, 0);
  const unlinked = discoverStandards(data.entries, 'emergency lighting', 'all', {});
  assert.ok(unlinked.every((r) => !r.linkedFrom));
});
test('Typo recovery suggests a matching title without silently replacing queries or codes', () => {
  assert.equal(suggestSearch(data.entries, 'emergency ligting'), 'emergency lighting');
  assert.equal(suggestSearch(data.entries, 'emergency lights'), 'emergency lighting');
  assert.equal(suggestSearch(data.entries, 'CT.FIRE.DOORZ'), null);
  assert.equal(suggestSearch(data.entries, 'xyz9265'), null);
});
test('Excerpts come from one intact source cell or paragraph', () => {
  const e = data.entries.find((e) => e.code === 'LIGHT.SAFETY');
  const selected = matchingSourceText(pages(e), 'emergency lighting');
  const candidates = pages(e).flatMap((p) =>
    p.blocks.flatMap((b) => (b.rows ? b.rows.flatMap((r) => r.map((c) => c.text)) : b.text ? [b.text] : [])),
  );
  assert.ok(candidates.includes(selected));
  assert.match(selected, /emergency lighting/i);
  assert.ok(
    selected.replace(/\s+/g, ' ').trim().includes(sourceExcerpt(selected, 'emergency lighting').replace(/^…|…$/g, '')),
  );
});
test('Task reading preserves every approved sample cell including blanks and frequency columns', () => {
  const samples = JSON.parse(
    fs.readFileSync(new URL('./fixtures/bbm-approved-sample-tasks.json', import.meta.url), 'utf8'),
  );
  const tidy = (row) => row.map((value) => value.replace(/\s+/g, ' ').trim());
  for (const sample of samples) {
    const e = data.entries.find((e) => e.kind === sample.kind && e.code === sample.code);
    const { tasks } = taskReading(pages(e));
    for (const expected of sample.rows) {
      const index = expected[sample.kind === 'PM' ? 0 : 1];
      const candidates = tasks.filter((t) => t.index.trim() === index.trim());
      assert.ok(
        candidates.some(
          (row) => JSON.stringify(tidy(row.fields.map((f) => f.value))) === JSON.stringify(tidy(expected)),
        ),
        sample.code + ' task ' + index,
      );
    }
  }
});
test('Every displayed task and regional value retains its exact source cell and merged-cell inheritance', () => {
  let taskCount = 0,
    regionCount = 0;
  for (const e of data.entries) {
    const reading = taskReading(pages(e));
    taskCount += reading.tasks.length;
    regionCount += reading.regions.length;
    for (const row of [...reading.tasks, ...reading.regions]) {
      const table = data.pages[e.kind][row.page - 1].blocks[row.block];
      assert.equal(row.fields.length, table.widths.length);
      row.fields.forEach((field, col) => {
        const owners = table.rows.flatMap((cells, y) =>
          cells.filter((c) => y <= row.row && y + c.rowSpan > row.row && c.col <= col && c.col + c.colSpan > col),
        );
        assert.equal(owners.length, 1);
        assert.equal(field.value, owners[0].text, `${e.code} p${row.page} row${row.row} col${col}`);
      });
    }
  }
  assert.equal(taskCount, 2639);
  assert.ok(regionCount > 0);
  const emergency = data.entries.find((e) => e.code === 'CT.ELEC.EMERGENCYAC');
  const r = taskReading(pages(emergency));
  assert.equal(r.tasks.length, 9);
  assert.equal(r.regions.length, 9);
  assert.ok(
    r.regions.some((row) => row.page === 17 && row.fields.some((f) => f.label === 'Region' && f.value === 'UK')),
  );
  assert.ok(r.tasks.some((t) => t.page === 16));
  assert.deepEqual(
    sourceGrid(
      [
        [
          { text: 'shared', col: 0, colSpan: 1, rowSpan: 2 },
          { text: 'first', col: 1, colSpan: 1, rowSpan: 1 },
        ],
        [{ text: '', col: 1, colSpan: 1, rowSpan: 1 }],
      ],
      2,
    ),
    [
      ['shared', 'first'],
      ['shared', ''],
    ],
  );
});

test('Reading view includes every task and regional continuation row across the catalogue', () => {
  for (const e of data.entries) {
    const sourcePages = pages(e);
    const result = taskReading(sourcePages);
    let activeWidths = new Set(),
      expected = 0;
    for (const p of sourcePages)
      for (const b of p.blocks) {
        if (b.type !== 'table') continue;
        const labels = b.rows[0].map((c) => c.text);
        if (b.header && (labels.includes('Task Index') || labels.includes('Relevant legislation')))
          activeWidths.add(b.widths.length);
        else if (b.header) continue;
        if (activeWidths.has(b.widths.length)) expected += b.rows.length - (b.header ? 1 : 0);
      }
    assert.equal(result.tasks.length + result.regions.length, expected, e.code);
  }
});
