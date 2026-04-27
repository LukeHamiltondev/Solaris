import type { Colorway } from "./colorways";

const tx = "transition-all duration-700 ease-in-out";

type Props = {
  c: Colorway;
};

function HeroVideoLayer({ c }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
      <video
        key={c.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className={`absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 ${tx} motion-reduce:hidden ${c.heroVideoClass}`}
      >
        <source src={c.heroVideo} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 ${tx} ${c.heroOverlay}`} />
    </div>
  );
}

function HeroTopBar({ c }: Props) {
  return (
    <header className="relative z-10 flex items-center justify-between gap-4 px-4 pb-2 pt-20 md:px-8 md:pt-24">
      <div
        className={`${tx} rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md md:text-sm ${c.heroTopBar}`}
      >
        Northside Cuts
      </div>
      <button
        type="button"
        className={`${tx} rounded-full px-4 py-2 text-sm font-semibold ${c.primaryBtn}`}
      >
        Book
      </button>
    </header>
  );
}

export function ExampleBarberHero({ c }: Props) {
  const kickerBase = `text-xs font-medium uppercase tracking-[0.2em] ${tx} ${c.heroOnVideoKicker}`;
  const titleBase = `font-semibold tracking-tight ${tx} ${c.heroOnVideoTitle}`;
  const subBase = `text-sm leading-relaxed md:text-base ${tx} ${c.heroOnVideoMuted}`;

  return (
    <section
      className="relative flex min-h-[100dvh] flex-col"
      aria-label="Sample barber hero"
    >
      <HeroVideoLayer c={c} />
      <HeroTopBar c={c} />

      {c.heroLayout === "center" && (
        <div
          className={`relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-28 text-center md:pb-32`}
        >
          <p className={kickerBase}>Barber shop</p>
          <h1
            className={`${titleBase} mt-4 max-w-3xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl`}
          >
            {c.heroHeadline}
          </h1>
          <p className={`${subBase} mx-auto mt-5 max-w-md`}>{c.heroSub}</p>
          <button
            type="button"
            className={`${tx} mt-10 rounded-full px-8 py-3 text-sm font-semibold ${c.primaryBtn}`}
          >
            Book a slot
          </button>
        </div>
      )}

      {c.heroLayout === "split" && (
        <div className="relative z-10 flex flex-1 flex-col justify-center px-4 pb-28 md:px-10 md:pb-32">
          <div
            className={`mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-2 md:items-center md:gap-14 ${tx}`}
          >
            <div>
              <p className={kickerBase}>Barber shop</p>
              <h1
                className={`${titleBase} mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl`}
              >
                {c.heroHeadline}
              </h1>
            </div>
            <div className="flex flex-col justify-center space-y-6 md:pl-4">
              <p className={`${subBase} max-w-md`}>{c.heroSub}</p>
              <button
                type="button"
                className={`${tx} w-fit rounded-full px-8 py-3 text-sm font-semibold ${c.primaryBtn}`}
              >
                Book a slot
              </button>
              <div className="flex gap-2 pt-2">
                {["Fade", "Beard", "Towel"].map((t) => (
                  <span
                    key={t}
                    className={`rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {c.heroLayout === "bottom" && (
        <div className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-28 md:px-12 md:pb-36">
          <div className={`mx-auto w-full max-w-5xl ${tx}`}>
            <p className={kickerBase}>Northside · downtown</p>
            <h1
              className={`${titleBase} mt-3 max-w-4xl text-4xl tracking-tight sm:text-5xl md:text-7xl`}
            >
              {c.heroHeadline}
            </h1>
            <p className={`${subBase} mt-4 max-w-xl`}>{c.heroSub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className={`${tx} rounded-full px-8 py-3 text-sm font-semibold ${c.primaryBtn}`}
              >
                Book a slot
              </button>
              <span className={`text-xs ${c.heroOnVideoMuted}`}>
                Walk-ins till 6
              </span>
            </div>
          </div>
        </div>
      )}

      {c.heroLayout === "editorial" && (
        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-28 md:px-16 md:pb-32">
          <div className={`mx-auto w-full max-w-4xl md:mx-0 ${tx}`}>
            <p className={kickerBase}>Northside · est. 2014</p>
            <h1
              className={`${titleBase} mt-5 max-w-xl font-serif text-4xl font-normal leading-[1.12] sm:text-5xl md:text-6xl`}
            >
              {c.heroHeadline}
            </h1>
            <p className={`${subBase} mt-6 max-w-md`}>{c.heroSub}</p>
            <button
              type="button"
              className={`${tx} mt-10 rounded-full px-8 py-3 text-sm font-semibold ${c.primaryBtn}`}
            >
              Book a slot
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
