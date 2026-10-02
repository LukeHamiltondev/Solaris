import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { CookieSettingsLink } from "@/components/cookie-banner";
import { Page } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy and cookies",
  description: `How ${site.name} handles your details and which cookies the site uses.`,
};

const sections = [
  {
    heading: "Who I am",
    body: [
      `${site.name} is run by ${site.owner} in Ireland. I'm responsible for any personal details you share through this site. You can reach me at ${site.email}.`,
    ],
  },
  {
    heading: "What I collect",
    body: [
      "When you send the quote form or email me, I get the details you choose to give: usually your name, email address, business and what you need. I use them only to reply, prepare a quote and do the work if you go ahead.",
      "I don't sell or share your details. I keep enquiries for as long as needed to deal with them, and client records for as long as the law requires for accounts.",
    ],
  },
  {
    heading: "Cookies and similar storage",
    body: [
      "Essential: the site remembers in your browser whether you've seen the opening animation and what you chose on the cookie banner. This never leaves your device and isn't used to track you.",
      "Analytics: only if you press “Accept all”. These cookies count visits and show which pages are useful, so I can improve the site. Choosing “Essential only” means none are set.",
    ],
  },
  {
    heading: "Hosting",
    body: [
      "The site is hosted on Cloudflare Pages. Like any web host, Cloudflare processes basic technical data such as your IP address to deliver pages and protect against attacks.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      `You can ask to see, correct or delete the details I hold about you by emailing ${site.email}. If you're unhappy with how I've handled them, you can complain to the Data Protection Commission (dataprotection.ie).`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <Page>
      <PageHero eyebrow="Privacy" title="Privacy and cookies" intro="What happens to your details, in plain English." />
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-2xl space-y-12">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-2xl font-semibold tracking-tight">{s.heading}</h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
          <p className="text-muted">
            You can change your choice at any time:{" "}
            <CookieSettingsLink className="text-orbit-100 underline decoration-orbit-400/50 underline-offset-4" />
            .
          </p>
          <p className="text-sm text-subtle">Last updated 2 October 2026.</p>
        </div>
      </section>
    </Page>
  );
}
