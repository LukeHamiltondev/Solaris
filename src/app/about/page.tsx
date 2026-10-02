import type { Metadata } from "next";
import { about, reasons, site } from "@/content/site";
import { OrbitMark } from "@/components/orbit-mark";
import { PageHero } from "@/components/page-hero";
import { CtaBand, Page } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: `${site.owner} designs and builds custom websites for growing businesses under ${site.name}.`,
};

export default function AboutPage() {
  return (
    <Page>
      <PageHero eyebrow="About" title={about.heading} />
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6 text-xl leading-relaxed text-pretty text-muted md:text-2xl">
            {about.body.map((p, i) => (
              <p key={i} className={`fade-up ${i === 0 ? "text-mist" : ""}`} style={{ animationDelay: `${0.5 + i * 0.12}s` }}>
                {p}
              </p>
            ))}
          </div>
          <div className="fade-up relative mx-auto aspect-square w-full max-w-sm" style={{ animationDelay: "0.4s" }}>
            <div aria-hidden="true" className="absolute inset-[4%] blob text-orbit-500/30" />
            <OrbitMark spin className="relative size-full" />
          </div>
        </div>
      </section>

      <section className="border-t border-white/6 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="heading-sweep text-3xl font-semibold tracking-tight md:text-4xl">How I work</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} data-reveal className="rounded-3xl border border-white/8 bg-ink-900/70 p-7">
                <h3 className="text-lg font-semibold tracking-tight">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </Page>
  );
}
