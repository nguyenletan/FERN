export default function GapPattern({
  title,
  whyMatters,
  area,
  action,
}: {
  title: string;
  whyMatters: string;
  area: string;
  action: string;
}) {
  return (
    <div
      className="rounded-lg border px-4 py-3"
      style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
          style={{
            background: "#f3f4f6",
            color: "#9ca3af",
            letterSpacing: "0.08em",
          }}
        >
          GAP
        </span>
        <span className="text-sm font-semibold" style={{ color: "#374151" }}>
          {title}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-2">
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
            Why It Matters
          </p>
          <p className="text-xs" style={{ color: "#6b7280" }}>
            {whyMatters}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
            Assessment Area
          </p>
          <p className="text-xs" style={{ color: "#6b7280" }}>
            {area}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
            Required Action
          </p>
          <p className="text-xs" style={{ color: "#6b7280" }}>
            {action}
          </p>
        </div>
      </div>
    </div>
  );
}
