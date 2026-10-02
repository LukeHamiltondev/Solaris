import { Eyebrow } from "./ui";

/** The opening of every inner page: eyebrow, a headline that rises in word by word, and an intro. */
export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  const words = title.split(" ");
  return (
    <section className="relative px-6 pt-40 pb-16 md:pt-48 md:pb-20">
      <div aria-hidden="true" className="absolute -top-60 left-1/2 size-[48rem] -translate-x-1/2 blob text-orbit-700/20" />
      <div className="relative mx-auto max-w-6xl">
        <div className="fade-up" style={{ animationDelay: "0.05s" }}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6.5vw,5rem)] leading-[1] font-semibold tracking-[-0.04em] text-balance">
          {words.map((word, i) => (
            <span key={i}>
              <span className="word-rise" style={{ animationDelay: `${0.12 + i * 0.07}s` }}>
                {word}
              </span>
              {i < words.length - 1 && " "}
            </span>
          ))}
        </h1>
        {intro && (
          <p
            className="fade-up mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-muted md:text-xl"
            style={{ animationDelay: `${0.25 + words.length * 0.07}s` }}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
