import Link from "next/link";
import { builds, reasons, testimonial } from "@/content/site";
import { Hero } from "@/components/hero";
import { Showcase } from "@/components/showcase";
import { Process } from "@/components/process";
import { Icon } from "@/components/icons";
import { CtaBand, Page, SectionHeading } from "@/components/ui";
import { Testimonial } from "@/components/testimonial";

export default function HomePage() {
  return (
    <Page>
      <Hero />
      <Showcase />

      <section className="px-6 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="What I build"
            title="Everything your website needs to bring in work."
            intro="From a sharp five-page site to a full product catalogue with its own admin panel."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {builds.map((b) => (
              <article
                key={b.title}
                data-reveal
                data-tilt
                className="tilt glow-border rounded-3xl border border-white/8 bg-ink-900/70 p-8"
              >
                <span className="grid size-12 place-items-center rounded-2xl border border-orbit-400/30 bg-orbit-500/10 text-orbit-100">
                  <Icon name={b.icon} />
                </span>
                <h3 className="mt-8 text-xl font-semibold tracking-tight">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/6 bg-ink-900/50 px-6 py-28 md:py-36">
        <div aria-hidden="true" className="absolute -top-40 right-0 size-[36rem] blob text-orbit-700/15" />
        <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.3fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Why Solaris"
              title="Not just a website. A way to win customers."
              intro="Templates look fine and do little. Agencies cost a fortune and hand you around. I sit in between."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <div key={r.title} data-reveal className="rounded-3xl border border-white/8 bg-ink-950/60 p-7">
                <p className="text-sm font-medium text-orbit-200 tabular-nums">0{i + 1}</p>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="How it works" title="From first call to launch day." />
          <Process />
        </div>
      </section>

      <section className="px-6 pb-12">
        <div
          data-reveal
          data-tilt="3"
          className="tilt glow-border mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-[2rem] border border-white/8 bg-gradient-to-br from-ink-800 to-ink-900 p-10 md:flex-row md:items-center md:p-14"
        >
          <div>
            <p className="text-sm text-muted">Pricing</p>
            <p className="mt-1 text-5xl font-semibold tracking-[-0.04em] md:text-6xl">
              <span className="text-gradient">Quoted to fit.</span>
            </p>
            <p className="mt-3 max-w-md text-muted">
              No packages and no surprises. Tell me what you need and you&apos;ll get one fixed price, free.
            </p>
          </div>
          <Link
            href="/services/"
            data-magnetic
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold transition-colors hover:bg-white/5"
          >
            How quotes work
            <span aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>

      {testimonial && <Testimonial {...testimonial} />}
      <CtaBand />
    </Page>
  );
}
