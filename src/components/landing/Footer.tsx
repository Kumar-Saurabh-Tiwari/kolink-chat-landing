import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/landing/Logo";
import { ShimmerButton } from "@/components/landing/ShimmerButton";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

const frost =
  "bg-white/80 backdrop-blur-xl border border-white/90 shadow-lg ring-1 ring-inset ring-white/90";

const columns = [
  {
    title: "Product",
    links: [
      { href: "#features", label: "Features" },
      { href: "#inbox", label: "Inbox" },
      { href: "#channels", label: "Channels" },
      { href: "#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#workspace", label: "Help Center" },
      { href: "#channels", label: "Integration Guides" },
      { href: "#inbox", label: "Live Product Tour" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#pricing", label: "Privacy" },
      { href: "#pricing", label: "Terms" },
      { href: "#pricing", label: "Security" },
    ],
  },
];

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

export function Footer() {
  const reduce = Boolean(useReducedMotion());

  return (
    <footer className="relative z-10 border-t border-white/70 bg-white/50 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-sky-300/30 blur-[80px]" />
        <div className="absolute -right-10 top-0 h-56 w-56 rounded-full bg-violet-300/25 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="max-w-md">
            <Logo />
            <p className="mt-5 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              One calm workspace for every channel.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Unify social DMs, comments, and performance insights so marketing and support stay in
              the same conversation.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <ShimmerButton href="#workspace" className="h-11 w-full px-5 sm:w-auto">
                Start Free Trial
                <ArrowUpRight className="size-4" />
              </ShimmerButton>
              <Button
                variant="glass"
                className={cn(frost, "h-11 w-full px-5 text-slate-800 sm:w-auto")}
                asChild
              >
                <a href="#inbox">Live Product Tour</a>
              </Button>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-3 gap-5 sm:gap-8">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  {column.title}
                </p>
                <ul className="mt-3.5 space-y-2.5">
                  {column.links.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-[14px] font-medium text-slate-600 transition-colors hover:text-slate-900"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={cn(frost, "mt-12 rounded-2xl px-4 py-4 sm:px-5")}>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Connected everywhere
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                Instagram, Facebook, WhatsApp, and more — in one inbox.
              </p>
            </div>
            <ul className="grid grid-cols-4 gap-2 sm:grid-cols-8" aria-label="Social channels">
              {channels.map(({ name, Mark }, index) => (
                <motion.li
                  key={name}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: reduce ? 0 : 0.03 * index, duration: 0.35 }}
                >
                  <a
                    href="#channels"
                    title={name}
                    className="flex flex-col items-center gap-1.5 rounded-xl bg-white/90 px-1 py-2.5 shadow-sm ring-1 ring-slate-200/80 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-blue-200"
                  >
                    <Mark className="size-5" />
                    <span className="truncate text-[9px] font-semibold text-slate-500">{name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/80 pt-5 text-[12px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 koLink Chat</p>
          <p className="inline-flex items-center gap-2 font-medium text-emerald-700">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative size-2 rounded-full bg-emerald-500" />
            </span>
            All systems operational
          </p>
          <div className="flex flex-wrap gap-4">
            {columns[2].links.map((item) => (
              <a key={item.label} href={item.href} className="transition-colors hover:text-slate-700">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
