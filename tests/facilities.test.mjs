import test from "node:test";
import assert from "node:assert/strict";
import {
  addFacility,
  readFacilities,
  discoverSites,
  facilityHistory,
} from "../packages/platform/src/facilities/facilities.ts";
const store = () => {
  const m = new Map();
  return {
    getItem: (k) => m.get(k) ?? null,
    setItem: (k, v) => m.set(k, v),
    key: (i) => [...m.keys()][i],
    get length() {
      return m.size;
    },
  };
};
const facility = (site, id = site) => ({
  id,
  site,
  name: "Example building",
  country: "UK",
  region: "UK",
  facilityType: "Warehouse",
  location: "",
  buildingStatus: "Existing building",
  serviceModel: "",
  tier: "",
  createdAt: "2026-09-07T12:00:00Z",
});
test("Facility registration normalizes codes and rejects duplicate identity without overwriting", () => {
  const s = store();
  addFacility(s, facility(" test "));
  assert.equal(readFacilities(s)[0].site, "TEST");
  assert.throws(() => addFacility(s, facility("test", "other")));
  assert.equal(readFacilities(s).length, 1);
});
test("Corrupt facility register is preserved and prevents registration", () => {
  const s = store();
  s.setItem("fern.facilities.v1", "broken");
  assert.throws(() => addFacility(s, facility("TEST")));
  assert.equal(s.getItem("fern.facilities.v1"), "broken");
});
test("History discovers legacy sites and never attributes another site project to selection", () => {
  const s = store();
  s.setItem("fern.lifecycle.project.v1", JSON.stringify({ site: "OLD", assets: [] }));
  s.setItem(
    "fern.precontract.assessments.v1.NEW",
    JSON.stringify([{ site: "NEW", name: "Example" }]),
  );
  assert.ok(discoverSites(s).includes("OLD"));
  assert.ok(discoverSites(s).includes("NEW"));
  assert.equal(
    facilityHistory(s, "NEW").find((x) => x.title === "Lifecycle project").records.length,
    0,
  );
  assert.equal(
    facilityHistory(s, "OLD").find((x) => x.title === "Lifecycle project").records.length,
    1,
  );
});
test("Site-specific lifecycle record takes precedence; malformed and foreign records remain unavailable", () => {
  const s = store();
  s.setItem("fern.lifecycle.project.v1", JSON.stringify({ site: "TEST", name: "old" }));
  s.setItem("fern.lifecycle.project.v2.TEST", JSON.stringify({ site: "TEST", name: "new" }));
  assert.equal(
    facilityHistory(s, "TEST").find((x) => x.title === "Lifecycle project").records[0].name,
    "new",
  );
  s.setItem("fern.pricing.issues.v1.TEST", JSON.stringify([{ baseline: { site: "OTHER" } }]));
  assert.ok(facilityHistory(s, "TEST").find((x) => x.title === "Issued pricing versions").error);
});

test("Facility search supports postcode spacing, address, names and multiple terms", async () => {
  const { searchFacilities } = await import("../packages/platform/src/facilities/facilities.ts");
  const list = [
    {
      ...facility("EX-1"),
      name: "Example Depot",
      location: "10 Sample Street",
      postcode: "AB1 2CD",
    },
  ];
  assert.equal(searchFacilities(list, "ab12cd").length, 1);
  assert.equal(searchFacilities(list, "depot sample").length, 1);
  assert.equal(searchFacilities(list, "EX1").length, 1);
  assert.equal(searchFacilities(list, "unknown").length, 0);
});
test("Duplicate suggestions retain multiple buildings at the same postcode for user review", async () => {
  const { possibleDuplicates } = await import("../packages/platform/src/facilities/facilities.ts");
  const list = [
    { ...facility("EX1"), postcode: "AB1 2CD" },
    { ...facility("EX2"), postcode: "AB1 2CD" },
  ];
  assert.equal(
    possibleDuplicates(list, {
      site: "NEW",
      name: "Different",
      location: "",
      country: "UK",
      postcode: "ab12cd",
    }).length,
    2,
  );
});
test("Old facility records read unchanged while invalid structured address fields are rejected", () => {
  const s = store();
  addFacility(s, facility("TEST"));
  assert.equal(readFacilities(s)[0].postcode, undefined);
  s.setItem(
    "fern.facilities.v1",
    JSON.stringify([{ ...facility("TEST"), postcode: { bad: true } }]),
  );
  assert.throws(() => readFacilities(s));
});
