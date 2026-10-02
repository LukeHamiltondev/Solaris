import type { Metadata } from "next";
import { site } from "@/content/site";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { Page } from "@/components/ui";

export const metadata: Metadata = {
  title: "Get a quote",
  description: "Tell me about your business and your website, and I'll come back with ideas and a fixed quote.",
};

export default function ContactPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Get a quote"
        title="Let's build something that works."
        intro="Tell me a little about your business. I'll get back to you within one working day with ideas and a clear, fixed quote."
      />
      <section className="px-6 pb-32">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="fade-up" style={{ animationDelay: "0.7s" }}>
            <ContactForm />
          </div>
          <aside className="fade-up space-y-8 lg:pt-6" style={{ animationDelay: "0.85s" }}>
            <div>
              <h2 className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">Prefer email?</h2>
              <a href={`mailto:${site.email}`} className="mt-3 block text-lg break-all text-orbit-100 hover:underline">
                {site.email}
              </a>
            </div>
            <div>
              <h2 className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">What happens next</h2>
              <ol className="mt-4 space-y-4 text-[15px] text-muted">
                <li><span className="text-mist">1.</span> I read your message and reply within one working day.</li>
                <li><span className="text-mist">2.</span> We have a short call about your business and goals.</li>
                <li><span className="text-mist">3.</span> You get a plan and a fixed quote. No obligation.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </Page>
  );
}
