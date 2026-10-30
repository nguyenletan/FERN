// BBM PDF delivery: the server build loads the reader on demand and serves PDFs from bbm/;
// the single-file export (BBM-HTML-07) downloads the same bytes offline from embedded data.
// Run after `pnpm build` and `pnpm export:portal`.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright';
import {preview} from 'vite';
const files = JSON.parse(fs.readFileSync('apps/portal/src/features/reference/generated/pdf-files.json', 'utf8'));
const sha = (b) => createHash('sha256').update(b).digest('hex');
const expected = (key) => sha(fs.readFileSync('public/bbm/' + files[key]));
const button = (page, name) => page.getByRole('button', {name, exact: true});
async function openStandard(page) {
  await page.getByPlaceholder('Enter demo').fill('demo');
  await page.getByPlaceholder('Enter your password').fill('demo');
  await button(page, 'Sign in').click();
  await page.locator('.fern-hero').waitFor();
  await page.locator('.fern-home-header').getByRole('button', {name: 'Reference library', exact: true}).click();
  const search = page.getByRole('searchbox', {name: 'Search standards', exact: true});
  await search.fill('fire doors');
  await search.press('Enter');
  await page.locator('.fs-result-row').first().click();
  await page.locator('.fs-reading').waitFor();
  return (await page.locator('.fs-reading').innerText()).match(/CT\.FIRE\.DOORS/) ? 'Compliance-CT.FIRE.DOORS' : null;
}
async function downloadBytes(page, name) {
  const pending = page.waitForEvent('download');
  await button(page, name).click();
  const download = await pending;
  return {name: download.suggestedFilename(), bytes: fs.readFileSync(await download.path())};
}
const browser = await chromium.launch();
const server = await preview({logLevel: 'warn', preview: {port: 0, strictPort: false}});
try {
  // Server build
  const url = server.resolvedUrls.local[0];
  const context = await browser.newContext({acceptDownloads: true});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const requested = [];
  page.on('request', (r) => requested.push(new URL(r.url()).pathname));
  await page.goto(url);
  await page.locator('.fern-hero').or(page.getByPlaceholder('Enter demo')).first().waitFor();
  assert.ok(!requested.some((p) => p.includes('StandardsLibrary')), 'reader must not load before the library opens');
  const key = await openStandard(page);
  assert.equal(key, 'Compliance-CT.FIRE.DOORS');
  assert.ok(requested.some((p) => p.includes('StandardsLibrary')), 'reader loads on demand');
  const task = await downloadBytes(page, 'Download Selected Standard');
  assert.equal(task.name, files[key]);
  assert.equal(sha(task.bytes), expected(key));
  const full = await downloadBytes(page, 'Download Full Document');
  assert.equal(full.name, files.Compliance);
  assert.equal(sha(full.bytes), expected('Compliance'));
  await button(page, 'Compare With Original PDF').click();
  const href = await page.locator('.fs-original a').getAttribute('href');
  assert.match(href, /^\/bbm\/BBM%20Compliance%20Standards_25\.04\.2024\.pdf#page=\d+$/);
  const response = await page.request.get(new URL(href.split('#')[0], url).href);
  assert.equal(response.status(), 200);
  assert.match(response.headers()['content-type'], /pdf/);
  assert.equal(sha(await response.body()), expected('Compliance'));
  assert.deepEqual(errors, []);
  console.log('Server build: reader on demand; task, full and original PDFs served from bbm/ with verified hashes.');

  // Single-file export, offline
  const offline = await browser.newContext({acceptDownloads: true, offline: true});
  const filePage = await offline.newPage();
  filePage.on('pageerror', (e) => errors.push(e.message));
  await filePage.goto(pathToFileURL('dist-share/FERN-Internal-Portal.html').href);
  assert.equal(await openStandard(filePage), key);
  const offlineTask = await downloadBytes(filePage, 'Download Selected Standard');
  assert.equal(offlineTask.name, files[key]);
  assert.equal(sha(offlineTask.bytes), expected(key));
  const offlineFull = await downloadBytes(filePage, 'Download Full Document');
  assert.equal(sha(offlineFull.bytes), expected('Compliance'));
  assert.deepEqual(errors, []);
  console.log('Single-file export (offline): task and full PDFs download from embedded data with verified hashes.');
} finally {
  await browser.close();
  server.httpServer.close();
}
