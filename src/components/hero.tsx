"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { hero } from "@/content/site";
import { OrbitMark } from "./orbit-mark";
import { Starfield } from "./starfield";
import { ButtonLink, Eyebrow } from "./ui";

/**
 * The home page's opening: the orbit mark draws itself on while the headline rises in word by word
 * (both in CSS, so they play before the scripts arrive). Then the rings keep turning, tilt toward
 * the cursor, and a soft glow follows it across the section.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const orbit = orbitRef.current;
    const glow = glowRef.current;
    if (!section || !orbit || !glow) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // The whole hero drifts up and fades as you scroll away from it.
    const ctx = gsap.context(() => {
      gsap.to("[data-hero-content]", {
        yPercent: -18,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(orbit, {
        yPercent: 22,
        scale: 0.9,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
    }, section);

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => ctx.revert();

    const rotX = gsap.quickTo(orbit, "rotationX", { duration: 1.2, ease: "power3.out" });
    const rotY = gsap.quickTo(orbit, "rotationY", { duration: 1.2, ease: "power3.out" });
    const glowX = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3.out" });
    const glowY = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3.out" });
    gsap.set(orbit, { transformPerspective: 900 });

    const move = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rotY(px * 18);
      rotX(-py * 18);
      glowX(e.clientX - r.left);
      glowY(e.clientY - r.top);
      glow.style.opacity = "1";
    };
    const leave = () => {
      rotX(0);
      rotY(0);
      glow.style.opacity = "0";
    };
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    return () => {
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
      ctx.revert();
    };
  }, []);

  const words = hero.headline.split(" ");

  return (
    <section
      ref={sectionRef}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-32 pb-20"
    >
      <Starfield />
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 size-[36rem] -translate-1/2 rounded-full bg-orbit-500/20 opacity-0 blur-[100px] transition-opacity duration-700"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-[-10%] size-[50rem] -translate-y-1/2 rounded-full bg-orbit-700/20 blur-[140px]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div data-hero-content>
          <div className="fade-up" style={{ animationDelay: "0.15s" }}>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-6 text-[clamp(3rem,8vw,6.25rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
            {words.map((word, i) => (
              <span key={i}>
                <span
                  className={`word-rise ${i >= words.length - 2 ? "text-gradient pb-[0.08em]" : ""}`}
                  style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                >
                  {word}
                </span>
                {i < words.length - 1 && " "}
              </span>
            ))}
          </h1>
          <p
            className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-pretty text-muted md:text-xl"
            style={{ animationDelay: "0.95s" }}
          >
            {hero.sub}
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: "1.1s" }}>
            <ButtonLink href="/contact/">Get a free quote</ButtonLink>
            <ButtonLink href="/work/" variant="ghost">
              See my work
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
          <div ref={orbitRef} className="relative aspect-square">
            <div
              aria-hidden="true"
              className="fade-up absolute inset-[22%] rounded-full bg-orbit-400/25 blur-3xl"
              style={{ animationDelay: "0.6s" }}
            />
            <OrbitMark intro spin className="relative size-full drop-shadow-[0_0_30px_color-mix(in_oklab,var(--color-orbit-400)_35%,transparent)]" />
          </div>
        </div>
      </div>

      <div
        className="fade-up absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] tracking-[0.25em] text-subtle uppercase md:flex"
        style={{ animationDelay: "1.6s" }}
        aria-hidden="true"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2s_ease-in-out_infinite] bg-orbit-200" />
        </span>
      </div>
    </section>
  );
}
