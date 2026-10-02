"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";

// A working copy of the stock screen from a client's admin panel (an industrial supplier), as it looks on a phone.
// The products are real; the stock numbers are made up, and nothing here touches their live site.
// Two products, so the whole screen fits inside the phone frame with nothing cut off.
const products = [
  { id: "clamps", name: "‘T’ Bolt Clamps", category: "Bolt clamps", img: "t-bolt-clamps", stock: 24 },
  { id: "thermo", name: "33D Thermometer", category: "Temperature gauges", img: "thermometer", stock: 6 },
] as const;

type Id = (typeof products)[number]["id"];
type Stock = Record<Id, number>;

const initial = Object.fromEntries(products.map((p) => [p.id, p.stock])) as Stock;
const AUTOPLAY_TARGET: Id = "thermo";

export function AdminDemo({ onLive }: { onLive?: (live: boolean) => void }) {
  const [stock, setStock] = useState<Stock>(initial);
  const [saved, setSaved] = useState<Stock>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "live">("idle");
  const [pressed, setPressed] = useState<string | null>(null);
  const touched = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stockRef = useRef(stock);
  useEffect(() => {
    stockRef.current = stock;
  }, [stock]);

  const dirty = products.some((p) => stock[p.id] !== saved[p.id]);
  const live = status === "live" && !dirty;
  useEffect(() => onLive?.(live), [live, onLive]);

  const change = (id: Id, by: number) => setStock((s) => ({ ...s, [id]: Math.max(0, s[id] + by) }));
  const save = () => {
    setStatus("saving");
    const snapshot = stockRef.current;
    setTimeout(() => {
      setSaved(snapshot);
      setStatus("live");
    }, 700);
  };

  // Until the visitor takes over, the screen demonstrates itself: two taps on +, then Save.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    let visible = false;
    let running = false;
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(() => !touched.current && fn(), ms));
    const tap = (key: string, fn: () => void) => {
      setPressed(key);
      fn();
      timers.push(setTimeout(() => setPressed(null), 220));
    };
    const loop = () => {
      if (touched.current || !visible) {
        running = false;
        return;
      }
      running = true;
      at(900, () => tap(`${AUTOPLAY_TARGET}+`, () => change(AUTOPLAY_TARGET, 1)));
      at(1500, () => tap(`${AUTOPLAY_TARGET}+`, () => change(AUTOPLAY_TARGET, 1)));
      at(2300, () => tap("save", save));
      at(6200, () => {
        setStock(initial);
        setSaved(initial);
        setStatus("idle");
      });
      at(7400, loop);
    };
    // Wait for the startup intro to hand over before playing, and only play while on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        timers.forEach(clearTimeout);
        timers = [];
        running = false;
      } else if (!running) {
        const wait = () =>
          document.documentElement.classList.contains("intro-playing") ? timers.push(setTimeout(wait, 300)) : loop();
        wait();
      }
    });
    io.observe(root);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const takeOver = () => {
    if (touched.current) return;
    touched.current = true;
    setPressed(null);
  };

  return (
    <div ref={rootRef} onPointerDown={takeOver} onKeyDown={takeOver} className="admin flex h-full flex-col bg-[#f3f5f9] text-[#0f1b33]">
      <div className="flex items-center gap-2 border-b border-[#dfe4ee] bg-white px-4 pt-9 pb-3">
        <Image src="/work/supplier/admin/wesl-mark.webp" alt="" width={28} height={28} className="rounded-md" />
        <span className="text-[15px] font-bold">Admin</span>
        <span className="ml-auto inline-flex items-center gap-1 text-[12px] text-[#123f86]">
          View website <Icon name="external" className="size-3" />
        </span>
      </div>

      <div className="flex-1 px-3.5 pt-4">
        <p className="text-[22px] leading-none font-bold tracking-tight">Products</p>
        <p className="mt-1.5 text-[12px] leading-snug text-[#4a5875]">Change stock, then press Save.</p>

        <ul className="mt-4 space-y-2.5">
          {products.map((p) => {
            const changed = stock[p.id] !== saved[p.id];
            return (
              <li key={p.id} className="rounded-xl border border-[#dfe4ee] bg-white p-3">
                <div className="flex items-start gap-2.5">
                  <Image
                    src={`/work/supplier/admin/${p.img}.webp`}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 shrink-0 rounded-lg border border-[#eef1f6]"
                  />
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-[12.5px] leading-tight font-semibold">{p.name}</p>
                    <p className="mt-0.5 text-[11.5px] text-[#5b6884]">{p.category}</p>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-[11.5px] text-[#5b6884]">In stock</span>
                  <div className="flex items-center gap-1">
                    <Stepper label={`One fewer ${p.name}`} pressed={pressed === `${p.id}-`} onClick={() => change(p.id, -1)}>
                      −
                    </Stepper>
                    <output
                      aria-label={`${p.name} stock`}
                      className={`grid h-7 w-9 place-items-center rounded-md border text-[12px] font-semibold tabular-nums transition-colors ${
                        changed ? "border-[#123f86] bg-[#e8eefa] text-[#123f86]" : "border-[#dfe4ee]"
                      }`}
                    >
                      {stock[p.id]}
                    </output>
                    <Stepper label={`One more ${p.name}`} pressed={pressed === `${p.id}+`} onClick={() => change(p.id, 1)}>
                      +
                    </Stepper>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative border-t border-[#dfe4ee] bg-white px-4 pt-3 pb-2">
        <div aria-live="polite" className="absolute inset-x-0 -top-4 flex justify-center text-[11.5px] font-medium">
          {status === "live" && !dirty && (
            <span className="rounded-full bg-[#e3f4ea] px-3 py-1.5 whitespace-nowrap text-[#17804a] shadow-[0_6px_14px_-8px_rgb(0_0_0/0.4)]">
              Saved. Live in a few minutes.
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={save}
          disabled={!dirty || status === "saving"}
          className={`w-full rounded-lg py-2.5 text-[13px] font-semibold text-white transition-[background-color,transform] duration-200 ${
            dirty ? "bg-[#123f86]" : "bg-[#9aa8c4]"
          } ${pressed === "save" ? "scale-[0.97]" : ""}`}
        >
          {status === "saving" ? "Saving…" : "Save changes"}
        </button>
        {/* Home indicator, and room for the frame's rounded corners. */}
        <span aria-hidden="true" className="mx-auto mt-3 block h-1 w-24 rounded-full bg-[#0f1b33]" />
      </div>
    </div>
  );
}

function Stepper({
  children,
  label,
  pressed,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid size-7 place-items-center rounded-md border border-[#dfe4ee] text-[14px] leading-none transition-[background-color,transform] duration-150 active:scale-90 active:bg-[#e8eefa] ${
        pressed ? "scale-90 bg-[#e8eefa]" : "bg-white"
      }`}
    >
      {children}
    </button>
  );
}
