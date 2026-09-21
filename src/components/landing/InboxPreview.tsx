import { AtSign, Bot, Heart, MessageCircle, Search, Send, Sparkles, Workflow, Zap } from "lucide-react";
import { motion } from "motion/react";
import { BrandIcon } from "@/components/landing/BrandIcon";
import { cn } from "@/lib/utils";

const threads = [
  {
    initial: "MC",
    name: "Maya Chen",
    preview: "Price? Can we ship to Berlin?",
    channel: "IG",
    time: "2m",
    active: true,
    color: "from-fuchsia-400 to-rose-500",
  },
  {
    initial: "JB",
    name: "Jon Bell",
    preview: "That looks perfect!",
    channel: "WA",
    time: "8m",
    color: "from-emerald-400 to-teal-500",
  },
  {
    initial: "AR",
    name: "Amelia R.",
    preview: "Order #4829 tracking?",
    channel: "GM",
    time: "14m",
    color: "from-sky-400 to-blue-500",
  },
  {
    initial: "NS",
    name: "Noah Stone",
    preview: "Need help choosing a kit",
    channel: "MS",
    time: "28m",
    color: "from-indigo-400 to-violet-500",
  },
];

const hearts = [
  { left: "10%", delay: 0, size: 14 },
  { left: "22%", delay: 0.7, size: 18 },
  { left: "68%", delay: 0.35, size: 12 },
  { left: "82%", delay: 1.1, size: 16 },
  { left: "48%", delay: 1.6, size: 13 },
];

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-slate-400"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

