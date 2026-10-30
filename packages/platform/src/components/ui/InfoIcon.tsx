import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function InfoIcon({
  label,
  text,
  side = "top",
}: {
  label: string;
  text: string;
  side?: "top" | "right";
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const ctnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ctnRef.current && !ctnRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function recalc() {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    if (side === "right") setPos({ top: r.top + r.height / 2, left: r.right + 8 });
    else setPos({ top: r.top - 6, left: r.left + r.width / 2 });
  }

  return (
    <div className="relative inline-flex shrink-0" ref={ctnRef}>
      <button
        ref={btnRef}
        type="button"
        aria-label={`Information about ${label}`}
        onClick={(e) => {
          e.stopPropagation();
          open ? setOpen(false) : (recalc(), setOpen(true));
        }}
        onMouseEnter={() => {
          recalc();
          setOpen(true);
        }}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => {
          recalc();
          setOpen(true);
        }}
        onBlur={() => setOpen(false)}
        className="flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-blue-300 hover:bg-blue-50"
        style={{ width: 16, height: 16, color: "#9ca3af" }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <circle cx="6.5" cy="6.5" r="5.8" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6.5 5.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="6.5" cy="4.1" r="0.65" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <div
          role="tooltip"
          className="fixed z-[9999] rounded-lg text-xs leading-relaxed pointer-events-none"
          style={{
            ...(side === "right"
              ? { top: pos.top, left: pos.left, transform: "translateY(-50%)" }
              : {
                  top: pos.top,
                  left: pos.left,
                  transform: "translateX(-50%) translateY(-100%)",
                }),
            width: 220,
            background: "#1e293b",
            color: "#e2e8f0",
            border: "1px solid #334155",
            padding: "8px 10px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
          }}
        >
          <p className="font-semibold mb-1" style={{ color: "#f8fafc" }}>
            {label}
          </p>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}
