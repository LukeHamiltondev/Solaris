import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { BrowserFrame, CtaBand, Page } from "@/components/ui";

export const metadata: Metadata = {
  title: "Work",
  description: "Websites I've designed and built, and what they do for the businesses behind them.",
};

export default function WorkPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Work"
        title="Sites that do a job."
        intro="Every project starts with how the business wins customers, then builds the site around it."
      />
      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-6xl gap-6">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}/`}
              data-reveal
              data-tilt="3"
              className="tilt glow-border group grid items-center gap-10 rounded-[2rem] border border-white/8 bg-ink-900/70 p-6 md:p-10 lg:grid-cols-[1fr_1.4fr]"
            >
              <div className="order-2 lg:order-1">
                <p className="text-sm text-orbit-200">Case study</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{p.client}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{p.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 inline-flex items-center gap-2 font-semibold text-orbit-100">
                  Read the case study
                  <span aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <BrowserFrame>
                  <Image
                    src={p.image}
                    alt="The supplier’s new website"
                    width={1440}
                    height={900}
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
                  />
                </BrowserFrame>
              </div>
            </Link>
          ))}

          <Link
            href="/contact/"
            data-reveal
            className="group relative grid place-items-center overflow-hidden rounded-[2rem] border border-dashed border-white/15 px-6 py-20 text-center transition-colors hover:border-orbit-400/60"
          >
            <div>
              <p className="text-sm text-muted">Your business here</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Your project could be <span className="text-gradient">next.</span>
              </p>
              <p className="mt-6 inline-flex items-center gap-2 font-semibold text-orbit-100">
                Start a project
                <span aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                  →
                </span>
              </p>
            </div>
          </Link>
        </div>
      </section>
      <CtaBand />
    </Page>
  );
}
