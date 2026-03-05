export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-16 pt-8 md:px-6 md:pt-12">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/90 text-lg font-bold">
              SS
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-slate-100">
                Solaris Scaling
              </p>
              <p className="text-xs text-slate-400">
                Websites & growth for local businesses
              </p>
            </div>
          </div>
          <a
            href="#book"
            className="hidden rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-orange-500/40 transition hover:bg-orange-400 md:inline-flex"
          >
            Book a free demo
          </a>
        </header>

        <section className="mt-12 grid flex-1 gap-10 md:mt-16 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Fill your chair with pre-booked cuts — not walk-in luck.
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
              Get your{" "}
              <span className="text-orange-400">week booked out</span>{" "}
              with a site that actually{" "}
              <span className="underline decoration-orange-500/70">
                books clients for you
              </span>
              .
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              We build fast, modern barber shop websites with an AI assistant
              that answers DMs, handles FAQs, and sends people straight to your
              booking link — so you spend more time cutting and less time
              messaging.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#book"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/40 transition hover:bg-orange-400"
              >
                Book a free 15‑min call
              </a>
              <p className="text-xs text-slate-400 sm:text-sm">
                No long calls, no tech talk. We show you a live demo and give
                you a simple quote.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-400 sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                Website, booking & AI done-for-you
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                Perfect for 1–5 chair shops
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl shadow-black/60">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Live preview
              </p>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                AI assistant online
              </span>
            </div>
            <div className="space-y-3 rounded-xl bg-slate-950/60 p-3">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Today</span>
                <span>3 new bookings</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-6 w-6 rounded-full bg-slate-800/80" />
                  <div className="space-y-1 rounded-2xl rounded-bl-sm bg-slate-800/60 px-3 py-2">
                    <p className="font-medium text-slate-100">
                      Hey, do you have any slots for a skin fade after work?
                    </p>
                    <p className="text-[11px] text-slate-400">Visitor</p>
                  </div>
                </div>
                <div className="flex items-start justify-end gap-2">
                  <div className="space-y-1 rounded-2xl rounded-br-sm bg-orange-500/10 px-3 py-2 text-right">
                    <p className="text-xs text-orange-100">
                      We&apos;ve got availability tomorrow between 5–7pm. Want
                      to book a 45‑min skin fade with Jay?
                    </p>
                    <div className="mt-1 flex justify-end gap-2 text-[11px]">
                      <button className="rounded-full bg-orange-500 px-2.5 py-1 font-semibold text-slate-950">
                        Yes, book it
                      </button>
                      <button className="rounded-full border border-orange-400/50 px-2.5 py-1 text-orange-200">
                        See other times
                      </button>
                    </div>
                  </div>
                  <div className="mt-1 h-6 w-6 rounded-full bg-orange-500" />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-3 text-[11px] text-slate-400">
                <span>Synced with your calendar</span>
                <span>Powered by AI & Meta Ads</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="offer"
          className="mt-12 grid gap-8 border-t border-slate-800 pt-10 md:grid-cols-3"
        >
          <div className="space-y-2 md:col-span-1">
            <h2 className="text-lg font-semibold text-slate-50">
              Everything you need to stay booked.
            </h2>
            <p className="text-sm text-slate-400">
              One simple package: website, online booking, AI assistant, and
              basic ads setup.
            </p>
          </div>
          <div className="space-y-3 text-sm text-slate-300 md:col-span-2">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  01 — Website
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  1–3 page site that looks as sharp as your fades.
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Mobile‑first, fast, with clear &quot;Book now&quot; buttons
                  that send people straight to your booking.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  02 — Booking
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Integrated online booking that fits your schedule.
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  We set up appointment types and sync with your calendar using
                  tools like Fresha, Booksy, or Calendly.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  03 — AI Assistant
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Answers FAQs and funnels people into bookings 24/7.
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Hours, prices, location, policies — handled automatically so
                  you get fewer &quot;Are you open?&quot; messages.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  04 — Meta Ads
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Simple local ads to keep new clients coming in.
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  We set up basic Facebook/Instagram campaigns with tracking so
                  you can see what&apos;s working.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="book"
          className="mt-12 rounded-2xl border border-orange-500/40 bg-gradient-to-r from-orange-500/10 via-slate-900 to-slate-950 px-6 py-8 text-sm text-slate-100 md:mt-14"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                Free 15‑minute demo
              </p>
              <h2 className="mt-2 text-lg font-semibold">
                See how your shop could look — and how the AI fills your
                calendar.
              </h2>
              <p className="mt-2 text-xs text-orange-100/80 md:max-w-xl">
                We&apos;ll walk you through a live barber demo, talk through
                your services, and give you a simple price. No pressure, no
                jargon.
              </p>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <a
                href="mailto:hello@solarisscaling.com?subject=Website%20%26%20growth%20demo"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/40 transition hover:bg-orange-400"
              >
                Request your demo
              </a>
              <p className="text-[11px] text-orange-100/80">
                Or DM us your shop name & Instagram handle.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

