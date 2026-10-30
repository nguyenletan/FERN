import test from 'node:test';
import assert from 'node:assert/strict';
import { validateItem, parseDraft, nextDraft } from '../src/features/admin-demo/adminModel.ts';
const item = { id: 'test', page: 'Home', title: 'Title', body: 'Content', asset: 'hero', alt: 'Team' };
test('Admin validates required fields and rejects unsafe link/image schemes', () => {
  assert.equal(validateItem(item), '');
  assert.ok(validateItem({ ...item, title: '' }));
  assert.ok(validateItem({ ...item, alt: '' }));
  assert.ok(validateItem({ ...item, link: 'javascript:alert(1)' }));
  assert.ok(validateItem({ ...item, image: 'data:image/svg+xml;base64,abc' }));
});
test('Draft imports preserve content without importing permissions or approval', () => {
  const raw = JSON.stringify({ schema: 'fern-content-draft-v1', item: { ...item, status: 'Approved', role: 'admin' } });
  assert.deepEqual(parseDraft(raw, [item]), { ...item, image: undefined, link: undefined, visible: undefined });
  assert.throws(() => parseDraft(raw.replace('test', 'unknown'), [item]));
  assert.throws(() => parseDraft('bad json', [item]));
});
test('Simulated review enforces sequence and role gates', () => {
  const draft = { item, status: 'Draft', revision: 1, events: [] };
  assert.throws(() => nextDraft(draft, 'publish', 'Content Editor'));
  assert.throws(() => nextDraft(draft, 'approve', 'Content Approver'));
  const review = nextDraft(draft, 'submit', 'Content Editor');
  assert.equal(review.status, 'In review');
  assert.throws(() => nextDraft(review, 'approve', 'Content Editor'));
  const approved = nextDraft(review, 'approve', 'Content Approver');
  assert.equal(nextDraft(approved, 'publish', 'Content Approver').status, 'Published locally');
  assert.equal(nextDraft(review, 'return', 'Content Approver').status, 'Draft');
});
