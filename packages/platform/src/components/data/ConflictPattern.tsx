export default function ConflictPattern() {
  return (
    <div
      className="rounded-lg border px-4 py-3"
      style={{ borderColor: "#fee2e2", background: "#fff5f5" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
          style={{
            background: "#fee2e2",
            color: "#dc2626",
            letterSpacing: "0.08em",
          }}
        >
          CONFLICT
        </span>
        <span className="text-sm font-semibold" style={{ color: "#374151" }}>
          Conflict Pattern — Component Only
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2 mb-2">
        <div
          className="rounded border p-2.5"
          style={{ borderColor: "#fecaca", background: "#fff" }}
        >
          <p className="text-xs font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
            Source A
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            — awaiting source
          </p>
        </div>
        <div
          className="rounded border p-2.5"
          style={{ borderColor: "#fecaca", background: "#fff" }}
        >
          <p className="text-xs font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
            Source B
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            — awaiting source
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
            Conflicting Information
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            — awaiting data
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
            Assessment Impact
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            — awaiting data
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
            Required Resolution
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            — awaiting resolution
          </p>
        </div>
      </div>
    </div>
  );
}
