"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const CONSENT_KEY = "ss-cookie-consent";
export type Consent = "all" | "essential";

/** The visitor's saved choice, or null if they haven't chosen yet. Analytics should only load on "all". */
export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "all" || v === "essential" ? v : null;
  } catch {
    return null;
  }
}

/** Opens the banner again, from the footer's "Cookie settings" link. */
export function openCookieSettings() {
  window.dispatchEvent(new Event("ss:cookie-settings"));
}

/**
 * Asks once for cookie consent, after the startup intro has finished, and remembers the answer.
 * The choice is announced as an "ss:consent" event so analytics can start without a reload.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener("ss:cookie-settings", reopen);
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!readConsent()) {
      const wait = () =>
        document.documentElement.classList.contains("intro-playing")
          ? (timer = setTimeout(wait, 300))
          : (timer = setTimeout(() => setOpen(true), 600));
      wait();
    }
    return () => {
      window.removeEventListener("ss:cookie-settings", reopen);
      clearTimeout(timer);
    };
  }, []);

  const choose = (consent: Consent) => {
    try {
      localStorage.setItem(CONSENT_KEY, consent);
    } catch {}
    window.dispatchEvent(new CustomEvent("ss:consent", { detail: consent }));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <section
      aria-label="Cookies"
      className="cookie-in fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-white/12 bg-ink-900 p-5 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] sm:inset-x-6 sm:bottom-6"
    >
      <p className="text-[15px] font-semibold text-mist">Cookies</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        This site uses essential storage so it works properly. With your OK, I&apos;d also like to use analytics
        cookies to see which pages help people. Read the{" "}
        <Link href="/privacy/" className="text-orbit-100 underline decoration-orbit-400/50 underline-offset-4">
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => choose("all")}
          className="rounded-full bg-orbit-200 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-orbit-100"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => choose("essential")}
          className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-mist transition-colors hover:border-orbit-200"
        >
          Essential only
        </button>
      </div>
    </section>
  );
}

/** A footer link that reopens the banner so visitors can change their mind. */
export function CookieSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie settings
    </button>
  );
}
