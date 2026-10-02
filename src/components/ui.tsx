import Link from "next/link";
import { ViewTransition } from "react";

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
      ? "sheen bg-orbit-200 text-ink-950 hover:bg-orbit-100 shadow-[0_0_40px_-8px] shadow-orbit-500/60"
      : "border border-white/15 text-mist hover:border-white/30 hover:bg-white/5";
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-colors ${styles} ${className}`;
  const inner = (
    <>
      {children}
      <span aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
        →
      </span>
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

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-orbit-200 uppercase ${className}`}>
      <span className="size-1.5 rounded-full bg-orbit-200 shadow-[0_0_12px_2px] shadow-orbit-400" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="heading-sweep mt-5 text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">{intro}</p>}
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

/** A phone around a portrait screenshot. */
export function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[2.2rem] border border-white/15 bg-ink-900 p-2 shadow-[0_40px_100px_-20px_var(--frame-shadow)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.7rem]">
        {children}
        <span
          aria-hidden="true"
          className="absolute top-2 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-black"
        />
      </div>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:py-36">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[44rem] -translate-1/2 rounded-full bg-orbit-500/15 blur-[120px]"
      />
      <div className="relative mx-auto max-w-3xl text-center" data-reveal>
        <h2 className="text-4xl font-semibold tracking-[-0.03em] text-balance md:text-6xl">
          Got a project in mind? <span className="text-gradient">Let&apos;s talk.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
          Tell me a little about your business and I&apos;ll come back with ideas and a clear, fixed quote.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contact/">Get a free quote</ButtonLink>
          <ButtonLink href="/work/" variant="ghost">
            See my work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
