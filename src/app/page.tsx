import { builds, testimonial } from "@/content/site";
import { Hero } from "@/components/hero";
import { Showcase } from "@/components/showcase";
import { Process } from "@/components/process";
import { ButtonLink, CtaBand, Page, SectionHeading, TextLink } from "@/components/ui";
import { Testimonial } from "@/components/testimonial";

export default function HomePage() {
  return (
    <Page>
      <Hero />
      <Showcase />

      <section className="px-6 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="What we build." />
          {/* One row per kind of build, each ending in the quote form preset to it, like the hero's choices. */}
          <ul className="mt-16 border-b border-white/12">
            {builds.map((b) => (
              <li
                key={b.title}
                data-reveal
                className="grid gap-4 border-t border-white/12 py-9 md:grid-cols-[1fr_1.3fr_auto] md:items-baseline md:gap-10 md:py-11"
              >
                <h3 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{b.title}</h3>
                <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted">{b.body}</p>
                <TextLink href={`/contact/?need=${encodeURIComponent(b.need)}`} className="justify-self-start">
                  Quote for this
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="From first call to launch day." />
          <Process />
        </div>
      </section>

      <section className="px-6 pb-12">
        <div
          data-reveal
          className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-[2rem] border border-white/8 bg-ink-900/70 p-8 sm:p-10 md:flex-row md:items-center md:p-14"
        >
          <div>
            <h2 className="text-[2.75rem] leading-none font-semibold tracking-[-0.04em] sm:text-5xl md:text-6xl">
              Quoted <span className="whitespace-nowrap text-orbit-200">to fit.</span>
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
              No packages. One fixed price, free.
            </p>
          </div>
          <ButtonLink href="/services/" variant="ghost">
            How quotes work
          </ButtonLink>
        </div>
      </section>

      {testimonial && <Testimonial {...testimonial} />}
      <CtaBand />
    </Page>
  );
}
