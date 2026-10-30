import InfoIcon from "../../../../../packages/platform/src/components/ui/InfoIcon.tsx";
import { classificationHelp } from "../../../../../packages/platform/src/domain/evidence.ts";
import { classificationStyle } from "../../../../../packages/platform/src/domain/evidence.ts";
import { confidenceColor } from "../../../../../packages/platform/src/domain/evidence.ts";
import buildResponse from "./demoResponses.ts";
import { SUGGESTED_QUESTIONS } from "./demoResponses.ts";
import type { AskFernResponse } from "./types.ts";
import { PROTOTYPE_SITES } from "../context/prototypeSites.ts";
import type { SiteConfig } from "../context/prototypeSites.ts";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function AskFern({
  onNavigate,
  currentPage,
  currentGroup,
  activeContext,
  onContextChange,
  forceContextOpen,
  onContextPanelClose,
}: {
  onNavigate: (dest: string) => void;
  currentPage: string;
  currentGroup: string;
  activeContext: SiteConfig;
  onContextChange: (ctx: SiteConfig) => void;
  forceContextOpen?: boolean;
  onContextPanelClose?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [response, setResponse] = useState<AskFernResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);

  // Pending context inside popover before Apply is pressed
  const [pendingSite, setPendingSite] = useState(activeContext.site);
  const pendingConfig = PROTOTYPE_SITES.find((s) => s.site === pendingSite) ?? PROTOTYPE_SITES[0];

  // UI state — can be driven from outside via forceContextOpen
  const [contextOpen, setContextOpen] = useState(false);

  useEffect(() => {
    if (forceContextOpen) {
      setPendingSite(activeContext.site);
      setContextOpen(true);
    }
  }, [forceContextOpen, activeContext.site]);

  const contextRef = useRef<HTMLDivElement>(null);

  // Close context popover on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (contextRef.current && !contextRef.current.contains(e.target as Node)) {
        setContextOpen(false);
        onContextPanelClose?.();
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onContextPanelClose]);

  function openContext() {
    setPendingSite(activeContext.site);
    setContextOpen(true);
  }

  function applyContext() {
    onContextChange(pendingConfig);
    setContextOpen(false);
    onContextPanelClose?.();
  }

  function submit(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    setLoading(true);
    setResponse(null);
    setSourcesOpen(false);
    setSubmittedQuery(trimmed);
    setTimeout(() => {
      setResponse(buildResponse(trimmed));
      setLoading(false);
    }, 800);
  }

  function handleSuggest(q: string) {
    setQuery(q);
    submit(q);
  }

  const tooltipText =
    "Context tells Ask FERN which authorised facility and FERN information to use when answering your question. The current page, site and associated configuration help FERN provide a more relevant response. You can change the working site where your permissions allow.";

  return (
    <div
      className="rounded-xl border mb-6"
      style={{
        borderColor: "#e5e7eb",
        background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b" style={{ borderColor: "#f3f4f6" }}>
        <div className="flex items-center gap-2 mb-0.5">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7.5" stroke="#1a56db" strokeWidth="1.5" />
            <path
              d="M6 7.5C6 5.57 7.57 4 9.5 4C11.43 4 13 5.57 13 7.5C13 9 11 10 11 11.5"
              stroke="#1a56db"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="11" cy="13.5" r="0.9" fill="#1a56db" />
          </svg>
          <span className="text-sm font-bold" style={{ color: "#0d2464" }}>
            Ask FERN
          </span>
        </div>
        <p className="text-xs" style={{ color: "#6b7280" }}>
          Ask questions across authorised FERN facility, service, contract, asset, lifecycle,
          performance, audit, compliance, risk and evidence information.
        </p>

        {/* Context strip */}
        <div className="relative mt-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {/* FERN Area — derived from selected page, read-only */}
            <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
              <span className="font-medium" style={{ color: "#374151" }}>
                FERN Area
              </span>
              <InfoIcon
                label="FERN Area"
                text="The part of FERN currently being viewed. Ask FERN uses the current area as additional context when interpreting your question. The FERN Area normally changes when you navigate to a different FERN page."
              />
              <span>: {currentPage}</span>
            </span>
            <span className="text-xs" style={{ color: "#d1d5db" }}>
              |
            </span>
            {/* Site — info icon separate from value/selector */}
            <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
              <span className="font-medium" style={{ color: "#374151" }}>
                Site
              </span>
              <InfoIcon
                label="Site"
                text="The Amazon physical facility currently in scope. The selected site determines which authorised facility information Ask FERN and relevant FERN pages use for analysis. Changing the working site changes the scope of the current investigation. It does not modify the underlying facility record."
              />
              <span>:</span>
              <button
                onClick={openContext}
                className="inline-flex items-center gap-0.5 font-semibold hover:underline"
                style={{ color: "#1a56db" }}
                aria-label="Select site"
              >
                {activeContext.site}
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" style={{ marginTop: 1 }}>
                  <path
                    d="M1.5 3L4.5 6L7.5 3"
                    stroke="#1a56db"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </span>
            <span className="text-xs" style={{ color: "#d1d5db" }}>
              |
            </span>
            {/* Region */}
            <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
              <span className="font-medium" style={{ color: "#374151" }}>
                Region
              </span>
              <InfoIcon
                label="Region"
                text="The geographic region associated with the selected facility. Regional context helps FERN identify the relevant facility, operational and applicable requirements for the selected site."
              />
              <span>: {activeContext.region}</span>
            </span>
            <span className="text-xs" style={{ color: "#d1d5db" }}>
              |
            </span>
            {/* Service Model */}
            <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
              <span className="font-medium" style={{ color: "#374151" }}>
                Service Model
              </span>
              <InfoIcon
                label="Service Model"
                text="The FM delivery approach currently applicable to the selected facility. FERN uses the approved Service Model associated with the selected site when analysing facility information."
              />
              <span>: {activeContext.serviceModel}</span>
            </span>
            <span className="text-xs" style={{ color: "#d1d5db" }}>
              |
            </span>
            {/* Tier */}
            <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
              <span className="font-medium" style={{ color: "#374151" }}>
                Tier
              </span>
              <InfoIcon
                label="Service Tier"
                text="The FM service-provisioning level applicable to the selected facility or service. The Service Tier helps define the expected level of FM service applicable within the selected context."
              />
              <span>: {activeContext.tier}</span>
            </span>
            <span className="text-xs" style={{ color: "#d1d5db" }}>
              |
            </span>

            {/* Facility Type */}
            <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
              <span className="font-medium" style={{ color: "#374151" }}>
                Facility Type
              </span>
              <InfoIcon
                label="Facility Type"
                text="The operational classification of the selected facility (e.g. Fulfilment Centre, Delivery Station). Facility Type helps FERN apply the correct benchmarks, lifecycle models and regulatory references for the site."
              />
              <span>: {activeContext.facilityType}</span>
            </span>
            <span className="text-xs" style={{ color: "#d1d5db" }}>
              |
            </span>

            {/* Change context button */}
            <button
              onClick={openContext}
              className="text-xs font-semibold hover:underline"
              style={{ color: "#1a56db" }}
            >
              Change context
            </button>

            <InfoIcon label="Change context" text={tooltipText} />
          </div>

          {/* Context popover */}
          {contextOpen && (
            <div
              ref={contextRef}
              className="absolute z-40 rounded-xl border bg-white mt-2"
              style={{
                top: "100%",
                left: 0,
                width: 320,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.06)",
                borderColor: "#e5e7eb",
              }}
            >
              <div className="px-4 pt-4 pb-3 border-b" style={{ borderColor: "#f3f4f6" }}>
                <p className="text-sm font-bold" style={{ color: "#0d2464" }}>
                  Working Context
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                  This controls which authorised information Ask FERN uses when answering your
                  question.
                </p>
              </div>

              <div className="px-4 py-3 flex flex-col gap-3">
                {/* FERN Area — read-only */}
                <div>
                  <label className="text-xs font-semibold block mb-1" style={{ color: "#374151" }}>
                    FERN Area
                  </label>
                  <div
                    className="text-xs rounded-lg px-3 py-2"
                    style={{
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      color: "#6b7280",
                    }}
                  >
                    {currentPage}
                    <span className="ml-2 text-xs" style={{ color: "#9ca3af" }}>
                      (follows selected page)
                    </span>
                  </div>
                </div>

                {/* Site selector */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="text-xs font-semibold" style={{ color: "#374151" }}>
                      Site
                    </label>
                    <InfoIcon
                      label="Site"
                      text="The facility currently in scope. Selecting a different authorised site changes the information Ask FERN and relevant FERN pages use for analysis."
                    />
                  </div>
                  <select
                    value={pendingSite}
                    onChange={(e) => setPendingSite(e.target.value)}
                    className="w-full text-xs rounded-lg px-3 py-2 outline-none"
                    style={{
                      border: "1px solid #d1d5db",
                      color: "#111827",
                      background: "#fff",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#1a56db")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
                  >
                    {PROTOTYPE_SITES.map((s) => (
                      <option key={s.site} value={s.site}>
                        {s.site}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Derived fields — read-only, update when site changes */}
                {[
                  {
                    k: "Country",
                    v: pendingConfig.country,
                    tip: "The country in which the selected facility is located. Country context helps FERN identify the relevant legal, regulatory and facility-management requirements applicable to the site.",
                  },
                  {
                    k: "Region",
                    v: pendingConfig.region,
                    tip: "The geographic region associated with the selected facility. Regional context may affect applicable requirements and the information FERN uses.",
                  },
                  {
                    k: "Facility Type",
                    v: pendingConfig.facilityType,
                    tip: "The operational classification of the selected facility (e.g. Fulfilment Centre, Delivery Station). Facility Type helps FERN apply the correct benchmarks, lifecycle models and regulatory references.",
                  },
                  {
                    k: "Service Model",
                    v: pendingConfig.serviceModel,
                    tip: "The FM delivery approach currently applicable to the selected facility. FERN uses the approved service-model configuration associated with the selected site.",
                  },
                  {
                    k: "Tier",
                    v: pendingConfig.tier,
                    tip: "The service-provisioning level associated with the selected facility or service. The applicable tier affects the level of FM service expected.",
                  },
                ].map((f) => (
                  <div key={f.k}>
                    <div className="flex items-center gap-1 mb-1">
                      <label className="text-xs font-semibold" style={{ color: "#374151" }}>
                        {f.k}
                      </label>
                      <InfoIcon label={f.k} text={f.tip} />
                    </div>
                    <div
                      className="text-xs rounded-lg px-3 py-2 flex items-center justify-between"
                      style={{
                        background: "#f9fafb",
                        border: "1px solid #e5e7eb",
                        color: "#374151",
                      }}
                    >
                      <span>{f.v}</span>
                      <span className="text-xs" style={{ color: "#9ca3af" }}>
                        derived
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 px-4 pb-4">
                <button
                  onClick={applyContext}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "#1a3fb5" }}
                >
                  Apply Context
                </button>
                <button
                  onClick={() => {
                    setContextOpen(false);
                    onContextPanelClose?.();
                  }}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold border transition-all hover:bg-gray-50"
                  style={{ borderColor: "#d1d5db", color: "#374151" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="px-5 py-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <circle cx="7" cy="7" r="5.5" stroke="#9ca3af" strokeWidth="1.3" />
              <path d="M11 11L14 14" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit(query)}
              placeholder="Ask FERN about your site, contracts, assets, lifecycle, performance, compliance, risk or evidence…"
              className="w-full text-sm rounded-lg border outline-none transition-all"
              style={{
                paddingLeft: 36,
                paddingRight: 12,
                paddingTop: 9,
                paddingBottom: 9,
                borderColor: "#d1d5db",
                color: "#111827",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#1a56db";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.08)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
          <button
            onClick={() => submit(query)}
            disabled={loading || !query.trim()}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: "#1a3fb5", whiteSpace: "nowrap" }}
          >
            {loading ? "Asking…" : "Ask"}
          </button>
        </div>

        {/* Suggested questions */}
        <div className="flex flex-wrap gap-2 mt-2.5">
          {(currentPage === "FM Mobilisation & Transition Tracker"
            ? [
                "What information is required before this launch can be configured?",
                "Which launch source information is currently available?",
                "Are any launch requirements ready for tracking?",
                "Show unresolved launch information gaps.",
              ]
            : SUGGESTED_QUESTIONS
          ).map((q) => (
            <button
              key={q}
              onClick={() => handleSuggest(q)}
              className="text-xs px-2.5 py-1 rounded-full border transition-all hover:border-blue-400 hover:text-blue-700"
              style={{
                borderColor: "#e5e7eb",
                color: "#4b5563",
                background: "#f9fafb",
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Response area — only shown after submission */}
      {(loading || response) && (
        <div className="border-t" style={{ borderColor: "#f3f4f6" }}>
          {loading && (
            <div className="px-5 py-4 flex items-center gap-2 text-sm" style={{ color: "#6b7280" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-spin">
                <circle cx="8" cy="8" r="6.5" stroke="#e5e7eb" strokeWidth="1.5" />
                <path
                  d="M8 1.5A6.5 6.5 0 0 1 14.5 8"
                  stroke="#1a56db"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Querying authorised FERN sources…
            </div>
          )}

          {response && (
            <div className="px-5 py-4">
              {/* Query echo + scope used */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <p className="text-xs font-medium" style={{ color: "#9ca3af" }}>
                  Query: <span style={{ color: "#374151" }}>{submittedQuery}</span>
                </p>
                <p className="text-xs" style={{ color: "#9ca3af" }}>
                  Answering for:{" "}
                  <span style={{ color: "#6b7280" }}>
                    {activeContext.site} · {activeContext.region} · {activeContext.serviceModel} ·{" "}
                    {activeContext.tier}
                  </span>
                </p>
              </div>

              {/* Classification + confidence */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{
                    background: classificationStyle[response.classification].bg,
                    color: classificationStyle[response.classification].color,
                  }}
                >
                  {response.classification}
                </span>
                <InfoIcon
                  label={response.classification}
                  text={classificationHelp[response.classification] ?? ""}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: confidenceColor[response.confidence] }}
                >
                  Confidence: {response.confidence}
                </span>
                <InfoIcon
                  label="Confidence"
                  text="Indicates how strongly the available authorised evidence supports the response. Confidence does not replace professional or human review."
                />
                {response.sources > 0 && (
                  <span className="flex items-center gap-1 ml-auto">
                    <button
                      onClick={() => setSourcesOpen((v) => !v)}
                      className="text-xs font-medium underline"
                      style={{ color: "#1a56db" }}
                    >
                      Sources: {response.sources}
                    </button>
                    <InfoIcon
                      label="Sources"
                      text="The authorised records, requirements, evidence or documents used by Ask FERN to support its response."
                    />
                  </span>
                )}
              </div>

              {/* Sources drawer */}
              {sourcesOpen && response.sourcesDetail.length > 0 && (
                <div
                  className="mb-3 rounded-lg p-3 text-xs"
                  style={{ background: "#f8fafc", border: "1px solid #e5e7eb" }}
                >
                  <p className="font-semibold mb-1.5" style={{ color: "#374151" }}>
                    Supporting Sources
                  </p>
                  {response.sourcesDetail.map((s, i) => (
                    <p key={i} className="mb-0.5" style={{ color: "#6b7280" }}>
                      · {s}
                    </p>
                  ))}
                </div>
              )}

              {/* Cross-application investigation */}
              {response.investigation.length > 0 && (
                <div
                  className="mb-3 rounded-lg border overflow-hidden"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <div
                    className="px-3 py-2 border-b flex items-center gap-2"
                    style={{ background: "#f9fafb", borderColor: "#e5e7eb" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="#6b7280" strokeWidth="1.2" />
                      <path
                        d="M4 5.5C4 4.4 4.9 3.5 6 3.5C7.1 3.5 8 4.4 8 5.5C8 6.3 6 7.2 6 8"
                        stroke="#6b7280"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      <circle cx="6" cy="9.5" r="0.6" fill="#6b7280" />
                    </svg>
                    <p className="text-xs font-semibold" style={{ color: "#6b7280" }}>
                      Cross-Application Investigation
                    </p>
                  </div>
                  <div className="divide-y" style={{ borderColor: "#f3f4f6" }}>
                    {response.investigation.map((step) => {
                      const stepStyle = {
                        checked: { dot: "#16a34a", label: "Reviewed" },
                        gap: { dot: "#9ca3af", label: "Gap" },
                        unavailable: { dot: "#d1d5db", label: "No Data" },
                        conflict: { dot: "#dc2626", label: "Conflict" },
                      }[step.result];
                      return (
                        <div key={step.app} className="flex items-start gap-3 px-3 py-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ background: stepStyle.dot }}
                          />
                          <span
                            className="text-xs font-medium shrink-0 w-20"
                            style={{ color: "#6b7280" }}
                          >
                            {stepStyle.label}
                          </span>
                          <div className="min-w-0">
                            <span className="text-xs font-semibold" style={{ color: "#374151" }}>
                              {step.app}:{" "}
                            </span>
                            <span className="text-xs" style={{ color: "#6b7280" }}>
                              {step.finding}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Answer */}
              <div className="mb-3">
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "#9ca3af", letterSpacing: "0.08em" }}
                >
                  Answer
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                  {response.answer}
                </p>
              </div>

              {/* Key Finding */}
              {response.keyFinding && (
                <div
                  className="mb-3 rounded-lg px-3 py-2.5"
                  style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
                >
                  <p className="text-xs font-semibold mb-0.5" style={{ color: "#1a56db" }}>
                    Key Finding
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#1e40af" }}>
                    {response.keyFinding}
                  </p>
                </div>
              )}

              {/* Evidence */}
              {response.evidence.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-1 mb-1.5">
                    <p
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#9ca3af", letterSpacing: "0.08em" }}
                    >
                      Evidence
                    </p>
                    <InfoIcon
                      label="Evidence"
                      text="The authorised records, requirements, documents or data used to support Ask FERN's response. Evidence links open the relevant FERN application or source area."
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    {response.evidence.map((e) => (
                      <button
                        key={e.label}
                        onClick={() => onNavigate(e.dest)}
                        className="text-left text-xs font-medium flex items-center gap-1 hover:underline w-fit"
                        style={{ color: "#1a56db" }}
                      >
                        {e.label}
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path
                            d="M2 9L9 2M9 2H4M9 2V7"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Related FERN Areas */}
              {response.related.length > 0 && (
                <div className="mb-3">
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                    style={{ color: "#9ca3af", letterSpacing: "0.08em" }}
                  >
                    Related FERN Areas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {response.related.map((r) => (
                      <button
                        key={r.label}
                        onClick={() => onNavigate(r.dest)}
                        className="text-xs font-medium px-2.5 py-1 rounded border transition-all hover:bg-blue-50"
                        style={{
                          borderColor: "#bfdbfe",
                          color: "#1a56db",
                          background: "#fff",
                        }}
                      >
                        {r.label} →
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Human review */}
              {response.humanReview && (
                <div
                  className="flex items-start gap-2 rounded-lg px-3 py-2.5 mt-1"
                  style={{ background: "#fffbeb", border: "1px solid #fde68a" }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="mt-0.5 shrink-0"
                  >
                    <path
                      d="M7 1L13 12H1L7 1Z"
                      stroke="#d97706"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
                    <path d="M7 5.5V8" stroke="#d97706" strokeWidth="1.3" strokeLinecap="round" />
                    <circle cx="7" cy="10" r="0.7" fill="#d97706" />
                  </svg>
                  <p className="text-xs" style={{ color: "#92400e" }}>
                    <span className="font-semibold">Human review required</span> before any material
                    decision or approval based on this information.
                  </p>
                </div>
              )}

              {/* Clear */}
              <button
                onClick={() => {
                  setResponse(null);
                  setSubmittedQuery("");
                  setQuery("");
                  setSourcesOpen(false);
                }}
                className="text-xs mt-3 hover:underline"
                style={{ color: "#9ca3af" }}
              >
                Clear response
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
