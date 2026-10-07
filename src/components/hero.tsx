"use client";

import Link from "next/link";
import { useState } from "react";
import { hero, services } from "@/content/site";
import { AdminDemo } from "./admin-demo";
import { ButtonLink } from "./ui";

// The logo's three orbits at full scale, centred on the phone: the client's site sits at the core.
// Sizes bleed past the viewport on purpose; strokes stay hairline at any size.
const orbits = [
  { size: "max(24rem, 72vmin)", dash: "62 38", rotate: 200, speed: 70, stroke: "var(--ring-1)", width: 1.5, opacity: 0.9 },
  { size: "max(56rem, 112vmin)", dash: "70 30", rotate: 250, speed: 110, stroke: "var(--ring-2)", width: 1, opacity: 0.7 },
  { size: "max(76rem, 152vmin)", dash: "78 22", rotate: 300, speed: 160, stroke: "var(--ring-3)", width: 1, opacity: 0.5 },
] as const;

/**
 * The home page's opening. The promise and a working way to start a quote on the left; on the right,
 * a real client's admin screen on a phone at the centre of the logo's orbits, changing stock by itself
 * until the visitor takes over.
 */
export function Hero() {
  const [live, setLive] = useState(false);

  const words = hero.headline.split(" ");
  const lead = words.slice(0, -3).join(" ");
  const emphasis = words.slice(-3).join(" ");

  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-12 md:pt-36 lg:flex lg:min-h-svh lg:items-center lg:pb-20">
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative z-10">
          <h1
            className="fade-up text-[clamp(3rem,7.4vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-balance"
            style={{ animationDelay: "0.1s" }}
          >
            {lead} <span className="text-orbit-200">{emphasis}</span>
          </h1>
          <p
            className="ink-plate fade-up mt-7 max-w-[34rem] text-lg leading-relaxed text-pretty text-muted md:text-xl"
            style={{ animationDelay: "0.6s" }}
          >
            {hero.sub}
          </p>

          <div className="ink-plate fade-up mt-10" style={{ animationDelay: "0.8s" }}>
            <p id="hero-need" className="text-sm font-medium text-mist">
              What do you need?
            </p>
            <ul aria-labelledby="hero-need" className="mt-3 flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.need}>
                  <Link
                    href={`/contact/?need=${encodeURIComponent(s.need)}`}
                    className="inline-flex items-center rounded-full border border-white/15 px-4 py-2.5 text-[15px] text-mist transition-colors hover:border-orbit-200 hover:bg-orbit-200/10"
                  >
                    {s.need}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href="/contact/">Get a free quote</ButtonLink>
              <Link
                href="/work/"
                className="text-[15px] font-semibold text-mist underline decoration-orbit-400/60 underline-offset-[6px] transition-colors hover:decoration-orbit-100"
              >
                See our work
              </Link>
            </div>
          </div>
        </div>

        <figure className="relative mx-auto grid w-full max-w-[34rem] place-items-center">
          <div className="fade-up relative lg:py-10" style={{ animationDelay: "0.45s" }}>
            <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-0">
              {orbits.map((o, i) => (
                <svg
                  key={o.size}
                  viewBox="0 0 100 100"
                  // Phones get the inner orbit only, rising from behind the phone into the buttons.
                  className={`hero-orbit absolute -translate-1/2 ${i > 0 ? "hidden lg:block" : ""}`}
                  style={{ width: o.size, height: o.size, animationDuration: `${o.speed}s`, animationDelay: `${-i * 9}s` }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="49.5"
                    fill="none"
                    stroke={o.stroke}
                    strokeOpacity={i === 0 && live ? 1 : o.opacity}
                    strokeWidth={i === 0 && live ? o.width * 2 : o.width}
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray={o.dash}
                    transform={`rotate(${o.rotate} 50 50)`}
                    className="transition-[stroke-opacity,stroke-width] duration-700"
                  />
                </svg>
              ))}
            </div>
            <div className="relative h-[31rem] w-[16.5rem] rounded-[2.6rem] border border-white/15 bg-ink-800 p-2 shadow-[0_50px_100px_-30px_var(--frame-shadow)] sm:h-[32rem] sm:w-[17.5rem]">
              <div className="relative h-full overflow-hidden rounded-[2.1rem]">
                <AdminDemo onLive={setLive} />
                <span aria-hidden="true" className="absolute top-2 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
              </div>
            </div>
          </div>

          <figcaption
            aria-live="polite"
            className="fade-up relative mt-8 max-w-[19rem] rounded-xl bg-ink-950/85 px-3 py-2 text-center text-sm leading-relaxed text-subtle lg:mt-0"
            style={{ animationDelay: "0.9s" }}
          >
            {live ? (
              <span className="text-mist">Saved. On the real site, that change is live in a few minutes.</span>
            ) : (
              "The stock screen we built for an Irish industrial supplier. Go on, press the buttons."
            )}
            <span className="mt-1 block text-xs">Demo copy: nothing here changes their live site.</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
