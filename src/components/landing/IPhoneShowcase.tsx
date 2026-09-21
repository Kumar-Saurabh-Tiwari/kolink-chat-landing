import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const VIEW_W = 393;
const VIEW_H = 852;
const TOUR_IDS = ["#feature-live", "#inbox", "#channels", "#pricing", "#workspace"] as const;
const LIVE_ORIGIN = "https://kolink-chat-landing.vercel.app";
const PHONE_MQ = "(min-width: 768px)";

function phoneSrc() {
  if (typeof window === "undefined") {
    return import.meta.env.DEV ? "http://localhost:8080/?embed=1" : `${LIVE_ORIGIN}/?embed=1`;
  }
  return `${window.location.origin}/?embed=1`;
}

function formatIslandTime() {
  const now = new Date();
  let hours = now.getHours() % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function iframeDoc(iframe: HTMLIFrameElement) {
  return { win: iframe.contentWindow, doc: iframe.contentDocument };
}

function iframeMax(win: Window, doc: Document) {
  const html = doc.documentElement;
  const body = doc.body;
  return Math.max(0, Math.max(html.scrollHeight, body?.scrollHeight ?? 0) - win.innerHeight);
}

function iframeTop(win: Window) {
  return win.scrollY || 0;
}

function animateIframeScroll(
  win: Window,
  target: number,
  shouldHoldParent: () => boolean,
  onDone?: () => void,
) {
  const start = iframeTop(win);
  const parentX = window.scrollX;
  const parentY = window.scrollY;
  const distance = target - start;
  if (Math.abs(distance) < 2) {
    win.scrollTo({ left: 0, top: target, behavior: "auto" });
    onDone?.();
    return () => undefined;
  }
  const duration = Math.round(Math.min(5200, Math.max(2400, Math.abs(distance) * 1.25)));
  const t0 = performance.now();
  let frame = 0;
  let hold = true;
  const step = (now: number) => {
    if (!shouldHoldParent()) hold = false;
    const p = Math.min(1, (now - t0) / duration);
    const eased = 0.5 - Math.cos(Math.PI * p) / 2;
    win.scrollTo({ left: 0, top: Math.round(start + distance * eased), behavior: "auto" });
    if (hold && (window.scrollX !== parentX || window.scrollY !== parentY)) {
      window.scrollTo({ left: parentX, top: parentY, behavior: "auto" });
    }
    if (p < 1) frame = requestAnimationFrame(step);
    else onDone?.();
  };
  frame = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frame);
}

function StatusGlyphs() {
  return (
    <span className="flex items-center gap-[3px] text-slate-900">
      <svg viewBox="0 0 18 12" className="h-[8px] w-[13px]" aria-hidden>
        <rect x="0" y="7.2" width="3" height="4.8" rx="0.6" fill="currentColor" />
        <rect x="4.8" y="4.8" width="3" height="7.2" rx="0.6" fill="currentColor" />
        <rect x="9.6" y="2.4" width="3" height="9.6" rx="0.6" fill="currentColor" />
        <rect x="14.4" y="0" width="3" height="12" rx="0.6" fill="currentColor" opacity="0.28" />
      </svg>
      <svg viewBox="0 0 16 12" className="h-[8px] w-[11px]" aria-hidden>
        <path
          d="M1.2 8.2a7.4 7.4 0 0 1 13.6 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M3.6 9.6a4.4 4.4 0 0 1 8.8 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="8" cy="11.1" r="1" fill="currentColor" />
      </svg>
      <svg viewBox="0 0 27 12" className="h-[8px] w-[16px]" aria-hidden>
        <rect
          x="0.6"
          y="0.6"
          width="22.2"
          height="10.8"
          rx="2.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <rect x="2.1" y="2.2" width="16.2" height="7.6" rx="1.2" fill="currentColor" />
        <path d="M24.2 4.1v3.8c1.1-.5 1.1-3.3 0-3.8Z" fill="currentColor" />
      </svg>
    </span>
  );
}

