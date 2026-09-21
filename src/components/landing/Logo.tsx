import { BrandIcon } from "@/components/landing/BrandIcon";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-2.5">
      <span className="relative grid size-8 place-items-center">
        <span className="animate-breathe absolute inset-[-7px] rounded-2xl bg-sky-400/50 blur-md" />
        <span className="relative grid size-8 place-items-center rounded-xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/40">
          <span className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-white/35 to-transparent" />
          <BrandIcon className="relative size-[18px]" />
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
