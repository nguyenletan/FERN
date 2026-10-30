import test from "node:test";
import assert from "node:assert/strict";
import {
  newAssessment,
  saveAssessment,
  readAssessments,
  parseAssessment,
  dateValid,
  issues,
} from "../packages/pre-contract-core/src/assessment.ts";
const store = () => {
  const m = new Map();
  return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v) };
};
const draft = (id = "a", site = "TEST") => ({
  ...newAssessment(site, id),
  name: "Synthetic " + id,
});
const now = "2026-09-07T12:00:00.000Z";
test("Named assessments coexist for one site and preserve independent pricing references", () => {
  const s = store();
  saveAssessment(s, { ...draft("a"), pricingId: "issue-a" }, now);
  saveAssessment(s, { ...draft("b"), pricingId: "issue-b" }, now);
  assert.deepEqual(
    readAssessments(s, "TEST").map((a) => [a.id, a.pricingId]),
    [
      ["a", "issue-a"],
      ["b", "issue-b"],
    ],
  );
  assert.equal(readAssessments(s, "OTHER").length, 0);
});
test("Assessment saves reject stale writes while allowing changes to another assessment", () => {
  const s = store(),
    a = saveAssessment(s, draft(), now);
  saveAssessment(s, draft("b"), now);
  const updated = saveAssessment(s, { ...a, scope: "Changed" }, now);
  assert.equal(updated.revision, 2);
  assert.throws(() => saveAssessment(s, { ...a, scope: "stale" }, now), /another tab/);
  assert.equal(readAssessments(s, "TEST").find((a) => a.id === "a").scope, "Changed");
});
test("Provisional missing context can be saved but name and entered date must be valid", () => {
  const s = store();
  assert.equal(saveAssessment(s, draft(), now).model, "");
  assert.throws(() => saveAssessment(s, { ...draft("b"), name: "  " }, now));
  assert.throws(() => saveAssessment(s, { ...draft("b"), decisionDate: "31-02-2026" }, now));
  assert.equal(readAssessments(s, "TEST").length, 1);
  assert.ok(dateValid("29-02-2028"));
  assert.ok(!dateValid("29-02-2027"));
  assert.ok(!dateValid("2026-09-07"));
  assert.equal(issues(draft()).length, 0);
});
test("Assessment parser rejects foreign sites, malformed fields, approval model and unsafe revision", () => {
  for (const change of [
    { site: "OTHER" },
    { revision: -1 },
    { revision: 1.2 },
    { owner: 42 },
    { model: "Approved" },
    { tier: "Gold" },
    { savedAt: "yesterday" },
  ])
    assert.throws(() => parseAssessment(JSON.stringify({ ...draft(), ...change }), "TEST"));
});
test("A corrupt library and failed storage are not reported as successful saves", () => {
  const s = store();
  s.setItem("fern.precontract.assessments.v1.TEST", "broken");
  assert.throws(() => saveAssessment(s, draft(), now));
  assert.equal(s.getItem("fern.precontract.assessments.v1.TEST"), "broken");
  assert.throws(
    () =>
      saveAssessment(
        {
          getItem: () => null,
          setItem: () => {
            throw Error("quota");
          },
        },
        draft(),
        now,
      ),
    /quota/,
  );
});
test("Legacy pricing recipient keys are not changed by assessment save", () => {
  const s = store();
  s.setItem("legacy-pricing-key", "original");
  saveAssessment(s, { ...draft(), pricingId: "selected" }, now);
  assert.equal(s.getItem("legacy-pricing-key"), "original");
  const a = readAssessments(s, "TEST")[0];
  assert.equal(a.pricingId, "selected");
});

test("Legacy assessments gain empty alternatives without losing existing fields", () => {
  const old = draft();
  delete old.alternatives;
  const restored = parseAssessment(JSON.stringify(old), "TEST");
  assert.deepEqual(restored.alternatives, []);
  assert.equal(restored.name, old.name);
});
test("Alternatives persist independently of baseline and between assessments", async () => {
  const { newAlternative } = await import("../packages/pre-contract-core/src/alternatives.ts");
  const s = store();
  const a = saveAssessment(
    s,
    {
      ...draft(),
      model: "Full Blue Badge",
      alternatives: [
        {
          ...newAlternative("one"),
          name: "Hybrid",
          model: "IFM Hybrid",
          tier: "Plus",
          strategies: "Preventive and condition based",
          gaps: "OEM confirmation pending",
        },
      ],
    },
    now,
  );
  saveAssessment(s, draft("other"), now);
  const restored = readAssessments(s, "TEST").find((x) => x.id === a.id);
  assert.equal(restored.model, "Full Blue Badge");
  assert.equal(restored.alternatives[0].tier, "Plus");
  assert.equal(restored.alternatives[0].gaps, "OEM confirmation pending");
  assert.deepEqual(readAssessments(s, "TEST").find((x) => x.id === "other").alternatives, []);
});
test("Malformed, duplicate or unsupported alternatives reject without overwriting", async () => {
  const { newAlternative } = await import("../packages/pre-contract-core/src/alternatives.ts");
  const s = store();
  const original = saveAssessment(s, draft(), now);
  for (const alternatives of [
    [newAlternative("x"), newAlternative("x")],
    [{ ...newAlternative("x"), model: "Invented" }],
    [{ ...newAlternative("x"), disposition: "Approved" }],
    Array.from({ length: 21 }, (_, i) => newAlternative(String(i))),
    null,
  ]) {
    assert.throws(() => saveAssessment(s, { ...original, alternatives }, now));
    assert.equal(readAssessments(s, "TEST")[0].revision, 1);
  }
});
