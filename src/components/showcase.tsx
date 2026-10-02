"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wixted } from "@/content/site";
import { BrowserFrame, Eyebrow, PhoneFrame } from "./ui";

gsap.registerPlugin(ScrollTrigger);

/**
 * Featured work on the home page. On large screens the section pins while you scroll: the Wixted
 * homepage scrolls inside the browser frame, the phone slides in beside it, and the results land.
 */
export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia(section);
    const tallies = () => gsap.utils.toArray<HTMLElement>("[data-tally]", section);
    const countUp = (el: HTMLElement, duration: number) => {
      const obj = { v: 0 };
      return gsap.fromTo(
        obj,
        { v: 0 },
        {
          v: Number(el.dataset.tally),
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        },
      );
    };
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const screen = section.querySelector<HTMLElement>("[data-screen]")!;
      const shot = section.querySelector<HTMLElement>("[data-shot]")!;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      tl.to(shot, { y: () => -(shot.offsetHeight - screen.offsetHeight), duration: 1 }, 0)
        .fromTo("[data-phone]", { yPercent: 70, autoAlpha: 0, rotate: 6 }, { yPercent: 0, autoAlpha: 1, rotate: -4, duration: 0.45, ease: "power2.out" }, 0.15)
        .fromTo("[data-chip]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.3, ease: "power2.out" }, 0.3)
        .fromTo("[data-browser]", { scale: 0.94 }, { scale: 1, duration: 0.4, ease: "power2.out" }, 0);
      tallies().forEach((el) => tl.add(countUp(el, 0.4), 0.3));
    });
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      tallies().forEach((el) =>
        ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => countUp(el, 1.8) }),
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden px-6 py-24 lg:flex lg:h-svh lg:items-center lg:py-0">
      <div aria-hidden="true" className="absolute top-1/3 left-1/4 size-[40rem] rounded-full bg-orbit-700/15 blur-[140px]" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:pt-16">
        <div>
          <Eyebrow>Featured work</Eyebrow>
          <h2 className="heading-sweep mt-5 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">Wixted Engineering</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            An industrial supplier&apos;s whole catalogue, rebuilt to be fast, searchable and easy to quote from, with an
            admin panel the team runs from their phones.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {wixted.stats.slice(0, 3).map((s) => (
              <div key={s.label} data-chip className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
                <p className="text-3xl font-semibold tracking-tight text-orbit-100 tabular-nums">
                  <span data-tally={s.value}>{s.value}</span>
                </p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
            <div data-chip className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
              <p className="text-3xl font-semibold tracking-tight text-orbit-100">AI</p>
              <p className="mt-1 text-xs text-muted">Product assistant</p>
            </div>
          </div>
          <Link
            href="/work/wixted-engineering/"
            data-magnetic
            className="group mt-9 inline-flex items-center gap-2 text-[15px] font-semibold text-orbit-100"
          >
            Read the case study
            <span aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="relative pb-10 lg:pb-0">
          <div data-browser>
            <BrowserFrame url="wixtedengineering.ie">
              <div data-screen className="relative aspect-[16/10] overflow-hidden bg-white">
                <Image
                  data-shot
                  src="/work/wixted/home-desktop-full.webp"
                  alt="The Wixted Engineering homepage"
                  width={1440}
                  height={3664}
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="absolute top-0 left-0 w-full will-change-transform"
                />
              </div>
            </BrowserFrame>
          </div>
          <div data-phone className="absolute -right-2 -bottom-4 w-[30%] max-w-48 sm:-right-6 lg:-bottom-10">
            <PhoneFrame>
              <Image
                src="/work/wixted/home-mobile.webp"
                alt="The Wixted Engineering homepage on a phone"
                width={780}
                height={1688}
                sizes="200px"
              />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
