import AlternativesEditor, { AlternativesComparison } from "./AlternativesEditor";
import { useEffect, useRef, useState } from "react";
import {
  newAssessment,
  readAssessments,
  saveAssessment,
  issues,
  models,
  tiers,
  type Assessment,
} from "../../../packages/pre-contract-core/src/assessment";
import TenderPricingPanel from "./TenderPricingPanel";
const field = "block w-full border border-slate-300 rounded-lg p-3 mt-1 bg-white";
const button = "border border-slate-300 rounded-lg px-4 py-2 bg-white text-blue-950";
const primary = "rounded-lg px-4 py-2 bg-blue-800 text-white font-semibold";
const steps = [
  "Purpose & scope",
  "Current arrangement",
  "Pricing evidence",
  "Service alternatives",
  "Review & save",
];
export default function AssessmentWorkbench({
  site,
  region,
  facilityType,
  onDirtyChange,
}: {
  site: string;
  region: string;
  facilityType: string;
  onDirtyChange?: (v: boolean) => void;
}) {
  const [list, setList] = useState<Assessment[]>([]),
    [draft, setDraft] = useState<Assessment | null>(null),
    [saved, setSaved] = useState(""),
    [step, setStep] = useState(0),
    [message, setMessage] = useState(""),
    [error, setError] = useState(""),
    [attempted, setAttempted] = useState(false),
    [query, setQuery] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const dirty = !!draft && JSON.stringify(draft) !== saved;
  function refresh() {
    try {
      setList(readAssessments(localStorage, site));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }
  useEffect(() => {
    refresh();
  }, [site]);
  useEffect(() => {
    onDirtyChange?.(dirty);
    return () => onDirtyChange?.(false);
  }, [dirty, onDirtyChange]);
  useEffect(() => {
    const guard = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [dirty]);
  useEffect(() => {
    heading.current?.focus();
  }, [step, !!draft]);
  function patch(k: keyof Assessment, value: string) {
    setDraft((d) => (d ? { ...d, [k]: value } : d));
    setMessage("");
    setError("");
  }
  function open(a: Assessment) {
    setDraft(a);
    setSaved(a.revision ? JSON.stringify(a) : "");
    setStep(0);
    setAttempted(false);
    setError("");
    setMessage("");
  }
  function save() {
    if (!draft) return;
    setAttempted(true);
    const bad = issues(draft);
    if (bad.length) {
      setStep(0);
      setError("Check the highlighted fields.");
      return;
    }
    try {
      const a = saveAssessment(localStorage, draft, new Date().toISOString());
      setDraft(a);
      setSaved(JSON.stringify(a));
      setList(readAssessments(localStorage, site));
      setError("");
      setMessage("Assessment saved in this browser. Status: provisional.");
    } catch (e) {
      setError((e as Error).message);
    }
  }
  function input(k: keyof Assessment, label: string, multiline = false) {
    const err = attempted && draft ? issues(draft).find((x) => x.field === k)?.message : undefined;
    return (
      <label className="block">
        {label}
        {multiline ? (
          <textarea
            className={field}
            value={String(draft![k])}
            onChange={(e) => patch(k, e.target.value)}
            maxLength={20000}
          />
        ) : (
          <input
            aria-label={label}
            className={field}
            value={String(draft![k])}
            onChange={(e) => patch(k, e.target.value)}
            maxLength={20000}
            aria-invalid={!!err}
            aria-describedby={err ? `assessment-${k}-error` : undefined}
          />
        )}
        {err && (
          <span id={`assessment-${k}-error`} className="block text-red-800 mt-1">
            {err}
          </span>
        )}
      </label>
    );
  }
  function library() {
    if (
      dirty &&
      !window.confirm("This assessment has unsaved changes. Return to the list without saving?")
    )
      return;
    setDraft(null);
    setMessage("");
    setAttempted(false);
    refresh();
  }
  return (
    <section
      className="space-y-5 rounded-xl border border-slate-200 bg-white p-5"
      aria-label="Pre-contract assessment workspace"
    >
      {!draft ? (
        <>
          <h2 className="text-2xl font-bold text-blue-950">Start or continue an assessment</h2>
          <p>
            {site} · {region} · {facilityType}
          </p>
          <p>
            Create a provisional assessment of the current FM arrangement. Saved records belong to
            this site and browser address.
          </p>
          <button
            className={primary}
            onClick={() => open(newAssessment(site, crypto.randomUUID()))}
          >
            Start new assessment
          </button>
          <label className="block">
            Find saved assessments
            <input className={field} value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <button className={button} onClick={refresh}>
            Refresh saved assessments
          </button>
          {list.length === 0 && <p>No saved assessments found for this site.</p>}
          {list.length > 0 &&
            list.filter((a) => a.name.toLowerCase().includes(query.toLowerCase())).length === 0 && (
              <p>No assessments match your search.</p>
            )}
          {list
            .filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => b.savedAt.localeCompare(a.savedAt))
            .map((a) => (
              <article className="rounded-lg border border-slate-200 p-4 space-y-2" key={a.id}>
                <h3 className="font-semibold">{a.name}</h3>
                <p className="text-sm">
                  Revision {a.revision} · Saved {new Date(a.savedAt).toLocaleString()} · Provisional
                </p>
                <button
                  className={button}
                  onClick={() => {
                    try {
                      const latest = readAssessments(localStorage, site).find((x) => x.id === a.id);
                      if (!latest) throw Error("Assessment no longer available. Refresh the list.");
                      open(latest);
                    } catch (e) {
                      setError((e as Error).message);
                    }
                  }}
                >
                  Continue {a.name}
                </button>
              </article>
            ))}
        </>
      ) : (
        <>
          <div className="sticky top-0 z-10 bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 tabIndex={-1} ref={heading} className="text-xl font-bold text-blue-950">
                {draft.name || "New assessment"}
              </h2>
              <p className="text-sm">
                {site} · {dirty ? "Unsaved changes" : `Saved revision ${draft.revision}`} ·
                Provisional
              </p>
            </div>
            <div className="flex gap-2">
              <button className={button} onClick={library}>
                Assessment list
              </button>
              <button className={primary} onClick={save}>
                Save draft
              </button>
            </div>
          </div>
          <nav className="grid sm:grid-cols-5 gap-2" aria-label="Assessment setup steps">
            {steps.map((s, i) => (
              <button
                key={s}
                className={i === step ? primary : button}
                aria-current={i === step ? "step" : undefined}
                onClick={() => setStep(i)}
              >
                {i + 1}. {s}
              </button>
            ))}
          </nav>
          <p className="text-sm text-slate-600">
            Unknown details may stay blank. A name is required to save; any entered decision date
            must be valid. An owner name is not an account assignment or approval.
          </p>
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Define the decision</h3>
              <p>
                Facility: {site} · {region} · {facilityType}. Save and return to the list before
                using Change facility above.
              </p>
              {input("name", "Assessment name")}
              {input("purpose", "Assessment purpose / reason", true)}
              <div className="grid sm:grid-cols-2 gap-4">
                {input("owner", "Assessment owner")}
                {input("decisionDate", "Required decision date (DD-MM-YYYY)")}
              </div>
              {input("scope", "Service and asset scope / exclusions", true)}
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Record the current arrangement</h3>
              <p className="text-sm">
                A provisional snapshot until FM Contract & Service Model is available. Internal
                delivery does not require a supplier contract.
              </p>
              {input("arrangement", "Current arrangement / contract reference", true)}
              <div className="grid sm:grid-cols-2 gap-4">
                <label>
                  Current service model
                  <select
                    className={field}
                    value={draft.model}
                    onChange={(e) => patch("model", e.target.value)}
                  >
                    <option value="">Not confirmed</option>
                    {models.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Current service tier
                  <select
                    className={field}
                    value={draft.tier}
                    onChange={(e) => patch("tier", e.target.value)}
                  >
                    <option value="">Not confirmed</option>
                    {tiers.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
              </div>
              {input("responsibilities", "Responsibilities and service / asset exceptions", true)}
              {input("evidence", "Current-arrangement source and evidence", true)}
              {input("gaps", "Open questions, constraints and approval issues", true)}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <p>
                The pricing selection belongs to this assessment draft. Save it explicitly. Existing
                application-wide pricing references remain unchanged.
              </p>
              <TenderPricingPanel
                key={draft.id}
                site={site}
                selectionId={draft.pricingId}
                onSelection={(id) => patch("pricingId", id)}
              />
              <p className="text-sm">
                A received pricing issue is provisional, not formally approved. Lifecycle handover
                and service/risk recommendations are not implemented in this increment.
              </p>
            </div>
          )}
          {step === 3 && (
            <AlternativesEditor
              assessment={draft}
              onChange={(alternatives) => {
                setDraft({ ...draft, alternatives });
                setMessage("");
                setError("");
              }}
            />
          )}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Review your assessment draft</h3>
              <dl className="grid sm:grid-cols-2 gap-3">
                {(
                  [
                    ["name", "Assessment"],
                    ["purpose", "Purpose"],
                    ["owner", "Owner"],
                    ["decisionDate", "Decision date"],
                    ["scope", "Scope"],
                    ["arrangement", "Current arrangement"],
                    ["model", "Model"],
                    ["tier", "Tier"],
                    ["responsibilities", "Responsibilities"],
                    ["evidence", "Evidence"],
                    ["gaps", "Open issues"],
                    ["pricingId", "Selected pricing issue reference"],
                  ] as [keyof Assessment, string][]
                ).map(([k, label]) => (
                  <div key={k} className="bg-slate-50 rounded-lg p-3">
                    <dt className="text-sm text-slate-600">{label}</dt>
                    <dd className="whitespace-pre-wrap break-words">
                      {String(draft[k]) || "Not recorded"}
                    </dd>
                  </div>
                ))}
              </dl>
              <p>
                Missing information remains open. This draft does not establish compliance or record
                an authorised decision.
              </p>
              <AlternativesComparison assessment={draft} />
              <p>
                On-screen calculation reports and PDF output are planned next increments; this
                summary is a draft input review.
              </p>
            </div>
          )}
          <div className="flex justify-between gap-3">
            {step > 0 ? (
              <button className={button} onClick={() => setStep(step - 1)}>
                Back
              </button>
            ) : (
              <span />
            )}
            {step < 4 ? (
              <button className={primary} onClick={() => setStep(step + 1)}>
                Next: {steps[step + 1]}
              </button>
            ) : (
              <button className={primary} onClick={save}>
                Save assessment draft
              </button>
            )}
          </div>
          <details className="border rounded-lg p-4">
            <summary>Backup and storage information</summary>
            <p className="my-3">
              One current saved revision per assessment, up to 200 assessments per site. No shared
              Amazon storage, full version history or formal approvals. Downloaded drafts retain
              open fields; backup re-import is not implemented in this increment.
            </p>
            <button
              className={button}
              onClick={() => {
                const url = URL.createObjectURL(
                  new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" }),
                );
                const a = document.createElement("a");
                a.href = url;
                a.download = `FERN-precontract-${draft.id}-draft.json`;
                a.click();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
              }}
            >
              Download assessment draft JSON
            </button>
          </details>
        </>
      )}
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-900">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="rounded-lg bg-blue-50 p-3">
          {message}
        </p>
      )}
    </section>
  );
}
