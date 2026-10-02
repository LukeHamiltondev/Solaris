import type { Metadata } from "next";
import Link from "next/link";
import { carePlan, faqs, packages } from "@/content/site";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { CtaBand, Page, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services & pricing",
  description: "Website packages from €1,500: Launch, Growth, and Commerce & custom, plus a monthly care plan.",
};

export default function ServicesPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Services & pricing"
        title="Clear packages. Fixed quotes."
        intro="Pick the starting point that fits. Every site is custom, so your quote is fixed before any work begins."
      />

      <section className="px-6 pb-8">
        <div className="mx-auto grid max-w-6xl items-stretch gap-5 lg:grid-cols-3">
          {packages.map((p) => (
            <article
              key={p.name}
              data-reveal
              data-tilt="4"
              className={`tilt flex flex-col rounded-[1.75rem] p-8 md:p-9 ${
                p.popular ? "orbit-border bg-ink-800 shadow-[0_30px_100px_-30px] shadow-orbit-500/40" : "glow-border border border-white/8 bg-ink-900/70"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight">{p.name}</h2>
                {p.popular && (
                  <span className="rounded-full bg-orbit-200 px-3 py-1 text-xs font-semibold text-ink-950">Most popular</span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted">{p.for}</p>
              <p className="mt-8 flex items-baseline gap-2">
                <span className="text-sm text-muted">from</span>
                <span className={`text-5xl font-semibold tracking-[-0.04em] ${p.popular ? "text-gradient" : ""}`}>{p.price}</span>
              </p>
              <ul className="mt-8 mb-10 space-y-3 text-[15px]">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Icon name="check" className="mt-0.5 size-5 shrink-0 text-orbit-200" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact/?package=${encodeURIComponent(p.name)}`}
                data-magnetic
                className={`mt-auto inline-flex items-center justify-center rounded-full px-6 py-3.5 font-semibold transition-colors ${
                  p.popular ? "sheen bg-orbit-200 text-ink-950 hover:bg-orbit-100" : "border border-white/15 hover:bg-white/5"
                }`}
              >
                Get a quote
              </Link>
            </article>
          ))}
        </div>

        <div
          data-reveal
          className="mx-auto mt-5 flex max-w-6xl flex-col gap-4 rounded-[1.75rem] border border-white/8 bg-ink-900/70 p-8 md:flex-row md:items-center md:justify-between md:p-9"
        >
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{carePlan.name}</h2>
            <p className="mt-2 max-w-xl text-muted">{carePlan.body}</p>
          </div>
          <p className="shrink-0 text-4xl font-semibold tracking-[-0.03em]">
            {carePlan.price}
            <span className="text-base font-normal text-muted">{carePlan.per}</span>
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-6xl text-sm text-subtle">Prices exclude VAT. 50% to start, 50% at launch.</p>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQ" title="Questions people ask." />
          <div className="divide-y divide-white/8 border-y border-white/8">
            {faqs.map((f) => (
              <details key={f.q} data-reveal className="group py-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="relative grid size-8 shrink-0 place-items-center rounded-full border border-white/15 transition-transform duration-500 ease-out-expo group-open:rotate-45"
                  >
                    <span className="absolute h-px w-3 bg-mist" />
                    <span className="absolute h-3 w-px bg-mist" />
                  </span>
                </summary>
                <p className="mt-4 max-w-xl leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </Page>
  );
}
