import Link from "next/link";
import { nav, site } from "@/content/site";
import { CookieSettingsLink } from "./cookie-banner";
import { OrbitMark } from "./orbit-mark";

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-ink-950">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <OrbitMark className="size-8" spin />
            <span className="text-[17px] tracking-tight">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Fast, custom websites that grow with your business.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">Site</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[{ label: "Home", href: "/" }, ...nav, { label: "Contact", href: "/contact/" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-mist">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">Get in touch</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-mist">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.github} className="text-muted transition-colors hover:text-mist" rel="me">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-white/8 px-6 py-6 text-xs text-subtle">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/privacy/" className="transition-colors hover:text-mist">
            Privacy
          </Link>
          <CookieSettingsLink className="transition-colors hover:text-mist" />
          <span>Designed and built by {site.owner}</span>
        </p>
      </div>
    </footer>
  );
}
