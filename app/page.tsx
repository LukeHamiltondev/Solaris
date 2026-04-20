import { BookingConsultationAgent } from "./components/BookingConsultationAgent";
import { Hero } from "./components/Hero";

export default function HomePage() {
  return (
    <main className="bg-neutral-950 text-neutral-50">
      <Hero />

      <div className="mx-auto max-w-3xl px-4 pb-20 pt-24 md:px-6 md:pt-28">
        <section className="space-y-4 text-center">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-50 sm:text-2xl">
            Your site sends people to book. You stay on the floor.
          </h2>
          <p className="text-sm text-neutral-400 sm:text-base">
            Fast pages, your prices, booking in the tools you already use, and
            an AI assistant on your site and DMs so fewer messages stall on
            &quot;you open?&quot;
          </p>
        </section>

        <section
          id="services"
          className="mt-16 scroll-mt-28 border-t border-neutral-800 pt-14"
        >
          <h2 className="text-center text-sm font-medium text-neutral-400">
            Included
          </h2>
          <ul className="mx-auto mt-8 max-w-md space-y-4 text-center text-sm text-neutral-300">
            <li className="border-b border-neutral-800 pb-4">
              <span className="font-medium text-neutral-100">Site</span>
              <br />
              <span className="text-neutral-500">
                A few pages, mobile first, book buttons up front.
              </span>
            </li>
            <li className="border-b border-neutral-800 pb-4">
              <span className="font-medium text-neutral-100">Booking</span>
              <br />
              <span className="text-neutral-500">
                Hooked to Fresha, Booksy, Calendly, or what you use.
              </span>
            </li>
            <li className="border-b border-neutral-800 pb-4">
              <span className="font-medium text-neutral-100">AI assistant</span>
              <br />
              <span className="text-neutral-500">
                Trained on your services, hours, and policies. Handles FAQs and
                points clients to your booking link.
              </span>
            </li>
            <li>
              <span className="font-medium text-neutral-100">Ads</span>
              <br />
              <span className="text-neutral-500">
                Basic Meta setup so locals can find you.
              </span>
            </li>
          </ul>
        </section>

        <section
          id="book"
          className="mt-16 scroll-mt-28 rounded-2xl border border-neutral-800 bg-neutral-900/40 px-4 py-8 text-center sm:px-6 sm:py-10"
        >
          <h2 className="text-lg font-semibold text-neutral-50">
            Book a consultation
          </h2>
          <BookingConsultationAgent />
        </section>
      </div>
    </main>
  );
}
