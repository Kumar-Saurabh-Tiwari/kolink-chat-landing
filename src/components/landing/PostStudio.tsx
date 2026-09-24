import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Calendar, Check, Clapperboard, ImageIcon, Send, Sparkles, Type } from "lucide-react";
import { useEffect, useState } from "react";
import { FacebookMark, InstagramMark, LinkedInMark, ThreadsMark } from "@/components/landing/BrandMarks";
import { Reveal } from "@/components/landing/Reveal";
import { cn } from "@/lib/utils";

const accounts = [
  { name: "kolink.studio", channel: "Instagram", Mark: InstagramMark },
  { name: "koLink", channel: "Facebook", Mark: FacebookMark },
  { name: "kolink", channel: "Threads", Mark: ThreadsMark },
  { name: "koLink Chat", channel: "LinkedIn", Mark: LinkedInMark },
] as const;

const beats = [
  { title: "Choose a connected account", body: "Instagram, Facebook, Threads, or LinkedIn — already signed in." },
  { title: "Image or video", body: "Drop a still, or a clip. The frame stays the same either way." },
  { title: "Post or Reel", body: "A simple feed post, or a Reel with a cover and a first comment." },
  { title: "Write it once", body: "Caption, AI rewrite, schedule, and a first comment before it goes live." },
] as const;

const caption = "Summer kit is live. Comment “Price” and we’ll send the VIP link.";
const ease = [0.22, 1, 0.36, 1] as const;

