import type { Metadata } from "next";
import Image from "next/image";
import { testimonial, caseStudy } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { Testimonial } from "@/components/testimonial";
import { BrowserFrame, CtaBand, Eyebrow, Page, PhoneFrame, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Industrial supplier case study",
  description:
    "How an Irish industrial supplier's 475-product catalogue was rebuilt into a fast site with a quote basket, AI assistant and phone-friendly admin panel.",
};

// Text beside a wide screenshot or a phone, swapping sides on every other feature.
const layout = (kind: string, flipped: boolean) =>
  kind === "phone"
    ? flipped
      ? "md:grid-cols-[1fr_1.2fr]"
      : "md:grid-cols-[1.2fr_1fr]"
    : flipped
      ? "lg:grid-cols-[1.5fr_1fr]"
      : "lg:grid-cols-[1fr_1.5fr]";

export default function CaseStudy() {
  return (
    <Page>
      <PageHero eyebrow="Case study" title="A 475-product catalogue, rebuilt" intro={caseStudy.intro} />

      <section className="px-6">
        <div className="mx-auto max-w-6xl">
          <dl className="fade-up grid grid-cols-2 gap-x-6 gap-y-4 border-y border-white/8 py-6 text-sm md:grid-cols-4" style={{ animationDelay: "0.9s" }}>
            <div>
              <dt className="text-subtle">Client</dt>
              <dd className="mt-1">{caseStudy.client}</dd>
            </div>
            <div>
              <dt className="text-subtle">Location</dt>
              <dd className="mt-1">{caseStudy.location}</dd>
            </div>
            <div className="col-span-2 md:col-span-1">
              <dt className="text-subtle">Industry</dt>
              <dd className="mt-1">{caseStudy.industry}</dd>
            </div>
          </dl>

          <div className="fade-up relative mt-14" style={{ animationDelay: "1s" }}>
            <BrowserFrame>
              <Image
                src="/work/supplier/home-desktop.webp"
                alt="The supplier’s new homepage"
                width={1440}
                height={900}
                priority
                sizes="(min-width: 1152px) 1152px, 100vw"
              />
            </BrowserFrame>
            <div className="absolute -right-3 -bottom-10 w-[24%] max-w-52 md:-right-8">
              <PhoneFrame>
                <Image src="/work/supplier/home-mobile.webp" alt="The homepage on a phone" width={780} height={1688} sizes="210px" />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pt-32 pb-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
          {caseStudy.stats.map((s) => (
            <div key={s.label} data-reveal className="rounded-3xl border border-white/8 bg-ink-900/70 p-6 md:p-8">
              <p className="text-5xl font-semibold tracking-[-0.04em] text-orbit-100 tabular-nums md:text-6xl">
                <span data-count={s.value}>{s.value}</span>
              </p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="What I built" title="Built around how industrial buyers actually buy." />
          <div className="mt-20 space-y-28 md:space-y-40">
            {caseStudy.features.map((f, i) => (
              <article key={f.title} className={`grid items-center gap-10 md:gap-16 ${layout(f.kind, i % 2 === 1)}`}>
                <div data-reveal className={i % 2 ? (f.kind === "phone" ? "md:order-2" : "lg:order-2") : ""}>
                  <p className="text-sm font-medium text-orbit-200 tabular-nums">0{i + 1}</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight text-balance">{f.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{f.body}</p>
                </div>
                <div data-reveal className={i % 2 ? (f.kind === "phone" ? "md:order-1" : "lg:order-1") : ""}>
                  {f.kind === "phone" ? (
                    <PhoneFrame className="mx-auto w-full max-w-72">
                      <Image src={f.image} alt={f.title} width={780} height={1688} sizes="288px" />
                    </PhoneFrame>
                  ) : (
                    <BrowserFrame>
                      <Image src={f.image} alt={f.title} width={1440} height={900} sizes="(min-width: 1024px) 680px, 100vw" />
                    </BrowserFrame>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/6 bg-ink-900/50 px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div data-reveal>
            <Eyebrow>Under the hood</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight">Quality checks on every change</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              The site is fully static, so pages load instantly. Every change runs automated Lighthouse quality gates and
              visual tests before it goes live, so nothing breaks quietly.
            </p>
          </div>
          <ul data-reveal className="flex flex-wrap content-start gap-2.5">
            {caseStudy.stack.map((t) => (
              <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {testimonial && <Testimonial {...testimonial} />}

      <CtaBand />
    </Page>
  );
}
