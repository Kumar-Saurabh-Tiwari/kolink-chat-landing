import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/Logo";
import { ShimmerButton } from "@/components/landing/ShimmerButton";
import { cn } from "@/lib/utils";

const links = [
  { label: "Features", href: "#features" },
  { label: "Inbox Simulator", href: "#inbox" },
  { label: "Channels", href: "#channels" },
  { label: "Team CRM", href: "#team" },
  { label: "Pricing", href: "#pricing" },
];

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

  return (
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

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="mx-auto mt-2 grid max-w-6xl gap-2 overflow-hidden rounded-3xl border border-white/90 bg-white/95 p-3 shadow-[0_10px_35px_-5px_rgba(15,23,42,0.08)] ring-1 ring-inset ring-white/90 backdrop-blur-2xl lg:hidden"
          >
            {links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * index, type: "spring", stiffness: 380, damping: 28 }}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-sm font-medium text-slate-600 shadow-sm hover:bg-white hover:text-slate-900"
              >
                {link.label}
              </motion.a>
            ))}
            <div className="mt-1 grid gap-2 border-t border-white/70 p-2">
              <Button
                variant="glass"
                className="justify-center rounded-2xl"
                onClick={() => setOpen(false)}
              >
                Log In
              </Button>
              <ShimmerButton
                href="#workspace"
                className="h-11 w-full"
                onClick={() => setOpen(false)}
              >
                Get Started
              </ShimmerButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
