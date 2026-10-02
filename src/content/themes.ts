// Colour themes. The palettes themselves live in globals.css (html[data-theme="…"]); this list feeds the
// preview switcher. Once a theme is chosen, make it the default in globals.css and set `showThemePicker`
// to false in site.ts.

export const themes = [
  { id: "violet", name: "Violet", bg: "#0b0b10", accent: "#b5abfc" },
  { id: "solar", name: "Solar", bg: "#0a0f1c", accent: "#ffc857" },
  { id: "ocean", name: "Ocean", bg: "#061416", accent: "#6ee7d0" },
  { id: "daylight", name: "Daylight", bg: "#faf7f2", accent: "#b5401b" },
  { id: "cobalt", name: "Cobalt", bg: "#f5f7fb", accent: "#2950e8" },
] as const;

export type ThemeId = (typeof themes)[number]["id"];

export const THEME_KEY = "ss-theme";

/** Runs before first paint so a chosen theme never flashes the default. `?theme=ocean` also picks one. */
export const themeScript = `try{var d=document.documentElement,q=new URLSearchParams(location.search).get("theme"),bg=${JSON.stringify(
  Object.fromEntries(themes.map((t) => [t.id, t.bg])),
)};if(q&&bg[q])localStorage.setItem("${THEME_KEY}",q);var t=localStorage.getItem("${THEME_KEY}");if(t&&t!=="violet"&&bg[t]){d.dataset.theme=t;document.querySelector('meta[name="theme-color"]').setAttribute("content",bg[t])}}catch(e){}`;
