import { ArrowRight, CirclePlay } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { InboxPreview } from "@/components/landing/InboxPreview";
import { ShimmerButton } from "@/components/landing/ShimmerButton";

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-5 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium text-slate-600 ring-1 ring-inset ring-white/90"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative size-2 rounded-full bg-emerald-500" />
        </span>
        Unified Social Inbox & Engagement Engine
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-7 max-w-5xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
      >
        Chat marketing & engagement,{" "}
        <span className="bg-gradient-to-r from-slate-950 via-blue-900 to-indigo-800 bg-clip-text text-transparent">
          without the tab chaos.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg"
      >
        Unify social DMs, auto-manage likes and comments, prevent agent collision, and stitch 360°
        customer profiles across all 8 channels in one calm workspace.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <ShimmerButton
          className="h-12 px-7 text-[15px] shadow-blue-500/30"
          onClick={() =>
            document.querySelector("#workspace")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Start Free Trial
          <ArrowRight />
        </ShimmerButton>
        <Button
          variant="glass"
          size="lg"
          className="h-12 px-7 text-[15px]"
          onClick={() => document.querySelector("#inbox")?.scrollIntoView({ behavior: "smooth" })}
        >
          <motion.span
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="grid place-items-center"
          >
            <CirclePlay />
          </motion.span>
          Live Product Tour
        </Button>
      </motion.div>
      <p className="mt-4 text-[11px] font-medium text-slate-500">
        No credit card · Set up in under 5 minutes
      </p>
      <InboxPreview />
    </section>
  );
}
