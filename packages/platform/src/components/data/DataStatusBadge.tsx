import { DATA_STATUS_CONFIG } from "../../domain/dataStatus.ts";
import type { DataStatus } from "../../domain/dataStatus.ts";

export default function DataStatusBadge({
  status,
  size = "sm",
}: {
  status: DataStatus;
  size?: "sm" | "xs";
}) {
  const s = DATA_STATUS_CONFIG[status];
  const px = size === "xs" ? "4px 6px" : "2px 8px";
  return (
    <span
      className="rounded font-semibold whitespace-nowrap"
      style={{
        background: s.bg,
        color: s.color,
        fontSize: size === "xs" ? 10 : 11,
        padding: px,
      }}
    >
      {s.label}
    </span>
  );
}
