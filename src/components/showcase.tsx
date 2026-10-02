"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudy } from "@/content/site";
import { BrowserFrame, PhoneFrame, TextLink } from "./ui";

gsap.registerPlugin(ScrollTrigger);

/**
 * Featured work on the home page. On large screens the section pins while you scroll: the client’s
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
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:pt-16">
        <div>
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">
            A 475-product catalogue, <span className="text-orbit-200">rebuilt.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">An industrial supplier&apos;s site, now fast and easy to quote from.</p>
          {/* Results as a ruled ledger, not boxed tiles. */}
          <dl className="mt-9 grid grid-cols-2 gap-x-8 border-t border-white/12">
            {caseStudy.stats.slice(0, 3).map((s) => (
              <div key={s.label} data-chip className="flex flex-col gap-1 border-b border-white/12 py-4">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-mist tabular-nums">
                  <span data-tally={s.value}>{s.value}</span>
                </dd>
              </div>
            ))}
            <div data-chip className="flex flex-col gap-1 border-b border-white/12 py-4">
              <dt className="text-sm text-muted">Product assistant</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-mist">AI</dd>
            </div>
          </dl>
          <TextLink href="/work/industrial-supplier/" className="mt-9">
            Read the case study
          </TextLink>
        </div>

        <div className="relative pb-10 lg:pb-0">
          <div data-browser>
            <BrowserFrame>
              <div data-screen className="relative aspect-[16/10] overflow-hidden bg-white">
                <Image
                  data-shot
                  src="/work/supplier/home-desktop-full.webp"
                  alt="The supplier’s new homepage"
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
                src="/work/supplier/home-mobile.webp"
                alt="The supplier’s new homepage on a phone"
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
