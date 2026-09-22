import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  BadgeCheck,
  Check,
  Filter,
  Heart,
  Lock,
  MessageCircle,
  Play,
  ShieldAlert,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { Fragment, useEffect, useId, useState } from "react";
import { GlassCard } from "@/components/landing/GlassCard";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/Reveal";
import { GmailMark, InstagramMark, WhatsAppMark } from "@/components/landing/BrandMarks";
import { LivePing, MetricsPill, PresenceAvatar, Sparkline } from "@/components/landing/primitives";
import { cn } from "@/lib/utils";

function FloatingHearts() {
  return (
    <span className="pointer-events-none absolute -top-1 left-1/2 z-[2]" aria-hidden>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <motion.span
          key={index}
          className="absolute -translate-x-1/2 text-rose-400"
          animate={{
            y: [0, -52],
            x: [0, index % 2 === 0 ? 12 : -14],
            opacity: [0, 0.95, 0],
            scale: [0.7, 1.05, 0.85],
          }}
          transition={{ duration: 2.1, repeat: Infinity, delay: index * 0.32, ease: "easeOut" }}
        >
          <Heart size={11 + (index % 3)} fill="currentColor" />
        </motion.span>
      ))}
    </span>
  );
}

function EngagementEngine() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setStep((value) => (value + 1) % 5), 1600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative mt-5 flex flex-1 flex-col gap-3">
      <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
        <div className="flex items-center gap-2 px-3 py-2.5">
          <InstagramMark className="size-8" />
          <div className="min-w-0">
            <p className="flex items-center gap-1 text-xs font-bold text-slate-900">
              kolink.studio
              <BadgeCheck size={13} className="text-sky-500" fill="currentColor" />
            </p>
            <p className="text-[10px] text-slate-400">Reel · Creator Kit drop</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">
            <span className="size-1.5 rounded-full bg-rose-500" />
            Live
          </span>
        </div>

        <div className="relative h-36 overflow-hidden bg-gradient-to-br from-fuchsia-400 via-rose-300 to-amber-200 sm:h-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_40%)]" />
          <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/25 ring-1 ring-white/50 backdrop-blur-md">
            <Play size={16} fill="white" className="text-white" />
          </span>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <p className="max-w-[70%] text-[11px] font-semibold text-white drop-shadow">
              Summer kit is live — comment “Price” for the VIP link
            </p>
            <span className="relative grid size-9 place-items-center rounded-full bg-white/90 text-rose-500 shadow-sm">
              <Heart size={16} fill="currentColor" />
              <FloatingHearts />
            </span>
          </div>
        </div>

        <div className="space-y-2 px-3 py-3">
          <AnimatePresence>
            {step >= 1 ? (
              <motion.div
                key="comment"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2"
              >
                <p className="min-w-0 text-[11px] leading-5 text-slate-700">
                  <b className="text-slate-900">@alex_growth</b> What&apos;s the discount code?
                </p>
                <span className="mt-0.5 flex shrink-0 flex-col items-end gap-1">
                  <Heart
                    size={14}
                    className={step >= 2 ? "text-rose-500" : "text-slate-300"}
                    fill={step >= 2 ? "currentColor" : "transparent"}
                  />
                  {step >= 2 ? (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-full bg-rose-50 px-1.5 py-0.5 text-[8px] font-bold leading-none text-rose-600"
                    >
                      Auto-liked
                    </motion.span>
                  ) : null}
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 3 ? (
              <motion.p
                key="reply"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-xl bg-violet-50 px-3 py-2 text-[11px] leading-5 text-violet-800"
              >
                <b>kolink.studio</b> Check your DMs! Sent you the VIP link ✨
              </motion.p>
            ) : (
              <p className="text-[11px] text-slate-400">Waiting for keyword match…</p>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {step >= 4 ? (
            <motion.div
              key="toast"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-3 left-3 right-3 z-[3] flex items-center gap-2 rounded-2xl border border-white/80 bg-white/85 px-3 py-2 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.2)] backdrop-blur-xl"
            >
              <WhatsAppMark className="size-7" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">WhatsApp DM triggered</p>
                <p className="truncate text-[11px] font-medium text-slate-700">Sent 20% off coupon · catalog attached</p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <MetricsPill className="w-full justify-between px-3 py-2 text-[11px] text-emerald-700">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          +38.4% organic reach boost
        </span>
        <Sparkline className="h-5 w-16 text-emerald-500" />
      </MetricsPill>
    </div>
  );
}

const macros = [
  { cmd: "/pricing", text: "Creator Kit is $129 — I’ll send a checkout link." },
  { cmd: "/booking-link", text: "Grab 15 minutes on Elena’s calendar: cal.kolink.com/vip" },
  { cmd: "/refund-policy", text: "Refunds complete within 1–2 business days, no questions." },
] as const;

function TeamWorkspace() {
  const [snippet, setSnippet] = useState(0);
  const [approved, setApproved] = useState(false);
  const active = macros[snippet] ?? macros[0];

  return (
    <div className="mt-5 flex flex-1 flex-col gap-3">
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-amber-200/80 bg-amber-50/80 px-3 py-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
        <div className="flex min-w-0 items-center gap-2">
          <PresenceAvatar initials="SJ" typing className="bg-gradient-to-br from-violet-400 to-indigo-500" />
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-900">Sarah Jenkins is currently replying…</p>
            <p className="text-[10px] text-slate-500">Thread locked to prevent duplicate messages</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-100">
          <ShieldAlert size={12} /> Held
        </span>
      </div>

      <div className="space-y-2 rounded-2xl border border-white/80 bg-white/70 p-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Thread · WhatsApp</p>
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-slate-100 px-3 py-2 text-[11px] text-slate-700">
          Can you do a custom enterprise quote? We have 40 seats.
        </div>
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-sky-50 px-3 py-2 text-[11px] text-sky-900">
          {active.text}
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-3">
        <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">
          <Lock size={11} /> Private team whisper
          <span className="font-medium text-amber-500">(customer cannot see)</span>
        </p>
        <p className="mt-1.5 text-xs text-slate-700">
          <span className="font-semibold text-indigo-600">@mike</span> Can you approve a 15% custom
          enterprise quote for this client?
        </p>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => setApproved(true)}
            className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white"
          >
            <Check size={11} /> {approved ? "Approved" : "Approve"}
          </button>
          <button
            type="button"
            className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600 ring-1 ring-slate-200"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="mt-auto space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Quick macros</p>
        <div className="flex flex-wrap gap-1.5">
          {macros.map((macro, index) => (
            <button
              key={macro.cmd}
              type="button"
              onClick={() => setSnippet(index)}
              className={cn(
                "rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold ring-1 transition",
                snippet === index
                  ? "bg-slate-900 text-white ring-slate-900"
                  : "bg-white/80 text-slate-600 ring-slate-200 hover:ring-sky-300",
              )}
            >
              {macro.cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactCard() {
  const svgId = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const [pulse, setPulse] = useState(2);

  useEffect(() => {
    const timer = window.setInterval(() => setPulse((value) => (value + 1) % 3), 1800);
    return () => window.clearInterval(timer);
  }, []);

  const identities = [
    { label: "@elena.park", channel: "Instagram", mark: InstagramMark },
    { label: "+1 (415) 555-0198", channel: "WhatsApp", mark: WhatsAppMark },
    { label: "elena@northwind.co", channel: "Gmail", mark: GmailMark },
  ] as const;

  const timeline = [
    { time: "10:02 AM", text: "Commented on Reel #402" },
    { time: "10:03 AM", text: "Auto-like & WhatsApp catalog sent" },
    { time: "10:14 AM", text: "Gmail contract agreement viewed" },
  ];

  return (
    <div className="mt-5 flex flex-1 flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-400 to-indigo-500 text-sm font-bold text-white shadow-md">
          EP
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">Elena Park</p>
          <p className="text-[11px] text-slate-500">Identity stitched across 3 native channels</p>
        </div>
        <LivePing label="VIP live" className="ml-auto normal-case tracking-normal" />
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/70 p-3">
        <svg viewBox="0 0 360 54" className="absolute inset-x-3 top-11 h-10 w-[calc(100%-24px)]" aria-hidden>
          <path
            d="M40 8 C 40 34, 180 34, 180 12"
            fill="none"
            stroke={`url(#${svgId}-line)`}
            strokeWidth="1.6"
            strokeDasharray="4 6"
            className="animate-flow-dash"
          />
          <path
            d="M180 12 C 180 34, 320 34, 320 8"
            fill="none"
            stroke={`url(#${svgId}-line)`}
            strokeWidth="1.6"
            strokeDasharray="4 6"
            className="animate-flow-dash"
          />
          <defs>
            <linearGradient id={`${svgId}-line`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d946ef" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          {reduce
            ? null
            : [0, 0.9].map((delay) => (
                <g key={delay}>
                  <circle r="3.2" fill="#d946ef">
                    <animateMotion
                      dur="2.4s"
                      begin={`${delay}s`}
                      repeatCount="indefinite"
                      path="M40 8 C 40 34, 180 34, 180 12"
                    />
                  </circle>
                  <circle r="3.2" fill="#34d399">
                    <animateMotion
                      dur="2.4s"
                      begin={`${delay + 0.3}s`}
                      repeatCount="indefinite"
                      path="M180 12 C 180 34, 320 34, 320 8"
                    />
                  </circle>
                </g>
              ))}
        </svg>
        <div className="relative grid grid-cols-3 gap-1.5">
          {identities.map((identity) => {
            const Mark = identity.mark;
            return (
              <div
                key={identity.channel}
                className="rounded-xl bg-white px-2 py-2 text-center shadow-sm ring-1 ring-slate-100"
              >
                <Mark className="mx-auto size-6" />
                <p className="mt-1 truncate text-[9px] font-bold text-slate-800">{identity.label}</p>
                <p className="text-[8px] font-semibold uppercase tracking-wide text-slate-400">{identity.channel}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <MetricsPill className="bg-amber-50 text-amber-800">VIP Enterprise</MetricsPill>
        <MetricsPill className="bg-indigo-50 text-indigo-800">High Intent</MetricsPill>
        <MetricsPill className="bg-fuchsia-50 text-fuchsia-800">Comment origin: Summer Promo</MetricsPill>
      </div>

      <div className="relative mt-1 flex-1 space-y-3 pl-4">
        <span className="absolute bottom-1 left-[7px] top-1 w-px bg-gradient-to-b from-fuchsia-400 via-blue-400 to-emerald-400" />
        {timeline.map((row, index) => {
          const on = pulse === index;
          return (
            <div key={row.time} className="relative">
              <motion.span
                animate={{ scale: on ? 1.25 : 1, boxShadow: on ? "0 0 12px rgba(56,189,248,0.7)" : "0 0 0 rgba(0,0,0,0)" }}
                className={cn(
                  "absolute -left-[13px] top-1.5 size-2.5 rounded-full bg-white ring-2",
                  on ? "ring-sky-400" : "ring-slate-300",
                )}
              />
              <p className="text-[10px] font-bold text-slate-400">{row.time}</p>
              <p className="text-[11px] font-semibold text-slate-800">{row.text}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="rounded-xl bg-white/80 px-3 py-2 ring-1 ring-white">
          <p className="text-slate-400">Lifetime value</p>
          <p className="font-bold text-slate-900">$4,820</p>
        </div>
        <div className="rounded-xl bg-white/80 px-3 py-2 ring-1 ring-white">
          <p className="text-slate-400">Last touch</p>
          <p className="font-bold text-emerald-600">Live now</p>
        </div>
      </div>
    </div>
  );
}

function FlowConnector({
  active,
  reduce,
  from,
  to,
}: {
  active: boolean;
  reduce: boolean;
  from: string;
  to: string;
}) {
  return (
    <div className="relative mx-1 flex h-7 w-4 shrink-0 items-center overflow-hidden sm:w-6">
      <span className="absolute inset-x-0 h-px bg-slate-200/90" />
      <motion.span
        className="absolute inset-x-0 h-[2px] origin-left rounded-full"
        style={{ backgroundImage: `linear-gradient(90deg, ${from}, ${to})` }}
        animate={{ scaleX: active ? 1 : 0.2, opacity: active ? 1 : 0.45 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
      {reduce ? null : (
        <motion.span
          className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          style={{ backgroundColor: active ? to : from }}
          animate={{ left: ["0%", "78%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}

function FlowCanvas() {
  const reduceMotion = useReducedMotion();
  const reduce = Boolean(reduceMotion);
  const [step, setStep] = useState(0);
  const [executed, setExecuted] = useState(4892);

  useEffect(() => {
    const run = window.setInterval(() => setStep((value) => (value + 1) % 3), 1800);
    const count = window.setInterval(() => setExecuted((value) => value + 1), 2400);
    return () => {
      window.clearInterval(run);
      window.clearInterval(count);
    };
  }, []);

  const logs = [
    { tone: "text-sky-700", text: "Trigger matched “Price” on Instagram" },
    { tone: "text-violet-700", text: "Logic passed · follower = true" },
    { tone: "text-emerald-700", text: "Action delivered · like + WhatsApp + CRM" },
  ] as const;
  const activeLog = logs[step] ?? logs[0];

  const nodes = [
    {
      id: 0,
      label: "Trigger",
      body: "“Price” or “Info”",
      icon: Zap,
      iconWrap: "from-sky-400 to-blue-600 shadow-sky-500/35",
      ring: "border-sky-200/90 shadow-[0_12px_28px_-14px_rgba(14,165,233,0.55)]",
    },
    {
      id: 1,
      label: "Logic",
      body: "Follows account?",
      icon: Filter,
      iconWrap: "from-violet-400 to-indigo-600 shadow-violet-500/35",
      ring: "border-violet-200/90 shadow-[0_12px_28px_-14px_rgba(139,92,246,0.5)]",
    },
    {
      id: 2,
      label: "Action",
      body: "Like + coupon + CRM",
      icon: Sparkles,
      iconWrap: "from-emerald-400 to-teal-600 shadow-emerald-500/35",
      ring: "border-emerald-200/90 shadow-[0_12px_28px_-14px_rgba(16,185,129,0.5)]",
    },
  ];

  const results = [
    { label: "Comment auto-liked" },
    { label: "WhatsApp coupon sent" },
    { label: "CRM · High intent" },
  ];

  return (
    <div className="relative mt-5 flex min-h-[16rem] flex-1 flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:min-h-[19.5rem]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_88%_100%,rgba(52,211,153,0.14),transparent_36%),radial-gradient(circle_at_70%_0%,rgba(167,139,250,0.12),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.32] [background-image:radial-gradient(rgba(15,23,42,0.09)_0.7px,transparent_0.7px)] [background-size:14px_14px]" />

      <div className="relative z-[1] flex items-center gap-2 border-b border-white/80 bg-white/55 px-3 py-2 backdrop-blur-xl">
        <LivePing label="Live canvas" className="normal-case tracking-normal" />
        <span className="truncate text-[10px] font-semibold text-slate-500">
          {executed.toLocaleString()} runs
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/80 px-2 py-0.5 text-[10px] font-bold text-slate-600 shadow-sm">
          <motion.span
            animate={reduce ? { scale: 1 } : { scale: [1, 1.14, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="grid size-4 place-items-center rounded-full bg-slate-900 text-white"
          >
            <Play size={8} fill="currentColor" />
          </motion.span>
          Running
        </span>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-100">
          0 errors
        </span>
      </div>

      <div className="relative z-[1] flex flex-1 flex-col gap-3 p-3 sm:p-3.5">
        <div className="flex items-stretch">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const lit = step === node.id || step > node.id;
            const current = step === node.id;
            return (
              <Fragment key={node.label}>
                <motion.div
                  animate={{ y: current ? -3 : 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className={cn(
                    "relative min-w-0 flex-1 rounded-2xl border bg-white/90 px-2 py-2 backdrop-blur-xl ring-1 ring-inset ring-white/90 sm:px-2.5 sm:py-2.5",
                    lit ? node.ring : "border-white/80 shadow-[0_10px_24px_-16px_rgba(15,23,42,0.18)]",
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "relative grid size-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-white shadow-md sm:size-7 sm:rounded-xl",
                        node.iconWrap,
                      )}
                    >
                      <Icon size={12} />
                      {lit && !current ? (
                        <span className="absolute -right-1 -top-1 grid size-3.5 place-items-center rounded-full bg-white text-emerald-500 shadow-sm">
                          <Check size={8} />
                        </span>
                      ) : null}
                    </span>
                    <p className="min-w-0 flex-1 text-[10px] font-bold leading-4 text-slate-900 sm:text-[11px]">
                      {node.label}
                    </p>
                    {current ? (
                      <span className="size-1.5 shrink-0 rounded-full bg-sky-500 shadow-[0_0_8px_#38bdf8]" />
                    ) : null}
                  </div>
                  <p className="mt-2 rounded-lg bg-slate-50/90 px-1.5 py-1 text-[9px] font-medium leading-4 text-slate-600 sm:px-2">
                    {node.body}
                  </p>
                  {node.id === 0 ? (
                    <div className="mt-1.5 flex items-center gap-1">
                      <InstagramMark className="size-3.5" />
                      <span className="text-[8px] font-bold uppercase tracking-wide text-slate-400">
                        Instagram
                      </span>
                    </div>
                  ) : null}
                  {node.id === 1 ? (
                    <div className="mt-1.5 flex gap-1">
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 text-[8px] font-bold",
                          step >= 1
                            ? "bg-emerald-500 text-white"
                            : "bg-white text-slate-400 ring-1 ring-slate-200",
                        )}
                      >
                        True
                      </span>
                      <span className="rounded-full bg-white px-1.5 py-0.5 text-[8px] font-bold text-slate-400 ring-1 ring-slate-200">
                        False
                      </span>
                    </div>
                  ) : null}
                  {node.id === 2 ? (
                    <div className="mt-1.5 flex items-center gap-1">
                      <WhatsAppMark className="size-3.5" />
                      <span className="text-[8px] font-bold uppercase tracking-wide text-slate-400">
                        WhatsApp
                      </span>
                    </div>
                  ) : null}
                </motion.div>
                {index < nodes.length - 1 ? (
                  <FlowConnector
                    active={step > index}
                    reduce={reduce}
                    from={index === 0 ? "#38bdf8" : "#818cf8"}
                    to={index === 0 ? "#818cf8" : "#34d399"}
                  />
                ) : null}
              </Fragment>
            );
          })}
        </div>

        <div className="rounded-xl border border-white/80 bg-white/75 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl">
          <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">Run output</p>
          <div className="mt-1.5 grid gap-1 sm:grid-cols-3">
            {results.map((row) => {
              const ok = step >= 2;
              return (
                <div key={row.label} className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "grid size-3.5 place-items-center rounded-full",
                      ok ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400",
                    )}
                  >
                    <Check size={8} />
                  </span>
                  <p className={cn("text-[10px] font-semibold", ok ? "text-slate-800" : "text-slate-400")}>
                    {row.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-[1] flex items-center gap-2 border-t border-white/80 bg-white/70 px-3 py-2 backdrop-blur-xl">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeLog.text}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className={cn("min-h-4 min-w-0 flex-1 truncate text-[11px] font-semibold", activeLog.tone)}
          >
            {activeLog.text}
          </motion.p>
        </AnimatePresence>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={cn(
                "h-1 w-4 rounded-full sm:w-5",
                index <= step ? "bg-gradient-to-r from-sky-400 to-emerald-400" : "bg-slate-200",
              )}
            />
          ))}
        </div>
        <span className="shrink-0 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
          {step + 1}/3
        </span>
      </div>
    </div>
  );
}

export function FeatureBento() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-16 sm:py-20">
      <Reveal className="mb-8 max-w-2xl sm:mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
          One calm command center
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Engage, assign, remember, automate.
        </h2>
        <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
          Likes and comments that compound reach, a team that never double-replies, a mini-CRM that
          stitches identities, and flows your whole company can read.
        </p>
      </Reveal>

      <Stagger className="grid min-w-0 auto-rows-fr gap-4 max-md:grid-cols-1 md:grid-cols-2">
        <StaggerItem className="h-full min-h-0 min-w-0">
          <GlassCard id="feature-live" className="h-full min-h-0 scroll-mt-3 p-4 sm:min-h-[34rem] sm:p-7">
            <div className="mb-4 grid size-11 place-items-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
              <Heart size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Likes & Comments Engagement Engine</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
              Auto-like comments, keyword-reply under posts and ads, then turn “Price?” into a
              private WhatsApp or Messenger checkout.
            </p>
            <EngagementEngine />
          </GlassCard>
        </StaggerItem>

        <StaggerItem className="h-full min-h-0 min-w-0">
          <GlassCard id="team" className="h-full min-h-0 scroll-mt-28 p-4 sm:min-h-[34rem] sm:p-7">
            <div className="mb-4 grid size-11 place-items-center rounded-2xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
              <Users size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Omnichannel Team & Collision Guard</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Collision detection, role-based assignment, internal whispers, and canned macros.
            </p>
            <TeamWorkspace />
          </GlassCard>
        </StaggerItem>

        <StaggerItem className="h-full min-h-0 min-w-0">
          <GlassCard id="crm" className="h-full min-h-0 scroll-mt-28 p-4 sm:min-h-[34rem] sm:p-7">
            <div className="mb-4 grid size-11 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
              <MessageCircle size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">360° Contact Dossier & Mini-CRM</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              One card for Instagram, WhatsApp, and email — tags, attributes, and a glowing
              timeline.
            </p>
            <ContactCard />
          </GlassCard>
        </StaggerItem>

        <StaggerItem className="h-full min-h-0 min-w-0">
          <GlassCard id="automations" className="h-full min-h-0 p-4 sm:min-h-[34rem] sm:p-7">
            <div className="relative mb-4 grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 text-violet-600 ring-1 ring-violet-100">
              <span className="animate-breathe absolute inset-[-6px] rounded-2xl bg-violet-400/25 blur-md" />
              <motion.span
                animate={{ rotate: [0, 12, -8, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative grid place-items-center"
              >
                <Workflow size={20} />
              </motion.span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Readable Visual Flow Builder</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              When a comment contains “Price” → follower check → auto-like + WhatsApp coupon. Pulses
              travel the connectors so the path is obvious.
            </p>
            <FlowCanvas />
          </GlassCard>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
