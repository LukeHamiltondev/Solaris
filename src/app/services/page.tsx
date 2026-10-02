import type { Metadata } from "next";
import Link from "next/link";
import { carePlan, faqs, quoteSteps, services } from "@/content/site";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { CtaBand, Page, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom business websites, product catalogues and shops, and custom tools. Every project gets its own fixed quote, free and with no obligation.",
};

export default function ServicesPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Services"
        title="No packages. Just your quote."
        intro="Every business is different, so every site is quoted on what it needs to do. You get one fixed price before any work begins."
      />

      <section className="px-6 pb-8">
        <div className="mx-auto grid max-w-6xl items-stretch gap-5 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.name}
              data-reveal
              data-tilt="4"
              className="tilt glow-border flex flex-col rounded-[1.75rem] border border-white/8 bg-ink-900/70 p-8 md:p-9"
            >
              <h2 className="text-xl font-semibold tracking-tight">{s.name}</h2>
              <p className="mt-1 text-sm text-muted">{s.for}</p>
              <ul className="mt-8 mb-10 space-y-3 text-[15px]">
                {s.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Icon name="check" className="mt-0.5 size-5 shrink-0 text-orbit-200" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact/?need=${encodeURIComponent(s.need)}`}
                data-magnetic
                className="mt-auto inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 font-semibold transition-colors hover:bg-white/5"
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
        </div>
      </section>

      <section className="px-6 pt-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="How quotes work" title="A fixed price in three steps." />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {quoteSteps.map((step, i) => (
              <li key={step.title} data-reveal className="rounded-[1.75rem] border border-white/8 bg-ink-900/70 p-8">
                <span className="text-sm font-semibold text-orbit-200">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <Link
            href="/contact/"
            data-magnetic
            className="sheen mt-10 inline-flex items-center gap-2 rounded-full bg-orbit-200 px-6 py-3.5 font-semibold text-ink-950 transition-colors hover:bg-orbit-100"
          >
            Get your free quote <span aria-hidden="true">→</span>
          </Link>
        </div>
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
