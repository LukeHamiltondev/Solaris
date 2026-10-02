"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { nav, site } from "@/content/site";
import { OrbitMark } from "./orbit-mark";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu after navigating, and give the mark one turn on every page change.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reacting to navigation, not render
    setOpen(false);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(markRef.current, { rotate: 0 }, { rotate: 360, duration: 1.1, ease: "expo.inOut" });
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  // The highlight pill slides to whichever link is hovered, or rests on the current page.
  const target = hovered ?? nav.find((n) => isActive(pathname, n.href))?.href ?? null;
  useLayoutEffect(() => {
    const el = target ? linksRef.current?.querySelector<HTMLElement>(`[data-href="${target}"]`) : null;
    setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [target]);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-5"
    >
      <div
        className={`flex w-full items-center justify-between rounded-full border transition-all duration-500 ease-out-expo ${
          scrolled
            ? "glass max-w-4xl border-white/10 px-3 py-2 shadow-2xl shadow-black/40"
            : "max-w-6xl border-transparent px-2 py-3"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 rounded-full pr-2 pl-1" aria-label={`${site.name} home`}>
          <span ref={markRef} data-logo-mark className="inline-flex">
            <OrbitMark className="size-8" />
          </span>
          <span data-logo-text className="text-[17px] font-normal tracking-tight text-mist">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <div ref={linksRef} className="relative flex items-center" onMouseLeave={() => setHovered(null)}>
            <span
              aria-hidden="true"
              className="absolute inset-y-0 rounded-full bg-white/8 transition-all duration-500 ease-out-expo"
              style={{ left: pill?.left ?? 0, width: pill?.width ?? 0, opacity: pill ? 1 : 0 }}
            />
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-href={item.href}
                onMouseEnter={() => setHovered(item.href)}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className="relative rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-mist aria-[current=page]:text-mist"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact/"
            data-magnetic
            className="sheen hidden rounded-full bg-orbit-200 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-orbit-100 sm:inline-flex"
          >
            Get a quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid size-11 place-items-center rounded-full border border-white/10 md:hidden"
          >
            <span
              className={`absolute h-px w-4.5 bg-mist transition-transform duration-500 ease-out-expo ${open ? "rotate-45" : "-translate-y-1"}`}
            />
            <span
              className={`absolute h-px w-4.5 bg-mist transition-transform duration-500 ease-out-expo ${open ? "-rotate-45" : "translate-y-1"}`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 -z-10 flex flex-col justify-center bg-ink-950/97 px-8 transition-[opacity,visibility] duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {[{ label: "Home", href: "/" }, ...nav, { label: "Get a quote", href: "/contact/" }].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? undefined : -1}
              className={`text-4xl font-semibold tracking-tight transition-all duration-700 ease-out-expo ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              } ${item.href === "/contact/" ? "text-gradient" : "text-mist"}`}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a href={`mailto:${site.email}`} className="mt-12 text-sm text-muted">
          {site.email}
        </a>
      </div>
    </header>
  );
}
