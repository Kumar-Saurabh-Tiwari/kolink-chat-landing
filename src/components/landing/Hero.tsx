import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CirclePlay } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { InboxPreview } from "@/components/landing/InboxPreview";
import { ShimmerButton } from "@/components/landing/ShimmerButton";
import {
  FacebookMark,
  GmailMark,
  InstagramMark,
  LinkedInMark,
  MessengerMark,
  ThreadsMark,
  WhatsAppMark,
  XMark,
} from "@/components/landing/BrandMarks";

const ease = [0.22, 1, 0.36, 1] as const;

const headline = ["Chat", "marketing", "&", "engagement,", "without", "the", "tab", "chaos."];

const pulses = [
  "IG comment “Price?” → WhatsApp catalog in 1.8s",
  "Collision lock on · Sarah is replying",
  "8 native channels in one pulse",
] as const;

const channels = [
  { name: "Instagram", Mark: InstagramMark },
  { name: "Facebook", Mark: FacebookMark },
  { name: "Messenger", Mark: MessengerMark },
  { name: "WhatsApp", Mark: WhatsAppMark },
  { name: "Threads", Mark: ThreadsMark },
  { name: "X", Mark: XMark },
  { name: "LinkedIn", Mark: LinkedInMark },
  { name: "Gmail", Mark: GmailMark },
];

export function Hero() {
  const reduce = useReducedMotion();
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setPulse((value) => (value + 1) % pulses.length), 2800);
    return () => window.clearInterval(timer);
  }, []);

  const live = pulses[pulse] ?? pulses[0];

  return (
    <section className="relative mx-auto max-w-7xl px-5 text-center">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease }}
        className="glass-panel mx-auto inline-flex max-w-full flex-col items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-slate-600 ring-1 ring-inset ring-white/90 sm:flex-row sm:gap-2 sm:px-4 sm:py-2"
      >
        <span className="inline-flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative size-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#34d399]" />
          </span>
          <span className="font-semibold text-slate-800">Live workspace</span>
        </span>
        <span className="hidden h-3 w-px bg-slate-200 sm:block" />
        <span className="relative h-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={live}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className="block max-w-[18rem] truncate text-slate-500 sm:max-w-none"
            >
              {live}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.div>

      <h1 className="mx-auto mt-7 max-w-5xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
        {headline.map((word, index) => {
          const accent = index >= 4;
          return (
            <motion.span
              key={`${word}-${index}`}
              initial={reduce ? false : { opacity: 0, y: 22, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.08 + index * 0.055, duration: 0.62, ease }}
              className={
                accent
                  ? "mr-[0.28em] inline-block bg-gradient-to-r from-slate-950 via-blue-700 to-indigo-600 bg-clip-text text-transparent animate-headline-shine"
                  : "mr-[0.28em] inline-block"
              }
            >
              {word}
            </motion.span>
          );
        })}
      </h1>

      <motion.p
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6, ease }}
        className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg"
      >
        Unify social DMs, auto-manage likes and comments, prevent agent collision, and stitch 360°
        customer profiles across all 8 channels in one calm workspace.
      </motion.p>

      <motion.ul
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.68, duration: 0.55, ease }}
        className="mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-1.5"
        aria-label="Native channels"
      >
        {channels.map((channel, index) => (
          <motion.li
            key={channel.name}
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.72 + index * 0.04, type: "spring", stiffness: 380, damping: 20 }}
            whileHover={{ y: -3, scale: 1.08 }}
            className="grid size-10 place-items-center rounded-2xl border border-white/80 bg-white/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_8px_20px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl"
            title={channel.name}
          >
            <channel.Mark className="size-6" />
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.5 }}
        className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <ShimmerButton
          className="h-12 px-7 text-[15px] shadow-blue-500/30"
          onClick={() =>
            document.querySelector("#workspace")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Start Free Trial
          <motion.span
            animate={reduce ? { x: 0 } : { x: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="grid place-items-center"
          >
            <ArrowRight />
          </motion.span>
        </ShimmerButton>
        <Button
          variant="glass"
          size="lg"
          className="h-12 px-7 text-[15px]"
          onClick={() => document.querySelector("#inbox")?.scrollIntoView({ behavior: "smooth" })}
        >
          <motion.span
            animate={reduce ? { scale: 1 } : { scale: [1, 1.16, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="grid place-items-center"
          >
            <CirclePlay />
          </motion.span>
          Live Product Tour
        </Button>
      </motion.div>

      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-medium text-slate-500"
      >
        <span>No credit card</span>
        <span className="hidden size-1 rounded-full bg-slate-300 sm:inline-block" />
        <span>Set up in under 5 minutes</span>
        <span className="hidden size-1 rounded-full bg-slate-300 sm:inline-block" />
        <span className="inline-flex items-center gap-1 text-emerald-700">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          99.98% API uptime
        </span>
      </motion.p>

      <InboxPreview />
    </section>
  );
}