export function IPhoneShowcase({
  reduce,
  className,
}: {
  reduce: boolean;
  compact?: boolean;
  className?: string;
}) {
  const reduceMotion = Boolean(reduce || useReducedMotion());
  const screenW = 222;
  const scale = screenW / VIEW_W;
  const screenH = VIEW_H * scale;
  const chromeTop = 30;
  const chromeBottom = 26;
  const frameH = (screenH - chromeTop - chromeBottom) / scale;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(reduceMotion);
  const holdParentRef = useRef(true);
  const [src, setSrc] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [clock, setClock] = useState("9:41");
  const [exploring, setExploring] = useState(false);
  const [hostLabel, setHostLabel] = useState("koLink Chat");

  useEffect(() => {
    const mq = window.matchMedia(PHONE_MQ);
    const shell = shellRef.current;
    let idle = 0;
    let timer = 0;
    let cancelled = false;

    const clearPending = () => {
      if (idle && "cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
      idle = 0;
      timer = 0;
    };

    const shown = () =>
      mq.matches && !!shellRef.current && shellRef.current.getClientRects().length > 0;

    const arm = () => {
      clearPending();
      if (!shown()) {
        setSrc("");
        setLoaded(false);
        return;
      }
      const run = () => {
        if (cancelled || !shown()) return;
        const next = phoneSrc();
        setSrc(next);
        try {
          setHostLabel(new URL(next).host.replace(/^www\./, ""));
        } catch {
          setHostLabel("koLink Chat");
        }
      };
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(run, { timeout: 900 });
      else timer = window.setTimeout(run, 450);
    };

    arm();
    mq.addEventListener("change", arm);
    window.addEventListener("resize", arm);
    const observer = shell ? new ResizeObserver(arm) : null;
    if (shell) observer.observe(shell);
    return () => {
      cancelled = true;
      clearPending();
      observer?.disconnect();
      mq.removeEventListener("change", arm);
      window.removeEventListener("resize", arm);
    };
  }, []);

  useEffect(() => {
    setClock(formatIslandTime());
    const id = window.setInterval(() => setClock(formatIslandTime()), 30000);
    return () => window.clearInterval(id);
  }, []);

  const pauseTour = useCallback(() => {
    pausedRef.current = true;
    setExploring(true);
  }, []);

  const resumeTour = useCallback(() => {
    if (reduceMotion) return;
    pausedRef.current = false;
    setExploring(false);
  }, [reduceMotion]);

  useEffect(() => {
    if (!src) return;
    const iframe = iframeRef.current;
    const shell = shellRef.current;
    if (!iframe || !shell) return;

    let cancelled = false;
    let loadHandler: (() => void) | undefined;
    let resumeTimer = 0;
    let tourTimer = 0;
    let stopMotion = () => undefined;
    let step = 1;
    let innerWheel: ((event: WheelEvent) => void) | undefined;

    const markParentIntent = () => {
      holdParentRef.current = false;
      window.setTimeout(() => {
        holdParentRef.current = true;
      }, 900);
    };

    const onParentIntent = (event: Event) => {
      if (shell.contains(event.target as Node)) return;
      markParentIntent();
    };

    const bumpIdle = () => {
      pauseTour();
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(resumeTour, 9000);
    };

    const visit = (selector: string) => {
      const measure = () => {
        const { win, doc } = iframeDoc(iframe);
        if (!win || !doc) return null;
        const max = iframeMax(win, doc);
        let target = 0;
        if (selector !== "#top") {
          const node = doc.querySelector(selector);
          if (!node) return null;
          target = node.getBoundingClientRect().top + iframeTop(win) - 12;
        }
        return { win, target: Math.min(max, Math.max(0, target)) };
      };
      const first = measure();
      if (!first) return;
      stopMotion();
      stopMotion = animateIframeScroll(first.win, first.target, () => holdParentRef.current, () => {
        const next = measure();
        if (!next) return;
        const miss = Math.abs(iframeTop(next.win) - next.target);
        if (miss > 6 && miss < 28) {
          next.win.scrollTo({ left: 0, top: next.target, behavior: "auto" });
        }
      });
    };

    const bindInner = () => {
      const { win, doc } = iframeDoc(iframe);
      if (!win || !doc) return;
      doc.documentElement.style.overscrollBehavior = "none";
      doc.documentElement.style.scrollBehavior = "auto";
      doc.body.style.overscrollBehavior = "none";

      innerWheel = (event: WheelEvent) => {
        bumpIdle();
        const y = iframeTop(win);
        const max = iframeMax(win, doc);
        if ((event.deltaY < 0 && y <= 0) || (event.deltaY > 0 && y >= max - 1)) event.preventDefault();
      };

      doc.addEventListener("pointerdown", bumpIdle);
      doc.addEventListener("wheel", innerWheel, { passive: false });
      doc.addEventListener("touchstart", bumpIdle, { passive: true });
      doc.addEventListener("keydown", bumpIdle);
    };

    const onShellWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      bumpIdle();
      stopMotion();
      const { win, doc } = iframeDoc(iframe);
      if (!win || !doc) return;
      const max = iframeMax(win, doc);
      const next = Math.min(max, Math.max(0, iframeTop(win) + event.deltaY));
      win.scrollTo({ left: 0, top: next, behavior: "auto" });
    };

    const tick = () => {
      if (cancelled) return;
      if (!pausedRef.current && !reduceMotion) {
        visit(TOUR_IDS[step % TOUR_IDS.length]);
        step += 1;
      }
      tourTimer = window.setTimeout(tick, 8000);
    };

    let started = false;
    let retryTimer = 0;
    const start = () => {
      const href = iframe.contentWindow?.location.href ?? "";
      if (cancelled || started || !href.includes("embed")) return;
      if (!iframe.contentDocument?.querySelector(TOUR_IDS[0])) return;
      started = true;
      window.clearInterval(retryTimer);
      setLoaded(true);
      bindInner();
      visit(TOUR_IDS[0]);
      step = 1;
      if (!reduceMotion) tourTimer = window.setTimeout(tick, 7600);
    };

    shell.addEventListener("wheel", onShellWheel, { passive: false, capture: true });
    window.addEventListener("wheel", onParentIntent, { passive: true, capture: true });
    window.addEventListener("touchmove", onParentIntent, { passive: true, capture: true });
    loadHandler = start;
    iframe.addEventListener("load", loadHandler);
    retryTimer = window.setInterval(start, 150);
    start();

    return () => {
      cancelled = true;
      stopMotion();
      window.clearTimeout(tourTimer);
      window.clearTimeout(resumeTimer);
      window.clearInterval(retryTimer);
      shell.removeEventListener("wheel", onShellWheel, true);
      window.removeEventListener("wheel", onParentIntent, true);
      window.removeEventListener("touchmove", onParentIntent, true);
      if (loadHandler) iframe.removeEventListener("load", loadHandler);
      const doc = iframe.contentDocument;
      if (doc) {
        doc.removeEventListener("pointerdown", bumpIdle);
        if (innerWheel) doc.removeEventListener("wheel", innerWheel);
        doc.removeEventListener("touchstart", bumpIdle);
        doc.removeEventListener("keydown", bumpIdle);
      }
    };
  }, [src, reduceMotion, pauseTour, resumeTour]);

  return (
    <div
      ref={shellRef}
      data-iphone-frame
      className={cn("relative mx-auto w-max select-none overscroll-none", className)}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.45, duration: 0.8, ease }}
      >
      <div className="relative">
        <span
          className="absolute -left-[3px] top-[108px] z-20 h-[26px] w-[3px] rounded-l-[2px] bg-gradient-to-b from-[#8d8d92] via-[#3a3a3c] to-[#1c1c1e] shadow-[-1px_0_1px_rgba(0,0,0,0.45)]"
          aria-hidden
        />
        <span
          className="absolute -left-[3px] top-[152px] z-20 h-[46px] w-[3px] rounded-l-[2px] bg-gradient-to-b from-[#8d8d92] via-[#3a3a3c] to-[#1c1c1e] shadow-[-1px_0_1px_rgba(0,0,0,0.45)]"
          aria-hidden
        />
        <span
          className="absolute -left-[3px] top-[206px] z-20 h-[46px] w-[3px] rounded-l-[2px] bg-gradient-to-b from-[#8d8d92] via-[#3a3a3c] to-[#1c1c1e] shadow-[-1px_0_1px_rgba(0,0,0,0.45)]"
          aria-hidden
        />
        <span
          className="absolute -right-[3px] top-[176px] z-20 h-[62px] w-[3px] rounded-r-[2px] bg-gradient-to-b from-[#8d8d92] via-[#3a3a3c] to-[#1c1c1e] shadow-[1px_0_1px_rgba(0,0,0,0.45)]"
          aria-hidden
        />

        <div
          className="relative rounded-[2.35rem] p-[11px] shadow-[0_24px_60px_-18px_rgba(15,23,42,0.45),0_0_0_1px_rgba(255,255,255,0.12)_inset]"
          style={{
            background:
              "linear-gradient(160deg, #d4d4d8 0%, #52525b 9%, #18181b 32%, #09090b 58%, #3f3f46 86%, #a1a1aa 100%)",
          }}
        >
          <div className="absolute inset-[5px] rounded-[2.05rem] bg-black ring-1 ring-white/10" />
          <div
            className="relative overflow-hidden rounded-[1.85rem] bg-[#f8fafc] [overscroll-behavior:none]"
            style={{ width: screenW, height: screenH }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-[30px] items-center justify-between bg-[#f8fafc] px-3.5">
              <span className="relative z-10 text-[9px] font-semibold tracking-tight text-slate-900">
                {clock}
              </span>
              <span className="absolute left-1/2 top-1/2 flex h-[16px] w-[54px] -translate-x-1/2 -translate-y-1/2 items-center justify-end rounded-full bg-black px-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18),0_1px_2px_rgba(0,0,0,0.25)]">
                <span className="size-[5px] rounded-full bg-[#0a0a0a] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)]" />
              </span>
              <span className="relative z-10">
                <StatusGlyphs />
              </span>
            </div>

            {src ? (
              <iframe
                ref={iframeRef}
                title="koLink Chat on iPhone"
                src={src}
                className="absolute left-0 origin-top-left border-0 bg-[#f8fafc] [overscroll-behavior:none]"
                style={{
                  top: chromeTop,
                  width: VIEW_W,
                  height: frameH,
                  transform: `scale(${scale})`,
                }}
                loading="lazy"
                referrerPolicy="same-origin"
                onLoad={() => setLoaded(true)}
              />
            ) : null}

            {!loaded ? (
              <div
                className="absolute inset-x-0 z-10 grid place-items-center bg-[#f8fafc]"
                style={{ top: chromeTop, bottom: chromeBottom }}
              >
                <span className="size-6 rounded-full border-2 border-slate-200 border-t-blue-500 animate-spin" />
              </div>
            ) : null}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-[26px] items-center justify-center bg-[#f8fafc]">
              <div className="flex h-[14px] max-w-[70%] items-center gap-1 rounded-full bg-white px-2 shadow-sm ring-1 ring-slate-200/80">
                <span className="size-1 shrink-0 rounded-full bg-emerald-500" />
                <span className="truncate text-[7px] font-semibold tracking-tight text-slate-500">
                  {hostLabel}
                </span>
              </div>
            </div>
          </div>

          <span className="absolute bottom-[5px] left-1/2 h-[4px] w-[28px] -translate-x-1/2 rounded-full bg-black/70 ring-1 ring-white/10" />
        </div>
      </div>

      <p className="mt-2.5 text-center text-[10px] font-semibold tracking-wide text-slate-500">
        {exploring ? "You’re exploring — auto-tour pauses" : "Live site inside · auto-tour + tap to explore"}
      </p>
      </motion.div>
    </div>
  );
}
