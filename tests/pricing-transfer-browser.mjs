// Synthetic end-to-end transfer between two standalone origins; no existing profiles/storage.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright";
const pricingURL = process.env.FERN_PRICING_TEST_URL || "http://127.0.0.1:4194";
const precontractURL = process.env.FERN_PRECONTRACT_TEST_URL || "http://127.0.0.1:4196";
assert.notEqual(new URL(pricingURL).origin, new URL(precontractURL).origin);
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  acceptDownloads: true,
});
const pricing = await context.newPage(),
  pre = await context.newPage();
const errors = [];
for (const page of [pricing, pre]) page.on("pageerror", (e) => errors.push(e.message));
const output = "test-results/pricing-transfer";
fs.mkdirSync(output, { recursive: true });
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "fern-pricing-transfer-"));
const button = (page, name) => page.getByRole("button", { name, exact: true });
async function login(page, url) {
  await page.goto(url);
  await page.getByPlaceholder("Enter demo").fill("demo");
  await page.getByPlaceholder("Enter your password").fill("demo");
  await button(page, "Sign in").click();
}
async function chooseFacility() {
  await button(
    pre,
    "BHX4 — BHX4 demonstration facility United Kingdom · Local record, unverified",
  ).click();
  await pre
    .getByRole("checkbox", {
      name: "I have checked that this is the correct facility.",
      exact: true,
    })
    .check();
  await button(pre, "Confirm facility and continue").click();
}
async function downloadIssue() {
  const download = pricing.waitForEvent("download");
  await button(pricing, "Download pricing issue").click();
  const event = await download;
  const target = path.join(temp, event.suggestedFilename());
  await event.saveAs(target);
  return { file: target, data: JSON.parse(fs.readFileSync(target, "utf8")) };
}
async function upload(file) {
  await pre.locator("input[type=file]").setInputFiles(file);
}
async function preview(file) {
  await upload(file);
  await pre
    .getByRole("heading", { name: "Review pricing issue before import", exact: true })
    .waitFor();
}
try {
  await login(pricing, pricingURL);
  await pricing.getByRole("combobox", { name: "Currency", exact: true }).selectOption("EUR");
  await pricing.getByRole("textbox", { name: "Price base date", exact: true }).fill("01-01-2026");
  await button(pricing, "Add overhead").click();
  await pricing
    .getByRole("textbox", { name: "Cost description", exact: true })
    .fill("Synthetic annual cost");
  await pricing
    .getByRole("spinbutton", { name: "Annual cost before FM allocation", exact: true })
    .fill("100");
  await pricing
    .getByRole("spinbutton", { name: "Cost FM allocation (%)", exact: true })
    .fill("100");
  await pricing
    .getByRole("textbox", { name: "Cost source and scope", exact: true })
    .fill("Synthetic transfer verification only");
  await pricing
    .getByRole("textbox", { name: "Baseline scope and exclusions", exact: true })
    .fill("Synthetic FM scope");
  await pricing
    .getByRole("textbox", { name: "Baseline service tier and maintenance strategy", exact: true })
    .fill("Synthetic service level");
  await pricing
    .getByRole("textbox", { name: "Baseline tax and commercial basis", exact: true })
    .fill("Excluding tax");
  await button(pricing, "Create pricing issue").click();
  const first = await downloadIssue();
  assert.equal(first.data.issue.revision, 1);
  assert.equal(first.data.issue.baseline.additionalCosts[0].annualCost, "100");
  await login(pre, precontractURL);
  await chooseFacility();
  await button(pre, "Start new assessment").click();
  await pre
    .getByRole("textbox", { name: "Assessment name", exact: true })
    .fill("Synthetic transfer acceptance");
  await button(pre, "Save draft").click();
  await button(pre, "2. Current arrangement").click();
  await pre
    .getByRole("combobox", { name: "Current service model", exact: true })
    .selectOption("Full Blue Badge");
  await pre
    .getByRole("combobox", { name: "Current service tier", exact: true })
    .selectOption("Plus");
  await button(pre, "3. Pricing evidence").click();
  await button(pre, "Load issued pricing baselines").click();
  await pre
    .getByText("No pricing baseline has been issued for this site.", { exact: true })
    .waitFor();
  await preview(first.file);
  assert.equal(
    await pre.getByRole("combobox", { name: "Pricing version", exact: true }).count(),
    0,
  );
  await button(pre, "Cancel import").click();
  await button(pre, "Load issued pricing baselines").click();
  assert.equal(
    await pre.getByRole("combobox", { name: "Pricing version", exact: true }).count(),
    0,
  );
  await preview(first.file);
  await button(pre, "Confirm pricing issue import").click();
  const selected = pre.getByRole("combobox", { name: "Pricing version", exact: true });
  assert.equal(await selected.inputValue(), "");
  await selected.selectOption(first.data.issue.id);
  await button(pre, "Save draft").click();
  await pricing
    .getByRole("spinbutton", { name: "Annual cost before FM allocation", exact: true })
    .fill("80");
  await button(pricing, "Create pricing issue").click();
  const second = await downloadIssue();
  assert.equal(second.data.issue.revision, 2);
  await preview(second.file);
  await button(pre, "Confirm pricing issue import").click();
  assert.equal(await selected.inputValue(), first.data.issue.id);
  await preview(second.file);
  await button(pre, "Confirm pricing issue import").click();
  await pre
    .getByText("This exact pricing issue is already available. Your selection is unchanged.", {
      exact: true,
    })
    .waitFor();
  assert.equal(await selected.locator("option").count(), 3);
  for (const [name, change, expected] of [
    [
      "wrong-site",
      (x) => {
        x.issue.baseline.site = "OTHER";
      },
      /unsupported format or site/,
    ],
    [
      "approval",
      (x) => {
        x.issue.status = "approved";
      },
      /provisional status/,
    ],
  ]) {
    const changed = structuredClone(second.data);
    change(changed);
    const file = path.join(temp, name + ".json");
    fs.writeFileSync(file, JSON.stringify(changed));
    await upload(file);
    await pre.getByRole("alert").filter({ hasText: expected }).waitFor();
    assert.equal(await selected.inputValue(), first.data.issue.id);
  }
  const conflict = structuredClone(second.data);
  conflict.issue.baseline.additionalCosts[0].annualCost = "999";
  const conflictFile = path.join(temp, "conflict.json");
  fs.writeFileSync(conflictFile, JSON.stringify(conflict));
  await preview(conflictFile);
  await button(pre, "Confirm pricing issue import").click();
  await pre
    .getByRole("alert")
    .filter({ hasText: "already exists with different inputs" })
    .waitFor();
  await button(pre, "Cancel import").click();
  assert.equal(await selected.inputValue(), first.data.issue.id);
  await button(pre, "4. Service alternatives").click();
  await button(pre, "Add service alternative").click();
  await pre
    .getByRole("textbox", { name: "Alternative name", exact: true })
    .fill("Synthetic IFM option");
  await pre
    .getByRole("combobox", { name: "Alternative service model", exact: true })
    .selectOption("IFM");
  await pre
    .getByRole("combobox", { name: "Alternative service tier", exact: true })
    .selectOption("Core");
  await button(pre, "Load option pricing versions").click();
  await pre
    .getByRole("combobox", { name: "Pricing version for Synthetic IFM option", exact: true })
    .selectOption(second.data.issue.id);
  await pre
    .getByRole("textbox", {
      name: "Price applicability and scope differences for Synthetic IFM option",
      exact: true,
    })
    .fill("Synthetic comparable scope review");
  await pre.getByRole("checkbox", { name: /I have reviewed the price-to-option mapping/ }).check();
  await pre.getByText("EUR -20.00 · -20.00%", { exact: true }).waitFor();
  await button(pre, "Save draft").click();
  await pre.reload();
  await loginAfterReload();
  await chooseFacility();
  await button(pre, "Continue Synthetic transfer acceptance").click();
  await button(pre, "3. Pricing evidence").click();
  await button(pre, "Load issued pricing baselines").click();
  assert.equal(await selected.inputValue(), first.data.issue.id);
  await pre.setViewportSize({ width: 390, height: 844 });
  await preview(second.file);
  assert.equal(await pre.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await pre.screenshot({ path: output + "/mobile-preview.png", fullPage: true });
  await button(pre, "Cancel import").click();
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    output + "/verification.json",
    JSON.stringify(
      {
        status: "passed",
        timestamp: new Date().toISOString(),
        scope:
          "Separate-origin issue creation/download/preview/cancel/import/selection; duplicate/conflict/wrong-site/approval rejection; option comparison -20 EUR / -20%; saved selection recovery; mobile preview",
        pricingURL,
        precontractURL,
      },
      null,
      2,
    ),
  );
  console.log("Pricing transfer browser acceptance passed.");
} finally {
  await browser.close();
}
async function loginAfterReload() {
  // Demo sign-in is session-local; reload requires signing in again.
  await pre.getByPlaceholder("Enter demo").fill("demo");
  await pre.getByPlaceholder("Enter your password").fill("demo");
  await button(pre, "Sign in").click();
}
