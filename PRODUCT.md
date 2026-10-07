# Product

<!-- impeccable:product-schema 1 -->

Source: the site plan Luke Hamilton approved on 2026-10-02 (`/mnt/project-files/solaris/site-plan.md`) and his later decisions in the project thread. Facts marked *(default)* were proposed and accepted, not volunteered.

## Platform

web

## Users

Owners and managers of small and growing businesses in Ireland and the UK *(default)* that sell something real: trades, industrial suppliers, manufacturers, local services. Their current website is old, slow, or brings in no work. They arrive comparing a freelancer against a template builder or an agency, often on a phone between jobs, and want to know quickly whether this person can build what they need and what it will take to get a price.

## Product Purpose

Solaris Scaling is Luke Hamilton's one-person web development business. The site exists to show his work and turn visitors into quote requests. Success is a business owner sending the quote form or an email.

## Positioning

Custom-built websites that bring in enquiries, plus the working tools the business runs on (product catalogues, quote baskets, phone-friendly admin panels, AI product assistants), built and supported by the one developer the client talks to. The proof is shipped work, not adjectives: the industrial supplier rebuild.

## Operating Context

- Every project is quoted individually: no packages or published prices (Luke, 2026-10-02). The path is: tell Luke what you need, a short call, a fixed quote with a timeline, 50% to start and 50% at launch.
- Quote requests currently go through a mailto form; a form service is planned.
- Static Next.js site on Cloudflare Pages.

## Capabilities and Constraints

- Builds: business websites, catalogues and shops, custom tools (admin panels, booking/job systems, integrations, imports/exports, automations), care plan (hosting, updates, backups, edits).
- Must stay smooth on phones: Luke rejected an earlier build as laggy on mobile (2026-10-02).
- Respect `prefers-reduced-motion`.
- Undecided: the real domain (placeholder `solarisscaling.com`).

## Brand Commitments

- Name: Solaris Scaling. Logo: an orbit mark (a core and three partial rings) plus the wordmark, files in `public/brand/`. The rings are the identity.
- Colour: purple/violet from the logo (`#d2cefd`, `#b5abfc`, `#9184d9`, `#796cbf`, `#5d5294`). Luke sampled other palettes and chose to keep purple (2026-10-02).
- Luke's own startup intro: the mark grows in, the name is revealed, then both fly into the header logo. Keep it.
- Luke wants motion that impresses ("wow"), but does not want a hero that looks like every AI-generated site (2026-10-02).
- Voice: "we", plain and direct (Luke switched from "I" to "we" on 2026-10-07). Headline "Websites that win you work."

## Evidence on Hand

- Industrial supplier case study (real client, live site; the client asked not to be named, so the site never names them or links to them): 475 products in 153 categories migrated, zero lost URLs, Lighthouse 100, quote basket, phone admin, AI assistant. Screenshots in `public/work/supplier/`.
- No testimonials yet (one from the client is requested). No photo of Luke yet. No other client projects. Do not invent clients, numbers, reviews or prices.

## Product Principles

1. Show the work before describing it.
2. Every page leads to a quote request.
3. Speak as "we" (Luke, 2026-10-07), plainly; no agency jargon.
4. Fast is part of the product: the site itself must prove it on a phone.
