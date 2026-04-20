export type HeroLayout = "center" | "split" | "bottom" | "editorial";

export type Colorway = {
  id: string;
  label: string;
  /** Page shell below the hero */
  page: string;
  muted: string;
  border: string;
  surface: string;
  navBtn: string;
  heroKicker: string;
  primaryBtn: string;
  servicePill: string;
  agentPanel: string;
  agentHeaderBorder: string;
  agentTitle: string;
  agentMeta: string;
  bubbleVisitorBg: string;
  bubbleVisitorText: string;
  bubbleVisitorMeta: string;
  bubbleAssistantBg: string;
  bubbleAssistantText: string;
  chipOnline: string;
  footerNote: string;
  assistantAvatar: string;
  /** Full-viewport hero (Mixkit barber / barbershop clips, 720p) */
  heroLayout: HeroLayout;
  heroVideo: string;
  /** Overlay on top of video (tint + opacity) */
  heroOverlay: string;
  /** Extra classes on <video> (object-cover, scale, blur) */
  heroVideoClass: string;
  /** Headlines over video */
  heroHeadline: string;
  heroSub: string;
  /** Text on video (usually light; Paper uses dark on bright overlay) */
  heroOnVideoTitle: string;
  heroOnVideoMuted: string;
  heroOnVideoKicker: string;
  /** Top bar on hero: glass pill */
  heroTopBar: string;
};

