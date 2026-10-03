import { OrbitMark } from "@/components/orbit-mark";
import { ButtonLink, Page } from "@/components/ui";

export default function NotFound() {
  return (
    <Page>
      <section className="grid min-h-[80svh] place-items-center px-6 pt-32 text-center">
        <div>
          <OrbitMark intro spin className="mx-auto size-32" />
          <h1 className="mt-10 text-4xl font-semibold tracking-tight md:text-5xl">Lost in orbit.</h1>
          <p className="mt-4 text-muted">That page doesn&apos;t exist, or it&apos;s moved.</p>
          <div className="mt-8">
            <ButtonLink href="/">Back to home</ButtonLink>
          </div>
        </div>
      </section>
    </Page>
  );
}
