# Solaris Scaling

The website for Solaris Scaling, Luke Hamilton's web design and development business. Built with Next.js (App Router), TypeScript, Tailwind CSS, GSAP and Lenis, and exported as a static site for Cloudflare Pages.

## Editing the site

All of the words live in [`src/content/site.ts`](src/content/site.ts): headline, services, prices, FAQ, about text, projects and the Wixted Engineering case study. Change them there and the pages update.

- Pages: `src/app` (`page.tsx` is home; `work`, `services`, `about`, `contact`)
- Colours and fonts: the `@theme` block in `src/app/globals.css`, taken from the logo files in `public/brand`
- Case study screenshots: `public/work/wixted`
- Client testimonial: set `testimonial` in `src/content/site.ts` and it appears on the home page and case study

## Animation

- **Hero:** the orbit mark draws itself on and the headline rises in word by word. Both are plain CSS, so they play before any JavaScript loads. Then the rings keep turning, tilt toward the cursor, and a glow follows it over a canvas starfield (`src/components/hero.tsx`, `starfield.tsx`).
- **Scrolling:** Lenis smooth scrolling and GSAP ScrollTrigger, wired up once in `src/components/motion.tsx`. Pages opt in with attributes: `data-reveal` (fade and rise in), `.heading-sweep` (sheen across a heading), `data-count` (count up), `data-magnetic` (buttons drift toward the cursor), `data-tilt` (cards tilt and glow).
- **Featured work:** pins on large screens while the Wixted homepage scrolls inside the browser frame (`src/components/showcase.tsx`).
- **Page changes:** React `<ViewTransition>` fades pages in and out; the header stays put and the logo turns once.
- **Reduced motion:** visitors who ask their device for less motion get everything shown instantly with nothing moving.

Animations only touch `transform`, `opacity` and `filter`, cursor effects are skipped on touch screens, and the site scores 99–100 on Lighthouse.

## Contact form

The site has no server, so the quote form opens the visitor's email app with their answers filled in. Swap `send` in `src/components/contact-form.tsx` for a form service to receive enquiries directly.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm run lint
npm run typecheck
```

## Deploying

Cloudflare Pages builds with `npm run build` and serves `out/` (see `wrangler.toml`). Set the real domain in `site.url` in `src/content/site.ts`; it's used for the sitemap and social previews.
