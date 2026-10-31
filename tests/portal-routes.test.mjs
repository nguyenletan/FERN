import test from 'node:test';
import assert from 'node:assert/strict';
import { readPortalRoute, portalLocation, lessonTitles } from '../src/app/portalRoutes.ts';
test('All baseline pages and resource panels survive a copied URL', () => {
  for (const page of [
    'Home',
    'Workspace',
    'Mission & Pillars',
    'Leadership & Policy',
    'FM Overview',
    'Planning & Objectives',
    'Performance & KPIs',
    'Risk & Compliance',
    'Audit & Assurance',
    'Continual Improvement',
  ]) {
    const route = { page, panel: null };
    const restored = readPortalRoute(portalLocation('', route));
    assert.equal(restored.page, page);
    assert.equal(restored.panel, null);
  }
  for (const panel of ['about', 'guide', 'learn', 'reference', 'help', 'updates', 'facility'])
    assert.equal(readPortalRoute(portalLocation('', { page: 'Home', panel })).panel, panel);
});
test('Every learning topic has a stable restorable URL', () => {
  assert.equal(
    readPortalRoute(portalLocation('', { page: 'Home', panel: 'learn', lesson: 'Service models explained' })).lesson,
    'Service models explained',
  );
  for (const lesson of lessonTitles)
    assert.equal(readPortalRoute(portalLocation('', { page: 'Home', panel: 'learn', lesson })).lesson, lesson);
});
test('Leaving a standard clears source parameters only in the new URL', () => {
  const search = '?page=reference&bbm=example&bbmKind=Compliance&bbmQuery=air&campaign=review';
  const next = portalLocation(search, { page: 'Mission & Pillars', panel: null });
  assert.equal(next, '?page=mission&campaign=review');
  assert.equal(readPortalRoute(search).panel, 'reference');
  assert.equal(readPortalRoute(next).page, 'Mission & Pillars');
});
test('BBM links retain their edition and override an older page parameter', () => {
  const search = '?page=leadership&bbm=code%40April+2024&bbmKind=Compliance';
  assert.equal(readPortalRoute(search).panel, 'reference');
  const next = new URLSearchParams(portalLocation(search, { page: 'Home', panel: 'reference' }));
  assert.equal(next.get('bbm'), 'code@April 2024');
  assert.equal(next.get('bbmKind'), 'Compliance');
});
test('Unknown routes and lesson values fall back safely', () => {
  for (const key of ['nonexistent', 'constructor', '__proto__'])
    assert.equal(readPortalRoute('?page=' + key).page, 'Home');
  assert.equal(readPortalRoute('?page=learn&lesson=missing').lesson, undefined);
  assert.equal(readPortalRoute('?page=help&lesson=service-models-explained').lesson, undefined);
});

test('Pillar source links retain the selected section when copied or restored', () => {
  for (let pillar = 1; pillar <= 8; pillar++) {
    const url = portalLocation('', { page: 'Mission & Pillars', panel: null, pillar });
    assert.equal(readPortalRoute(url).pillar, pillar);
    assert.equal(readPortalRoute(url).page, 'Mission & Pillars');
  }
});
test('Invalid pillar links are ignored and leaving Mission clears the selection', () => {
  for (const pillar of ['0', '9', '-1', '1.5', '01', 'invalid'])
    assert.equal(readPortalRoute('?page=mission&pillar=' + pillar).pillar, undefined);
  assert.equal(readPortalRoute('?page=leadership&pillar=1').pillar, undefined);
  assert.equal(portalLocation('?page=mission&pillar=3', { page: 'Home', panel: null }), '');
  assert.equal(portalLocation('?page=mission&pillar=3', { page: 'Mission & Pillars', panel: null }), '?page=mission');
});
test('Every application introduction page has a stable restorable URL', () => {
  for (const [slug, page] of [
    ['pricing', 'Pricing Template Generator'],
    ['lifecycle', 'Lifecycle & Asset Analysis'],
    ['pre-contract', 'FM Pre-Contract / Pre-Tender Assessment'],
    ['contract-service-model', 'FM Contract & Service Model'],
    ['mobilisation', 'FM Mobilisation & Transition Tracker'],
  ]) {
    assert.equal(portalLocation('', { page, panel: null }), '?page=' + slug);
    assert.equal(readPortalRoute('?page=' + slug).page, page);
  }
});
