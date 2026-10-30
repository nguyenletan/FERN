import GoogleLocationSearch from "./GoogleLocationSearch.tsx";
import { useState } from "react";
import {
  addFacility,
  discoverSites,
  facilityHistory,
  readFacilities,
  searchFacilities,
  possibleDuplicates,
  type Facility,
} from "./facilities.ts";
type Context = Pick<
  Facility,
  "site" | "country" | "region" | "facilityType" | "serviceModel" | "tier"
>;
const field = "block w-full border border-slate-300 rounded-lg p-3 bg-white mt-1";
const button = "rounded-lg border border-slate-300 px-4 py-2 bg-white text-blue-950";
const primary = "rounded-lg bg-blue-800 px-4 py-2 text-white font-semibold";
const blank = () => ({
  site: "",
  name: "",
  country: "",
  region: "",
  facilityType: "",
  location: "",
  buildingStatus: "Existing building",
  postcode: "",
  city: "",
  state: "",
  buildingNumber: "",
  street: "",
  googlePlaceId: "",
});
export default function FacilityPicker({
  context,
  onSelect,
}: {
  context: Context;
  onSelect: (f: Context) => void;
}) {
  const [mode, setMode] = useState<"local" | "online" | "manual">("local"),
    [query, setQuery] = useState(""),
    [candidate, setCandidate] = useState<Facility | null>(null),
    [draft, setDraft] = useState(blank),
    [review, setReview] = useState(false),
    [confirmed, setConfirmed] = useState(false),
    [error, setError] = useState(""),
    [message, setMessage] = useState("");
  let facilities: Facility[] = [],
    readError = "";
  try {
    const registered = readFacilities(localStorage);
    facilities = [
      ...registered,
      ...discoverSites(localStorage)
        .filter((s) => !registered.some((f) => f.site === s))
        .map((site) => ({
          id: "legacy:" + site,
          site,
          name:
            site === "BHX4" ? "BHX4 demonstration facility" : "Local facility — details unverified",
          country: site === "BHX4" ? "United Kingdom" : "",
          region: site === "BHX4" ? "UK" : "",
          facilityType: site === "BHX4" ? "Fulfilment Centre" : "",
          location: "",
          buildingStatus: "",
          serviceModel: "",
          tier: "",
          createdAt: "",
        })),
    ];
  } catch (e) {
    readError = (e as Error).message;
  }
  const current = facilities.find((f) => f.site === context.site);
  function changeMode(next: typeof mode) {
    setMode(next);
    setCandidate(null);
    setReview(false);
    setConfirmed(false);
    setError("");
    setMessage("");
    setQuery("");
  }
  function select(f: Facility) {
    setCandidate(f);
    setConfirmed(false);
    setError("");
    setMessage("");
  }
  const duplicates = possibleDuplicates(facilities, draft);
  const fields = [
    ["site", "Site code"],
    ["name", "Building name"],
    ["buildingNumber", "Building number"],
    ["street", "Street"],
    ["location", "Full address"],
    ["postcode", "Postcode / ZIP code"],
    ["city", "City"],
    ["state", "State / province"],
    ["country", "Country"],
    ["region", "Business region (if known)"],
    ["facilityType", "Facility type"],
  ] as const;
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-blue-950">Choose your facility</h2>
      <p>
        Current facility:{" "}
        <strong>
          {context.site || "Not selected"}
          {current?.name ? " — " + current.name : ""}
        </strong>{" "}
        {[context.country, context.facilityType].filter(Boolean).map((value, index) => <span key={index}> · {value}</span>)}
      </p>
      <p className="text-sm text-slate-600">
        Search, select a building, check its details, then confirm. Your current facility stays
        selected until you confirm a change.
      </p>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Facility search source">
        <button
          className={mode === "local" ? primary : button}
          aria-pressed={mode === "local"}
          onClick={() => changeMode("local")}
        >
          Amazon facilities
        </button>
        <button
          className={mode === "online" ? primary : button}
          aria-pressed={mode === "online"}
          onClick={() => changeMode("online")}
        >
          Search online
        </button>
        <button
          className={mode === "manual" ? primary : button}
          aria-pressed={mode === "manual"}
          onClick={() => changeMode("manual")}
        >
          Enter details manually
        </button>
      </div>
      {(error || readError) && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-900">
          {error || readError}
        </p>
      )}
      {message && <p role="status">{message}</p>}
      {mode === "local" && (
        <>
          <p className="rounded-lg bg-blue-50 p-3 text-sm">
            Searching saved FERN facilities on this browser. Amazon directory / APM connection
            pending. BHX4 is demonstration context.
          </p>
          <label className="block font-medium">
            Building name, site code, address or postcode
            <input
              className={field}
              autoComplete="off"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCandidate(null);
                setConfirmed(false);
              }}
              placeholder="Start typing to find a saved facility"
              maxLength={200}
            />
          </label>
          <p role="status" className="text-sm">
            {searchFacilities(facilities, query).length} matching saved facilities
            {searchFacilities(facilities, query).length > 20
              ? " — showing the first 20; refine your search"
              : ""}
            .
          </p>
          <ul className="border border-slate-200 rounded-lg divide-y divide-slate-200">
            {searchFacilities(facilities, query)
              .slice(0, 20)
              .map((f) => (
                <li key={f.site}>
                  <button
                    className="w-full text-left p-3 hover:bg-blue-50 focus:bg-blue-50"
                    onClick={() => select(f)}
                  >
                    <strong>
                      {f.site} — {f.name}
                    </strong>
                    <span className="block text-sm text-slate-600">
                      {[f.location, f.postcode, f.city, f.country].filter(Boolean).join(" · ") ||
                        "Address not recorded"}{" "}
                      · Local record, unverified
                    </span>
                  </button>
                </li>
              ))}
          </ul>
          {searchFacilities(facilities, query).length === 0 && (
            <p>
              No saved facility matches. Try another spelling, search online when connected, or
              enter the details manually.
            </p>
          )}
        </>
      )}
      {mode === "online" && (
        <>
          <GoogleLocationSearch
            onSelect={(address) => {
              setDraft({ ...blank(), ...address });
              setMode("manual");
              setReview(false);
              setConfirmed(false);
              setError("");
              setMessage(
                "Google address loaded. Check the fields, enter the site code and facility type, then review before saving.",
              );
            }}
          />
          <button className={button} onClick={() => changeMode("manual")}>
            Continue with manual entry
          </button>
        </>
      )}
      {mode === "local" && candidate && (
        <section
          className="rounded-lg border-2 border-blue-200 p-4 space-y-3"
          aria-label="Review selected facility"
        >
          <h3 className="font-bold text-lg">Is this the correct facility?</h3>
          <dl className="grid sm:grid-cols-2 gap-3">
            {fields.map(([k, label]) => (
              <div key={k}>
                <dt className="text-sm text-slate-600">{label}</dt>
                <dd>{candidate[k] || "Not recorded"}</dd>
              </div>
            ))}
          </dl>
          <p>
            Source: saved local FERN record · Unverified.{" "}
            {facilityHistory(localStorage, candidate.site).reduce(
              (n, g) => n + g.records.length,
              0,
            )}{" "}
            available saved records. Existing history will remain linked to this facility.
          </p>
          <label className="flex gap-2 items-start">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            I have checked that this is the correct facility.
          </label>
          <button
            className={primary + " disabled:opacity-50"}
            disabled={!confirmed || !!readError}
            onClick={() => {
              onSelect(candidate);
              setCandidate(null);
              setConfirmed(false);
            }}
          >
            Confirm facility and continue
          </button>
          <button className={button + " ml-2"} onClick={() => setCandidate(null)}>
            Back to search
          </button>
        </section>
      )}
      {mode === "manual" && !review && (
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setError("");
            if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,39}$/.test(draft.site.trim())) {
              setError(
                "Use letters, numbers, hyphens or underscores for the site code (maximum 40 characters).",
              );
              return;
            }
            setReview(true);
            setConfirmed(false);
          }}
        >
          <h3 className="font-bold text-lg">Enter building details</h3>
          <p>
            Use this for an existing building new to FERN or a planned new building. Missing address
            details can remain blank.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {fields.map(([k, label]) => (
              <label key={k}>
                {label}
                {["site", "name", "country", "facilityType"].includes(k) ? " *" : ""}
                <input
                  aria-label={label}
                  className={field}
                  required={["site", "name", "country", "facilityType"].includes(k)}
                  maxLength={200}
                  value={draft[k]}
                  onChange={(e) => setDraft({ ...draft, [k]: e.target.value })}
                />
              </label>
            ))}
            <label>
              Building status
              <select
                className={field}
                value={draft.buildingStatus}
                onChange={(e) => setDraft({ ...draft, buildingStatus: e.target.value })}
              >
                <option>Existing building</option>
                <option>Planned new building</option>
              </select>
            </label>
          </div>
          <button className={primary}>Review facility details</button>
        </form>
      )}
      {mode === "manual" && review && (
        <section className="border rounded-lg p-4 space-y-3">
          <h3 className="font-bold text-lg">Check the facility before saving</h3>
          <dl className="grid sm:grid-cols-2 gap-3">
            {fields.map(([k, label]) => (
              <div key={k}>
                <dt className="text-sm text-slate-600">{label}</dt>
                <dd>{draft[k] || "Not recorded"}</dd>
              </div>
            ))}
          </dl>
          <p>
            {draft.buildingStatus} · Source:{" "}
            {draft.googlePlaceId
              ? "Google location lookup, with user-reviewed fields"
              : "manual entry"}{" "}
            · Amazon verification pending.
          </p>
          {duplicates.length > 0 && (
            <div className="bg-amber-50 p-3 rounded-lg">
              <h4 className="font-semibold">Possible existing facility</h4>
              <p>
                Check these matches to avoid separating a building from its history. A shared
                postcode alone does not mean the same building.
              </p>
              {duplicates.map((f) => (
                <button
                  key={f.site}
                  className={button + " block my-2"}
                  onClick={() => {
                    setMode("local");
                    select(f);
                    setReview(false);
                  }}
                >
                  Review existing {f.site} — {f.name}
                </button>
              ))}
            </div>
          )}
          <p>The site code will be fixed after creation to preserve links with saved records.</p>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            I have checked the details and any possible matches.
          </label>
          <button
            className={button}
            onClick={() => {
              setReview(false);
              setConfirmed(false);
            }}
          >
            Edit details
          </button>
          <button
            className={primary + " ml-2 disabled:opacity-50"}
            disabled={!confirmed || !!readError}
            onClick={() => {
              try {
                const site = draft.site.trim().toUpperCase();
                if (discoverSites(localStorage).some((s) => s.toUpperCase() === site))
                  throw Error(
                    "This site already has saved records. Review and select the existing facility.",
                  );
                const f = addFacility(localStorage, {
                  ...draft,
                  site,
                  id: crypto.randomUUID(),
                  region: draft.region.trim() || draft.country,
                  serviceModel: "",
                  tier: "",
                  createdAt: new Date().toISOString(),
                  source: draft.googlePlaceId ? "google" : "manual",
                });
                onSelect(f);
                setReview(false);
                setConfirmed(false);
                setMode("local");
                setQuery(f.site);
                setDraft(blank());
                setMessage(
                  "Facility record saved locally. Check the current facility shown above before starting work.",
                );
                setError("");
              } catch (e) {
                setError((e as Error).message);
              }
            }}
          >
            Save facility and continue
          </button>
        </section>
      )}
    </div>
  );
}
