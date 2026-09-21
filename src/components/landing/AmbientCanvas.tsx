export function AmbientCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#f8fafc]" />
      <div className="absolute -left-[18%] -top-[12%] h-[640px] w-[640px] rounded-full bg-[#38bdf8] opacity-20 blur-[130px] animate-aurora" />
      <div className="absolute -right-[12%] top-[8%] h-[580px] w-[580px] rounded-full bg-[#818cf8] opacity-20 blur-[130px] animate-aurora [animation-duration:19s] [animation-direction:reverse]" />
      <div className="absolute bottom-[-18%] left-[22%] h-[620px] w-[620px] rounded-full bg-[#34d399] opacity-20 blur-[130px] animate-aurora [animation-duration:22s]" />
      <div className="absolute right-[18%] bottom-[12%] h-[420px] w-[420px] rounded-full bg-[#38bdf8] opacity-20 blur-[130px] animate-aurora [animation-duration:18s] [animation-delay:-4s]" />
      <div className="animate-iridescence absolute left-1/2 top-1/4 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(56,189,248,0.2),rgba(129,140,248,0.18),rgba(52,211,153,0.16),rgba(255,255,255,0.12),rgba(56,189,248,0.2))] blur-[90px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.85),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.28] [background-image:radial-gradient(rgba(15,23,42,0.07)_0.6px,transparent_0.6px)] [background-size:18px_18px]" />
    </div>
  );
}
