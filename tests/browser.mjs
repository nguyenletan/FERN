import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';

// Start pnpm dev --port 4173 first. This suite verifies the prototype/refactor,
// not production workflow completion; see docs/verification/FUNCTIONALITY-MATRIX.md.
fs.mkdirSync('test-results', { recursive: true });
let browser;
try {
  browser = await chromium.launch({
    headless: true,
    ...(process.env.FERN_BROWSER_CHANNEL ? { channel: process.env.FERN_BROWSER_CHANNEL } : {}),
  });
  fs.writeFileSync(
    'test-results/browser-launch.json',
    JSON.stringify({ status: 'passed', timestamp: new Date().toISOString() }, null, 2),
  );
} catch (error) {
  const message = String(error.message);
  const reason = message.includes("Executable doesn't exist")
    ? 'browser-not-installed'
    : message.includes('Permission denied') || message.includes('EPERM')
      ? 'environment-permission-denied'
      : 'browser-launch-failed';
  fs.writeFileSync(
    'test-results/browser-launch.json',
    JSON.stringify({ status: 'failed', reason, timestamp: new Date().toISOString(), message }, null, 2),
  );
  throw error;
}
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const h1 = (name) => page.locator('#fern-main').getByRole('heading', { level: 1, name, exact: true });
// Side navigation links (Cloudscape SideNavigation); on narrow screens the navigation opens first.
const nav = async (label) => {
  const toggle = page.getByRole('button', { name: 'Show navigation', exact: true });
  if (await toggle.isVisible()) await toggle.click();
  await page
    .getByRole('navigation', { name: 'FERN navigation' })
    .getByRole('link', { name: label, exact: true })
    .click();
};
const expanded = (name) => page.getByRole('button', { name, exact: true, expanded: true });
// The header re-lays out after a viewport change, so retry opening the user menu until it stays open.
const signOut = async () => {
  const user = page.getByRole('button', { name: /Prototype User/ }),
    item = page.getByRole('menuitem', { name: 'Sign out', exact: true });
  for (let i = 0; i < 3 && !(await item.isVisible()); i++) {
    await user.click();
    await item.waitFor({ timeout: 2000 }).catch(() => {});
  }
  await item.click();
};
try {
  await page.goto(process.env.FERN_TEST_URL || 'http://127.0.0.1:4173');
  await page.getByPlaceholder('Enter demo').fill('wrong');
  await page.getByPlaceholder('Enter your password').fill('wrong');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.getByText('Use demo for both the username and password to enter this preview.', { exact: true }).waitFor();
  await page.getByPlaceholder('Enter demo').fill('demo');
  await page.getByPlaceholder('Enter your password').fill('demo');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await h1('Welcome to FERN').waitFor();
  await page.screenshot({ path: 'test-results/dashboard.png' });

  assert.equal(await page.getByText('BHX4', { exact: true }).count(), 0);
  // WEB-SCOPE-01: five "Coming soon" cards each open an introduction page that describes, but never launches, the application.
  assert.equal(
    await page
      .locator('#fern-main')
      .getByRole('link', { name: /^About / })
      .count(),
    5,
  );
  assert.equal(await page.locator('#fern-main').getByText('Coming soon', { exact: true }).count(), 5);
  // One way in per destination: each application has exactly one link in the Home body (the card title).
  for (const slug of ['pre-contract', 'lifecycle', 'contract-service-model', 'pricing', 'mobilisation'])
    assert.equal(await page.locator(`#fern-main a[href$="?page=${slug}"]`).count(), 1, slug);
  // Kim (30 Oct 2026): one way in to Learn on Home, and no separate "learn at your own pace" lesson links.
  assert.equal(await page.locator('#fern-main a[href$="?page=learn"]').count(), 1);
  assert.equal(await page.locator('#fern-main a[href*="lesson="]').count(), 0);
  await page.getByRole('link', { name: 'About Pricing Template Generator', exact: true }).click();
  await h1('Pricing Template Generator').waitFor();
  assert.ok(new URL(page.url()).searchParams.get('page') === 'pricing');
  assert.equal(await page.locator('#fern-main').getByText('Coming soon', { exact: true }).count(), 1);
  assert.equal(
    await page
      .locator('#fern-main')
      .getByRole('button', { name: /open|launch|start/i })
      .count(),
    0,
  );
  await page.locator('#fern-main').getByRole('link', { name: 'Lifecycle & Asset Analysis', exact: true }).click();
  await h1('Lifecycle & Asset Analysis').waitFor();
  await page.goBack();
  await h1('Pricing Template Generator').waitFor();
  await nav('Home');
  await h1('Welcome to FERN').waitFor();
  await nav('FM Overview');
  await h1('FM Overview').waitFor();
  assert.equal(await page.getByText('Selected Facility', { exact: true }).count(), 0);
  assert.equal(await page.getByText('BHX4', { exact: true }).count(), 0);
  await nav('Leadership & Policy');
  await h1('Leadership & Policy').waitFor();
  assert.equal(await page.getByRole('heading', { name: 'Choose your facility', exact: true }).count(), 0);
  await page.setViewportSize({ width: 390, height: 844 });
  // The Cloudscape layout re-lays out after a viewport change; fail only if the overflow persists.
  await page.waitForFunction(() => document.documentElement.scrollWidth <= window.innerWidth, null, { timeout: 3000 });
  // Review-fix acceptance: history, lessons and deep links survive demo sign-in.
  // Home has no lesson links (one way in to Learn); Get started links straight to a lesson.
  await nav('Get started');
  await page.locator('#fern-main').getByRole('link', { name: 'Read About Service Models', exact: true }).click();
  await page.waitForURL('**page=learn&lesson=service-models-explained');
  await expanded('Service Models Explained').waitFor();
  await nav('Help & Guidance');
  await page.waitForURL('**page=help');
  await page.goBack();
  await h1('Learn').waitFor();
  // A refresh keeps the demo session for this tab and restores the same lesson.
  await page.reload();
  await h1('Learn').waitFor();
  assert.equal(await page.getByPlaceholder('Enter demo').count(), 0);
  await expanded('Service Models Explained').waitFor();
  // Signing out ends the session: reopening the deep link asks for sign-in again.
  const lessonUrl = page.url();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await signOut();
  await page.goto(lessonUrl);
  await page.getByRole('button', { name: 'Preview help', exact: true }).click();
  await page.getByRole('region', { name: 'Preview help', exact: true }).waitFor();
  assert.equal(await page.getByRole('checkbox', { name: 'Remember me' }).count(), 0);
  await page.getByPlaceholder('Enter demo').fill('demo');
  await page.getByPlaceholder('Enter your password').fill('demo');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await h1('Learn').waitFor();
  await expanded('Service Models Explained').waitFor();
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    'test-results/website-review.json',
    JSON.stringify(
      {
        status: 'passed',
        scope: 'Website application and facility isolation; basic mobile width',
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
