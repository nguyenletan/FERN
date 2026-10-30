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
  await page.locator("aside").waitFor({state:"attached"});
  await page.screenshot({ path: "test-results/dashboard.png" });
  const nav = async (label) => {
    const toggle=page.getByRole("button",{name:"Show navigation",exact:true});
    if(await toggle.count())await toggle.click();
    await page.locator("aside").getByText(label, {exact:true}).click();
  };


  assert.equal(await page.getByText("BHX4", {exact:true}).count(),0);
  // WEB-SCOPE-01: five "Coming soon" cards each open an introduction page that describes, but never launches, the application.
  const cards=page.locator(".fern-app-grid article");
  assert.equal(await cards.count(),5);
  assert.equal(await cards.getByText("Coming soon",{exact:true}).count(),5);
  assert.equal(await page.locator(".fern-app-grid").locator("button, a").count(),5);
  await page.getByRole("button",{name:"About Pricing Template Generator",exact:true}).click();
  await page.getByRole("heading",{level:1,name:"Pricing Template Generator",exact:true}).waitFor();
  assert.ok(new URL(page.url()).searchParams.get("page")==="pricing");
  assert.equal(await page.locator(".fern-app-page").getByText("Coming soon",{exact:true}).count(),1);
  assert.equal(await page.locator(".fern-app-page").getByRole("button",{name:/open|launch|start/i}).count(),0);
  await page.locator(".fern-app-page-related").getByRole("button",{name:"Lifecycle & Asset Analysis",exact:true}).click();
  await page.getByRole("heading",{level:1,name:"Lifecycle & Asset Analysis",exact:true}).waitFor();
  await page.goBack();
  await page.getByRole("heading",{level:1,name:"Pricing Template Generator",exact:true}).waitFor();
  await page.getByRole("button",{name:"Return to Home",exact:true}).click();
  await page.locator(".fern-hero").waitFor();
  await nav("FM Overview");
  assert.equal(await page.getByText("Selected Facility",{exact:true}).count(),0);
  assert.equal(await page.getByText("BHX4",{exact:true}).count(),0);
  await nav("Leadership & Policy");
  assert.equal(await page.getByRole("heading",{name:"Choose your facility",exact:true}).count(),0);
  await page.setViewportSize({width:390,height:844});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true);
  // Review-fix acceptance: history, lessons and deep links survive demo sign-in.
  await page.locator('footer').getByRole('button',{name:'Service models',exact:true}).click();
  await page.waitForURL('**page=learn&lesson=service-models-explained');
  assert.equal(await page.locator('details[open] > summary').getByText('Service Models Explained',{exact:true}).count(),1);
  await page.locator('footer').getByRole('button',{name:'Help & guidance',exact:true}).click();
  await page.waitForURL('**page=help');
  await page.goBack();
  await page.getByRole('heading',{name:'Learn at your own pace',exact:true}).waitFor();
  await page.reload();
  await page.getByRole('button',{name:'Preview help',exact:true}).click();
  await page.getByRole('region',{name:'Preview help',exact:true}).waitFor();
  assert.equal(await page.getByRole('checkbox',{name:'Remember me'}).count(),0);
  await page.getByPlaceholder('Enter demo').fill('demo');
  await page.getByPlaceholder('Enter your password').fill('demo');
  await page.getByRole('button',{name:'Sign in',exact:true}).click();
  await page.getByRole('heading',{name:'Learn at your own pace',exact:true}).waitFor();
  assert.equal(await page.locator('details[open] > summary').getByText('Service Models Explained',{exact:true}).count(),1);
  assert.deepEqual(errors,[]);
  fs.writeFileSync("test-results/website-review.json",JSON.stringify({status:"passed",scope:"Website application and facility isolation; basic mobile width",timestamp:new Date().toISOString()},null,2));

} finally {
  await browser.close();
}

