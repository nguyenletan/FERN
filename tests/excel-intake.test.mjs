import test from "node:test";
import assert from "node:assert/strict";
import JSZip from "jszip";
import { readWorkbook, mapWorkbook, mergeIntake } from "../packages/lifecycle-core/src/excelImport.ts";
import { emptyProject, parseProject, blankAsset } from "../packages/lifecycle-core/src/assetModel.ts";
const c = (value, formula = "") => ({ value, formula });
const sheet = () => ({
  name: "3. Asset Register",
  rows: {
    1: {
      A: c("#"),
      B: c("NRM3 Code"),
      C: c("Description"),
      I: c("Qty"),
      J: c("UoM Ren"),
      K: c("UoM Mnt"),
      L: c("RSL (OEM)"),
      M: c("RSL (CIBSE)"),
      N: c("Cond (1-4)"),
      O: c("Yr Installed"),
      P: c("Rate Ren (£)"),
      S: c("Adj Ren Yr"),
    },
    2: {
      A: c("01"),
      B: c("2.1.1"),
      C: c("Synthetic asset"),
      I: c("TBC"),
      J: c("each"),
      K: c("each"),
      L: c("5"),
      M: c("10"),
      S: c("2030", "O2+L2"),
    },
  },
});
test("Excel mapping preserves identifiers, missing data and source formulas without selecting life", () => {
  const i = mapWorkbook([sheet()], "test.xlsx", "TEST");
  const a = i.project.assets[0];
  assert.equal(a.id, "01");
  assert.equal(a.quantity, "TBC");
  assert.equal(a.rsl, "");
  assert.equal(a.firstYear, "");
  assert.equal(i.project.details["01"].oemLife, "5");
  assert.equal(i.project.details["01"].sourceCells["3. Asset Register!S2"].formula, "O2+L2");
  assert.ok(i.formulaCount > 0);
  assert.deepEqual(parseProject(JSON.stringify(i.project)), i.project);
});
test("Duplicate references reject the import instead of overwriting assets", () => {
  const s = sheet();
  s.rows[3] = { ...s.rows[2] };
  assert.throws(() => mapWorkbook([s], "test.xlsx", "TEST"), /duplicate/);
});
test("Preview merge preserves edits and attaches matching source detail", () => {
  const i = mapWorkbook([sheet()], "test.xlsx", "TEST"),
    p = emptyProject("TEST");
  p.assets = [{ ...i.project.assets[0], quantity: "7" }];
  const merged = mergeIntake(p, i);
  assert.equal(merged.added, 0);
  assert.equal(merged.skipped, 1);
  assert.equal(merged.project.assets[0].quantity, "7");
  assert.equal(merged.project.details["01"].oemLife, "5");
});
test("Same reference with different code does not acquire source evidence", () => {
  const i = mapWorkbook([sheet()], "test.xlsx", "TEST"),
    p = emptyProject("TEST");
  p.assets = [{ ...i.project.assets[0], code: "different" }];
  assert.equal(mergeIntake(p, i).project.details["01"], undefined);
});
test("Template frequencies are summed and maintenance tasks kept separate", () => {
  const s = {
    name: "5. Maintenance Schedule",
    rows: {
      1: {
        A: c("#"),
        G: c("Task Description"),
        D: c("Qty"),
        H: c("D"),
        I: c("W"),
        J: c("M"),
        K: c("Q"),
        L: c("HY"),
        M: c("Y"),
        N: c("Unit Rate (£/visit)"),
      },
      2: { A: c("01"), G: c("Test inspection"), D: c("2"), I: c("1"), K: c("1"), N: c("10") },
    },
  };
  const i = mapWorkbook([sheet(), s], "test.xlsm", "TEST", true);
  assert.equal(i.project.details["01"].tasks[0].frequency, "56");
  assert.equal(i.project.details["01"].tasks[0].rate, "10");
  assert.ok(i.macros);
});
test("XML reader handles inline strings, cached formulas and ignores VBA binary", async () => {
  const z = new JSZip();
  z.file("xl/workbook.xml", '<workbook><sheets><sheet name="Test" r:id="r1"/></sheets></workbook>');
  z.file(
    "xl/_rels/workbook.xml.rels",
    '<Relationships><Relationship Id="r1" Target="worksheets/sheet1.xml"/></Relationships>',
  );
  z.file(
    "xl/worksheets/sheet1.xml",
    '<worksheet><sheetData><row r="1"><c r="A1" t="inlineStr"><is><t>001 &amp; test</t></is></c><c r="B1"><f>1+1</f><v>2</v></c></row></sheetData></worksheet>',
  );
  z.file("xl/vbaProject.bin", "not executable");
  const wb = await readWorkbook(await z.generateAsync({ type: "uint8array" }));
  assert.equal(wb.sheets[0].rows[1].A.value, "001 & test");
  assert.deepEqual(wb.sheets[0].rows[1].B, c("2", "1+1"));
  assert.equal(wb.macros, true);
});
test("Unsupported workbook and malformed structured backup are rejected", () => {
  assert.throws(() => mapWorkbook([{ name: "Other", rows: {} }], "test.xlsx", "TEST"));
  const p = emptyProject("TEST");
  p.details = { wrong: {} };
  assert.throws(() => parseProject(JSON.stringify(p)));
});

test("Legacy maintenance values matching the workbook allow task migration; edited values are retained", () => {
  const i = mapWorkbook([sheet()], "test.xlsx", "TEST");
  i.project.details["01"].tasks = [
    {
      id: "T",
      description: "Test",
      quantity: "TBC",
      unit: "each",
      rate: "TBC",
      frequency: "12",
      standard: "",
      reference: "",
      source: "test",
    },
  ];
  const p = emptyProject("TEST");
  p.assets = [
    {
      ...i.project.assets[0],
      maintenanceQuantity: "TBC",
      maintenanceUnit: "each",
      maintenanceRate: "TBC",
      frequency: "12",
    },
  ];
  assert.equal(mergeIntake(p, i).project.details["01"].tasks.length, 1);
  p.assets[0].maintenanceRate = "123";
  const merged = mergeIntake(p, i).project;
  assert.equal(merged.details["01"].tasks.length, 0);
  assert.equal(merged.assets[0].maintenanceRate, "123");
});
