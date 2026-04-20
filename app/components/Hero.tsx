/** Royalty-free barber shop clip (Mixkit). Swap for `/videos/barber-hero.mp4` after adding your own file under `public/videos/`. */
const HERO_VIDEO_SRC =
  "https://assets.mixkit.co/videos/43223/43223-720.mp4";

export function Hero() {
  return (
    <section
      className="relative flex min-h-[100dvh] flex-col"
      aria-label="Solaris hero"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-neutral-950">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.06] object-cover blur-sm"
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-neutral-950/50" />
      </div>

      <header className="relative z-10 flex items-center justify-between gap-4 px-4 pb-4 pt-14 md:px-8 md:pt-16">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-neutral-950/40 px-3 py-1.5 backdrop-blur-md">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-sm font-bold text-neutral-950">
            SS
          </div>
          <p className="text-xs font-medium text-neutral-200 [text-shadow:0_1px_8px_rgba(0,0,0,0.85)] md:text-sm">
            Solaris Scaling
          </p>
        </div>
        <a
          href="#book"
          className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-950 shadow-md shadow-black/25 transition hover:bg-white"
        >
          Book a demo
        </a>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-6 text-center md:px-8">
        <h1 className="text-6xl font-bold tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.85),0_4px_28px_rgba(0,0,0,0.55)] sm:text-7xl md:text-8xl lg:text-9xl">
          Solaris
        </h1>
        <p className="mt-5 max-w-md text-base font-medium text-neutral-200/95 [text-shadow:0_1px_6px_rgba(0,0,0,0.9),0_2px_16px_rgba(0,0,0,0.5)] sm:text-lg md:text-xl">
          Online booking plus an AI assistant that answers DMs and nudges
          people to book.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#book"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-neutral-100 px-8 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-black/30 transition hover:bg-white"
          >
            Book a call
          </a>
          <a
            href="#services"
            className="text-sm font-medium text-neutral-300 underline-offset-4 [text-shadow:0_1px_8px_rgba(0,0,0,0.9)] transition hover:text-white hover:underline"
          >
            Services
          </a>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        aria-hidden
      >
        <div className="flex h-8 w-5 justify-center rounded-full border border-white/15 bg-neutral-950/35 backdrop-blur-sm">
          <div className="mt-1.5 h-1.5 w-0.5 animate-bounce rounded-full bg-neutral-400" />
        </div>
      </div>
    </section>
  );
}
