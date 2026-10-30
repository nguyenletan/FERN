export const statusBadge = (label: string, color: string) => (
  <span
    className="inline-block text-xs font-bold px-2 py-0.5 rounded"
    style={{ background: color, color: "#fff", letterSpacing: "0.05em" }}
  >
    {label}
  </span>
);

export const fieldRow = (label: string, value: string = "—") => (
  <div
    key={label}
    className="flex items-start gap-2 py-1"
    style={{ borderBottom: "1px solid #e2e8f0" }}
  >
    <span className="text-xs w-56 shrink-0" style={{ color: "#475569" }}>
      {label}
    </span>
    <span className="text-xs" style={{ color: value === "—" ? "#64748b" : "#334155" }}>
      {value}
    </span>
  </div>
);

export const gateCondition = (text: string) => (
  <div key={text} className="flex items-start gap-2 py-0.5">
    <span className="text-xs" style={{ color: "#64748b" }}>
      +
    </span>
    <span className="text-xs" style={{ color: "#475569" }}>
      {text}
    </span>
  </div>
);

export const futureField = (label: string) => (
  <div
    key={label}
    className="flex items-start gap-2 py-1"
    style={{ borderBottom: "1px solid #e2e8f0" }}
  >
    <span className="text-xs w-64 shrink-0" style={{ color: "#64748b" }}>
      {label}
    </span>
    <span className="text-xs" style={{ color: "#64748b" }}>
      —
    </span>
  </div>
);
