"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steps } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

/** The four steps, joined by a violet hairline that draws itself as you scroll and rings each step in turn. */
export function Process() {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const dots = gsap.utils.toArray<HTMLElement>("[data-dot]", list);
    const light = (progress: number) =>
      dots.forEach((dot, i) => dot.classList.toggle("is-lit", progress >= i / (dots.length - 1) - 0.02));

    const mm = gsap.matchMedia(list);
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-line]", { scaleX: 1, scaleY: 1 });
      light(1);
    });
    mm.add(
      { md: "(min-width: 768px) and (prefers-reduced-motion: no-preference)", sm: "(max-width: 767px) and (prefers-reduced-motion: no-preference)" },
      (context) => {
        const horizontal = context.conditions?.md;
        gsap.fromTo(
          "[data-line]",
          horizontal ? { scaleX: 0, scaleY: 1 } : { scaleY: 0, scaleX: 1 },
          {
            ...(horizontal ? { scaleX: 1 } : { scaleY: 1 }),
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: horizontal ? "top 75%" : "top 70%",
              end: horizontal ? "top 30%" : "bottom 60%",
              scrub: 0.6,
              onUpdate: (self) => light(self.progress),
            },
          },
        );
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <ol ref={ref} className="relative mt-16 grid gap-10 pl-10 md:grid-cols-4 md:gap-6 md:pt-12 md:pl-0">
      {/* Track and drawn line: vertical on phones, horizontal from tablet up. */}
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-px bg-white/10 md:top-[11px] md:right-[calc(25%-1.125rem-11px)] md:bottom-auto md:left-[11px] md:h-px md:w-auto" />
      <span
        data-line
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-orbit-200 md:top-[11px] md:right-[calc(25%-1.125rem-11px)] md:bottom-auto md:left-[11px] md:h-px md:w-auto md:origin-left"
      />
      {steps.map((step, i) => (
        <li key={step.title} className="relative" data-reveal>
          <span
            data-dot
            aria-hidden="true"
            className="group/dot absolute top-0.5 -left-10 grid size-[22px] place-items-center rounded-full border border-white/15 bg-ink-950 transition-all duration-700 ease-out-expo md:-top-12 md:left-0 [&.is-lit]:border-orbit-200"
          >
            <span className="size-2 rounded-full bg-white/20 transition-colors duration-700 group-[.is-lit]/dot:bg-orbit-100" />
          </span>
          <p className="text-sm font-medium text-subtle tabular-nums">Step {i + 1}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">{step.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
