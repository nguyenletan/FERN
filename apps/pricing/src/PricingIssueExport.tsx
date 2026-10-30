import { useState } from "react";
import type { StaffBaseline } from "../../../packages/pricing-core/src/staffCosts";
import { dateForDisplay } from "../../../packages/pricing-core/src/staffCosts";
import {
  costSummary,
  exportPricingIssue,
  issuePricing,
  readLocalIssues,
  type PricingIssue,
} from "../../../packages/pricing-core/src/pricingHandover";
const button =
  "rounded-lg border border-slate-300 px-4 py-2 bg-white text-blue-950 disabled:opacity-50";
export default function PricingIssueExport({ baseline }: { baseline: StaffBaseline }) {
  const [issues, setIssues] = useState<PricingIssue[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const selected = issues.find((issue) => issue.id === selectedId);
  function refresh() {
    try {
      setIssues(readLocalIssues(localStorage, baseline.site));
      setError("");
      setMessage("Issued versions loaded. Choose the version to download.");
    } catch (e) {
      setIssues([]);
      setError((e as Error).message);
      setMessage("");
    }
  }
  return (
    <section
      className="rounded-lg border border-slate-200 p-4 space-y-3"
      aria-label="Pricing issue handover"
    >
      <h3 className="font-semibold">Issue and transfer pricing</h3>
      <p>
        Create a fixed provisional version, then download its pricing issue file. In Pre-Contract,
        choose the same facility and use Import pricing issue in Pricing evidence. Applications on
        different web addresses do not share browser storage.
      </p>
      <p className="text-sm">
        The file preserves issued inputs and evidence. It is not a PDF, formal approval or automatic
        delivery to another application.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          className={button}
          disabled={costSummary(baseline).total === null}
          onClick={() => {
            try {
              const issue = issuePricing(
                localStorage,
                baseline,
                crypto.randomUUID(),
                new Date().toISOString(),
              );
              setIssues(readLocalIssues(localStorage, baseline.site));
              setSelectedId(issue.id);
              setError("");
              setMessage(
                `Provisional pricing version ${issue.revision} saved locally. Download its file to transfer it.`,
              );
            } catch (e) {
              setError((e as Error).message);
              setMessage("");
            }
          }}
        >
          Create pricing issue
        </button>
        <button className={button} onClick={refresh}>
          Load issued versions for download
        </button>
      </div>
      {issues.length > 0 && (
        <label className="block">
          Issued version to download
          <select
            className="block w-full rounded-lg border border-slate-300 p-3 mt-1"
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              setMessage("");
              setError("");
            }}
          >
            <option value="">Choose an issued version</option>
            {issues.map((issue) => (
              <option key={issue.id} value={issue.id}>
                Version {issue.revision} · {issue.baseline.currency} ·{" "}
                {dateForDisplay(issue.baseline.baseDate)} · {issue.id}
              </option>
            ))}
          </select>
        </label>
      )}
      {selected && (
        <div className="space-y-2 break-words">
          <p>
            Version {selected.revision} · {selected.id} · Issued {selected.issuedAt}
          </p>
          <p>
            Year 1: {selected.baseline.currency}{" "}
            {costSummary(selected.baseline).total?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            . Later draft edits do not change this file.
          </p>
          <button
            className={button}
            onClick={() => {
              try {
                const contents = exportPricingIssue(selected);
                const url = URL.createObjectURL(new Blob([contents], { type: "application/json" }));
                const a = document.createElement("a");
                a.href = url;
                a.download = `FERN-pricing-issue-${selected.id.replace(/[^A-Za-z0-9_-]/g, "_")}-r${selected.revision}-provisional.json`;
                a.click();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
                setError("");
                setMessage(
                  "Pricing issue download started. Import the file in Pre-Contract and select it explicitly.",
                );
              } catch (e) {
                setError((e as Error).message);
                setMessage("");
              }
            }}
          >
            Download pricing issue
          </button>
        </div>
      )}
      {message && <p role="status">{message}</p>}
      {error && (
        <p role="alert" className="text-red-800">
          {error}
        </p>
      )}
    </section>
  );
}
