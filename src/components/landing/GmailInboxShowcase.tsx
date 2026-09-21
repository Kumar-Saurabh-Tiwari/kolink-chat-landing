import { AnimatePresence, motion } from "motion/react";
import { Archive, ArrowLeft, Check, Clock, Moon, Send, Tag, UserPlus } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { GmailMark, InstagramMark, WhatsAppMark, XMark } from "@/components/landing/BrandMarks";
import { Reveal } from "@/components/landing/Reveal";
import { cn } from "@/lib/utils";

type ChannelKey = "gmail" | "whatsapp" | "instagram" | "x";

type Thread = {
  id: string;
  name: string;
  initials: string;
  color: string;
  channel: ChannelKey;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  vip?: boolean;
  filter: Array<"all" | "unread" | "assigned" | "vip" | "comments">;
};

const CHANNEL_ICON: Record<ChannelKey, (props: { className?: string }) => ReactNode> = {
  gmail: (props) => <GmailMark {...props} />,
  whatsapp: (props) => <WhatsAppMark {...props} />,
  instagram: (props) => <InstagramMark {...props} />,
  x: (props) => <XMark {...props} />,
};

const CHANNEL_LABEL: Record<ChannelKey, string> = {
  gmail: "Gmail",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  x: "X",
};

const FILTERS = [
  { id: "all", label: "All Inboxes" },
  { id: "unread", label: "Unread" },
  { id: "assigned", label: "Assigned to Me" },
  { id: "vip", label: "VIP Leads" },
  { id: "comments", label: "Comments & Mentions" },
] as const;

const SEED: Thread[] = [
  {
    id: "maya",
    name: "Maya Chen",
    initials: "MC",
    color: "from-fuchsia-400 to-rose-500",
    channel: "instagram",
    subject: "Price on Creator Kit reel",
    preview: "Discount code? Can we ship to Berlin?",
    time: "2m",
    unread: true,
    vip: true,
    filter: ["all", "unread", "assigned", "vip", "comments"],
  },
  {
    id: "amelia",
    name: "Amelia Reyes",
    initials: "AR",
    color: "from-sky-400 to-blue-500",
    channel: "gmail",
    subject: "Q4 contract — two-way thread",
    preview: "Attached the revised MSA. Can you countersign today?",
    time: "11m",
    unread: true,
    filter: ["all", "unread", "assigned"],
  },
  {
    id: "jon",
    name: "Jon Bell",
    initials: "JB",
    color: "from-emerald-400 to-teal-500",
    channel: "whatsapp",
    subject: "Template broadcast follow-up",
    preview: "Got the catalog — booking a call for Thursday.",
    time: "28m",
    unread: false,
    vip: true,
    filter: ["all", "assigned", "vip"],
  },
  {
    id: "noah",
    name: "Noah Stone",
    initials: "NS",
    color: "from-slate-600 to-slate-900",
    channel: "x",
    subject: "Mention reply on launch tweet",
    preview: "Loved the auto-like demo. Sending a DM.",
    time: "1h",
    unread: true,
    filter: ["all", "unread", "comments"],
  },
];

const INCOMING: Thread = {
  id: "priya",
  name: "Priya Shah",
  initials: "PS",
  color: "from-violet-400 to-indigo-500",
  channel: "x",
  subject: "Mentioned you on the launch thread",
  preview: "Can we get a demo tomorrow morning?",
  time: "now",
  unread: true,
  vip: true,
  filter: ["all", "unread", "vip", "comments"],
};

const CANNED = [
  {
    id: "pricing",
    chip: "/pricing-sheet",
    text: "Here’s the Creator Kit pricing sheet — $129, Berlin warehouse ready.",
  },
  {
    id: "call",
    chip: "/book-call",
    text: "I opened a 15-min slot Thursday 11:40 CET. Want me to lock it?",
  },
  {
    id: "resolve",
    chip: "/resolve",
    text: "Marking this done on our side. Ping anytime if the shipment shifts.",
  },
];

const MESSAGES: Record<string, Array<{ from: "them" | "us"; text: string; time: string }>> = {
  maya: [
    {
      from: "them",
      text: "Discount code? Can we ship the Creator bundle to Berlin?",
      time: "11:42",
    },
    {
      from: "us",
      text: "Check your DMs! 🎁 Opening a private WhatsApp checkout now.",
      time: "11:42",
    },
  ],
  amelia: [
    { from: "them", text: "Attached the revised MSA. Can you countersign today?", time: "11:31" },
    {
      from: "us",
      text: "Got it — routing to legal, you’ll have a signed PDF by EOD.",
      time: "11:33",
    },
  ],
  jon: [{ from: "them", text: "Got the catalog — booking a call for Thursday.", time: "11:14" }],
  noah: [{ from: "them", text: "Loved the auto-like demo. Sending a DM.", time: "10:58" }],
  priya: [{ from: "them", text: "Can we get a demo tomorrow morning?", time: "just now" }],
};

