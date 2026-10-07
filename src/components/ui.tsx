import Link from "next/link";
import { ViewTransition } from "react";
import { Icon } from "./icons";

/** Wraps a page's content so it fades and rises in when navigated to. */
export function Page({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <main id="main">{children}</main>
    </ViewTransition>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const styles =
    variant === "primary"
      ? "sheen bg-orbit-200 text-ink-950 hover:bg-orbit-100 shadow-[0_14px_32px_-14px] shadow-black/70"
      : "border border-white/15 text-mist hover:border-white/30 hover:bg-white/5";
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-colors ${styles} ${className}`;
  const inner = (
    <>
      {children}
      <Icon name="arrow" className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
    </>
  );
  return external ? (
    <a href={href} data-magnetic className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} data-magnetic className={cls}>
      {inner}
    </Link>
  );
}

export function SectionHeading({
  title,
  intro,
  center = false,
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2 className="text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">{intro}</p>}
    </div>
  );
}

/** A quiet text action with the drawn arrow: mist, semibold, violet underline. */
export function TextLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[15px] font-semibold text-mist underline decoration-orbit-400/60 underline-offset-[6px] transition-colors hover:decoration-orbit-100 ${className}`}
    >
      {children}
      <Icon name="arrow" className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
    </Link>
  );
}

/** Short titled points on hairlines, two across from sm. Used for "why" style lists instead of boxed cards. */
export function PointList({ items, className = "" }: { items: readonly { title: string; body: string }[]; className?: string }) {
  return (
    <ul className={`grid gap-x-10 gap-y-10 sm:grid-cols-2 ${className}`}>
      {items.map((item) => (
        <li key={item.title} data-reveal className="border-t border-white/12 pt-6">
          <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
          <p className="mt-2.5 leading-relaxed text-pretty text-muted">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

// The logo's ring geometry, reused at page scale. Same dashes and rotations as the mark and the home hero.
const ringStyles = [
  { dash: "62 38", rotate: 200, stroke: "var(--ring-1)", width: 1.5, opacity: 0.9 },
  { dash: "70 30", rotate: 250, stroke: "var(--ring-2)", width: 1, opacity: 0.7 },
  { dash: "78 22", rotate: 300, stroke: "var(--ring-3)", width: 1, opacity: 0.5 },
] as const;

/**
 * Still orbit rings centred on their box, drawn as hairlines at any size. `sizes` gives each ring's
 * diameter, inner first. Decorative: place them so they pass around body text and controls, never through.
 */
export function Rings({ sizes, className = "" }: { sizes: readonly string[]; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute size-0 ${className}`}>
      {sizes.map((size, i) => {
        const ring = ringStyles[i % ringStyles.length];
        return (
          <svg key={i} viewBox="0 0 100 100" className="absolute -translate-1/2" style={{ width: size, height: size }}>
            <circle
              cx="50"
              cy="50"
              r="49.5"
              fill="none"
              stroke={ring.stroke}
              strokeOpacity={ring.opacity}
              strokeWidth={ring.width}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={ring.dash}
              transform={`rotate(${ring.rotate} 50 50)`}
            />
          </svg>
        );
      })}
    </div>
  );
}

/** A desktop browser window around a screenshot (or anything else). */
export function BrowserFrame({
  children,
  url,
  className = "",
}: {
  children: React.ReactNode;
  url?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-ink-800 shadow-[0_40px_120px_-30px_var(--frame-shadow)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-white/8 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </span>
        {url && (
          <span className="mx-auto max-w-[60%] truncate rounded-md bg-white/5 px-3 py-0.5 text-[11px] text-subtle">
            {url}
          </span>
        )}
        <span className="w-10" aria-hidden="true" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/**
 * A phone around a portrait screenshot. The screenshot sits between a status bar and a home bar, so the
 * notch and rounded corners never cover it. Sizes are relative to the phone's width, so small phones scale.
 */
export function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`@container ${className}`}>
      <div className="rounded-[14cqw] border border-white/15 bg-ink-900 p-[3.5cqw] shadow-[0_40px_100px_-20px_var(--frame-shadow)]">
        <div className="overflow-hidden rounded-[10.5cqw] bg-white">
          <div aria-hidden="true" className="flex aspect-[8/1] items-center justify-center">
            <span className="aspect-[4/1] w-[32%] rounded-full bg-black" />
          </div>
          <div className="border-y border-black/5">{children}</div>
          <div aria-hidden="true" className="flex aspect-[9/1] items-center justify-center">
            <span className="h-[3px] w-[34%] rounded-full bg-black/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:py-40">
      {/* Two of the logo's orbits circle the ask; sized so their strokes pass beside the copy, not through it. */}
      <Rings sizes={["max(58rem, 70vw)", "max(78rem, 94vw)"]} className="top-1/2 left-1/2 hidden md:block" />
      <div className="relative mx-auto max-w-3xl text-center" data-reveal>
        <h2 className="text-4xl font-semibold tracking-[-0.03em] text-balance md:text-6xl">
          Got a project in mind? <span className="text-orbit-200">Let&apos;s talk.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
          Tell us what you need. You&apos;ll get a fixed quote, free.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contact/">Get a free quote</ButtonLink>
          <ButtonLink href="/work/" variant="ghost">
            See our work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
