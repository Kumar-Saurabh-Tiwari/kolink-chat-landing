import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/Logo";
import { ShimmerButton } from "@/components/landing/ShimmerButton";
import { cn } from "@/lib/utils";

const drawerEase = [0.22, 1, 0.36, 1] as const;

const links = [
  { label: "Features", href: "#features" },
  { label: "Posting", href: "#posting" },
  { label: "Inbox Simulator", href: "#inbox" },
  { label: "Channels", href: "#channels" },
  { label: "Team CRM", href: "#team" },
  { label: "Pricing", href: "#pricing" },
];

function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.button
          key="nav-backdrop"
          type="button"
          aria-label="Close menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.35, ease: drawerEase }}
          className="fixed inset-0 z-[70] bg-slate-950/25 backdrop-blur-[3px] lg:hidden"
          onClick={onClose}
        />
      ) : null}
      {open ? (
        <motion.aside
          key="nav-sidebar"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={reduce ? { opacity: 0 } : { x: "100%" }}
          animate={reduce ? { opacity: 1 } : { x: 0 }}
          exit={reduce ? { opacity: 0 } : { x: "100%" }}
          transition={{ duration: reduce ? 0.01 : 0.48, ease: drawerEase }}
          className="fixed inset-y-3 right-3 z-[80] flex w-[min(86vw,22rem)] flex-col overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/70 shadow-[0_24px_70px_-24px_rgba(15,23,42,0.45)] ring-1 ring-inset ring-white/90 backdrop-blur-2xl lg:hidden"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(125,211,252,0.28),transparent_42%),radial-gradient(circle_at_100%_100%,rgba(167,139,250,0.18),transparent_40%)]" />
          <div className="relative flex items-center justify-between gap-3 border-b border-white/70 px-4 py-3.5">
            <Logo />
            <Button
              aria-label="Close menu"
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/70 ring-1 ring-white/80"
              onClick={onClose}
            >
              <X />
            </Button>
          </div>
          <nav className="relative flex flex-1 flex-col gap-1.5 overflow-y-auto px-3 py-3">
            {links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={reduce ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduce ? 0 : 0.08 + index * 0.05, duration: 0.4, ease: drawerEase }}
                onClick={onClose}
                className="rounded-2xl border border-white/70 bg-white/55 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-xl transition-colors hover:bg-white/90 hover:text-slate-950"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
          <div className="relative grid gap-2 border-t border-white/70 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <Button variant="glass" className="h-11 justify-center rounded-2xl" onClick={onClose}>
              Log In
            </Button>
            <ShimmerButton href="#workspace" className="h-11 w-full" onClick={onClose}>
              Get Started
            </ShimmerButton>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative whitespace-nowrap py-1 text-[13px] font-medium text-slate-600 transition-colors hover:text-slate-900"
    >
      {label}
      <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}

export function Navbar({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
    <header
      className={cn(
        compact
          ? "relative z-40 px-2 pb-1 pt-2"
          : "fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:bg-transparent sm:pt-5",
        !compact &&
          scrolled &&
          "bg-[#f8fafc]/95 pb-3 shadow-[0_12px_28px_-20px_rgba(15,23,42,0.55)] backdrop-blur-xl sm:pb-0 sm:shadow-none sm:backdrop-blur-none",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/90 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-xl transition-shadow sm:px-6",
          scrolled && "shadow-[0_8px_32px_rgba(15,23,42,0.08)]",
          compact && "px-3 py-2 sm:px-4",
        )}
      >
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Logo />
          {compact ? null : (
          <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-100 lg:inline-flex">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative size-1.5 rounded-full bg-emerald-500" />
            </span>
            Real-Time Sync Active
          </span>
          )}
        </div>
        <div className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {links.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="glass" className="h-10 px-4 text-slate-600">
            Log In
          </Button>
          <ShimmerButton href="#workspace" className="h-10 px-5">
            Get Started
          </ShimmerButton>
        </div>
        <Button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          variant="ghost"
          size="icon"
          className="rounded-full lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

    </header>
    <MobileSidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
