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
        title="Let's build something that works."
        intro="A few lines is plenty. I reply within one working day."
      />
      <section className="px-6 pb-32">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="fade-up" style={{ animationDelay: "0.7s" }}>
            <ContactForm />
          </div>
          <aside className="fade-up space-y-8 lg:pt-6" style={{ animationDelay: "0.85s" }}>
            <div>
              <h2 className="text-[15px] font-semibold text-mist">Prefer email?</h2>
              <a href={`mailto:${site.email}`} className="mt-2 block text-lg break-all text-orbit-100 underline decoration-orbit-400/50 underline-offset-4 hover:decoration-orbit-100">
                {site.email}
              </a>
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-mist">What happens next</h2>
              <ol className="mt-4 space-y-4 text-[15px] text-muted">
                <li><span className="text-mist">1.</span> I reply within a day.</li>
                <li><span className="text-mist">2.</span> We have a short call.</li>
                <li><span className="text-mist">3.</span> You get a fixed quote.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </Page>
  );
}
