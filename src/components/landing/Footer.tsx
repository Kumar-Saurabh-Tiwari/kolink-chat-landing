import { Logo } from "@/components/landing/Logo";
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

const links = [
  { href: "#features", label: "Product" },
  { href: "#inbox", label: "Inbox" },
  { href: "#channels", label: "Channels" },
  { href: "#pricing", label: "Pricing" },
];

const legal = [
  { href: "#pricing", label: "Privacy" },
  { href: "#pricing", label: "Terms" },
  { href: "#pricing", label: "Security" },
];

const channelMarks = [
  InstagramMark,
  FacebookMark,
  MessengerMark,
  WhatsAppMark,
  ThreadsMark,
  XMark,
  LinkedInMark,
  GmailMark,
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/70 bg-white/40 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Logo />
            <span className="hidden h-3.5 w-px bg-slate-200/90 sm:block" />
            <p className="text-[13px] font-medium tracking-tight text-slate-500">
              Eight channels. One inbox.
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-slate-500">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1.5" aria-label="Native channels">
          {channelMarks.map((Mark, index) => (
            <span
              key={index}
              className="grid size-7 place-items-center rounded-lg opacity-70 transition hover:opacity-100"
            >
              <Mark className="size-5" />
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/70 pt-4 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 koLink Chat</p>
          <p className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#34d399]" />
            All systems operational
          </p>
          <div className="flex flex-wrap gap-4">
            {legal.map((item) => (
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
