export default function DataCompletenessWidget({
  total,
  auto,
  confirmNeeded,
  userNeeded,
}: {
  total: number;
  auto: number;
  confirmNeeded: number;
  userNeeded: number;
}) {
  const pct = total > 0 ? Math.round((auto / total) * 100) : 0;
  return (
    <div
      className="rounded-lg border p-4"
      style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
    >
      <p className="text-xs font-bold mb-3" style={{ color: "#0d2464" }}>
        Data Preparation
      </p>
      <div className="flex flex-col gap-1.5 mb-3">
        {[
          {
            label: "Required inputs identified",
            value: total,
            color: "#374151",
          },
          { label: "Retrieved automatically", value: auto, color: "#16a34a" },
          {
            label: "Require confirmation",
            value: confirmNeeded,
            color: "#d97706",
          },
          { label: "Require user input", value: userNeeded, color: "#dc2626" },
        ].map((r) => (
          <div key={r.label} className="flex items-center justify-between text-xs">
            <span style={{ color: "#6b7280" }}>{r.label}</span>
            <span className="font-semibold" style={{ color: r.color }}>
              {r.value}
            </span>
          </div>
        ))}
      </div>
      <div className="h-2 rounded-full overflow-hidden mb-1" style={{ background: "#e5e7eb" }}>
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: "#16a34a" }}
        />
      </div>
      <p className="text-xs" style={{ color: "#9ca3af" }}>
        {pct}% retrieved automatically
      </p>
    </div>
  );
}