export function PostStudio() {
  const reduce = Boolean(useReducedMotion());
  const [step, setStep] = useState(reduce ? 5 : 0);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => setStep((value) => (value + 1) % 8), 2100);
    return () => window.clearInterval(timer);
  }, [reduce]);

  const video = step >= 2;
  const reel = step >= 3;
  const showCaption = step >= 4;
  const extras = step >= 5;
  const publishing = step === 6;
  const published = step >= 7;
  const beat = step <= 0 ? 0 : step <= 2 ? 1 : step === 3 ? 2 : 3;
  const mediaKey = reel ? "reel" : video ? "video" : "image";

  return (
    <section id="posting" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-16 sm:py-20">
      <Reveal className="mb-8 max-w-2xl sm:mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">Publishing</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          A new post, from the accounts you already connected.
        </h2>
        <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
          Pick the profile, choose an image or a video, then publish a simple post or a Reel. Caption,
          schedule, and AI replies stay in the same composer.
        </p>
      </Reveal>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-8">
        <ol className="grid gap-3">
          {beats.map((item, index) => {
            const active = beat === index;
            const done = beat > index;
            return (
              <motion.li
                key={item.title}
                animate={{ y: active && !reduce ? -2 : 0 }}
                transition={{ duration: 0.45, ease }}
                className={cn(
                  "relative overflow-hidden rounded-2xl border px-4 py-3.5",
                  active
                    ? "border-sky-200/90 bg-white/85 shadow-[0_18px_40px_-24px_rgba(14,165,233,0.55)]"
                    : "border-white/80 bg-white/50",
                )}
              >
                {active && !reduce ? (
                  <motion.span
                    layoutId="post-beat"
                    className="absolute inset-y-2 left-0 w-1 rounded-full bg-gradient-to-b from-sky-400 to-violet-500"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <span
                    className={cn(
                      "grid size-6 place-items-center rounded-full text-[11px] font-bold transition-colors duration-300",
                      active || done ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500",
                    )}
                  >
                    {done ? <Check size={12} /> : index + 1}
                  </span>
                  {item.title}
                </p>
                <p className="mt-1.5 pl-8 text-sm leading-6 text-slate-600">{item.body}</p>
              </motion.li>
            );
          })}
        </ol>

        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/90 bg-white/75 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)] ring-1 ring-inset ring-white/90 backdrop-blur-xl">
          <div className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full bg-sky-300/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 top-24 size-40 rounded-full bg-fuchsia-300/25 blur-3xl" />

          <div className="relative flex items-center justify-between gap-3 border-b border-slate-100/80 px-4 py-3">
            <p className="text-sm font-bold text-slate-900">New post</p>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-100">
              4 accounts connected
            </span>
          </div>

          <div className="relative flex gap-2 overflow-x-auto px-4 py-3">
            {accounts.map((item, index) => {
              const selected = index === 0;
              const Mark = item.Mark;
              return (
                <div
                  key={item.channel}
                  className={cn(
                    "relative flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1.5",
                    selected ? "border-transparent text-white" : "border-slate-200 bg-white text-slate-700",
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId="post-account"
                      className="absolute inset-0 rounded-full bg-slate-950"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <Mark className="relative size-5" />
                  <span className="relative text-[11px] font-semibold">{item.channel}</span>
                  <AnimatePresence>
                    {selected ? (
                      <motion.span
                        initial={reduce ? false : { scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative"
                      >
                        <Check size={12} />
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="relative grid grid-cols-2 gap-2 px-4">
            <Segment
              layoutId="media-kind"
              options={[
                { id: "image", label: "Image", icon: ImageIcon },
                { id: "video", label: "Video", icon: Clapperboard },
              ]}
              active={video ? "video" : "image"}
              reduce={reduce}
            />
            <Segment
              layoutId="post-kind"
              options={[
                { id: "post", label: "Post", icon: Type },
                { id: "reel", label: "Reel", icon: Sparkles },
              ]}
              active={reel ? "reel" : "post"}
              reduce={reduce}
            />
          </div>

          <div className="relative mx-4 mt-3 h-40 overflow-hidden rounded-2xl sm:h-44">
            <AnimatePresence mode="wait">
              <motion.div
                key={mediaKey}
                initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease }}
                className={cn(
                  "absolute inset-0",
                  reel
                    ? "bg-gradient-to-br from-violet-500 via-fuchsia-400 to-orange-300"
                    : video
                      ? "bg-gradient-to-br from-sky-400 via-indigo-400 to-fuchsia-300"
                      : "bg-gradient-to-br from-fuchsia-400 via-rose-300 to-amber-200",
                )}
              >
                {!reduce ? (
                  <motion.span
                    className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_42%)]"
                    animate={{ x: ["-6%", "8%", "-6%"] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : (
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_42%)]" />
                )}
              </motion.div>
            </AnimatePresence>

            <motion.span
              key={mediaKey + "-label"}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease }}
              className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-800 shadow-sm"
            >
              {reel ? "Reel · 0:12" : video ? "Video · 0:08" : "Image · 1/4"}
            </motion.span>

            <AnimatePresence>
              {video ? (
                <motion.span
                  key="play"
                  initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/25 ring-1 ring-white/70 backdrop-blur-md"
                >
                  <Clapperboard size={16} className="text-white" />
                </motion.span>
              ) : null}
            </AnimatePresence>

            <span className="absolute inset-x-0 bottom-0 h-1 bg-white/25">
              <motion.span
                className="block h-full bg-white"
                initial={false}
                animate={{ width: video && !reduce ? "100%" : video ? "62%" : "0%" }}
                transition={{ duration: video ? 2 : 0.3, ease: "easeOut" }}
              />
            </span>
          </div>

          <div className="relative mx-4 mt-3 min-h-[4.5rem] overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/90 px-3 py-2.5">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Caption</p>
            <p className="mt-1 text-[13px] leading-5 text-slate-800">
              {showCaption ? (
                caption.split("").map((char, index) => (
                  <motion.span
                    key={`${char}-${index}`}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15, delay: reduce ? 0 : index * 0.012 }}
                  >
                    {char}
                  </motion.span>
                ))
              ) : (
                <span className="text-slate-400">Write a caption, or let AI draft it…</span>
              )}
              {showCaption && !published && !reduce ? (
                <motion.span
                  aria-hidden
                  className="ml-0.5 inline-block h-3 w-px translate-y-0.5 bg-slate-900"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                />
              ) : null}
            </p>
          </div>

          <div className="relative mt-3 flex gap-2 overflow-x-auto px-4">
            {[
              { label: "AI caption", on: extras },
              { label: "Schedule", on: extras, icon: Calendar },
              { label: "First comment", on: reel || extras },
              { label: "Cross-post", on: published },
            ].map((chip, index) => (
              <motion.span
                key={chip.label}
                animate={
                  chip.on && !reduce
                    ? { scale: [0.96, 1], opacity: 1 }
                    : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.35, delay: chip.on ? index * 0.06 : 0, ease }}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-300",
                  chip.on ? "bg-violet-600 text-white shadow-sm shadow-violet-500/30" : "bg-slate-100 text-slate-500",
                )}
              >
                {chip.icon ? <chip.icon size={11} /> : <Sparkles size={11} />}
                {chip.label}
              </motion.span>
            ))}
          </div>

          <div className="relative flex items-center justify-between gap-3 px-4 py-4">
            <p className="min-w-0 truncate text-[11px] font-medium text-slate-500">
              {published ? "Live on Instagram · AI replies armed" : publishing ? "Sending to Instagram…" : "Draft · not published"}
            </p>
            <motion.span
              animate={publishing && !reduce ? { scale: 0.96 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold text-white",
                published ? "bg-emerald-600" : "bg-slate-900",
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={published ? "done" : "send"}
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-1.5"
                >
                  {published ? <Check size={13} /> : <Send size={13} />}
                  {published ? "Posted" : "Publish"}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </div>

          <AnimatePresence>
            {published ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4, ease }}
                className="pointer-events-none absolute inset-x-4 bottom-16 flex items-center gap-2 rounded-2xl border border-white/80 bg-white/90 px-3 py-2 shadow-[0_16px_40px_-18px_rgba(15,23,42,0.35)] backdrop-blur-xl"
              >
                <span className="grid size-6 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check size={13} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold text-slate-900">Posted to Instagram</span>
                  <span className="block text-[10px] text-slate-500">Reel is live · AI replies are on</span>
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Segment({
  options,
  active,
  layoutId,
  reduce,
}: {
  options: { id: string; label: string; icon: typeof ImageIcon }[];
  active: string;
  layoutId: string;
  reduce: boolean;
}) {
  return (
    <div className="grid grid-cols-2 rounded-full bg-slate-100 p-1">
      {options.map((option) => {
        const Icon = option.icon;
        const on = option.id === active;
        return (
          <span
            key={option.id}
            className={cn(
              "relative inline-flex items-center justify-center gap-1 rounded-full py-1.5 text-[11px] font-semibold",
              on ? "text-slate-900" : "text-slate-500",
            )}
          >
            {on ? (
              <motion.span
                layoutId={reduce ? undefined : layoutId}
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <Icon size={12} className="relative" />
            <span className="relative">{option.label}</span>
          </span>
        );
      })}
    </div>
  );
}
