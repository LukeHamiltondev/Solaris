import type { Metadata } from "next";
import { about, reasons, site } from "@/content/site";
import { OrbitMark } from "@/components/orbit-mark";
import { PageHero } from "@/components/page-hero";
import { CtaBand, Page, PointList, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: `${site.owner} designs and builds custom websites for growing businesses under ${site.name}.`,
};

export default function AboutPage() {
  return (
    <Page>
      <PageHero title={about.heading} />
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
            <OrbitMark spin className="relative size-full" />
          </div>
        </div>
      </section>

      <section className="border-t border-white/6 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="How we work" />
          <PointList items={reasons} className="mt-12 lg:grid-cols-4" />
        </div>
      </section>
      <CtaBand />
    </Page>
  );
}
