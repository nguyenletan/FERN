import JSZip from "jszip";
import { XMLParser } from "fast-xml-parser";
export interface Cell {
  value: string;
  formula: string;
}
export interface Sheet {
  name: string;
  rows: Record<number, Record<string, Cell>>;
}
const arr = (v: any): any[] => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
const text = (v: any): string =>
  v === undefined || v === null ? "" : typeof v === "object" ? String(v["#text"] ?? "") : String(v);
function rich(v: any): string {
  return v?.t !== undefined
    ? text(v.t)
    : arr(v?.r)
        .map((r) => text(r.t))
        .join("");
}
export async function readWorkbook(
  data: ArrayBuffer | Uint8Array,
): Promise<{ sheets: Sheet[]; macros: boolean }> {
  if (data.byteLength > 15_000_000) throw new Error("Excel import limit is 15 MB.");
  const zip = await JSZip.loadAsync(data);
  let total = 0;
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@",
    parseTagValue: false,
    parseAttributeValue: false,
    trimValues: false,
    processEntities: true,
  });
  async function xml(path: string): Promise<any> {
    const f = zip.file(path);
    if (!f) throw new Error(`Workbook part missing: ${path}`);
    // Stream to a bounded buffer, rather than expanding an arbitrary zip entry in one operation.
    const value = await new Promise<string>((resolve, reject) => {
      let s = "";
      const stream = (
        f as unknown as {
          internalStream(type: "string"): {
            on(event: string, cb: (chunk: any) => void): any;
            pause(): void;
            resume(): void;
          };
        }
      ).internalStream("string");
      stream
        .on("data", (chunk: string) => {
          s += chunk;
          total += chunk.length;
          if (s.length > 12_000_000 || total > 40_000_000) {
            stream.pause();
            reject(new Error("Workbook expanded XML exceeds import limit."));
          }
        })
        .on("error", reject)
        .on("end", () => resolve(s))
        .resume();
    });
    if (/<!DOCTYPE|<!ENTITY/i.test(value))
      throw new Error("DTD/entity declarations are not supported.");
    return parser.parse(value);
  }
  const wb = await xml("xl/workbook.xml"),
    rels = arr((await xml("xl/_rels/workbook.xml.rels")).Relationships?.Relationship);
  const strings = zip.file("xl/sharedStrings.xml")
    ? arr((await xml("xl/sharedStrings.xml")).sst?.si).map(rich)
    : [];
  const sheets: Sheet[] = [];
  for (const sh of arr(wb.workbook?.sheets?.sheet)) {
    const rel = rels.find((r) => r["@Id"] === sh["@r:id"]);
    if (!rel || rel["@TargetMode"] === "External")
      throw new Error("External or missing worksheet relationship.");
    const target = String(rel["@Target"]);
    const path = target.startsWith("/") ? target.slice(1) : "xl/" + target;
    if (path.includes("..")) throw new Error("Unsupported relative worksheet path.");
    const parsed = await xml(path),
      rows: Sheet["rows"] = {};
    for (const row of arr(parsed.worksheet?.sheetData?.row))
      for (const c of arr(row.c)) {
        const ref = String(c["@r"]),
          match = /^([A-Z]+)(\d+)$/.exec(ref);
        if (!match) continue;
        const n = Number(match[2]);
        if (n > 20000) throw new Error("Worksheet exceeds 20,000 rows.");
        const type = c["@t"];
        const value =
          type === "s"
            ? (strings[Number(text(c.v))] ?? "")
            : type === "inlineStr"
              ? rich(c.is)
              : text(c.v);
        (rows[n] ??= {})[match[1]] = {
          value,
          formula: c.f !== undefined ? text(c.f) || "[shared formula]" : "",
        };
      }
    sheets.push({ name: String(sh["@name"]), rows });
  }
  return { sheets, macros: !!zip.file("xl/vbaProject.bin") };
}