export function InboxPreview({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto mt-8 max-w-6xl [perspective:1600px] xl:mt-10", className)}>
      <motion.div
        initial={{ opacity: 0, y: 36, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, rotateX: 2 }}
        transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel relative overflow-hidden rounded-3xl p-2 shadow-[0_40px_80px_rgba(15,23,42,0.1)] ring-1 ring-inset ring-white/90 transform-gpu md:rotate-x-[2deg]"
      >
        {hearts.map((heart) => (
          <motion.span
            key={heart.left}
            className="pointer-events-none absolute bottom-24 z-20 text-rose-500"
            style={{ left: heart.left }}
            animate={{
              y: [20, -110],
              opacity: [0, 1, 0],
              scale: [0.7, 1.15, 0.85],
              x: [0, 10, -8],
            }}
            transition={{ duration: 3.6, repeat: Infinity, delay: heart.delay, ease: "easeOut" }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.span>
        ))}

        <div className="pointer-events-none absolute inset-x-12 top-0 h-24 bg-gradient-to-b from-white/80 to-transparent" />
        <div className="flex h-[400px] overflow-hidden rounded-[1.15rem] border border-white/70 bg-white/55 sm:h-[460px] md:h-[540px]">
          <aside className="hidden w-16 shrink-0 flex-col items-center border-r border-slate-200/70 bg-white/40 py-5 sm:flex">
            <div className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/30">
              <BrandIcon className="size-4" />
            </div>
            <div className="mt-8 grid gap-5 text-slate-400">
              <MessageCircle className="text-blue-600" size={18} />
              <AtSign size={18} />
              <Workflow size={18} />
              <Bot size={18} />
            </div>
            <div className="mt-auto size-8 rounded-full bg-gradient-to-br from-violet-300 to-indigo-400" />
          </aside>

          <section className="w-[7.5rem] shrink-0 border-r border-slate-200/70 bg-white/30 sm:w-64">
            <div className="border-b border-slate-200/70 p-3 sm:p-4">
              <p className="text-sm font-bold text-slate-900">
                Inbox
                <span className="ml-1.5 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                  12
                </span>
              </p>
              <div className="mt-3 hidden items-center gap-2 rounded-xl bg-slate-100/80 px-3 py-2 text-xs text-slate-500 sm:flex">
                <Search size={13} /> Search conversations
              </div>
            </div>
            {threads.map((thread) => (
              <div
                key={thread.name}
                className={`flex gap-2 border-b border-slate-200/60 p-2.5 sm:p-3 ${thread.active ? "bg-blue-50/70" : "hover:bg-white/50"}`}
              >
                <div
                  className={`grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white ${thread.color}`}
                >
                  {thread.initial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <b className="truncate text-[11px] text-slate-900 sm:text-xs">{thread.name}</b>
                    <span className="text-[9px] text-slate-400">{thread.time}</span>
                  </div>
                  <p className="truncate text-[10px] text-slate-500">{thread.preview}</p>
                </div>
              </div>
            ))}
          </section>

          <main className="flex min-w-0 flex-1 flex-col bg-gradient-to-b from-white/50 to-slate-50/40">
            <div className="flex h-14 items-center justify-between border-b border-slate-200/70 px-3 sm:h-16 sm:px-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Maya Chen</p>
                <p className="text-[10px] font-medium text-fuchsia-600">
                  ● Instagram · Reels comment
                </p>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
                  Assigned to Sarah
                </span>
              </div>
            </div>
            <div className="flex-1 space-y-4 overflow-hidden p-3 sm:p-5 md:p-7">
              <p className="mx-auto w-fit rounded-full bg-white/70 px-3 py-1 text-[9px] font-medium text-slate-400 ring-1 ring-slate-200/70">
                Today, 11:42 AM
              </p>
              <div className="max-w-[16rem] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-xs leading-5 text-slate-700 shadow-sm ring-1 ring-slate-100">
                Price? Can we ship the Creator bundle to Berlin?
              </div>
              <div className="ml-auto max-w-[18rem] rounded-2xl rounded-tr-sm bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-2.5 text-xs leading-5 text-white shadow-lg shadow-blue-500/20">
                Auto-reply sent — sliding you a private checkout on WhatsApp ✨
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Sarah</span> is typing
                <TypingDots />
              </div>
              <div className="hidden items-center gap-2 rounded-xl border border-violet-200/70 bg-violet-50/70 p-3 text-xs text-slate-600 md:flex">
                <Sparkles size={14} className="text-violet-500" />
                AI suggested a reply
                <span className="ml-auto text-[10px] font-semibold text-violet-600">Insert</span>
              </div>
            </div>
            <div className="m-3 flex items-center gap-2 rounded-2xl border border-white/80 bg-white/80 p-2 shadow-sm">
              <span className="px-2 text-xs text-slate-400">Write a reply…</span>
              <span className="ml-auto grid size-8 place-items-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30">
                <Send size={14} />
              </span>
            </div>
          </main>

          <aside className="hidden w-56 shrink-0 border-l border-slate-200/70 bg-white/40 p-5 lg:block">
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Customer details
            </p>
            <div className="mx-auto mt-6 grid size-14 place-items-center rounded-full bg-gradient-to-br from-fuchsia-400 to-indigo-500 text-sm font-bold text-white shadow-lg shadow-fuchsia-400/30">
              MC
            </div>
            <p className="mt-2 text-center text-xs font-semibold text-slate-900">Maya Chen</p>
            <p className="text-center text-[10px] text-slate-500">VIP · Instagram + WhatsApp</p>
            <div className="mt-6 space-y-3 text-[11px] text-slate-500">
              <p className="flex justify-between">
                Lifetime value <b className="text-slate-900">$1,240</b>
              </p>
              <p className="flex justify-between">
                Channels stitched <b className="text-slate-900">3</b>
              </p>
              <p className="flex justify-between">
                Last active <b className="text-emerald-600">Now</b>
              </p>
            </div>
          </aside>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="animate-floaty absolute -left-2 top-20 hidden max-w-xs items-start gap-2 rounded-2xl border border-white/80 bg-white/85 px-4 py-2.5 text-left text-xs font-medium text-slate-700 shadow-xl shadow-slate-900/5 backdrop-blur-xl xl:flex"
      >
        <Zap className="mt-0.5 shrink-0 text-emerald-500" size={14} />
        WhatsApp: Automated price inquiry converted → Handed off to Sarah
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="animate-floaty absolute -right-3 bottom-24 hidden items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-xs font-medium text-slate-700 shadow-xl shadow-slate-900/5 backdrop-blur-xl [animation-delay:1.4s] xl:flex"
      >
        <Heart className="text-rose-500" size={14} fill="currentColor" />
        Auto-liked 14 comments
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15 }}
        className="animate-floaty absolute right-16 top-10 hidden items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-xs font-medium text-slate-700 shadow-xl shadow-slate-900/5 backdrop-blur-xl [animation-delay:0.7s] xl:flex"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative size-2 rounded-full bg-emerald-500" />
        </span>
        Sarah assigned · live
      </motion.div>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {["4.2s Avg Response Time", "100% Inbound Capture", "All your channels"].map((chip) => (
          <span
            key={chip}
            className="glass-panel rounded-full px-3 py-1.5 text-[11px] font-semibold text-slate-600 ring-1 ring-inset ring-white/95"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
