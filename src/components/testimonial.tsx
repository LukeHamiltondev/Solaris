export function Testimonial({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <section className="px-6 py-24">
      <figure data-reveal className="mx-auto max-w-3xl text-center">
        <blockquote className="text-2xl leading-snug font-medium tracking-tight text-balance md:text-3xl">
          <span className="text-orbit-200">&ldquo;</span>
          {quote}
          <span className="text-orbit-200">&rdquo;</span>
        </blockquote>
        <figcaption className="mt-6 text-sm text-muted">
          <span className="font-semibold text-mist">{name}</span>, {role}
        </figcaption>
      </figure>
    </section>
  );
}
