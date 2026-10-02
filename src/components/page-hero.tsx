import { Rings } from "./ui";

/**
 * The opening of every inner page: a display headline and an intro, with the logo's orbits rising
 * from the right edge the way they circle the phone on the home page.
 */
export function PageHero({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="relative px-6 pt-40 pb-16 md:pt-48 md:pb-20">
      {/* The rings fade out toward the content below instead of stopping at a hard edge. */}
      <div aria-hidden="true" className="absolute inset-0 hidden overflow-hidden [mask-image:linear-gradient(to_bottom,#000_45%,transparent_92%)] md:block">
        <Rings sizes={["34rem", "54rem", "74rem"]} className="top-[60%] right-0" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <h1
          className="fade-up max-w-4xl text-[clamp(2.75rem,6.5vw,5rem)] leading-[1] font-semibold tracking-[-0.04em] text-balance"
          style={{ animationDelay: "0.1s" }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="ink-plate fade-up mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-muted md:text-xl"
            style={{ animationDelay: "0.35s" }}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
