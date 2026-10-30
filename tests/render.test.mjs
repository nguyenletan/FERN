import assert from "node:assert/strict";
import { after, test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
});
after(async () => server.close());
const props = {
  site: "BHX4",
  facilityType: "Fulfilment Centre",
  serviceModel: "IFM",
  tier: "Plus",
  region: "UK",
  onNavigate: () => {},
};

for (const [module, expected] of [
  ["lifecycle/LifecycleAssetAnalysisPage", "Lifecycle &amp; Asset Analysis"],
  ["pricing/PricingTemplateGeneratorPage", "Pricing Template Generator"],
  ["pre-contract/FMPreContractAssessmentPage", "FM Pre-Contract / Pre-Tender Assessment"],
  ["launch-tracker/IFMLaunchTrackerPage", "FM Mobilisation &amp; Transition Tracker"],
]) {
  test(`Workflow renders safely: ${module}`, async () => {
    const { default: Component } = await server.ssrLoadModule(`/apps/${module.split("/")[0]}/src/${module.split("/").slice(1).join("/")}.tsx`);
    const html = renderToStaticMarkup(React.createElement(Component, props));
    assert.ok(html.includes(expected));
    assert.ok(html.includes("BHX4"));
    assert.match(html, /not (?:yet )?available/i);
    if (module.startsWith("pricing/")) {
      assert.match(html, /<span[^>]*>Export Report<\/span>/);
    } else if (module.startsWith("pre-contract/")) {
      assert.match(html, /Start new assessment/);
      assert.match(html, /No formal approval/);
    } else {
      assert.match(html, /<button[^>]*disabled=""/);
    }
  });
}

test("Launch report expansion reveals the existing report structure without enabling export", async () => {
  const { default: Report } = await server.ssrLoadModule(
    "/apps/launch-tracker/src/sections/LaunchReportSection.tsx",
  );
  const closed = renderToStaticMarkup(
    React.createElement(Report, { launchReportOpen: false, setLaunchReportOpen: () => {} }),
  );
  const open = renderToStaticMarkup(
    React.createElement(Report, { launchReportOpen: true, setLaunchReportOpen: () => {} }),
  );
  assert.ok(open.length > closed.length);
  assert.ok(open.includes("Future Report Structure"));
  assert.ok(open.includes("NOT READY FOR FINAL REPORT"));
  assert.match(open, /<button[^>]*disabled=""/);
});

test('Alternatives comparison distinguishes analyst input from approval and flags missing rationale',async()=>{const {AlternativesComparison}=await server.ssrLoadModule('/apps/pre-contract/src/AlternativesEditor.tsx');const {newAssessment}=await server.ssrLoadModule('/packages/pre-contract-core/src/assessment.ts');const {newAlternative}=await server.ssrLoadModule('/packages/pre-contract-core/src/alternatives.ts');const assessment={...newAssessment('TEST','id'),alternatives:[{...newAlternative('a'),name:'Example hybrid',model:'IFM Hybrid',tier:'Plus',disposition:'Shortlisted'}]};const html=renderToStaticMarkup(React.createElement(AlternativesComparison,{assessment}));assert.match(html,/Current arrangement/);assert.match(html,/Example hybrid/);assert.match(html,/Review rationale missing/);assert.match(html,/not an approved recommendation/);});


test("Standalone Pre-Contract requires facility confirmation before exposing assessments", async () => {
  const { default: App } = await server.ssrLoadModule("/apps/pre-contract/src/PreContractApp.tsx");
  const html = renderToStaticMarkup(React.createElement(App, { onSignOut: () => {} }));
  assert.match(html, /Choose your facility/);
  assert.match(html, /Select and confirm a facility/);
  assert.doesNotMatch(html, /Start new assessment|Pre-contract assessment workspace/);
  assert.doesNotMatch(html, /Demo context:|integrated FERN portal/);
  assert.match(html, /not automatically available here/);
});
