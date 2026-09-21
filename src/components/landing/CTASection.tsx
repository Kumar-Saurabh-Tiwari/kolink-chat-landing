import { ArrowRight, Check, Lock } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/landing/Reveal";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="workspace" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-16 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 p-8 text-white shadow-2xl sm:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 size-[28rem] rounded-full bg-[conic-gradient(from_90deg,rgba(56,189,248,0.45),rgba(129,140,248,0.3),rgba(255,255,255,0.2),rgba(56,189,248,0.45))] blur-2xl animate-mesh" />
          <div className="pointer-events-none absolute -bottom-24 left-0 size-72 rounded-full bg-sky-300/30 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_42%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Workspace</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Build the inbox first. Wire the APIs later.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
              Experience zero tab clutter. Test the live inbox, flows, and team assignments in 60
              seconds.
            </p>
            {submitted ? (
              <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-5 py-3 text-sm font-semibold">
                <Check size={16} /> Workspace queued — check {email}
              </p>
            ) : (
              <form
                className="mt-8 flex max-w-lg flex-col gap-2 sm:flex-row"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (email.trim()) setSubmitted(true);
                }}
              >
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white outline-none placeholder:text-blue-200 focus:border-white/50"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-blue-700 shadow-lg transition hover:scale-[1.02] hover:bg-blue-50"
                >
                  Create Workspace
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
            <p className="mt-4 inline-flex items-center gap-2 text-[12px] font-medium text-blue-100">
              <Lock size={13} /> No credit card required • Instant Meta Cloud Setup
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
