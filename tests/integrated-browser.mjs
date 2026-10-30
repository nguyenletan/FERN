// Integrated mode acceptance: Pricing issues reach Pre-contract and Lifecycle on one origin without file transfer.
// The website mode must still hide every application. Synthetic data only; uses fresh browser storage.
import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium } from "playwright";
import { createServer } from "vite";
const output = "test-results/integrated";
fs.mkdirSync(output, { recursive: true });
async function serve(mode) {
  // Separate dependency caches: two concurrent dev servers must not re-optimise each other's dependencies.
  const server = await createServer({ mode, cacheDir: "node_modules/.vite-" + mode, logLevel: "warn", server: { host: "127.0.0.1", port: 0, strictPort: false, open: false } });
  await server.listen();
  const address = server.httpServer.address();
  return { server, url: `http://127.0.0.1:${address.port}/` };
}
const website = await serve("development");
const integrated = await serve("integrated");
const browser = await chromium.launch({ headless: true });
const errors = [];
const button = (page, name) => page.getByRole("button", { name, exact: true });
async function open(url) {
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("dialog", (dialog) => dialog.accept());
  await page.goto(url);
  await page.getByPlaceholder("Enter demo").fill("demo");
  await page.getByPlaceholder("Enter your password").fill("demo");
  await button(page, "Sign in").click();
  return page;
}
async function openApp(page, name) {
  const sidebar = page.locator("#fern-home-sidebar, #fern-workspace-sidebar").first();
  // Collapsed sidebars stay in the DOM but are inert.
  if (await sidebar.evaluate((el) => el.inert)) await page.locator(".fern-home-header>button").first().click();
  const group = sidebar.getByRole("button", { name: /FERN Apps/ }).first();
  if ((await group.getAttribute("aria-expanded")) === "false") await group.click();
  await sidebar.getByRole("button", { name, exact: true }).click();
  await page.getByRole("heading", { level: 1, name }).first().waitFor();
}
try {
  const site = await open(website.url + "?page=pricing");
  await site.locator(".fern-hero h1").waitFor();
  assert.equal(await site.getByRole("heading", { level: 1, name: "Pricing Template Generator" }).count(), 0, "website must not resolve application routes");
  assert.equal(await site.getByRole("button", { name: /FERN Apps/ }).count(), 0);

  const page = await open(integrated.url);
  await openApp(page, "Pricing Template Generator");
  assert.equal(new URL(page.url()).searchParams.get("page"), "pricing");
  await page.getByRole("combobox", { name: "Currency", exact: true }).selectOption("EUR");
  await page.getByRole("textbox", { name: "Price base date", exact: true }).fill("01-01-2026");
  await button(page, "Add overhead").click();
  await page.getByRole("textbox", { name: "Cost description", exact: true }).fill("Synthetic annual cost");
  await page.getByRole("spinbutton", { name: "Annual cost before FM allocation", exact: true }).fill("100");
  await page.getByRole("spinbutton", { name: "Cost FM allocation (%)", exact: true }).fill("100");
  await page.getByRole("textbox", { name: "Cost source and scope", exact: true }).fill("Synthetic integrated verification only");
  await page.getByRole("textbox", { name: "Baseline scope and exclusions", exact: true }).fill("Synthetic FM scope");
  await page.getByRole("textbox", { name: "Baseline service tier and maintenance strategy", exact: true }).fill("Synthetic service level");
  await page.getByRole("textbox", { name: "Baseline tax and commercial basis", exact: true }).fill("Excluding tax");
  await button(page, "Create pricing issue").click();
  const issues = await page.evaluate(() => Object.keys(localStorage).filter((key) => /pricing/i.test(key) && /issue/i.test(key)));
  assert.ok(issues.length > 0, "Pricing did not store an issue");

  await openApp(page, "FM Pre-Contract / Pre-Tender Assessment");
  assert.equal(new URL(page.url()).searchParams.get("page"), "pre-contract");
  // The portal supplies the site context; the standalone facility picker is not part of integrated mode.
  await button(page, "Start new assessment").click();
  await page.getByRole("textbox", { name: "Assessment name", exact: true }).fill("Synthetic integrated acceptance");
  await button(page, "Save draft").click();
  await button(page, "3. Pricing evidence").click();
  await button(page, "Load issued pricing baselines").click();
  const version = page.getByRole("combobox", { name: "Pricing version", exact: true });
  await version.waitFor();
  assert.ok((await version.locator("option").count()) >= 2, "issued pricing is not offered without file import");
  await page.screenshot({ path: output + "/pre-contract.png", fullPage: true });

  await openApp(page, "Lifecycle & Asset Analysis");
  assert.equal(new URL(page.url()).searchParams.get("page"), "lifecycle");
  await page.goBack();
  await page.getByRole("heading", { level: 1, name: "FM Pre-Contract / Pre-Tender Assessment" }).first().waitFor();
  assert.deepEqual(errors, []);
  fs.writeFileSync(output + "/verification.json", JSON.stringify({ status: "passed", timestamp: new Date().toISOString(), scope: "Website hides applications; integrated Pricing issue offered in Pre-contract on the same origin without file transfer; app routes and back navigation" }, null, 2));
  console.log("Integrated browser acceptance passed.");
} finally {
  await browser.close();
  await website.server.close();
  await integrated.server.close();
}
