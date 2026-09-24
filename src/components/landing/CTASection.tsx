import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/landing/Reveal";
import { InstagramMark, WhatsAppMark } from "@/components/landing/BrandMarks";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const faces = [
  { initials: "AL", tone: "from-sky-400 to-blue-600" },
  { initials: "JR", tone: "from-violet-400 to-indigo-600" },
  { initials: "MK", tone: "from-rose-400 to-orange-500" },
];

function WorkspacePreview({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 22, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease }}
        className="relative"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
          className="transform-gpu rounded-[1.6rem] border border-white/35 bg-white/12 p-3 shadow-[0_30px_70px_-28px_rgba(15,23,42,0.55)] backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between px-2 py-1.5">
            <p className="text-[11px] font-bold tracking-wide text-white">Your workspace</p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold text-emerald-50 ring-1 ring-emerald-300/30">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-300 opacity-70" />
                <span className="relative size-1.5 rounded-full bg-emerald-300" />
              </span>
              Live
            </span>
          </div>

          <div className="mt-2 rounded-2xl bg-white p-3.5 text-slate-900 shadow-sm">
            <div className="flex items-start gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-fuchsia-400 to-rose-500 text-[10px] font-bold text-white">
                MC
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold">Maya Chen</p>
                  <span className="text-[10px] font-medium text-slate-400">now</span>
                </div>
                <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                  Price on the creator bundle?
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">
                ♥ Auto-liked
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-700">
                DM sent
              </span>
              <InstagramMark className="size-4" />
              <WhatsAppMark className="size-4" />
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50/90 px-2.5 py-2">
              <span className="size-2 shrink-0 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <p className="text-[11px] font-semibold text-amber-900">
                Thread locked · Sarah is replying
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.55, ease }}
        className="absolute -right-1 bottom-6 hidden items-center gap-1.5 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-lg shadow-slate-900/10 sm:inline-flex"
      >
        <Check size={13} className="text-emerald-500" />
        360° profile stitched
      </motion.div>
    </div>
  );
}

export function CTASection() {
  const reduceMotion = useReducedMotion();
  const reduce = Boolean(reduceMotion);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <section id="workspace" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-16 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-6 text-white shadow-[0_32px_80px_-28px_rgba(37,99,235,0.55)] sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 size-[30rem] rounded-full bg-[conic-gradient(from_90deg,rgba(56,189,248,0.5),rgba(167,139,250,0.35),rgba(255,255,255,0.22),rgba(56,189,248,0.5))] blur-2xl animate-mesh" />
          <div className="pointer-events-none absolute -bottom-28 left-[-10%] size-80 rounded-full bg-sky-300/35 blur-3xl" />
          <div className="pointer-events-none absolute right-[18%] top-[40%] size-56 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),transparent_46%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-blue-50 backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-300 opacity-70" />
                  <span className="relative size-2 rounded-full bg-emerald-300" />
                </span>
                Workspace ready in 60 seconds
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl sm:leading-[1.1]">
                Build the inbox first.
                <span className="mt-1 block text-blue-100/95">Connect your accounts in seconds.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-blue-50/90 sm:text-base">
                Experience zero tab clutter. Publish a post, try AI response automations, and test
                the live inbox before you connect a single account.
              </p>

              {submitted ? (
                <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-5 py-3 text-sm font-semibold backdrop-blur-md">
                  <Check size={16} /> Workspace queued — check {email}
                </p>
              ) : (
                <form
                  className="mt-8 max-w-xl"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (email.trim()) setSubmitted(true);
                  }}
                >
                  <div className="flex flex-col gap-2 rounded-2xl bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)] sm:flex-row sm:rounded-full">
                    <label className="relative min-w-0 flex-1">
                      <Mail
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        required
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@company.com"
                        className="h-12 w-full rounded-full bg-transparent pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                      />
                    </label>
                    <motion.button
                      type="submit"
                      onHoverStart={() => setHover(true)}
                      onHoverEnd={() => setHover(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative inline-flex h-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25"
                    >
                      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                        <motion.span
                          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          animate={
                            hover && !reduce
                              ? { x: ["-140%", "260%"] }
                              : { x: ["-140%", "260%"] }
                          }
                          transition={{
                            duration: hover ? 0.7 : 2.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: hover ? 0.15 : 1.4,
                          }}
                        />
                      </span>
                      <span className="relative z-[1] inline-flex items-center gap-2">
                        Create Workspace
                        <motion.span
                          animate={reduce ? { x: 0 } : hover ? { x: [0, 5, 0] } : { x: 0 }}
                          transition={{ duration: 0.55, repeat: hover && !reduce ? Infinity : 0, ease }}
                        >
                          <ArrowRight size={16} />
                        </motion.span>
                      </span>
                    </motion.button>
                  </div>
                </form>
              )}

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
                <div className="flex items-center">
                  {faces.map((face, index) => (
                    <span
                      key={face.initials}
                      className={cn(
                        "grid size-8 place-items-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white ring-2 ring-blue-500",
                        face.tone,
                        index > 0 && "-ml-2",
                      )}
                      style={{ zIndex: faces.length - index }}
                    >
                      {face.initials}
                    </span>
                  ))}
                  <span className="ml-3 text-[12px] font-medium text-blue-50/90">
                    Teams spinning up now
                  </span>
                </div>
                <p className="inline-flex items-center gap-2 text-[12px] font-medium text-blue-50/90">
                  <Lock size={13} />
                  No credit card required • Official Meta Integration
                </p>
              </div>
            </div>

            <WorkspacePreview reduce={reduce} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
