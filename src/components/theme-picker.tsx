"use client";

import { useEffect, useState } from "react";
import { THEME_KEY, themes, type ThemeId } from "@/content/themes";

/** A small swatch switcher pinned to the corner, for trying the colour themes on the live site. */
export function ThemePicker() {
  const [current, setCurrent] = useState<ThemeId>("violet");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with the theme the pre-paint script applied
    setCurrent((document.documentElement.dataset.theme as ThemeId) || "violet");
  }, []);

  const choose = (id: ThemeId) => {
    const html = document.documentElement;
    if (id === "violet") html.removeAttribute("data-theme");
    else html.setAttribute("data-theme", id);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themes.find((t) => t.id === id)!.bg);
    try {
      localStorage.setItem(THEME_KEY, id);
    } catch {}
    setCurrent(id);
  };

  const active = themes.find((t) => t.id === current)!;

  return (
    <div className="fixed bottom-4 left-4 z-60 flex items-center gap-1 rounded-full border border-white/10 p-1.5 shadow-2xl shadow-black/30 glass">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="theme-swatches"
        className="flex items-center gap-2 rounded-full py-1 pr-3 pl-1 text-xs font-medium text-mist"
      >
        <Swatch bg={active.bg} accent={active.accent} />
        <span>
          Colours<span className="text-subtle">: {active.name}</span>
        </span>
      </button>
      <div
        id="theme-swatches"
        role="radiogroup"
        aria-label="Colour theme"
        className={`flex items-center gap-1 overflow-hidden transition-[max-width,opacity] duration-500 ease-out-expo ${
          open ? "max-w-80 opacity-100" : "max-w-0 opacity-0"
        }`}
      >
        {themes.map((t) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={t.id === current}
            aria-label={t.name}
            title={t.name}
            tabIndex={open ? undefined : -1}
            onClick={() => choose(t.id)}
            className={`rounded-full p-0.5 ring-2 transition ${t.id === current ? "ring-orbit-200" : "ring-transparent hover:ring-white/30"}`}
          >
            <Swatch bg={t.bg} accent={t.accent} />
          </button>
        ))}
      </div>
    </div>
  );
}

function Swatch({ bg, accent }: { bg: string; accent: string }) {
  return (
    <span
      aria-hidden="true"
      className="block size-6 rounded-full border border-black/10"
      style={{ background: `linear-gradient(135deg, ${bg} 0 50%, ${accent} 50% 100%)` }}
    />
  );
}
