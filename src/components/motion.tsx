"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Smoothly scroll to an element or position, through Lenis when it's running. */
export function scrollToTarget(target: string | number | HTMLElement) {
  if (lenis) lenis.scrollTo(target, { offset: -90 });
  else if (typeof target === "number") window.scrollTo({ top: target });
  else (typeof target === "string" ? document.querySelector(target) : target)?.scrollIntoView();
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * The site's motion layer. Mounted once in the layout, it runs Lenis smooth scrolling and wires up
 * every animation that pages opt into with data attributes:
 *
 * - data-reveal          fade and rise in when scrolled into view (siblings stagger)
 * - .heading-sweep       a sheen sweeps across the heading once it's in view
 * - data-count="475"     count up from zero when in view
 * - data-magnetic        drift toward the cursor (buttons)
 * - data-tilt            3D tilt and a cursor-following glow (cards)
 *
 * Everything is re-scanned on each navigation and torn down on the way out.
 */
export function Motion() {
  const pathname = usePathname();

  // Smooth scrolling, once for the whole visit.
  useEffect(() => {
    if (reducedMotion()) return;
    lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Per-page animations.
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
    if (window.location.hash) {
      const hash = window.location.hash;
      requestAnimationFrame(() => scrollToTarget(hash));
    }

    const reduce = reducedMotion();
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      // Counters: render the final number for no-JS and reduced motion, count up otherwise.
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        if (reduce) return;
        const obj = { v: 0 };
        el.textContent = "0";
        gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString("en-IE");
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".heading-sweep").forEach((el) => {
        if (reduce) return el.classList.add("is-in");
        ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => el.classList.add("is-in") });
      });

      if (reduce) return;

      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(reveals, { autoAlpha: 0, y: 36 });
      ScrollTrigger.batch(reveals, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.09, overwrite: true }),
      });
    });

    if (!reduce && finePointer()) {
      // Magnetic buttons.
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          x((e.clientX - (r.left + r.width / 2)) * 0.28);
          y((e.clientY - (r.top + r.height / 2)) * 0.38);
        };
        const leave = () => {
          x(0);
          y(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });

      // Tilt cards.
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const strength = Number(el.dataset.tilt || 6);
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          el.classList.add("is-tilting");
          el.style.setProperty("--ry", `${(px - 0.5) * strength}deg`);
          el.style.setProperty("--rx", `${(0.5 - py) * strength}deg`);
          el.style.setProperty("--mx", `${px * 100}%`);
          el.style.setProperty("--my", `${py * 100}%`);
        };
        const leave = () => {
          el.classList.remove("is-tilting");
          el.style.setProperty("--rx", "0deg");
          el.style.setProperty("--ry", "0deg");
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    } else {
      // Touch devices still get the glow border, anchored to the top edge.
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => el.style.setProperty("--my", "0%"));
    }

    // Images and fonts change the page height after first paint.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
