import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
fs.mkdirSync('test-results/homepage', { recursive: true });
const browser = await chromium.launch({ headless: true, channel: process.env.FERN_BROWSER_CHANNEL || 'chrome' });
const page = await browser.newPage({ viewport: { width: 1536, height: 1024 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const welcome = page.locator('#fern-main').getByRole('heading', { level: 1, name: 'Welcome to FERN', exact: true });
const h1 = (name) => page.locator('#fern-main').getByRole('heading', { level: 1, name, exact: true });
const sideNav = page.getByRole('navigation', { name: 'FERN navigation' });
const signIn = async () => {
  await page.getByPlaceholder('Enter demo').fill('demo');
  await page.getByPlaceholder('Enter your password').fill('demo');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await welcome.waitFor();
};
const home = async () => {
  await page.getByRole('navigation', { name: 'Breadcrumbs' }).getByRole('link', { name: 'FERN', exact: true }).click();
  await welcome.waitFor();
};
try {
  await page.goto(process.env.FERN_TEST_URL || 'http://127.0.0.1:4173/');
  await signIn();
  await page.screenshot({ path: 'test-results/homepage/desktop.png' });
  // Desktop: the side navigation is open beside the page.
  await sideNav.getByRole('link', { name: 'FM Overview', exact: true }).click();
  await h1('FM Overview').waitFor();
  assert.equal(await welcome.count(), 0);
  await home();
  // Header search suggests topics and applications, then opens the chosen page.
  const search = page.getByRole('combobox', { name: 'Search FERN' });
  await search.fill('pricing');
  await page
    .getByRole('option', { name: /Pricing Template Generator/ })
    .first()
    .click();
  await h1('Pricing Template Generator').waitFor();
  await home();
  // Enter lists every keyword match on the search results page (?page=search&q=…).
  await search.fill('kpi');
  await search.press('Enter');
  await h1('Search results').waitFor();
  assert.match(page.url(), /[?&]page=search&q=kpi/);
  await page.locator('#fern-main').getByRole('link', { name: 'Performance & KPIs', exact: true }).waitFor();
  await home();
  await page.locator('#fern-main').getByRole('link', { name: 'Get started', exact: true }).click();
  await h1('Get started').waitFor();
  await home();
  for (const name of [
    'Pre-Contract & Tender Assessment',
    'Lifecycle & Asset Analysis',
    'Contract & Service Model',
    'Pricing Template Generator',
    'Mobilisation & Transition Tracker',
  ]) {
    await page.getByRole('link', { name: 'About ' + name, exact: true }).click();
    await h1(name).waitFor();
    await home();
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.screenshot({ path: 'test-results/homepage/desktop-bottom.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await welcome.waitFor();
  assert.equal(await page.getByPlaceholder('Enter demo').count(), 0, 'Refresh keeps the demo session');
  assert.ok(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    'No mobile page overflow',
  );
  await page.screenshot({ path: 'test-results/homepage/mobile.png' });
  // Mobile: the navigation opens as a drawer and closes again.
  await page.getByRole('button', { name: 'Show navigation', exact: true }).click();
  await sideNav.getByRole('link', { name: 'Home', exact: true }).waitFor();
  await page.screenshot({ path: 'test-results/homepage/mobile-menu.png' });
  await page.getByRole('button', { name: 'Close navigation', exact: true }).click();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.screenshot({ path: 'test-results/homepage/mobile-bottom.png' });
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    'test-results/homepage/result.json',
    JSON.stringify(
      {
        passed: true,
        desktop: [1536, 1024],
        mobile: [390, 844],
        errors,
        checks: [
          'navigation',
          'search',
          'get started',
          'five application introduction pages',
          'mobile overflow',
          'mobile menu',
        ],
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
