import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium } from "playwright";

// Start pnpm dev --port 4173 first. This suite verifies the prototype/refactor,
// not production workflow completion; see docs/verification/FUNCTIONALITY-MATRIX.md.
fs.mkdirSync("test-results", {recursive:true});
let browser;
try {
  browser = await chromium.launch({
    headless: true,
    ...(process.env.FERN_BROWSER_CHANNEL ? { channel: process.env.FERN_BROWSER_CHANNEL } : {}),
  });
  fs.writeFileSync("test-results/browser-launch.json",JSON.stringify({status:"passed",timestamp:new Date().toISOString()},null,2));
} catch(error) {
  const message=String(error.message);
  const reason=message.includes("Executable doesn't exist")?"browser-not-installed":message.includes("Permission denied")||message.includes("EPERM")?"environment-permission-denied":"browser-launch-failed";
  fs.writeFileSync("test-results/browser-launch.json",JSON.stringify({status:"failed",reason,timestamp:new Date().toISOString(),message},null,2));
  throw error;
}
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
fs.mkdirSync("test-results", { recursive: true });
try {
  await page.goto(process.env.FERN_TEST_URL || "http://127.0.0.1:4173");
  await page.getByPlaceholder("Enter demo").fill("wrong");
  await page.getByPlaceholder("Enter your password").fill("wrong");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await page.getByText("Use demo for both the username and password to enter this preview.").waitFor();
  await page.getByPlaceholder("Enter demo").fill("demo");
  await page.getByPlaceholder("Enter your password").fill("demo");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await page.locator("aside").waitFor();
  await page.screenshot({ path: "test-results/dashboard.png" });
  const nav = async (label) => {
    const toggle=page.getByRole("button",{name:"Show navigation",exact:true});
    if(await toggle.count())await toggle.click();
    await page.locator("aside").getByText(label, {exact:true}).click();
  };

  await nav("Pricing Template Generator");
  await page.getByRole("button", { name: "Add staff role", exact: true }).click();
  await page.getByRole("combobox", { name: "Currency", exact: true }).selectOption("EUR");
  await page.getByLabel("Price base date", { exact: true }).fill("01-01-2026");
  await page.getByLabel("Role name", { exact: true }).fill("Synthetic test role");
  await page.getByLabel("Hourly cost rate", { exact: true }).fill("40");
  await page.getByLabel("Annual allocated paid hours", { exact: true }).fill("1200");
  await page.getByLabel("Rate source / reconciliation rationale", { exact: true }).fill("Synthetic test input");
  await page.getByText("EUR 48,000.00", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Save BB baseline", exact: true }).click();
  await page.getByLabel("Hourly cost rate", { exact: true }).fill("50");
  await page.getByRole("button", { name: "Restore saved BB baseline (replace draft)", exact: true }).click();
  assert.equal(await page.getByLabel("Hourly cost rate", { exact: true }).inputValue(), "40");
  await page.getByLabel("Hourly cost rate", { exact: true }).fill("");
  assert.equal(await page.getByRole("button", { name: "Download BB calculation record", exact: true }).isDisabled(), true);

  await page.getByLabel("Hourly cost rate", { exact: true }).fill("40");
  await page.getByRole("button", { name: "Add maintenance task", exact: true }).click();
  for (const [label, value] of [
    ["Task description", "Synthetic task"], ["Task quantity", "10"],
    ["Units covered by each rate (e.g. 1 asset or 100 m²)", "1"],
    ["Events per active year (1–366)", "4"], ["First active year (1–25)", "1"],
    ["Repeat every (years, 1–25)", "1"], ["Labour minutes per rate unit per event", "30"],
    ["Task hourly labour rate", "40"], ["Materials cost per rate unit per event", "2"],
    ["Task source, units, schedule and overlap evidence", "Synthetic per-asset case, separate labour"]
  ]) await page.getByLabel(label, {exact:true}).fill(value);
  await page.getByText("Total: EUR 48,880.00", {exact:true}).waitFor();
  await page.getByText("EUR 244,400.00", {exact:true}).waitFor();
  await page.getByLabel("Task quantity", {exact:true}).fill("");
  assert.equal(await page.getByRole("button", {name:"Issue pricing baseline to both applications",exact:true}).isDisabled(),true);

  await page.getByLabel("Task quantity", {exact:true}).fill("10");
  for(const [label,value] of [["Baseline scope and exclusions","Synthetic staff and task scope"],["Baseline service tier and maintenance strategy","Synthetic quarterly"],["Baseline tax and commercial basis","Exclusive of tax"]]) await page.getByLabel(label,{exact:true}).fill(value);
  await page.getByRole("button",{name:"Add cost comparison",exact:true}).click();
  for(const [label,value] of [["Comparison name","Synthetic quote"],["Comparable cost","48880"],["Comparison price date (DD-MM-YYYY)","01-01-2026"],["Cost period (months)","12"],["Comparison source and adjustment evidence","Synthetic matching scope, price date and annual period"]]) await page.getByLabel(label,{exact:true}).fill(value);
  await page.getByRole("combobox",{name:"Comparison currency",exact:true}).selectOption("EUR");
  await page.getByRole("checkbox",{name:"I have reviewed matching scope, service level, tax basis and the first-year period against the current baseline (provisional, not approval).",exact:true}).check();
  await page.getByText("Same cost: EUR 0.00 · 0.00%",{exact:true}).waitFor();

  await page.getByRole("button",{name:"Issue pricing baseline to both applications",exact:true}).click();
  await nav("FM Pre-Contract / Pre-Tender Assessment");
  await page.getByRole('button',{name:'Start new assessment',exact:true}).click();
  await page.getByLabel('Assessment name',{exact:true}).fill('Synthetic procurement assessment');
  await page.getByLabel('Required decision date (DD-MM-YYYY)',{exact:true}).fill('31-02-2026');
  await page.getByRole('button',{name:'Save draft',exact:true}).click();
  await page.getByText('Use a real date in DD-MM-YYYY format, or leave it blank if unknown.',{exact:true}).waitFor();
  await page.getByLabel('Required decision date (DD-MM-YYYY)',{exact:true}).fill('30-09-2026');
  await page.getByRole('button',{name:'3. Pricing evidence',exact:true}).click();
  await page.getByRole("button",{name:"Load issued pricing baselines",exact:true}).click();
  await page.getByRole("combobox",{name:"Pricing version",exact:true}).selectOption({index:1});
  await page.getByRole("heading",{name:"Pre-contract cost comparison from issued pricing",exact:true}).waitFor();
  await page.getByText("0 (0.00%)",{exact:true}).waitFor();
  await page.getByRole('button',{name:'4. Service alternatives',exact:true}).click();
  await page.getByRole('button',{name:'Add service alternative',exact:true}).click();
  await page.getByLabel('Alternative name',{exact:true}).fill('Synthetic hybrid option');
  await page.getByLabel('Alternative service model',{exact:true}).selectOption('IFM Hybrid');
  await page.getByLabel('Alternative service tier',{exact:true}).selectOption('Plus');

  await page.getByRole('button',{name:'Save draft',exact:true}).click();
  await page.getByRole('button',{name:'Assessment list',exact:true}).click();
  await page.getByRole('button',{name:'Start new assessment',exact:true}).click();
  await page.getByLabel('Assessment name',{exact:true}).fill('Second synthetic assessment');
  await page.getByRole('button',{name:'Save draft',exact:true}).click();
  await page.getByRole('button',{name:'Assessment list',exact:true}).click();
  await page.getByRole('button',{name:'Continue Synthetic procurement assessment',exact:true}).click();
  assert.equal(await page.getByLabel('Required decision date (DD-MM-YYYY)',{exact:true}).inputValue(),'30-09-2026');
  await page.getByRole('button',{name:'4. Service alternatives',exact:true}).click();
  assert.equal(await page.getByLabel('Alternative name',{exact:true}).inputValue(),'Synthetic hybrid option');
  assert.equal(await page.getByLabel('Alternative service tier',{exact:true}).inputValue(),'Plus');
  await page.getByRole('button',{name:'3. Pricing evidence',exact:true}).click();
  await page.getByRole('button',{name:'Load issued pricing baselines',exact:true}).click();
  await page.getByText("0 (0.00%)",{exact:true}).waitFor();

  await nav("Lifecycle & Asset Analysis");
  await page.getByRole("combobox",{name:"Lifecycle currency",exact:true}).selectOption("EUR");
  await page.getByLabel("End year",{exact:true}).fill("2030");
  await page.getByLabel("Cost basis and scope assumptions",{exact:true}).fill("Synthetic EUR 01-01-2026; pricing separate from asset costs");
  await page.getByRole("button",{name:"Add asset",exact:true}).click();
  for(const [label,value] of [["Asset classification code","test"],["Description","Synthetic validation asset"],["Renewal unit","each"],["Renewal quantity","2"],["Reference service life (years)","5"],["Life factors (comma separated)","1"],["First renewal year","2030"],["Renewal extent (0–1)","1"],["Direct renewal rate (selected currency/unit)","100"],["Maintenance quantity","2"],["Maintenance unit","each"],["Maintenance task rate (selected currency/unit/visit)","10"],["Maintenance visits per year","2"],["Source and assumptions","Synthetic test only"]]) await page.getByLabel(label,{exact:true}).fill(value);
  await page.getByRole("button",{name:"Load issued pricing baselines",exact:true}).click();
  await page.getByRole("combobox",{name:"Pricing version",exact:true}).selectOption({index:1});
  await page.getByLabel("Price basis, scope and overlap evidence",{exact:true}).fill("Synthetic matching date, currency, tax basis and non-overlapping scope");
  const confirm=page.getByRole("checkbox",{name:"I reviewed matching price/tax basis, period and scope and the selected overlap treatment (provisional).",exact:true});
  await confirm.check();
  await page.getByText("Combined horizon total: EUR 244,800.00",{exact:true}).waitFor();
  await page.getByRole("combobox",{name:"Pricing overlap treatment",exact:true}).selectOption("replace-maintenance");
  await confirm.check();
  await page.getByText("Combined horizon total: EUR 244,600.00",{exact:true}).waitFor();
  await page.getByRole("button",{name:"Save combined assessment review",exact:true}).click();
  await page.getByLabel("Price basis, scope and overlap evidence",{exact:true}).fill("Changed draft");
  await page.getByRole("button",{name:"Restore combined assessment review (replace draft)",exact:true}).click();
  await page.getByText("Combined horizon total: EUR 244,600.00",{exact:true}).waitFor();
  await page.getByLabel("Economic country / location",{exact:true}).fill("Synthetic location");
  await page.getByLabel("Annual inflation (%)",{exact:true}).fill("0");
  await page.getByLabel("Annual nominal discount rate (%)",{exact:true}).fill("0");
  await page.getByRole("combobox",{name:"Cash-flow timing",exact:true}).selectOption("year-end");
  await page.getByLabel("Economic rate sources and applicability",{exact:true}).fill("Synthetic zero rates only");
  await page.getByText("Undiscounted cash flow: EUR 400.00 · Net present cost: EUR 400.00",{exact:true}).waitFor();
  await page.getByRole("button",{name:"Add economic sensitivity case",exact:true}).click();
  await page.getByLabel("Sensitivity case name",{exact:true}).fill("Synthetic inflation");
  await page.getByLabel("Sensitivity inflation (%)",{exact:true}).fill("10");
  await page.getByLabel("Sensitivity nominal discount (%)",{exact:true}).fill("0");
  await page.getByLabel("Sensitivity rationale and source",{exact:true}).fill("Synthetic stress case only");
  await page.getByText("Case NPC: EUR 537.02 · Change from baseline: EUR 137.02 (34.26%)",{exact:true}).waitFor();
  await confirm.check();
  const economicDownload=page.waitForEvent("download");
  await page.getByRole("button",{name:"Download combined economic cash-flow CSV",exact:true}).click();
  const economicFile=await economicDownload;
  const economicText=fs.readFileSync(await economicFile.path(),"utf8");
  assert.match(economicText,/"Currency","EUR"/);
  assert.match(economicText,/"Total","244600","244600","244600"/);
  assert.match(economicText,/"Pricing issue ID"/);
  const downloaded=page.waitForEvent("download");
  await page.getByRole("button",{name:"Download combined pricing and Lifecycle record",exact:true}).click();
  const download=await downloaded;const record=JSON.parse(fs.readFileSync(await download.path(),"utf8"));
  assert.equal(record.result.total,244600);assert.equal(record.result.currency,"EUR");assert.equal(record.issue.baseline.currency,"EUR");
  await page.getByRole("combobox",{name:"Lifecycle currency",exact:true}).selectOption("USD");
  await page.getByText("Pricing and Lifecycle currencies must match; no automatic currency conversion is applied.",{exact:true}).waitFor();

  for (const [title, preview] of [
    ["Lifecycle & Asset Analysis", /Preview Lifecycle Assessment Report/],
    ["Pricing Template Generator", /Preview Pricing Assessment Report/],
    ["FM Mobilisation & Transition Tracker", /Preview Launch Assurance Report/],
  ]) {
    await nav(title);
    await page.getByRole("heading", { name: title, exact: true }).waitFor();
    if (title === "FM Mobilisation & Transition Tracker") {
      await page.getByRole('button',{name:'Start a new plan',exact:true}).click();
      await page.getByLabel('Launch plan name',{exact:true}).fill('Synthetic transition');
      await page.getByRole('combobox',{name:'Mobilisation / transition type',exact:true}).selectOption('Bring services in-house');
      await page.getByRole('button',{name:'Next: Delivery arrangement',exact:true}).click();
      await page.getByRole('combobox',{name:'Current delivery model',exact:true}).selectOption('IFM');
      await page.getByRole('combobox',{name:'Target delivery model',exact:true}).selectOption('Full Blue Badge');
      await page.getByRole('button',{name:'Next: Affected scope',exact:true}).click();
      await page.getByRole('button',{name:'Next: Review',exact:true}).click();
      await page.getByRole('button',{name:'Save draft and open tasks',exact:true}).click();
      await page.getByRole('button',{name:'Add launch task',exact:true}).click();
      await page.getByLabel('Task description',{exact:true}).fill('Synthetic mobilisation task');
      await page.getByLabel('Task status',{exact:true}).selectOption('Complete');
      assert.equal(await page.getByLabel('Task status',{exact:true}).inputValue(),'Not started');
      await page.getByText('Enter the responsible owner.',{exact:true}).waitFor();
      await page.getByLabel('Responsible owner',{exact:true}).fill('Synthetic owner');
      await page.getByLabel('Deadline (DD-MM-YYYY)',{exact:true}).fill('07-09-2026');
      await page.getByLabel('Evidence reference / progress or blocker notes',{exact:true}).fill('Synthetic evidence');
      await page.getByLabel('Task status',{exact:true}).selectOption('Complete');
      await page.getByRole('button',{name:'Save draft',exact:true}).click();
      await nav('Home'); await nav(title);
      await page.getByRole('button',{name:'Continue saved plan',exact:true}).click();
      await page.getByRole('button',{name:/Synthetic mobilisation task/}).click();
      assert.equal(await page.getByLabel('Task description',{exact:true}).inputValue(),'Synthetic mobilisation task');
      await page.getByRole('button',{name:'Remove task 1',exact:true}).click();
      await page.getByRole('button',{name:'Confirm removal',exact:true}).click();
      await page.getByRole('button',{name:'Undo last removal',exact:true}).click();
      await page.getByRole('button',{name:'Save draft',exact:true}).click();
      await page.getByText('Backups and recovery',{exact:true}).click();
      const backupPromise=page.waitForEvent('download');
      await page.getByRole('button',{name:'Download launch plan backup',exact:true}).click();
      const backup=await backupPromise;
      const record=JSON.parse(fs.readFileSync(await backup.path(),'utf8'));
      assert.equal(record.tasks[0].status,'Complete');
      assert.equal(record.context.targetModel,'Full Blue Badge');
      assert.equal(record.context.transitionType,'Bring services in-house');
      assert.ok(record.savedAt);
      await page.getByText('About readiness and approvals — planned governance',{exact:true}).click();
    }
    if (title === "Lifecycle & Asset Analysis") {
      await page.getByRole("combobox",{name:"Lifecycle currency",exact:true}).selectOption("EUR");
      assert.equal(await page.getByRole("combobox",{name:"Lifecycle currency",exact:true}).inputValue(),"EUR");
      await page
        .getByText(
          "Planned workflow and governance reference (not connected to this working assessment)",
          { exact: true },
        )
        .click();
    }
    if (title === "Pricing Template Generator")
      await page
        .getByText("Planned pricing workflow and governance reference", { exact: true })
        .click();
    const button = page.getByRole("button", { name: preview });
    await button.waitFor();
    await button.click();
    const collapse = page.getByRole("button", {
      name: /Collapse|Hide Assessment Report/,
    });
    assert.equal(await collapse.count(), 1, title + " report opens");
    await collapse.click();
    assert.equal(await button.count(), 1, title + " report closes");
    const exportButtons = page.getByRole("button", { name: /Export/ });
    for (const control of await exportButtons.all()) assert.equal(await control.isDisabled(), true);
  }
  const headings = await page.locator("main h2").allTextContents();
  const order = [
    "Launch Readiness Assessment",
    "Go-Live Review Readiness",
    "Go-Live Review Record",
    "Launch Human Review",
    "Launch Decision Record",
    "Launch Assurance Report",
  ];
  let last = -1;
  for (const label of order) {
    assert.equal(headings.filter((h) => h.trim() === label).length, 1, label);
    const index = headings.findIndex((h) => h.trim() === label);
    assert.ok(index > last, "Launch decision chain: " + label);
    last = index;
  }
  await nav("FM Contract & Service Model");
  await page.getByRole("heading", { name: "FM Contract & Service Model", exact: true }).waitFor();
  await nav("Home");
  await page.locator("main").getByText("Working Context", { exact: true }).waitFor();
  assert.deepEqual(errors, []);
  console.log(
    "PASS: demo login, five app destinations, four report previews, disabled exports, launch decision order and dashboard return.",
  );
} finally {
  await browser.close();
}

