import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CirclePlay, Heart, Lock, Send, Star, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InboxPreview } from "@/components/landing/InboxPreview";
import { IPhoneShowcase } from "@/components/landing/IPhoneShowcase";
import { FacebookMark, InstagramMark } from "@/components/landing/BrandMarks";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const pop = [0.22, 1.2, 0.36, 1] as const;
const frost =
  "bg-white/80 backdrop-blur-xl border border-white/90 shadow-lg ring-1 ring-inset ring-white/90";

const leadWords = ["Every", "customer", "conversation."];
const calmWords = ["One", "calm", "workspace."];

const faces = [
  { initials: "AL", tone: "from-sky-400 to-blue-600" },
  { initials: "JR", tone: "from-violet-400 to-indigo-600" },
  { initials: "MK", tone: "from-rose-400 to-orange-500" },
  { initials: "TP", tone: "from-emerald-400 to-teal-600" },
  { initials: "NS", tone: "from-amber-400 to-orange-500" },
];

function RadarDot({ reduce }: { reduce: boolean }) {
  return (
    <span className="relative grid size-4 place-items-center" aria-hidden>
      {reduce ? null : (
        <>
          <motion.span
            className="absolute size-2 rounded-full bg-emerald-400/45 blur-[1.5px]"
            animate={{ scale: [1, 2.35], opacity: [0.4, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute size-2 rounded-full bg-emerald-300/35 blur-[2px]"
            animate={{ scale: [1, 1.9], opacity: [0.28, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.15 }}
          />
        </>
      )}
      <motion.span
        className="relative size-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.55)]"
        animate={reduce ? undefined : { opacity: [0.78, 1, 0.78], scale: [1, 1.06, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  );
}

function PoppingHeart({ reduce }: { reduce: boolean }) {
  return (
    <span className="relative grid size-5 place-items-center">
      {reduce
        ? null
        : [0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="pointer-events-none absolute text-rose-400"
              animate={{
                y: [4, -16],
                x: [0, (index - 1) * 11],
                opacity: [0, 1, 0],
                scale: [0.45, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: 0.16 * index,
                repeatDelay: 1.2,
                ease: "easeOut",
              }}
            >
              <Heart className="size-2 fill-current" />
            </motion.span>
          ))}
      <motion.span
        animate={
          reduce
            ? { scale: 1 }
            : { scale: [1, 1.32, 0.9, 1.12, 1], rotate: [0, -12, 8, 0] }
        }
        transition={
          reduce
            ? { duration: 0 }
            : { duration: 1.05, repeat: Infinity, repeatDelay: 1.35, ease: "easeInOut" }
        }
        className="relative grid place-items-center text-rose-500"
      >
        <Heart className="size-3.5 fill-current drop-shadow-[0_3px_8px_rgba(244,63,94,0.45)]" />
      </motion.span>
    </span>
  );
}

function TypingDots({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)} aria-hidden>
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="size-1.5 rounded-full bg-amber-500"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2.5, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.14, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

function EngagementCard({
  reduce,
  stable = false,
  singleLine = false,
  className,
}: {
  reduce: boolean;
  stable?: boolean;
  singleLine?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={reduce ? false : stable ? { opacity: 0 } : { opacity: 0, x: -20, y: 12 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: stable ? 0.15 : 0.72, duration: 0.6, ease }}
      className={cn("transform-gpu", className)}
    >
      <motion.article
        animate={reduce || stable ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
        className={cn(frost, "w-full rounded-xl p-2.5 text-left shadow-slate-900/5")}
      >
        <div className="flex items-center gap-1.5">
          <InstagramMark className="size-4" />
          <p className="text-[10px] font-semibold text-slate-700">Incoming comment</p>
          <span className="ml-auto text-[9px] font-medium text-slate-400">just now</span>
        </div>
        <div className="mt-2 flex gap-2">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-fuchsia-400 to-rose-500 text-[9px] font-bold text-white shadow-sm">
            MC
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-slate-900">Maya Chen</p>
            <p
              className={cn(
                "mt-0.5 text-slate-600",
                singleLine
                  ? "whitespace-nowrap text-[9px] leading-none tracking-tight"
                  : "text-[10px] leading-4",
              )}
            >
              “This drop is stunning — what’s the price on the creator bundle?”
            </p>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full border border-rose-100 bg-rose-50/90 px-1.5 py-0.5 text-[9px] font-bold text-rose-600">
            <PoppingHeart reduce={reduce} />
            Auto-Liked
          </span>
          <motion.span
            animate={
              reduce
                ? { opacity: 1 }
                : { opacity: [0.55, 1, 1], scale: [0.96, 1.04, 1] }
            }
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.9, ease: "easeInOut" }}
            className="inline-flex items-center gap-1 rounded-full border border-sky-100 bg-sky-50 px-1.5 py-0.5 text-[9px] font-bold text-sky-700"
          >
            <Send className="size-2.5" />
            DM Sent
          </motion.span>
        </div>
        <div className="mt-2 rounded-lg border border-emerald-100/90 bg-emerald-50/80 px-2 py-1.5">
          <div className="flex items-center gap-1">
            <TrendingUp className="size-3 text-emerald-600" />
            <span className="text-[8px] font-bold uppercase tracking-wide text-emerald-700">
              Live insights
            </span>
            <span className="ml-auto inline-flex items-center gap-1">
              <InstagramMark className="size-3" />
              <FacebookMark className="size-3" />
            </span>
          </div>
          <p className="mt-0.5 text-[9px] font-semibold leading-snug text-slate-700">
            Instagram & Facebook Insights: +42% Engagement & Reach
          </p>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-emerald-100">
            <motion.span
              className="block h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-500"
              initial={{ width: "18%" }}
              animate={{ width: "42%" }}
              transition={{ duration: 1.4, delay: 0.4, ease }}
            />
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function CollisionCard({
  reduce,
  stable = false,
  singleLine = false,
  className,
}: {
  reduce: boolean;
  stable?: boolean;
  singleLine?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={reduce ? false : stable ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: stable ? 0.22 : 0.88, duration: 0.6, ease }}
      className={cn("transform-gpu", className)}
    >
      <motion.article
        animate={reduce || stable ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className={cn(frost, "w-full rounded-xl p-2.5 text-left shadow-slate-900/5")}
      >
        <div className="flex items-center gap-2">
          <span className="relative shrink-0">
            <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
              S
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full border-2 border-white bg-emerald-400" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold leading-none text-slate-900">Sarah is typing...</p>
            <TypingDots className="mt-1" />
          </div>
        </div>
        <p
          className={cn(
            "mt-2 rounded-lg bg-slate-50/80 py-1.5 text-slate-500",
            singleLine
              ? "whitespace-nowrap px-1 text-[8px] leading-none tracking-tight"
              : "px-2 text-[10px] leading-snug",
          )}
        >
          Maya asked about Berlin shipping — keeping this thread calm and single-threaded.
        </p>
        <span className="relative mt-2 inline-flex">
          {reduce ? null : (
            <motion.span
              className="absolute inset-0 rounded-full bg-amber-300/35"
              animate={{ scale: [1, 1.18], opacity: [0.45, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <span className="relative inline-flex items-center gap-1 rounded-full border border-amber-200/80 bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-800">
            <Lock className="size-2.5" />
            Thread Locked (Anti-Collision)
          </span>
        </span>
        <div className="mt-2 rounded-lg border border-emerald-100/90 bg-white/70 px-2 py-1.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[9px] font-bold text-emerald-700">98% Positive Feedback</p>
            <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-emerald-600">
              Sentiment
            </span>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-slate-100">
            <motion.span
              className="block h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
              initial={{ width: "22%" }}
              animate={{ width: "98%" }}
              transition={{ duration: 1.5, delay: 0.55, ease }}
            />
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function HeadlineWord({
  word,
  delay,
  reduce,
  className,
  gradient = false,
}: {
  word: string;
  delay: number;
  reduce: boolean;
  className?: string;
  gradient?: boolean;
}) {
  return (
    <span className={cn("inline-block overflow-hidden pb-[0.14em] -mb-[0.14em]", className)}>
      <motion.span
        initial={reduce ? false : { y: "70%", opacity: 0 }}
        animate={
          gradient && !reduce
            ? { y: "0%", opacity: 1, backgroundPosition: ["0% 50%", "100% 50%"] }
            : { y: "0%", opacity: 1 }
        }
        transition={
          gradient && !reduce
            ? {
                y: { delay, duration: 0.95, ease },
                opacity: { delay, duration: 0.95, ease },
                backgroundPosition: {
                  duration: 7,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
              }
            : { delay, duration: 0.95, ease }
        }
        className={cn(
          "inline-block will-change-transform",
          gradient &&
            "bg-gradient-to-r from-blue-800 via-indigo-500 to-violet-600 bg-clip-text text-transparent",
        )}
        style={gradient ? { backgroundSize: "180% 100%" } : undefined}
      >
        {word}
      </motion.span>
    </span>
  );
}

function PrimaryCta({ reduce }: { reduce: boolean }) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={{ y: 0 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className="rounded-full"
    >
      <Button
        variant="luminous"
        className="relative isolate h-11 whitespace-nowrap rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-3.5 text-[13px] shadow-blue-500/35 transition-shadow hover:scale-100 hover:shadow-blue-500/45 active:scale-100 [clip-path:inset(0_round_999px)] [transform:translateZ(0)] sm:h-12 sm:px-7 sm:text-[15px]"
        onClick={() =>
          document.querySelector("#workspace")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full [clip-path:inset(0_round_999px)]"
        >
          <motion.span
            className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={reduce ? { x: "-40%" } : { x: ["-40%", "340%"] }}
            transition={{
              duration: hover ? 1.4 : 4.2,
              repeat: reduce ? 0 : Infinity,
              ease: "easeInOut",
              repeatDelay: hover ? 0.2 : 0.8,
            }}
          />
        </span>
        <span className="relative z-[1] inline-flex items-center gap-2 font-semibold">
          Start Free Trial
          <motion.span
            animate={{ x: reduce ? 0 : hover ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="grid place-items-center"
          >
            <ArrowRight />
          </motion.span>
        </span>
      </Button>
    </motion.div>
  );
}

function TourCta({ reduce }: { reduce: boolean }) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.985 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      transition={{ type: "spring", stiffness: 240, damping: 24, mass: 0.7 }}
    >
      <Button
        variant="glass"
        size="lg"
        className={cn(
          frost,
          "h-11 whitespace-nowrap px-3.5 text-[13px] text-slate-800 hover:translate-y-0 sm:h-12 sm:px-7 sm:text-[15px]",
        )}
        onClick={() => document.querySelector("#inbox")?.scrollIntoView({ behavior: "smooth" })}
      >
        <motion.span
          animate={
            reduce
              ? { scale: 1, opacity: 1 }
              : hover
                ? { scale: 1.08, opacity: 1 }
                : { scale: [1, 1.06, 1], opacity: [0.82, 1, 0.82] }
          }
          transition={
            hover
              ? { type: "spring", stiffness: 280, damping: 22 }
              : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
          }
          className="grid place-items-center text-blue-600"
        >
          <CirclePlay />
        </motion.span>
        Live Product Tour
      </Button>
    </motion.div>
  );
}

function loopPop(delay: number, reduce: boolean) {
  if (reduce) return { duration: 0 };
  return {
    opacity: { delay, duration: 0.2, ease: "easeOut" as const },
    scale: {
      delay,
      duration: 0.55,
      times: [0, 0.38, 0.68, 1],
      ease: "easeOut" as const,
      repeat: Infinity,
      repeatDelay: 1.7,
    },
  };
}

function TrustRow({ reduce }: { reduce: boolean }) {
  return (
    <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
      <div className="flex items-center">
        {faces.map((face, index) => (
          <motion.span
            key={face.initials}
            initial={reduce ? false : { opacity: 0, scale: 0.2 }}
            animate={
              reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: [1, 1.34, 0.92, 1] }
            }
            transition={loopPop(0.35 + index * 0.1, reduce)}
            className={cn(
              "grid size-8 origin-center place-items-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white ring-2 ring-white",
              face.tone,
              index > 0 && "-ml-2",
            )}
            style={{ zIndex: faces.length - index }}
          >
            {face.initials}
          </motion.span>
        ))}
      </div>
      <span className="inline-flex items-center gap-0.5 text-amber-400" aria-label="5 star rating">
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.span
            key={index}
            initial={reduce ? false : { opacity: 0, scale: 0.2 }}
            animate={
              reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: [1, 1.6, 0.88, 1] }
            }
            transition={loopPop(0.9 + index * 0.1, reduce)}
            className="grid origin-center place-items-center drop-shadow-[0_2px_6px_rgba(251,191,36,0.45)]"
          >
            <Star className="size-4 fill-current" />
          </motion.span>
        ))}
      </span>
      <p className="text-[11px] font-medium text-slate-500 sm:text-xs">
        <motion.span
          initial={reduce ? false : { opacity: 0, scale: 0.2 }}
          animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: [1, 1.45, 0.9, 1] }}
          transition={loopPop(1.45, reduce)}
          className="mr-1 inline-block origin-center text-emerald-600"
        >
          ✓
        </motion.span>
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 1.5, duration: reduce ? 0 : 0.4, ease }}
          className="inline-block"
        >
          No credit card required • Set up in under 5 minutes
        </motion.span>
      </p>
    </div>
  );
}

export function Hero({ embed = false }: { embed?: boolean }) {
  const reduceMotion = useReducedMotion();
  const reduce = Boolean(reduceMotion);

  return (
    <section className="relative mx-auto max-w-[90rem] overflow-x-clip px-5 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute left-[6%] top-8 h-64 w-64 rounded-full bg-sky-300/45 blur-[90px]" />
        <div className="absolute right-[8%] top-16 h-72 w-72 rounded-full bg-violet-300/40 blur-[100px]" />
        <div className="absolute bottom-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-emerald-200/50 blur-[90px]" />
      </div>

      <div className="relative z-10 xl:grid xl:grid-cols-[200px_minmax(0,1fr)_256px] xl:items-start xl:gap-x-8 2xl:grid-cols-[210px_minmax(0,1fr)_268px] 2xl:gap-x-12">
        {embed ? null : (
          <div className="hidden xl:flex xl:flex-col xl:gap-2.5 xl:pt-10">
            <EngagementCard reduce={reduce} />
            <CollisionCard reduce={reduce} />
          </div>
        )}

        <div className={cn("mx-auto max-w-2xl text-center xl:max-w-[40rem] xl:pt-2", embed && "xl:col-span-3")}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className={cn(
            frost,
            "mx-auto inline-flex max-w-full items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-medium text-slate-700 sm:px-4 sm:text-[12px]",
          )}
        >
          <RadarDot reduce={reduce} />
          <span className="truncate font-semibold text-slate-800">
            Social inbox & engagement, unified
          </span>
        </motion.div>

        <h1 className="mx-auto mt-8 text-[2.35rem] font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl xl:mt-10 xl:text-[3.15rem] 2xl:text-6xl">
          {leadWords.map((word, index) => (
            <HeadlineWord
              key={`${word}-${index}`}
              word={word}
              delay={0.16 + index * 0.14}
              reduce={reduce}
              className="mr-[0.28em]"
            />
          ))}
          <br />
          {calmWords.map((word, index) => (
            <HeadlineWord
              key={word}
              word={word}
              delay={0.62 + index * 0.16}
              reduce={reduce}
              gradient
              className="mr-[0.26em] last:mr-0"
            />
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.85, ease }}
          className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg"
        >
          Bring social DMs, comments, likes, and live Instagram & Facebook insights into a single
          workspace. Prevent double-replies, keep a complete customer profile, and stay on top of
          every channel — without hopping between tabs.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease }}
          className="mt-8 flex flex-row items-center justify-center gap-2 sm:gap-3"
        >
          <PrimaryCta reduce={reduce} />
          <TourCta reduce={reduce} />
        </motion.div>

        <TrustRow reduce={reduce} />
        </div>

        {embed ? null : (
          <div className="hidden xl:flex xl:justify-end xl:pt-1">
            <IPhoneShowcase reduce={reduce} />
          </div>
        )}
      </div>

      {embed ? null : (
        <div className="mx-auto mt-8 hidden max-w-3xl items-center justify-center gap-6 md:flex xl:hidden">
          <div className="flex w-[220px] shrink-0 flex-col gap-2.5">
            <EngagementCard reduce={reduce} stable />
            <CollisionCard reduce={reduce} stable />
          </div>
          <IPhoneShowcase reduce={reduce} />
        </div>
      )}

      <div className="relative z-20 mx-auto mt-6 flex max-w-sm flex-col gap-2.5 md:hidden">
        <EngagementCard reduce={reduce} stable singleLine />
        <CollisionCard reduce={reduce} stable singleLine />
      </div>

      <InboxPreview />
    </section>
  );
}
