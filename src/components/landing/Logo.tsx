import { useId } from "react";

export function Logo({ compact = false }: { compact?: boolean }) {
  const gradientId = `kolink-logo-${useId().replace(/:/g, "")}`;

  return (
    <a href="#top" className="group flex items-center gap-2.5">
      <span className="relative grid size-8 place-items-center">
        <span className="animate-breathe absolute inset-[-7px] rounded-2xl bg-sky-400/50 blur-md" />
        <span className="relative size-8 overflow-hidden rounded-xl shadow-lg shadow-blue-500/40">
          <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
            <defs>
              <linearGradient id={gradientId} x1="6" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="48%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
            <rect width="32" height="32" rx="9" fill={`url(#${gradientId})`} />
            <rect
              x="1"
              y="1"
              width="30"
              height="30"
              rx="8"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.32"
              strokeWidth="1"
            />
            <path
              fill="#fff"
              d="M9.6 7.6h3.35v7.05L20.15 7.6h4.05l-8.05 8.35 8.35 8.45h-4.15l-7.35-7.5v7.5H9.6V7.6Z"
            />
          </svg>
        </span>
      </span>
      <span
        className={compact ? "sr-only" : "text-[15px] font-extrabold tracking-tight text-slate-900"}
      >
        koLink <span className="font-semibold text-slate-500">Chat</span>
      </span>
    </a>
  );
}