export const COLORWAYS: Colorway[] = [
  {
    id: "noir",
    label: "Noir",
    page: "bg-neutral-950 text-neutral-100",
    muted: "text-neutral-500",
    border: "border-neutral-800",
    surface: "bg-neutral-900/70",
    navBtn: "border-neutral-700 bg-neutral-900 text-neutral-100 hover:bg-neutral-800",
    heroKicker: "text-neutral-500",
    primaryBtn:
      "bg-neutral-100 text-neutral-950 hover:bg-white shadow-md shadow-black/30",
    servicePill: "border-neutral-700 bg-neutral-900/80 text-neutral-300",
    agentPanel: "border-neutral-800 bg-neutral-950/90",
    agentHeaderBorder: "border-neutral-800",
    agentTitle: "text-neutral-100",
    agentMeta: "text-neutral-500",
    bubbleVisitorBg: "bg-neutral-800/90",
    bubbleVisitorText: "text-neutral-100",
    bubbleVisitorMeta: "text-neutral-500",
    bubbleAssistantBg: "bg-neutral-800",
    bubbleAssistantText: "text-neutral-100",
    chipOnline: "bg-emerald-500/15 text-emerald-400",
    footerNote: "text-neutral-600",
    assistantAvatar: "bg-neutral-300",
    heroLayout: "center",
    /** Barber with client in shop */
    heroVideo: "https://assets.mixkit.co/videos/43223/43223-720.mp4",
    heroOverlay: "bg-neutral-950/50",
    heroVideoClass:
      "scale-[1.06] object-cover blur-sm",
    heroHeadline: "Cuts that fit your week.",
    heroSub: "Walk in welcome. Book online to skip the wait.",
    heroOnVideoTitle:
      "text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.85),0_4px_28px_rgba(0,0,0,0.55)]",
    heroOnVideoMuted:
      "text-neutral-200/95 [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]",
    heroOnVideoKicker:
      "text-neutral-300 [text-shadow:0_1px_8px_rgba(0,0,0,0.85)]",
    heroTopBar: "border-white/10 bg-neutral-950/40 text-neutral-200"
  },
  {
    id: "paper",
    label: "Paper",
    page: "bg-stone-100 text-stone-900",
    muted: "text-stone-500",
    border: "border-stone-300",
    surface: "bg-white/80",
    navBtn: "border-stone-300 bg-white text-stone-900 hover:bg-stone-50",
    heroKicker: "text-stone-500",
    primaryBtn:
      "bg-stone-900 text-stone-50 hover:bg-stone-800 shadow-md shadow-stone-900/20",
    servicePill: "border-stone-300 bg-white/90 text-stone-600",
    agentPanel: "border-stone-300 bg-white shadow-lg shadow-stone-900/10",
    agentHeaderBorder: "border-stone-200",
    agentTitle: "text-stone-900",
    agentMeta: "text-stone-500",
    bubbleVisitorBg: "bg-stone-200",
    bubbleVisitorText: "text-stone-900",
    bubbleVisitorMeta: "text-stone-500",
    bubbleAssistantBg: "bg-stone-900",
    bubbleAssistantText: "text-stone-50",
    chipOnline: "bg-emerald-600/15 text-emerald-700",
    footerNote: "text-stone-400",
    assistantAvatar: "bg-stone-900",
    heroLayout: "editorial",
    /** Stylist cutting hair in a barbershop */
    heroVideo: "https://assets.mixkit.co/videos/40111/40111-720.mp4",
    heroOverlay: "bg-stone-100/82",
    heroVideoClass: "scale-105 object-cover blur-[2px]",
    heroHeadline: "Slow mornings. Sharp fades.",
    heroSub: "Same chair since 2014. Book the slot that fits your day.",
    heroOnVideoTitle: "text-stone-900 [text-shadow:0_1px_0_rgba(255,255,255,0.35)]",
    heroOnVideoMuted: "text-stone-600",
    heroOnVideoKicker: "text-stone-500",
    heroTopBar: "border-stone-300/80 bg-white/55 text-stone-800 backdrop-blur-md"
  },
  {
    id: "ocean",
    label: "Ocean",
    page: "bg-slate-900 text-slate-50",
    muted: "text-slate-400",
    border: "border-slate-700",
    surface: "bg-slate-800/60",
    navBtn: "border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700",
    heroKicker: "text-slate-400",
    primaryBtn:
      "bg-sky-400 text-slate-950 hover:bg-sky-300 shadow-md shadow-sky-950/40",
    servicePill: "border-slate-600 bg-slate-800/80 text-slate-300",
    agentPanel: "border-slate-700 bg-slate-950/80",
    agentHeaderBorder: "border-slate-700",
    agentTitle: "text-slate-50",
    agentMeta: "text-slate-400",
    bubbleVisitorBg: "bg-slate-800",
    bubbleVisitorText: "text-slate-100",
    bubbleVisitorMeta: "text-slate-500",
    bubbleAssistantBg: "bg-sky-500/20",
    bubbleAssistantText: "text-sky-100",
    chipOnline: "bg-sky-400/20 text-sky-300",
    footerNote: "text-slate-500",
    assistantAvatar: "bg-sky-400",
    heroLayout: "split",
    /** Barber working with a client (shop / neon) */
    heroVideo: "https://assets.mixkit.co/videos/40607/40607-720.mp4",
    heroOverlay: "bg-slate-950/55",
    heroVideoClass: "scale-[1.08] object-cover blur-sm",
    heroHeadline: "Book in. Line out.",
    heroSub: "Hold your place online. We hold the fade.",
    heroOnVideoTitle:
      "text-slate-50 [text-shadow:0_2px_16px_rgba(0,0,0,0.75)]",
    heroOnVideoMuted: "text-slate-300 [text-shadow:0_1px_10px_rgba(0,0,0,0.8)]",
    heroOnVideoKicker: "text-sky-200/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.75)]",
    heroTopBar: "border-slate-500/30 bg-slate-950/45 text-slate-100 backdrop-blur-md"
  },
  {
    id: "clay",
    label: "Clay",
    page: "bg-stone-900 text-stone-50",
    muted: "text-stone-400",
    border: "border-stone-700",
    surface: "bg-stone-800/50",
    navBtn: "border-stone-600 bg-stone-800 text-stone-100 hover:bg-stone-700",
    heroKicker: "text-stone-400",
    primaryBtn:
      "bg-amber-500 text-stone-950 hover:bg-amber-400 shadow-md shadow-amber-950/30",
    servicePill: "border-stone-600 bg-stone-800/70 text-stone-300",
    agentPanel: "border-stone-700 bg-stone-950/90",
    agentHeaderBorder: "border-stone-800",
    agentTitle: "text-stone-50",
    agentMeta: "text-stone-500",
    bubbleVisitorBg: "bg-stone-800",
    bubbleVisitorText: "text-stone-100",
    bubbleVisitorMeta: "text-stone-500",
    bubbleAssistantBg: "bg-amber-500/15",
    bubbleAssistantText: "text-amber-100",
    chipOnline: "bg-amber-500/20 text-amber-300",
    footerNote: "text-stone-500",
    assistantAvatar: "bg-amber-500",
    heroLayout: "bottom",
    /** Barber cutting a male client's hair (clippers) */
    heroVideo: "https://assets.mixkit.co/videos/43221/43221-720.mp4",
    heroOverlay: "bg-gradient-to-t from-stone-950/92 via-stone-950/45 to-stone-900/25",
    heroVideoClass: "scale-[1.07] object-cover blur-md",
    heroHeadline: "Your chair. Their ritual.",
    heroSub: "Downtown. Four chairs. One standard.",
    heroOnVideoTitle:
      "text-stone-50 [text-shadow:0_2px_20px_rgba(0,0,0,0.85)]",
    heroOnVideoMuted: "text-stone-300 [text-shadow:0_1px_10px_rgba(0,0,0,0.8)]",
    heroOnVideoKicker: "text-amber-200/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.75)]",
    heroTopBar: "border-stone-600/40 bg-stone-950/50 text-stone-100 backdrop-blur-md"
  }
];