function formatSla(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

export function GmailInboxShowcase() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [threads, setThreads] = useState(SEED);
  const [selectedId, setSelectedId] = useState("maya");
  const [mobilePane, setMobilePane] = useState<"list" | "thread">("list");
  const [via, setVia] = useState<"gmail" | "whatsapp">("gmail");
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<Record<string, string[]>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [sla, setSla] = useState(5 * 60);
  const [incomingReady, setIncomingReady] = useState(false);

  useEffect(() => {
    const incoming = window.setTimeout(() => {
      setThreads((current) =>
        current.some((thread) => thread.id === INCOMING.id) ? current : [INCOMING, ...current],
      );
      setIncomingReady(true);
    }, 4200);
    return () => window.clearTimeout(incoming);
  }, []);

  useEffect(() => {
    const tick = window.setInterval(() => setSla((value) => (value > 0 ? value - 1 : 0)), 1000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(id);
  }, [toast]);

  const unreadCount = threads.filter((thread) => thread.unread).length;
  const visible = useMemo(
    () => threads.filter((thread) => (filter === "all" ? true : thread.filter.includes(filter))),
    [threads, filter],
  );
  const selected = visible.find((thread) => thread.id === selectedId) ?? visible[0] ?? threads[0];
  const history = selected
    ? (MESSAGES[selected.id] ?? [
        { from: "them" as const, text: selected.preview, time: selected.time },
      ])
    : [];
  const extras = selected ? (sent[selected.id] ?? []) : [];

  function selectThread(id: string) {
    setSelectedId(id);
    setMobilePane("thread");
    setThreads((current) =>
      current.map((thread) => (thread.id === id ? { ...thread, unread: false } : thread)),
    );
    setSla(5 * 60);
  }

  function sendDraft() {
    if (!selected || !draft.trim()) return;
    const text = draft.trim();
    setSent((current) => ({ ...current, [selected.id]: [...(current[selected.id] ?? []), text] }));
    setDraft("");
    setToast(via === "gmail" ? "Sent via Gmail two-way sync" : "Handed off to WhatsApp");
  }

  return (
    <section id="inbox" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-16 sm:py-20">
      <Reveal className="mb-10 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
          Inbox Simulator
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          A Gmail-fast split pane. For every channel.
        </h2>
        <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
          Filter, triage, and reply like Superhuman — with Instagram, WhatsApp, X, and Gmail in the
          same glass frame.
        </p>
      </Reveal>

      <div className="glass-panel relative overflow-hidden rounded-3xl ring-1 ring-inset ring-white/95">
        <div className="flex flex-wrap gap-2 border-b border-white/80 bg-white/50 px-3 py-3 sm:px-4">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-[11px] font-semibold transition transform-gpu",
                filter === item.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white/70 text-slate-600 ring-1 ring-slate-200/80 hover:bg-white",
              )}
            >
              {item.label}
              {item.id === "unread" ? ` (${unreadCount})` : ""}
            </button>
          ))}
        </div>

        <div className="grid min-h-[520px] md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <div
            className={cn(
              "border-r border-white/80 bg-white/40",
              mobilePane === "thread" && "hidden md:block",
            )}
          >
            <AnimatePresence initial={false}>
              {visible.map((thread, index) => {
                const Icon = CHANNEL_ICON[thread.channel];
                const isNew = incomingReady && thread.id === INCOMING.id;
                return (
                  <motion.button
                    key={thread.id}
                    type="button"
                    layout
                    initial={isNew ? { opacity: 0, y: -16 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isNew ? 0 : index * 0.03 }}
                    onClick={() => selectThread(thread.id)}
                    className={cn(
                      "flex w-full gap-3 border-b border-slate-200/60 px-4 py-3 text-left transition hover:bg-white/80",
                      selected?.id === thread.id && "bg-blue-50/80",
                    )}
                  >
                    <div
                      className={`grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white ${thread.color}`}
                    >
                      {thread.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-[13px] font-semibold text-slate-900">
                          {thread.name}
                        </p>
                        {thread.unread ? (
                          <span className="size-2 shrink-0 rounded-full bg-blue-600" />
                        ) : null}
                        <span className="ml-auto text-[10px] text-slate-400">{thread.time}</span>
                      </div>
                      <p className="truncate text-[12px] font-medium text-slate-700">
                        {thread.subject}
                      </p>
                      <p className="truncate text-[11px] text-slate-500">{thread.preview}</p>
                    </div>
                    <span className="mt-1 shrink-0">
                      <Icon className="size-5" />
                    </span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          <div
            className={cn(
              "flex min-w-0 flex-col bg-white/55",
              mobilePane === "list" && "hidden md:flex",
            )}
          >
            {selected ? (
              <>
                <div className="flex items-center gap-3 border-b border-white/80 px-4 py-3">
                  <button
                    type="button"
                    className="grid size-8 place-items-center rounded-full bg-white md:hidden"
                    onClick={() => setMobilePane("list")}
                    aria-label="Back to threads"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <div
                    className={`grid size-9 place-items-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white ${selected.color}`}
                  >
                    {selected.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">{selected.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {CHANNEL_LABEL[selected.channel]} · {selected.subject}
                    </p>
                  </div>
                  <span className="hidden rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-bold text-sky-700 sm:inline">
                    {CHANNEL_LABEL[selected.channel]}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">
                    <Clock size={11} />
                    Reply within {formatSla(sla)}
                  </span>
                </div>

                <div className="flex-1 space-y-3 overflow-auto p-4 sm:p-5">
                  {history.map((message) => (
                    <div
                      key={`${message.time}-${message.text}`}
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-5 shadow-sm",
                        message.from === "us"
                          ? "ml-auto rounded-tr-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                          : "rounded-tl-sm bg-white text-slate-700 ring-1 ring-slate-100",
                      )}
                    >
                      {message.text}
                      <span
                        className={cn(
                          "mt-1 block text-[10px]",
                          message.from === "us" ? "text-blue-100" : "text-slate-400",
                        )}
                      >
                        {message.time}
                      </span>
                    </div>
                  ))}
                  {selected.channel === "instagram" ? (
                    <div className="max-w-[70%] overflow-hidden rounded-2xl ring-1 ring-slate-100">
                      <div className="h-24 bg-gradient-to-br from-fuchsia-500 via-rose-400 to-amber-300" />
                      <p className="bg-white px-3 py-2 text-[11px] text-slate-500">
                        Reel preview · Creator Kit drop
                      </p>
                    </div>
                  ) : null}
                  {extras.map((text) => (
                    <div
                      key={text}
                      className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-2.5 text-sm text-white shadow-sm"
                    >
                      {text}
                      <span className="mt-1 block text-[10px] text-blue-100">
                        via {via === "gmail" ? "Gmail" : "WhatsApp"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/80 bg-white/70 p-3 sm:p-4">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {CANNED.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDraft(item.text)}
                        className="rounded-full bg-slate-900 px-3 py-1 font-mono text-[10px] font-semibold text-white hover:bg-slate-800"
                      >
                        {item.chip}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-end gap-2 rounded-2xl border border-white/80 bg-white px-3 py-2 shadow-sm">
                    <div className="min-w-0 flex-1">
                      <textarea
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            sendDraft();
                          }
                        }}
                        rows={2}
                        placeholder="Write a reply…"
                        className="w-full resize-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                      />
                      <span className="animate-caret inline-block h-4 w-px bg-blue-600 align-middle" />
                    </div>
                    <button
                      type="button"
                      onClick={sendDraft}
                      className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30"
                      aria-label="Send"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setVia((value) => (value === "gmail" ? "whatsapp" : "gmail"))}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold text-slate-700"
                    >
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5",
                          via === "gmail" ? "bg-white text-red-600" : "text-slate-400",
                        )}
                      >
                        Gmail
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5",
                          via === "whatsapp" ? "bg-white text-emerald-600" : "text-slate-400",
                        )}
                      >
                        WhatsApp
                      </span>
                    </button>
                    {[
                      { icon: Moon, label: "Snooze", toast: "Snoozed until 9:00 AM" },
                      { icon: Check, label: "Mark as Done", toast: "Thread resolved" },
                      { icon: Tag, label: "Add Private Tag", toast: "Tagged · High Intent" },
                      { icon: UserPlus, label: "Assign Agent", toast: "Assigned to Sarah Jenkins" },
                      { icon: Archive, label: "Archive", toast: "Archived from All Inboxes" },
                    ].map((action) => (
                      <button
                        key={action.label}
                        type="button"
                        title={action.label}
                        onClick={() => setToast(action.toast)}
                        className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
                      >
                        <action.icon size={12} />
                        <span className="hidden sm:inline">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>

        <AnimatePresence>
          {toast ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-lg"
            >
              {toast}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
