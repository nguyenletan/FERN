import test from "node:test";
import assert from "node:assert/strict";
import {
  blankAsset,
  emptyProject,
  calculate,
  parseProject,
} from "../packages/lifecycle-core/src/assetModel.ts";
import { emptyDetail, emptyMetadata } from "../packages/lifecycle-core/src/nrmStructure.ts";
import { elementalRows, elementalCsv } from "../packages/lifecycle-core/src/elementalReports.ts";
const fixture = () => ({
  ...emptyProject("TEST"), currency:"GBP",
  start: "2030",
  end: "2031",
  basis: "Test direct rate basis",
  metadata: {
    ...emptyMetadata(),
    title: "Test",
    planNumber: "P1",
    priceBaseDate: "2026",
    gifa: "100",
  },
  catalog: ["2", "2.1", "2.1.1"].map((code, i) => ({
    code,
    level: String(i + 1),
    group: "Superstructure",
    element: "Frame",
    subElement: "Test",
    assetType: "",
    product: "",
    renewalUnit: "each",
    maintenanceUnit: "each",
    workPackage: "",
  })),
  assets: [
    {
      ...blankAsset("A"),
      description: "Synthetic",
      code: "2.1.1",
      quantity: "2",
      unit: "each",
      rsl: "5",
      factors: "1",
      firstYear: "2030",
      extent: "1",
      rate: "100",
      maintenanceUnit: "each",
      maintenanceQuantity: "2",
      maintenanceRate: "10",
      frequency: "2",
      evidence: "Synthetic fixture",
    },
  ],
});
test("L1 and L2 reports reconcile R and M with the annual profile", () => {
  const p = fixture(),
    r = calculate(p);
  for (const level of [1, 2]) {
    const rows = elementalRows(p, r, level);
    assert.equal(
      rows.reduce((s, r) => s + r.renewal, 0),
      200,
    );
    assert.equal(
      rows.reduce((s, r) => s + r.maintenance, 0),
      80,
    );
    assert.equal(rows[0].code, level === 1 ? "2" : "2.1");
  }
  assert.match(elementalCsv(p, r, 1), /"Combined per m2 per annum","1.40"/);
});
test("Multiple tasks replace legacy task fields without double counting", () => {
  const p = fixture();
  p.details = {
    A: {
      ...emptyDetail(),
      tasks: [
        {
          id: "T1",
          description: "Task1",
          standard: "Test",
          reference: "",
          quantity: "2",
          unit: "each",
          rate: "3",
          frequency: "4",
          source: "Test",
        },
        {
          id: "T2",
          description: "Task2",
          standard: "Test",
          reference: "",
          quantity: "1",
          unit: "each",
          rate: "5",
          frequency: "2",
          source: "Test",
        },
      ],
    },
  };
  assert.equal(calculate(p).maintenance, 68);
  assert.deepEqual(parseProject(JSON.stringify(p)), p);
});
test("Parent/component overlapping scope blocks costs until explicitly excluded", () => {
  const p = fixture();
  p.assets.push({ ...p.assets[0], id: "B" });
  p.details = { B: { ...emptyDetail(), parentId: "A" } };
  assert.equal(calculate(p).renewal, null);
  p.details.A = { ...emptyDetail(), renewalScope: false, maintenanceScope: false };
  assert.equal(calculate(p).renewal, 200);
});
test("Absent mapping blocks elemental exports and missing GIFA stays unavailable", () => {
  const p = fixture();
  p.catalog = [];
  assert.throws(() => elementalRows(p, calculate(p), 1), /reference/);
  const q = fixture();
  q.metadata.gifa = "";
  assert.match(elementalCsv(q, calculate(q), 1), /Not available/);
  q.metadata.gifa = "0";
  assert.throws(() => elementalCsv(q, calculate(q), 1), /GIFA/);
});
test("Maintenance-only scope does not require renewal quantities or life", () => {
  const p = fixture();
  p.details = { A: { ...emptyDetail(), renewalScope: false } };
  p.assets[0].rsl = "";
  p.assets[0].quantity = "";
  const r = calculate(p);
  assert.equal(r.renewal, 0);
  assert.equal(r.maintenance, 80);
});

test('Elemental export labels costs in the selected assessment currency',()=>{const p={...fixture(),currency:'USD'};const csv=elementalCsv(p,calculate(p),1);assert.match(csv,/Cost USD/);assert.doesNotMatch(csv,/Cost GBP/);});
