import test from 'node:test';
import assert from 'node:assert/strict';
import { regionLabel } from '../src/features/reference/regionLabels.ts';
test('All source country codes show their full names and matching flags without replacing aliases', () => {
  const expected = [
    ['CZ', 'Czech Republic', '🇨🇿'],
    ['DE', 'Germany', '🇩🇪'],
    ['ES', 'Spain', '🇪🇸'],
    ['FR', 'France', '🇫🇷'],
    ['IT', 'Italy', '🇮🇹'],
    ['PL', 'Poland', '🇵🇱'],
    ['ROI', 'Republic of Ireland', '🇮🇪'],
    ['SK', 'Slovakia', '🇸🇰'],
    ['UK', 'United Kingdom', '🇬🇧'],
  ];
  for (const [code, name, flag] of expected) assert.deepEqual(regionLabel(code), { label: `${name} (${code})`, flag });
});
test('All, unknown and blank regions are never assigned an invented country or flag', () => {
  for (const code of ['All', 'ALL']) assert.deepEqual(regionLabel(code), { label: `All regions (${code})`, flag: '' });
  for (const code of ['', 'XX', 'EU', 'UK / ROI', 'constructor', '__proto__'])
    assert.deepEqual(regionLabel(code), { label: code, flag: '' });
  assert.equal(regionLabel('sk').label, 'Slovakia (sk)');
});
