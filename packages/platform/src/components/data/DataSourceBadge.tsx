import { SOURCE_STATUS_CONFIG } from "../../domain/dataStatus.ts";
import type { SourceStatus } from "../../domain/dataStatus.ts";

export default function DataSourceBadge({ status }: { status: SourceStatus }) {
  const s = SOURCE_STATUS_CONFIG[status];
  return (
    <span
      className="rounded-full text-xs font-semibold flex items-center gap-1 whitespace-nowrap"
      style={{ background: s.bg, color: s.color, padding: "2px 8px" }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
}
