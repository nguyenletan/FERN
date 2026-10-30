import { useRef, useState } from "react";
import {
  costSummary,
  previewPricingIssue,
  pricingTransferByteLimit,
  receivePricingIssue,
  type PricingIssue,
} from "../../pricing-core/src/pricingHandover";
import { dateForDisplay } from "../../pricing-core/src/staffCosts";
const button = "rounded-lg border border-slate-300 px-4 py-2 bg-white text-blue-950";
export default function PricingIssueImport({
  site,
  onImported,
}: {
  site: string;
  onImported: () => void;
}) {
  const [preview, setPreview] = useState<PricingIssue | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const request = useRef(0);
  return (
    <section
      className="border border-slate-200 rounded-lg p-3 space-y-3"
      aria-label="Import pricing issue"
    >
      <h3 className="font-semibold">Import pricing issue</h3>
      <p className="text-sm">
        Choose a pricing issue file downloaded from Pricing Template Generator for {site}. Review it
        before adding it to this browser. Import does not change your selected price or approve its
        use.
      </p>
      <label className="block">
        Pricing issue file
        <input
          className="block w-full min-w-0 mt-1"
          type="file"
          accept=".json,application/json"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            const current = ++request.current;
            setPreview(null);
            setError("");
            setMessage("");
            setBusy(false);
            if (!file) return;
            setBusy(true);
            try {
              if (file.size > pricingTransferByteLimit)
                throw Error("Pricing issue file limit is 15 MB.");
              const issue = previewPricingIssue(await file.text(), site);
              if (current !== request.current) return;
              setPreview(issue);
              setMessage("Preview ready. No records or selections have changed.");
            } catch (e) {
              if (current === request.current) setError((e as Error).message);
            } finally {
              if (current === request.current) setBusy(false);
            }
          }}
        />
      </label>
      {busy && <p role="status">Reading pricing issue…</p>}
      {preview && (
        <div
          className="bg-slate-50 rounded-lg p-3 space-y-3 break-words"
          aria-label="Pricing issue preview"
        >
          <h4 className="font-semibold">Review pricing issue before import</h4>
          <dl className="grid sm:grid-cols-2 gap-3">
            {[
              ["Facility", preview.baseline.site],
              ["Issue ID", preview.id],
              ["Source revision", String(preview.revision)],
              ["Status", "Provisional"],
              ["Issued", preview.issuedAt],
              ["Price date", dateForDisplay(preview.baseline.baseDate)],
              ["Currency", preview.baseline.currency],
              ["Period", "First 12 months from the price date"],
              ["Source", preview.baseline.source || "Not recorded"],
              ["Scope", preview.baseline.comparisonBasis?.scope || "Not recorded"],
              ["Service level", preview.baseline.comparisonBasis?.serviceLevel || "Not recorded"],
              ["Tax basis", preview.baseline.comparisonBasis?.taxBasis || "Not recorded"],
              [
                "Recalculated year 1 cost",
                `${preview.baseline.currency} ${costSummary(preview.baseline).total?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              ],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-sm text-slate-600">{label}</dt>
                <dd className="whitespace-pre-wrap">{value}</dd>
              </div>
            ))}
          </dl>
          <details>
            <summary>Inspect issued inputs and evidence</summary>
            <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-all text-sm">
              {JSON.stringify(preview.baseline, null, 2)}
            </pre>
          </details>
          <p className="text-sm">
            Costs are recalculated from the file's inputs. Scope, currency and applicability still
            need review before comparison. File contents do not establish source authenticity or
            approval.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              className={button}
              onClick={() => {
                try {
                  const result = receivePricingIssue(localStorage, site, preview);
                  setPreview(null);
                  setError("");
                  setMessage(
                    result.alreadyPresent
                      ? "This exact pricing issue is already available. Your selection is unchanged."
                      : "Pricing issue imported. Choose it from Pricing version when ready; your selection is unchanged.",
                  );
                  onImported();
                } catch (e) {
                  setError((e as Error).message);
                  setMessage("");
                }
              }}
            >
              Confirm pricing issue import
            </button>
            <button
              className={button}
              onClick={() => {
                ++request.current;
                setPreview(null);
                setError("");
                setMessage("Import cancelled. No records or selections changed.");
              }}
            >
              Cancel import
            </button>
          </div>
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
