import test from 'node:test';
import assert from 'node:assert/strict';
import { homeApplications, suggestedApplications } from '../apps/portal/src/features/dashboard/homeApplications.ts';
test('Homepage task prompts route to the relevant existing tool', () => {
  assert.equal(suggestedApplications('Compare FM service options')[0].name, 'FM Pre-Contract / Pre-Tender Assessment');
  assert.equal(suggestedApplications('Plan asset replacements')[0].name, 'Lifecycle & Asset Analysis');
  assert.equal(suggestedApplications('Build a pricing template')[0].name, 'Pricing Template Generator');
  assert.equal(suggestedApplications('Plan a service transition')[0].name, 'FM Mobilisation & Transition Tracker');
});
test('Homepage preserves five unique application destinations and unknown request fallback', () => {
  assert.equal(new Set(homeApplications.map((a) => a.name)).size, 5);
  assert.deepEqual(suggestedApplications(''), []);
  assert.deepEqual(suggestedApplications('weather tomorrow'), []);
});
test('Every application has a complete introduction page record (APP-01 registry)', () => {
  const names = new Set(homeApplications.map((a) => a.name));
  assert.equal(new Set(homeApplications.map((a) => a.slug)).size, homeApplications.length);
  for (const app of homeApplications) {
    assert.match(app.slug, /^[a-z][a-z-]*$/);
    assert.equal(app.status, 'coming-soon');
    assert.ok(app.summary.length > 40, app.name);
    assert.ok(app.audience.length >= 2, app.name);
    assert.ok(app.capabilities.length >= 3, app.name);
    assert.ok(app.steps.length >= 3, app.name);
    for (const name of app.related) {
      assert.ok(names.has(name), app.name + ' relates to unknown ' + name);
      assert.notEqual(name, app.name);
    }
  }
});
