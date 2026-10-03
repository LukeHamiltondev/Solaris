"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { site } from "@/content/site";
import { lockScroll } from "./motion";
import { SEEN_KEY } from "./intro-script";

const rings = [
  { r: 10.5, color: "var(--ring-1)", dash: "62 38", rotate: 200, speed: 9 },
  { r: 16.5, color: "var(--ring-2)", dash: "70 30", rotate: 250, speed: 15 },
  { r: 22, color: "var(--ring-3)", dash: "78 22", rotate: 300, speed: 24 },
] as const;

const center = (r: DOMRect) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });

/**
 * Luke's startup intro: the mark grows in with its orbits turning, a light sweeps across to reveal the
 * name, then mark and name float up and shrink into the header logo while the backdrop fades away.
 * The page underneath holds its own entrance animations until the hand-off, then plays them.
 */
export function Intro() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    if (!root || !html.classList.contains("intro-playing")) {
      setDone(true);
      return;
    }
    lockScroll(true);

    const finish = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      html.classList.remove("intro-playing", "intro-logo");
      lockScroll(false);
      setDone(true);
    };

    // Visitors who ask for less motion go straight to the page.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return finish();

    let tl: gsap.core.Timeline | null = null;
    let cancelled = false;

    const flyHome = () => {
      if (cancelled) return;
      const markWrap = root.querySelector<HTMLElement>(".ss-markwrap")!;
      const text = root.querySelector<HTMLElement>(".ss-text")!;
      const homeMark = document.querySelector<HTMLElement>("[data-logo-mark]");
      const homeText = document.querySelector<HTMLElement>("[data-logo-text]");
      // The CSS fallback fade must not fire mid-flight.
      root.style.animation = "none";
      if (!homeMark || !homeText) return finish();

      // Mark: centre onto the header mark and shrink to its size.
      const from = markWrap.getBoundingClientRect();
      const to = homeMark.getBoundingClientRect();
      const markScale = to.width / from.width;
      const markMove = { x: center(to).x - center(from).x, y: center(to).y - center(from).y };

      // Name: line its left edge and middle up with the header name, scaled to the same width.
      const textFrom = text.getBoundingClientRect();
      const textTo = homeText.getBoundingClientRect();
      const textScale = textTo.width / (textFrom.width - 4); // 4px is the reveal's right padding
      const textMove = { x: textTo.left - textFrom.left, y: center(textTo).y - center(textFrom).y };

      // Wind each orbit forward to its resting angle, so the mark lands exactly as the logo draws it.
      const ringEls = gsap.utils.toArray<SVGGElement>(".ss-ring", root);
      const angles = ringEls.map((g) => {
        const anim = g.getAnimations()[0];
        const duration = Number(anim?.effect?.getTiming().duration) || 1;
        const angle = ((Number(anim?.currentTime) || 0) / duration) * 360;
        anim?.cancel();
        return angle % 360;
      });

      tl = gsap.timeline({ onComplete: finish });
      tl.to(markWrap, { x: markMove.x, y: markMove.y, scale: markScale, duration: 1.15, ease: "expo.inOut" }, 0)
        .to(text, { x: textMove.x, y: textMove.y, scale: textScale, duration: 1.15, ease: "expo.inOut" }, 0.06)
        .to(root.querySelector(".ss-glow"), { autoAlpha: 0, duration: 0.5 }, 0)
        .to(root.querySelector(".ss-bg"), { autoAlpha: 0, duration: 0.9, ease: "power2.inOut" }, 0.25)
        // Let the page start its own entrance while the logo is still landing.
        .add(() => html.classList.remove("intro-playing"), 0.85);
      ringEls.forEach((g, i) =>
        tl!.fromTo(g, { rotation: angles[i], svgOrigin: "24 24" }, { rotation: 360, duration: 1.15, ease: "expo.inOut" }, 0),
      );
    };

    // Take off once the name has been fully revealed (or straight away if that already happened).
    const reveal = root
      .querySelector(".ss-text")
      ?.getAnimations()
      .find((a) => (a as CSSAnimation).animationName === "ss-reveal");
    let wait: ReturnType<typeof setTimeout> | undefined;
    if (reveal && reveal.playState !== "finished") reveal.finished.then(() => (wait = setTimeout(flyHome, 250)), () => {});
    else flyHome();

    return () => {
      cancelled = true;
      clearTimeout(wait);
      tl?.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div id="ss-intro" ref={rootRef} aria-hidden="true">
      <div className="ss-bg" />
      <div className="ss-row">
        <div className="ss-markwrap">
          <div className="ss-glow" />
          <div className="ss-mark">
            <svg viewBox="0 0 48 48" width="112" height="112">
              <circle cx="24" cy="24" r="4.5" fill="var(--ring-1)" />
              {rings.map((ring) => (
                <g key={ring.r} className="ss-ring" style={{ animationDuration: `${ring.speed}s` }}>
                  <circle
                    cx="24"
                    cy="24"
                    r={ring.r}
                    fill="none"
                    stroke={ring.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray={ring.dash}
                    transform={`rotate(${ring.rotate} 24 24)`}
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>
        <div className="ss-textwrap">
          <div className="ss-text">{site.name}</div>
          <div className="ss-line" />
        </div>
      </div>
    </div>
  );
}
