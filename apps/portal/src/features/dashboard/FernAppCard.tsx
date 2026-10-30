import React from "react";

export interface AppCardField {
  label: string;
  value: string;
  tone?: "danger" | "warning" | "success" | "neutral";
}

export interface FernAppCardProps {
  title: string;
  icon: React.ReactNode;
  status: "active" | "pending" | "attention" | "review";
  statusLabel: string;
  site: string;
  fields: AppCardField[];
  confidence?: "High" | "Medium" | "Low";
  recommendation?: string;
  navDest: string;
  onNavigate: (dest: string) => void;
}

export default function FernAppCard({
  title,
  icon,
  status,
  statusLabel,
  site,
  fields,
  confidence,
  recommendation,
  navDest,
  onNavigate,
}: FernAppCardProps) {
  const ss = {
    active: { bg: "#f0fdf4", color: "#16a34a", dot: "#16a34a" },
    pending: { bg: "#f9fafb", color: "#9ca3af", dot: "#d1d5db" },
    attention: { bg: "#fffbeb", color: "#d97706", dot: "#f59e0b" },
    review: { bg: "#eff6ff", color: "#1a56db", dot: "#3b82f6" },
  }[status];

  const toneColor = {
    danger: "#dc2626",
    warning: "#d97706",
    success: "#16a34a",
    neutral: "#374151",
  };

  return (
    <div
      className="rounded-xl border bg-white flex flex-col"
      style={{
        borderColor: "#e5e7eb",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div
        className="px-4 pt-4 pb-3 border-b flex items-start gap-3"
        style={{ borderColor: "#f3f4f6" }}
      >
        <span className="mt-0.5 shrink-0" style={{ color: "#1a56db" }}>
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-snug" style={{ color: "#0d2464" }}>
            {title}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
            Site: {site}
          </p>
        </div>
        <span
          className="shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1"
          style={{ background: ss.bg, color: ss.color, whiteSpace: "nowrap" }}
        >
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ss.dot }} />
          {statusLabel}
        </span>
      </div>

      <div className="px-4 py-3 flex-1 flex flex-col gap-2">
        {fields.map((f) => (
          <div key={f.label} className="flex items-start justify-between gap-3">
            <span className="text-xs shrink-0" style={{ color: "#9ca3af" }}>
              {f.label}
            </span>
            <span
              className="text-xs font-medium text-right"
              style={{ color: f.tone ? toneColor[f.tone] : "#374151" }}
            >
              {f.value}
            </span>
          </div>
        ))}
      </div>

      {confidence && (
        <div className="px-4 pb-2 flex items-center gap-1.5">
          <span className="text-xs" style={{ color: "#9ca3af" }}>
            Confidence:
          </span>
          <span
            className="text-xs font-semibold"
            style={{
              color:
                confidence === "High" ? "#16a34a" : confidence === "Medium" ? "#d97706" : "#dc2626",
            }}
          >
            {confidence}
          </span>
        </div>
      )}

      {recommendation && (
        <div
          className="mx-4 mb-3 px-3 py-2 rounded-lg text-xs leading-snug"
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            color: "#1e40af",
          }}
        >
          <span className="font-semibold">Recommended: </span>
          {recommendation}
        </div>
      )}

      <div className="px-4 pb-4 pt-2 border-t" style={{ borderColor: "#f3f4f6" }}>
        <button
          onClick={() => onNavigate(navDest)}
          className="text-xs font-semibold flex items-center gap-1 hover:opacity-70 transition-opacity"
          style={{ color: "#1a56db" }}
        >
          View Application
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
      </div>
    </div>
  );
}
