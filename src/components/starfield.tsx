"use client";

import { useEffect, useRef } from "react";

/** A sparse field of slowly drifting, twinkling stars behind the hero. Pauses when off screen. */
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Star = { x: number; y: number; r: number; speed: number; phase: number; hue: number };
    let stars: Star[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.2,
        speed: Math.random() * 0.08 + 0.02,
        phase: Math.random() * Math.PI * 2,
        hue: Math.random(),
      }));
    };

    let raf = 0;
    let visible = true;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        if (!reduce) {
          s.y -= s.speed;
          if (s.y < -2) {
            s.y = h + 2;
            s.x = Math.random() * w;
          }
        }
        const twinkle = reduce ? 0.6 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t / 900 + s.phase));
        ctx.globalAlpha = twinkle * (0.35 + s.r * 0.5);
        ctx.fillStyle = s.hue > 0.7 ? "#b5abfc" : "#e9e9ed";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(0);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="fade-up pointer-events-none absolute inset-0 size-full" />;
}
