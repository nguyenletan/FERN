import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';
import { chromium } from 'playwright';
const root = fileURLToPath(new URL('..', import.meta.url));
process.chdir(root);
await fs.mkdir('test-results', { recursive: true });
const report = {
  started: new Date().toISOString(),
  checks: [],
  pageErrors: [],
  scope:
    'Portal production build and offline showcase smoke checks; not full accessibility, domain or live integration acceptance.',
};
let server, browser;
try {
  server = await preview({
    root,
    configFile: path.join(root, 'vite.config.ts'),
    preview: { host: '127.0.0.1', port: 0, strictPort: false, open: false },
  });
  const url = 'http://127.0.0.1:' + server.httpServer.address().port;
  browser = await chromium.launch({ headless: true, chromiumSandbox: true });
  const c = await browser.newContext({
    viewport: { width: 1360, height: 1000 },
    reducedMotion: 'reduce',
    acceptDownloads: true,
  });
  await c.route('**/*', (r) =>
    /^https?:/.test(r.request().url()) && !r.request().url().startsWith(url) ? r.abort() : r.continue(),
  );
  const page = await c.newPage();
  page.on('pageerror', (e) => report.pageErrors.push(e.message));
  const h1 = (name) => page.locator('#fern-main').getByRole('heading', { level: 1, name, exact: true });
  const sideNav = page.getByRole('navigation', { name: 'FERN navigation' });
  const nav = async (label) => {
    const show = page.getByRole('button', { name: 'Show navigation', exact: true });
    if (await show.isVisible()) await show.click();
    await sideNav.getByRole('link', { name: label, exact: true }).click();
  };
  const login = async () => {
    await page.getByPlaceholder('Enter demo').fill('demo');
    await page.getByPlaceholder('Enter your password').fill('demo');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await h1('Welcome to FERN').waitFor();
  };
  const home = async () => {
    await nav('Home');
    await h1('Welcome to FERN').waitFor();
  };
  await page.goto(url);
  await login();
  report.checks.push('Production-format build: demonstration sign-in and homepage');
  assert.equal(await page.getByText('BHX4', { exact: true }).count(), 0);
  assert.equal(
    await page
      .locator('#fern-main')
      .getByRole('link', { name: /^About / })
      .count(),
    5,
  );
  assert.equal(await page.locator('#fern-main').getByText('Coming soon', { exact: true }).count(), 5);
  report.checks.push('Five application cards shown as Coming soon with an About link; no homepage BHX4 label');
  for (const name of [
    'Pre-Contract & Tender Assessment',
    'Lifecycle & Asset Analysis',
    'Contract & Service Model',
    'Pricing Template Generator',
    'Mobilisation & Transition Tracker',
  ])
    assert.equal(await sideNav.getByRole('link', { name, exact: true }).count(), 1);
  assert.equal(await sideNav.getByText('Soon', { exact: true }).count(), 5);
  report.checks.push('Navigation lists the five applications as Soon');
  assert.equal(await page.getByRole('combobox', { name: 'Search FERN' }).count(), 1);
  report.checks.push('Shared search in the header');
  for (const title of [
    'Mission & Pillars',
    'Leadership & Policy',
    'FM Overview',
    'Planning & Objectives',
    'Performance & KPIs',
    'Risk & Compliance',
    'Audit & Assurance',
    'Continual Improvement',
  ]) {
    await nav(title);
    await h1(title).waitFor();
    report.checks.push('Workspace page: ' + title);
  }
  const section = page.locator('#fw-section-0').getByRole('button').first();
  await section.click();
  assert.equal(await section.getAttribute('aria-expanded'), 'true');
  await section.click();
  assert.equal(await section.getAttribute('aria-expanded'), 'false');
  report.checks.push('Workspace disclosure opens and closes');
  await page.getByRole('button', { name: 'Open detailed practice guide', exact: true }).first().click();
  await page.getByText('Detailed practice guidance', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Expand all', exact: true }).click();
  report.checks.push('Detailed practice guide opens; Expand all');
  await home();
  await page.locator('#fern-main').getByRole('link', { name: 'Get started', exact: true }).click();
  await h1('Get started').waitFor();
  report.checks.push('Get started');
  for (const [label, heading] of [
    ['Learn', 'Learn'],
    ['Help & Guidance', 'Help & Guidance'],
    ['Standards & Reference Library', 'Standards & Reference Library'],
  ]) {
    await nav(label);
    await h1(heading).waitFor();
    report.checks.push('Resource page: ' + heading);
  }
  const search = page.getByRole('searchbox', { name: 'Search standards', exact: true });
  await search.fill('fire doors');
  await search.press('Enter');
  const first = page.locator('#bbm-search-results li').first();
  assert.match(await first.innerText(), /CT.FIRE.DOORS/);
  await first.getByRole('link').first().click();
  await page.locator('#bbm-standard-title').waitFor();
  for (const name of ['Download selected standard', 'Download full source PDF']) {
    const ready = page.waitForEvent('download');
    await page.getByRole('button', { name, exact: true }).click();
    const d = await ready;
    const bytes = await fs.readFile(await d.path());
    assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
    report.checks.push(name + ': PDF bytes verified');
  }
  const pageLink = page.getByRole('navigation', { name: 'Pages in this standard' }).getByRole('link').first();
  const target = (await pageLink.getAttribute('href')).slice(1);
  await pageLink.click();
  await page
    .locator('#' + target)
    .getByRole('button', { expanded: true })
    .first()
    .waitFor();
  await page.getByRole('button', { name: 'Back to results', exact: true }).click();
  assert.equal(await search.inputValue(), 'fire doors');
  report.checks.push('BBM exact result, source disclosure and preserved query on return');
  await home();
  const fernSearch = page.getByRole('combobox', { name: 'Search FERN' });
  await fernSearch.fill('standards');
  await page
    .getByRole('option', { name: /Standards & Reference Library/ })
    .first()
    .click();
  await h1('Standards & Reference Library').waitFor();
  assert.equal(await page.locator('#fern-help-question').count(), 0);
  report.checks.push('Guidance keyword search; no unavailable assistant input');
  // Header country (Amazon review 30 Oct 2026) filters the library; language shows English with others not yet available.
  await page.getByRole('button', { name: 'Language: English (US)' }).click();
  assert.equal(await page.getByRole('menuitem', { name: /Other languages/ }).getAttribute('aria-disabled'), 'true');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Country: All countries' }).click();
  await page.getByRole('menuitem', { name: /Germany/ }).click();
  await page.getByRole('button', { name: /^Country: .*Germany/ }).waitFor();
  await page
    .locator('#fern-main')
    .getByText(/Germany/)
    .first()
    .waitFor();
  report.checks.push('Header country filters the Standards & Reference Library');
  await page.getByRole('button', { name: /^Country: .*Germany/ }).click();
  await page.getByRole('menuitem', { name: 'All countries' }).click();
  // Administration demonstration: add a user with a role.
  await nav('Users & roles');
  await h1('Users & roles').waitFor();
  await page.getByRole('button', { name: 'Add user', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('button', { name: 'Add user', exact: true }).click();
  await dialog.getByText('Enter the person’s name.').waitFor();
  await dialog.getByLabel('Name').fill('Test Person');
  await dialog.getByLabel('Amazon alias').fill('tperson');
  await dialog.getByRole('button', { name: /Choose roles/ }).click();
  await page.getByRole('option', { name: /RME planner/ }).click();
  await page.keyboard.press('Escape');
  await dialog.getByRole('button', { name: 'Add user', exact: true }).click();
  await page.getByRole('row', { name: /Test Person/ }).waitFor();
  await page.getByRole('tab', { name: 'Preview as role' }).click();
  await page.getByText('Applications this role sees').waitFor();
  report.checks.push('Administration demo: validation, add user with role, preview as role');
  await page.screenshot({ path: 'test-results/handover-desktop.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  // The Cloudscape layout re-lays out after a viewport change; fail only if the overflow persists.
  await page.waitForFunction(() => document.documentElement.scrollWidth <= window.innerWidth, null, { timeout: 3000 });
  await page.getByRole('button', { name: 'Show navigation', exact: true }).click();
  await sideNav.getByRole('link', { name: 'Home', exact: true }).waitFor();
  await page.screenshot({ path: 'test-results/handover-mobile-menu.png' });
  await page.getByRole('button', { name: 'Close navigation', exact: true }).click();
  report.checks.push('Mobile width and open/close navigation');
  await page.goto('file://' + path.join(root, 'dist-share', 'FERN-Internal-Portal.html'));
  await page.setViewportSize({ width: 1360, height: 1000 });
  await login();
  await page.getByRole('combobox', { name: 'Search FERN' }).waitFor();
  report.checks.push('Re-exported standalone HTML: file URL login, homepage and shared search');
  assert.deepEqual(report.pageErrors, []);
  report.status = 'passed';
} catch (e) {
  report.status = 'failed';
  report.error = e.message;
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  if (server) await new Promise((r) => server.httpServer.close(r));
  report.finished = new Date().toISOString();
  await fs.writeFile('test-results/portal-handover-browser.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
