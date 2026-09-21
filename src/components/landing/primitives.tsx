import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { Children, useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function LivePing({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100",
        className,
      )}
    >
      <span className="relative flex size-1.5 shrink-0">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-70" />
        <span className="relative size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#34d399]" />
      </span>
      <span className="truncate">{label}</span>
    </span>
  );
}

export function MetricsPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/70 px-2.5 py-1 text-[10px] font-semibold text-slate-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PresenceAvatar({
  initials,
  className,
  typing = false,
}: {
  initials: string;
  className?: string;
  typing?: boolean;
}) {
  return (
    <span className="relative inline-flex shrink-0">
      <span
        className={cn(
          "grid size-8 place-items-center rounded-full text-[10px] font-bold text-white shadow-sm ring-2 ring-white",
          className ?? "bg-gradient-to-br from-violet-400 to-indigo-500",
        )}
      >
        {initials}
      </span>
      {typing ? (
        <span className="absolute -bottom-0.5 -right-1 flex items-center gap-0.5 rounded-full bg-white px-1 py-0.5 ring-1 ring-emerald-100">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="size-1 rounded-full bg-emerald-500"
              animate={{ opacity: [0.25, 1, 0.25], y: [0, -1, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.14, ease: "easeInOut" }}
            />
          ))}
        </span>
      ) : (
        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-emerald-400" />
      )}
    </span>
  );
}

export function Sparkline({ className }: { className?: string }) {
  const fillId = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 72 22" className={cn("overflow-visible", className)} aria-hidden>
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 16 L8 14 L16 15 L24 9 L32 11 L40 6 L48 8 L56 3 L64 5 L72 2 V22 H0 Z" fill={`url(#${fillId})`} />
      <motion.path
        d="M0 16 L8 14 L16 15 L24 9 L32 11 L40 6 L48 8 L56 3 L64 5 L72 2"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0.15 }}
        animate={{ pathLength: [0.2, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </svg>
  );
}

export function MarqueeTrack({
  children,
  reverse = false,
  speed = 52,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const half = useRef(0);
  const velocity = useRef(1);
  const target = useRef(1);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const measure = () => {
      const width = node.scrollWidth / 2;
      half.current = width;
      if (reverse && width > 0 && x.get() > -1) {
        x.set(-width);
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [reverse, x]);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const width = half.current;
    if (width <= 0) return;
    const dt = Math.min(delta, 34);
    velocity.current += (target.current - velocity.current) * (1 - Math.exp(-dt / 240));
    const dir = reverse ? 1 : -1;
    let next = x.get() + dir * velocity.current * speed * (dt / 1000);
    if (!reverse && next <= -width) next += width;
    if (reverse && next >= 0) next -= width;
    x.set(next);
  });

  const sequence = [
    ...Children.toArray(children).map((child, index) => (
      <div key={`a-${index}`} className="shrink-0">
        {child}
      </div>
    )),
    ...Children.toArray(children).map((child, index) => (
      <div key={`b-${index}`} className="shrink-0" aria-hidden>
        {child}
      </div>
    )),
  ];

  return (
    <div
      className={cn("fade-mask-x overflow-hidden", className)}
      onMouseEnter={() => {
        target.current = 0.14;
      }}
      onMouseLeave={() => {
        target.current = 1;
      }}
    >
      <motion.div
        ref={trackRef}
        style={{ x, willChange: "transform" }}
        className="flex w-max gap-3 py-1.5 transform-gpu"
      >
        {sequence}
      </motion.div>
    </div>
  );
}
