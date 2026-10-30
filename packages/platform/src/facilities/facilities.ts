export type Facility = {
  id: string;
  site: string;
  name: string;
  country: string;
  region: string;
  facilityType: string;
  location: string;
  buildingStatus: string;
  serviceModel: string;
  tier: string;
  createdAt: string;
  postcode?: string;
  city?: string;
  state?: string;
  street?: string;
  buildingNumber?: string;
  source?: "manual" | "google";
  googlePlaceId?: string;
};
type Store = Pick<Storage, "getItem" | "setItem" | "key" | "length">;
const registryKey = "fern.facilities.v1";
export function readFacilities(s: Pick<Store, "getItem">): Facility[] {
  const raw = s.getItem(registryKey);
  if (!raw) return [];
  const a = JSON.parse(raw);
  if (!Array.isArray(a) || a.length > 1000)
    throw Error("Facility register is invalid. Existing records have been retained.");
  const ids = new Set(),
    codes = new Set();
  for (const f of a) {
    if (
      !f ||
      [
        "id",
        "site",
        "name",
        "country",
        "region",
        "facilityType",
        "location",
        "buildingStatus",
        "serviceModel",
        "tier",
        "createdAt",
      ].some((k) => typeof f[k] !== "string") ||
      ["postcode", "city", "state", "street", "buildingNumber", "googlePlaceId"].some(
        (k) => f[k] !== undefined && (typeof f[k] !== "string" || f[k].length > 200),
      ) ||
      !f.id ||
      !f.site ||
      ids.has(f.id) ||
      codes.has(f.site.toUpperCase())
    )
      throw Error("Facility register is invalid.");
    ids.add(f.id);
    codes.add(f.site.toUpperCase());
  }
  return a;
}
export function addFacility(s: Pick<Store, "getItem" | "setItem">, f: Facility) {
  const list = readFacilities(s);
  const next = { ...f, site: f.site.trim().toUpperCase(), name: f.name.trim() };
  if (
    !/^[A-Z0-9][A-Z0-9_-]{0,39}$/.test(next.site) ||
    !next.name ||
    !next.country.trim() ||
    !next.facilityType.trim() ||
    !next.id
  )
    throw Error(
      "Enter a site code, facility name, country and facility type. Site codes use letters, numbers, hyphens or underscores.",
    );
  if (list.some((x) => x.site.toUpperCase() === next.site || x.id === next.id))
    throw Error("This facility already exists. Select its existing record.");
  if (list.length >= 1000) throw Error("Local facility limit reached.");
  s.setItem(registryKey, JSON.stringify([...list, next]));
  return next;
}
export function discoverSites(s: Store) {
  const sites = new Set<string>(["BHX4"]);
  for (let i = 0; i < s.length; i++) {
    const k = s.key(i) || "";
    for (const prefix of [
      "fern.precontract.assessments.v1.",
      "fern.pricing.issues.v1.",
      "fern.pricing.staff.v1.",
      "fern.lifecycle.project.v2.",
      "fern.launch.plan.v1.",
    ])
      if (k.startsWith(prefix)) {
        try {
          sites.add(decodeURIComponent(k.slice(prefix.length)));
        } catch {}
      }
  }
  try {
    const p = JSON.parse(s.getItem("fern.lifecycle.project.v1") || "null");
    if (typeof p?.site === "string" && p.site) sites.add(p.site);
  } catch {}
  return [...sites];
}
export type HistoryGroup = {
  title: string;
  destination: string;
  records: Record<string, unknown>[];
  error?: string;
};
export function facilityHistory(s: Pick<Store, "getItem">, site: string): HistoryGroup[] {
  const encoded = encodeURIComponent(site);
  const specs = [
    [
      "Pre-Contract assessments",
      "FM Pre-Contract / Pre-Tender Assessment",
      "fern.precontract.assessments.v1." + encoded,
      true,
    ],
    [
      "Issued pricing versions",
      "Pricing Template Generator",
      "fern.pricing.issues.v1." + encoded,
      true,
    ],
    [
      "Saved pricing inputs",
      "Pricing Template Generator",
      "fern.pricing.staff.v1." + encoded,
      false,
    ],
    [
      "Lifecycle project",
      "Lifecycle & Asset Analysis",
      "fern.lifecycle.project.v2." + encoded,
      false,
    ],
    [
      "Lifecycle combined review",
      "Lifecycle & Asset Analysis",
      "fern.lifecycle.pricing-review.v1." + encoded,
      false,
    ],
    [
      "Mobilisation plan",
      "FM Mobilisation & Transition Tracker",
      "fern.launch.plan.v1." + site,
      false,
    ],
  ] as const;
  return specs.map(([title, destination, key, multiple]) => {
    try {
      let raw = s.getItem(key);
      if (!raw && title === "Lifecycle project") {
        const legacy = s.getItem("fern.lifecycle.project.v1");
        if (legacy && JSON.parse(legacy).site === site) raw = legacy;
      }
      if (!raw) return { title, destination, records: [] };
      const parsed = JSON.parse(raw),
        records = multiple ? parsed : [parsed];
      if (
        !Array.isArray(records) ||
        records.some((r) => !r || typeof r !== "object" || (r.site ?? r.baseline?.site) !== site)
      )
        throw Error("Record does not match this facility or has invalid structure.");
      return { title, destination, records };
    } catch (e) {
      return { title, destination, records: [], error: (e as Error).message };
    }
  });
}

const normalized = (value: string) => value.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
export function searchFacilities(facilities: Facility[], query: string) {
  const tokens = query.trim().split(/\s+/).filter(Boolean).map(normalized).filter(Boolean);
  return facilities.filter((f) => {
    const haystack = normalized(
      [f.site, f.name, f.location, f.postcode, f.city, f.country].filter(Boolean).join(" "),
    );
    return tokens.every((t) => haystack.includes(t));
  });
}
export function possibleDuplicates(
  facilities: Facility[],
  draft: Pick<Facility, "site" | "name" | "location" | "country" | "postcode">,
) {
  return facilities.filter(
    (f) =>
      normalized(f.site) === normalized(draft.site) ||
      (!!draft.name.trim() && normalized(f.name) === normalized(draft.name)) ||
      (!!draft.location.trim() &&
        normalized(f.location) === normalized(draft.location) &&
        normalized(f.country) === normalized(draft.country)) ||
      (!!draft.postcode?.trim() &&
        normalized(f.postcode ?? "") === normalized(draft.postcode) &&
        normalized(f.country) === normalized(draft.country)),
  );
}
