// Kept out of intro.tsx: a "use client" module can't hand plain values to the server layout.

export const SEEN_KEY = "ss-intro-seen";

/**
 * Runs before first paint: the intro plays once per visit (per tab). On later page loads it's skipped
 * outright, so the page appears straight away. Without JavaScript the overlay fades out on its own.
 */
export const introScript = `try{document.documentElement.classList.add(...(sessionStorage.getItem("${SEEN_KEY}")?["intro-skip"]:["intro-playing","intro-logo"]))}catch(e){document.documentElement.classList.add("intro-playing","intro-logo")}`;
