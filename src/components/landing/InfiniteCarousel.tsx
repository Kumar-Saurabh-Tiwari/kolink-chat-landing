import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
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
import { LivePing, MarqueeTrack } from "@/components/landing/primitives";
import { Reveal } from "@/components/landing/Reveal";

const brandMarks = {
  instagram: InstagramMark,
  facebook: FacebookMark,
  messenger: MessengerMark,
  whatsapp: WhatsAppMark,
  threads: ThreadsMark,
  x: XMark,
  linkedin: LinkedInMark,
  gmail: GmailMark,
};

type Channel = {
  key: keyof typeof brandMarks;
  name: string;
  ping: string;
  tags: readonly [string, string, string];
  tickers: readonly [string, string];
  halo: string;
  glow: string;
};

const channels: Channel[] = [
  {
    key: "instagram",
    name: "Instagram",
    ping: "Official Meta Integration",
    tags: ["Auto-Likes", "Reel Comments", "DM Automation"],
    tickers: ["1.2k comments processed today", "99.98% delivery rate"],
    halo: "bg-[radial-gradient(circle_at_30%_20%,rgba(253,244,151,0.85),rgba(214,36,159,0.35)_42%,transparent_70%)]",
    glow: "hover:shadow-[0_16px_36px_-12px_rgba(217,70,239,0.35)]",
  },
  {
    key: "facebook",
    name: "Facebook",
    ping: "Real-Time Sync Active",
    tags: ["Post Likes", "Ad Comments", "Visitor Posts"],
    tickers: ["814 post replies routed", "Collision lock on 12 threads"],
    halo: "bg-[radial-gradient(circle_at_30%_20%,rgba(24,119,242,0.35),transparent_68%)]",
    glow: "hover:shadow-[0_16px_36px_-12px_rgba(24,119,242,0.3)]",
  },
  {
    key: "messenger",
    name: "Messenger",
    ping: "1-Click Direct Sync",
    tags: ["Click-to-message ads", "Welcome prompts", "Two-way Inbox"],
    tickers: ["Ad chats started 186 conversations", "Active two-way sync"],
    halo: "bg-[radial-gradient(circle_at_30%_20%,rgba(0,178,255,0.4),rgba(160,51,255,0.22)_55%,transparent_72%)]",
    glow: "hover:shadow-[0_16px_36px_-12px_rgba(0,106,255,0.3)]",
  },
  {
    key: "whatsapp",
    name: "WhatsApp",
    ping: "Official Meta Integration",
    tags: ["Message templates", "Catalog Sync", "Order updates"],
    tickers: ["Catalog DMs delivered 2.1k", "99.98% delivery rate"],
    halo: "bg-[radial-gradient(circle_at_30%_20%,rgba(37,211,102,0.42),transparent_68%)]",
    glow: "hover:shadow-[0_16px_36px_-12px_rgba(37,211,102,0.32)]",
  },
  {
    key: "threads",
    name: "Threads",
    ping: "Active two-way sync",
    tags: ["Replies", "@Mentions", "Publishing"],
    tickers: ["Mention queue cleared 94%", "Replies in 1.4s"],
    halo: "bg-[radial-gradient(circle_at_30%_20%,rgba(15,23,42,0.18),transparent_68%)]",
    glow: "hover:shadow-[0_16px_36px_-12px_rgba(15,23,42,0.18)]",
  },
  {
    key: "x",
    name: "X / Twitter",
    ping: "Real-Time Sync Active",
    tags: ["DMs", "Mention Replies", "Auto-Likes"],
    tickers: ["Tweet likes compounded +19%", "DM inbox at 0 backlog"],
    halo: "bg-[radial-gradient(circle_at_30%_20%,rgba(15,20,25,0.2),transparent_68%)]",
    glow: "hover:shadow-[0_16px_36px_-12px_rgba(15,23,42,0.2)]",
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    ping: "1-Click Direct Sync",
    tags: ["Comments", "Reactions", "Inbox"],
    tickers: ["Enterprise comments triaged", "Active two-way sync"],
    halo: "bg-[radial-gradient(circle_at_30%_20%,rgba(10,102,194,0.38),transparent_68%)]",
    glow: "hover:shadow-[0_16px_36px_-12px_rgba(10,102,194,0.3)]",
  },
  {
    key: "gmail",
    name: "Email / Gmail",
    ping: "Active two-way sync",
    tags: ["Thread Sync", "Smart Labels", "Fast Replies"],
    tickers: ["Contracts viewed in 11m", "99.98% delivery rate"],
    halo: "bg-[radial-gradient(circle_at_30%_20%,rgba(234,67,53,0.28),rgba(251,188,4,0.2)_45%,transparent_70%)]",
    glow: "hover:shadow-[0_16px_36px_-12px_rgba(234,67,53,0.22)]",
  },
];

function ChannelCard({ channel }: { channel: Channel }) {
  const Icon = brandMarks[channel.key];
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const offset = channel.name.length * 180;
    const timer = window.setInterval(() => setTick((value) => (value + 1) % channel.tickers.length), 3200 + offset);
    return () => window.clearInterval(timer);
  }, [channel.name.length, channel.tickers.length]);

  const ticker = channel.tickers[tick] ?? channel.tickers[0];

  return (
    <motion.article
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative w-[min(86vw,22.5rem)] shrink-0 overflow-hidden rounded-2xl border border-white/90 bg-white/75 px-5 py-4 shadow-md backdrop-blur-xl transform-gpu will-change-transform",
        "shadow-[inset_0_1px_1px_1px_rgba(255,255,255,0.95),0_12px_32px_-12px_rgba(15,23,42,0.08)]",
        channel.glow,
      )}
    >
      <div className={cn("pointer-events-none absolute -left-6 -top-8 size-24 rounded-full blur-2xl", channel.halo)} />
      <div className="relative flex items-start gap-3">
        <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-white">
          <span className={cn("pointer-events-none absolute inset-0 rounded-2xl opacity-90", channel.halo)} />
          <Icon className="relative size-7" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate text-sm font-bold text-slate-900">{channel.name}</p>
            <LivePing label={channel.ping} className="max-w-[12rem] shrink-0 normal-case tracking-normal" />
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {channel.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-900/[0.04] px-2 py-0.5 text-[9px] font-semibold text-slate-600 ring-1 ring-slate-200/80"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-2.5 h-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={ticker}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className="truncate text-[11px] font-medium text-slate-500"
              >
                {ticker}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function InfiniteCarousel() {
  const rowA = channels;
  const rowB = [...channels.slice(3), ...channels.slice(0, 3)];

  return (
    <section id="channels" className="scroll-mt-24 py-20 sm:py-28">
      <Reveal className="mx-auto mb-10 max-w-3xl px-5 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
          Eight native channels. One pulse.
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Your customers already live here.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
          Instagram through Gmail — publish a post, then keep comments, DMs, and AI replies in one
          luminous inbox.
        </p>
      </Reveal>
      <div className="space-y-3 overflow-x-hidden">
        <MarqueeTrack speed={54}>
          {rowA.map((channel) => (
            <ChannelCard key={channel.key} channel={channel} />
          ))}
        </MarqueeTrack>
        <MarqueeTrack reverse speed={46}>
          {rowB.map((channel) => (
            <ChannelCard key={`${channel.key}-rev`} channel={channel} />
          ))}
        </MarqueeTrack>
      </div>
    </section>
  );
}
