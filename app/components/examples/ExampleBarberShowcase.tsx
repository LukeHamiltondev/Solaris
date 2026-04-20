"use client";

import { useCallback, useEffect, useState } from "react";
import { COLORWAYS, type Colorway } from "./colorways";
import { ExampleBarberHero } from "./ExampleBarberHero";

const tx = "transition-colors duration-700 ease-in-out";

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function SampleScrollSection({ c }: { c: Colorway }) {
  return (
    <div className={`${tx} relative z-10 mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-16`}>
      <div
        className={`${tx} flex items-center justify-between border-b pb-4 ${c.border}`}
      >
        <span className={`text-sm font-semibold tracking-tight ${c.agentTitle}`}>
          Northside Cuts
        </span>
        <button
          type="button"
          className={`${tx} rounded-full border px-4 py-2 text-sm font-medium ${c.navBtn}`}
        >
          Book
        </button>
      </div>
      <p className={`${tx} mt-10 text-center text-xs font-medium uppercase tracking-[0.2em] ${c.heroKicker}`}>
        Services
      </p>
      <section className="mt-6 flex flex-wrap justify-center gap-2">
        {["Fade", "Beard trim", "Hot towel"].map((label) => (
          <span
            key={label}
            className={`${tx} rounded-full border px-3 py-1.5 text-xs font-medium ${c.servicePill}`}
          >
            {label}
          </span>
        ))}
      </section>
    </div>
  );
}

function BookingAgentDemo({ c }: { c: Colorway }) {
  return (
    <aside
      className={`${tx} fixed bottom-6 left-4 right-4 z-30 mx-auto max-w-md rounded-2xl border shadow-2xl backdrop-blur-sm md:left-auto md:right-8 md:mx-0 ${c.agentPanel} ${c.border}`}
      aria-label="Sample booking assistant"
    >
      <div
        className={`${tx} flex items-center justify-between border-b px-4 py-3 ${c.agentHeaderBorder}`}
      >
        <div>
          <p className={`text-sm font-semibold ${c.agentTitle}`}>Northside</p>
          <p className={`text-xs ${c.agentMeta}`}>Booking assistant</p>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${c.chipOnline}`}
        >
          Online
        </span>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex gap-2">
          <div
            className={`${tx} h-8 w-8 shrink-0 rounded-full ${c.bubbleVisitorBg}`}
          />
          <div>
            <div
              className={`${tx} rounded-2xl rounded-bl-md border px-3 py-2 text-sm ${c.border} ${c.bubbleVisitorBg} ${c.bubbleVisitorText}`}
            >
              Any openings Saturday afternoon for a fade?
            </div>
            <p className={`mt-1 text-[11px] ${c.bubbleVisitorMeta}`}>Guest</p>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-2">
          <div
            className={`${tx} h-8 w-8 shrink-0 rounded-full ${c.assistantAvatar}`}
          />
          <div className="text-right">
            <div
              className={`${tx} ml-auto max-w-[85%] rounded-2xl rounded-br-md border px-3 py-2 text-left text-sm ${c.border} ${c.bubbleAssistantBg} ${c.bubbleAssistantText}`}
            >
              Yes. We have 2:30 and 4:00 with Marcus. Want me to hold 2:30?
            </div>
            <p className={`mt-1 text-[11px] ${c.agentMeta}`}>Assistant</p>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            className={`${tx} rounded-full border px-3 py-1.5 text-xs font-medium ${c.border} ${c.surface} ${c.agentTitle}`}
          >
            Other times
          </button>
          <button
            type="button"
            className={`${tx} rounded-full px-3 py-1.5 text-xs font-semibold ${c.primaryBtn}`}
          >
            Lock in 2:30
          </button>
        </div>
      </div>
      <p
        className={`${tx} border-t px-4 py-2 text-center text-[10px] ${c.agentHeaderBorder} ${c.footerNote}`}
      >
        Sample only. Not a live booking.
      </p>
    </aside>
  );
}

export function ExampleBarberShowcase() {
  const [i, setI] = useState(0);
  const c = COLORWAYS[i]!;

  const next = useCallback(() => {
    setI((n) => (n + 1) % COLORWAYS.length);
  }, []);

  const prev = useCallback(() => {
    setI((n) => (n - 1 + COLORWAYS.length) % COLORWAYS.length);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <>
      <button
        type="button"
        onClick={prev}
        aria-label={`Previous style: ${COLORWAYS[(i - 1 + COLORWAYS.length) % COLORWAYS.length]!.label}`}
        className={`${tx} fixed left-3 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-neutral-950/70 text-neutral-100 shadow-lg backdrop-blur-md transition hover:bg-neutral-900 md:left-6 md:h-14 md:w-14`}
      >
        <ChevronLeft className="opacity-90" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label={`Next style: ${COLORWAYS[(i + 1) % COLORWAYS.length]!.label}`}
        className={`${tx} fixed right-3 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-neutral-950/70 text-neutral-100 shadow-lg backdrop-blur-md transition hover:bg-neutral-900 md:right-6 md:h-14 md:w-14`}
      >
        <ChevronRight className="opacity-90" />
      </button>

      <p
        className={`${tx} pointer-events-none fixed bottom-24 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-neutral-950/60 px-3 py-1 text-xs text-neutral-300 backdrop-blur-md md:bottom-auto md:top-24`}
      >
        {c.label}
      </p>

      <div className={`${tx} min-h-screen ${c.page}`} data-colorway={c.id}>
        <ExampleBarberHero c={c} />
        <SampleScrollSection c={c} />
      </div>

      <BookingAgentDemo c={c} />
    </>
  );
}
