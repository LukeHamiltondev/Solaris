---
name: Solaris Scaling
description: One developer's custom websites and business tools, shown on a dark ink ground under the logo's violet orbits.
colors:
  orbit-100: "#d2cefd"
  orbit-200: "#b5abfc"
  orbit-400: "#9184d9"
  orbit-500: "#796cbf"
  orbit-700: "#5d5294"
  ink-950: "#0b0b10"
  ink-900: "#0f0f14"
  ink-800: "#17171f"
  ink-700: "#22222d"
  ink-600: "#33333f"
  mist: "#e9e9ed"
  muted: "#a3a3b2"
  subtle: "#8c8ca0"
  graphite: "#292b31"
typography:
  display:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3rem, 7.4vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.04em"
    fontFeature: "\"cv11\", \"ss01\""
  display-page:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 6.5vw, 5rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.025em"
  body-lead:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.5
  caption:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
rounded:
  pill: "9999px"
  frame: "0.75rem"
  card: "1.5rem"
  card-lg: "2rem"
  phone: "2.6rem"
  phone-screen: "2.1rem"
spacing:
  gutter: "1.5rem"
  section: "7rem"
  section-md: "9rem"
  container: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.orbit-200}"
    textColor: "{colors.ink-950}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.orbit-100}"
    textColor: "{colors.ink-950}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.mist}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  chip-need:
    backgroundColor: "transparent"
    textColor: "{colors.mist}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  card:
    backgroundColor: "{colors.ink-900}"
    rounded: "{rounded.card}"
    padding: "32px"
  phone-frame:
    backgroundColor: "{colors.ink-800}"
    rounded: "{rounded.phone}"
    padding: "8px"
    width: "16.5rem"
    height: "31rem"
  nav-link:
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
---

# Design System: Solaris Scaling

## Overview

**Creative North Star: "The Orbit Around the Work"**

Solaris Scaling lives on a near-black ink ground, lit only by the logo's own violet. The identity is the orbit mark (a core and three partial rings), and the system grows out of it: the same three rings, with the same dash patterns and rotations, appear at 32px in the header and at viewport-bleeding scale in the home hero, where the core is a phone running a real client's admin screen. The proof sits at the centre; the brand circles it.

The surface is calm and dark so violet can do all the emphasis work. Type is Inter (the logo's typeface), set large, tight and semibold for headlines, and plain for body copy in a soft grey. Depth comes from tonal ink steps, hairline white borders, and long, soft drop shadows under device frames, never from coloured glows in the hero's vocabulary. Motion is slow and continuous on desktop (orbits turning over 70 to 160 seconds), still on phones, and absent under reduced motion; the site must stay smooth on a phone.

The home hero (`src/components/hero.tsx`) is the newest and most deliberate expression of the world. Several older sections below it still carry an earlier vocabulary; see "Known drift" under Do's and Don'ts.

**Key Characteristics:**
- Near-black ink ground (ink-950) with tonal ink steps for surfaces.
- One accent family: the logo's five violets, used solid.
- The orbit rings as the signature device, from logo scale to viewport scale.
- Inter throughout, tight negative tracking on display sizes.
- Pills for every interactive control; large soft radii for frames and cards.
- Real work shown in code-rendered device frames, not decorative illustration.

## Colors

A single violet family taken from the logo, set against near-black ink and cool grey text.

### Primary
- **Pale Orbit Violet** (orbit-200): the action and emphasis colour. Primary button fill, the hero headline's emphasised phrase (solid, not gradient), chip hover borders, the focus ring, link-underline hovers.
- **Moonlit Lavender** (orbit-100): the innermost ring (`--ring-1`), the logo core, and the primary button's hover fill.

### Secondary
- **Dusk Violet** (orbit-400): the middle ring (`--ring-2`) and quiet underline decoration on text links (at 60% opacity).
- **Deep Orbit Violet** (orbit-500): the outer ring (`--ring-3`) and text selection background.
- **Night Violet** (orbit-700): the darkest violet; currently used only by the older blob glows (drift).

### Neutral
- **Ink Black** (ink-950): page ground, the ink-plate pools, and text on violet buttons.
- **Ink** (ink-900): card surfaces (at 70% opacity) and the glass header base.
- **Raised Ink** (ink-800): device frames (phone and browser bezels).
- **Ink Line** (ink-700, ink-600): available tonal steps for deeper layering.
- **Mist** (mist): headings, primary text, chip and link text.
- **Muted Grey** (muted): body and lead paragraphs, inactive nav links.
- **Subtle Grey** (subtle): captions, footer column labels, URL bars.
- **Graphite** (graphite): the startup intro backdrop start (`--intro-from`, paired with `#161826`).
- **Hairlines**: white at 6 to 15% opacity for borders (`white/8` on cards, `white/15` on chips, ghost buttons and the phone bezel).

### Named Rules
**The Logo Palette Rule.** Every chromatic colour on the site comes from the logo's five violets. No second hue enters the brand layer; the only exceptions are client artefacts rendered inside device frames (the client admin's own white and navy), which belong to the client, not to Solaris.

**The Solid Emphasis Rule.** Emphasis inside a headline is a solid colour change to orbit-200. The violet is strong enough on ink to carry the stress alone.

## Typography

**Display Font:** Inter (self-hosted variable, with Helvetica Neue, Arial fallback)
**Body Font:** Inter
**Label Font:** Inter

**Character:** One typeface, the logo's own, doing everything through size, weight and tracking. Stylistic sets `cv11` and `ss01` are on globally for Inter's single-storey a and open digits.

### Hierarchy
- **Display** (600, clamp(3rem, 7.4vw, 6rem), 0.95): the home hero headline only. Balanced wrapping; the final phrase may take orbit-200.
- **Display, inner pages** (600, clamp(2.75rem, 6.5vw, 5rem), 1): page-hero headlines on About, Services, Work, Contact.
- **Headline** (600, 2.25rem rising to 3rem at md, -0.03em): section headings.
- **Title** (600, 1.125 to 1.25rem, tight tracking): card and step titles.
- **Body lead** (400, 1.125rem rising to 1.25rem, 1.625, muted): the paragraph under a display or headline; capped near 34rem in the hero, 42rem elsewhere.
- **Body** (400, 1rem or 15px, 1.625, muted): card copy and running text.
- **Label** (600, 15px): buttons and the hero text link. Chips use 15px at 400.
- **Caption** (400, 0.875rem; 0.75rem for the fine print, subtle): figure captions and demo disclaimers.
- **Column label** (500, 0.75rem, 0.18em tracking, uppercase, subtle): footer column headings only, where they label a list of links.

### Named Rules
**The Tight Display Rule.** Display sizes track at -0.04em and headlines at -0.03em; body copy keeps Inter's default tracking.

## Layout

A single centred container (max 72rem) with 1.5rem side gutters. Sections breathe on a 7rem vertical rhythm, rising to 9rem from md. The home hero fills the viewport on large screens (`min-height: 100svh`, content vertically centred) on an asymmetric two-column grid (1.1fr copy, 0.9fr phone, 2.5rem gap); below lg it stacks, copy and choices first, the phone directly below. The hero's top padding (8rem, 9rem at md) clears the fixed header.

Section bodies use 3-column card grids at md, and a 1fr / 1.3fr split with a sticky heading at lg for the "Why" section. Breakpoints are Tailwind's defaults (sm 640, md 768, lg 1024); lg (1024px) is also the line where the hero's orbits start turning and the outer two rings appear.

## Elevation & Depth

Depth is tonal first: ink-950 ground, ink-900 cards, ink-800 bezels, separated by hairline white borders. Shadows are reserved for objects that sit physically above the page (device frames, the primary button, the scrolled header) and are always long, soft and black, never coloured. The fixed header turns into frosted glass once the page scrolls (blur 16px, ink-900 at 72%), swapped for a near-opaque solid on phones because live blur costs frames there.

### Shadow Vocabulary
- **Device drop** (`box-shadow: 0 50px 100px -30px rgb(0 0 0 / 0.85)` on the hero phone; `0 40px 100px -20px` / `0 40px 120px -30px` on PhoneFrame and BrowserFrame): grounds a device frame on the ink.
- **Button lift** (`box-shadow: 0 14px 32px -14px rgb(0 0 0 / 0.7)`): under the primary button only.
- **Header float** (Tailwind `shadow-2xl` at black/40): the header pill once scrolled.

### Named Rules
**The Ink Plate Rule.** Where large orbits pass behind small copy (paragraphs, choices, buttons, captions), that copy sits on an ink pool: a radial gradient of ink-950 (solid to 72%, fading out) extending 1.5rem above and below and 2.5rem to the sides, or for a caption a rounded (0.75rem) ink-950 plate at 85%. Rings may cross a display headline; they never cross body text or controls.

**The Black Shadow Rule.** Shadows are black and soft. Colour belongs to strokes and fills, not to light.

## Shapes

Two shape families. Everything interactive is a full pill (buttons, need chips, nav links and their sliding highlight, the header bar itself). Everything that holds content is a large soft rectangle: cards at 1.5rem to 2rem (1.75rem on Services), browser frames at 0.75rem, the phone at 2.6rem with a 2.1rem screen inset by 8px. Circles appear only as the orbit rings and the logo core.

The orbit ring is the system's signature geometry: a circle drawn with `pathLength=100`, a rounded-cap dash pattern (ring 1 `62 38` rotated 200deg, ring 2 `70 30` at 250deg, ring 3 `78 22` at 300deg), and a non-scaling hairline stroke (1 to 1.5px) whatever its size.

## Components

### Buttons
Confident pills with a trailing arrow that nudges forward on hover.
- **Shape:** full pill (9999px).
- **Primary:** orbit-200 fill, ink-950 text, 15px semibold, 14px by 24px padding, arrow icon at 16px, button-lift shadow. Hover fills orbit-100; a white sheen (35%) sweeps across once over 0.8s on the expo ease.
- **Ghost:** transparent with a white/15 hairline and mist text; hover raises the border to white/30 and adds a white/5 wash.
- **Focus:** global 2px orbit-200 outline, 3px offset.
- **Text link (hero secondary action):** mist 15px semibold with an orbit-400/60 underline at a 6px offset, brightening to orbit-100 on hover.

### Chips (need choices)
- **Style:** pill, white/15 hairline, mist text at 15px, 10px by 16px padding. Each opens the quote form preset to that need.
- **State:** hover turns the border orbit-200 and adds an orbit-200/10 wash. Introduced by a plain mist question in sentence case ("What do you need?"), not a kicker.

### Cards / Containers
- **Corner Style:** 1.5rem (home builds), 1.75rem (services), 2rem (work list, closing band).
- **Background:** ink-900 at 70%, or ink-950 at 60% on a tinted section.
- **Shadow Strategy:** none at rest (see Elevation).
- **Border:** white/8 hairline.
- **Internal Padding:** 28 to 40px.
- **Behaviour:** on fine pointers, cards tilt toward the cursor (3 to 6 degrees) and show a cursor-following orbit-200 rim with a faint orbit-500 wash on hover.

### Navigation
A floating pill header, transparent at the top of the page, contracting into a glass pill (max 56rem) on scroll. Logo mark plus wordmark (17px, regular) on the left; nav links 14px in muted, mist when hovered or current, with a white/8 pill that slides between them on the expo ease; a small primary "Get a quote" pill on the right. On phones a 44px round menu button opens a full-screen ink-950 (97%) menu of 2.25rem semibold links that rise in on a stagger.

### Device frames
- **Phone:** ink-800 bezel (ink-900 in PhoneFrame), white/15 hairline, 8px inset, black dynamic-island pill. The hero's phone holds a live, code-rendered client admin.
- **Browser:** ink-800, 0.75rem corners, a white/8-ruled title bar with three white/15 dots and an optional URL pill.

### Hero Orbits (signature)
The logo's three rings, centred on the phone, sized `max(24rem, 72vmin)`, `max(56rem, 112vmin)` and `max(76rem, 152vmin)`, stroked in ring-1/2/3 at 90/70/50% opacity, bleeding past the viewport on purpose. On desktop they turn at 70s, 110s and 160s per revolution (transform only); on phones and touch devices they stand still and only the inner ring shows; under reduced motion they never move. When the demo's save lands, the inner ring brightens to full opacity and doubles its stroke over 700ms.

### Drawn Icons
A small 24px line set drawn in code (`src/components/icons.tsx`): 1.6 stroke, round caps and joins, `currentColor`. Used inline beside text (button arrows, external-link marks, check lists).

## Do's and Don'ts

### Do:
- **Do** put the emphasis in a headline in solid orbit-200 (The Solid Emphasis Rule).
- **Do** reuse the logo's ring geometry (same dash patterns and rotations) whenever orbits appear, at any scale, with non-scaling hairline strokes.
- **Do** sit small copy and controls on an ink plate wherever orbits pass behind them (The Ink Plate Rule).
- **Do** stop continuous motion below 1024px and on touch devices, and stop all motion under `prefers-reduced-motion`.
- **Do** show real client work inside device frames; let a client artefact keep its own colours inside the frame.
- **Do** make every interactive control a pill, and keep focus visible with the 2px orbit-200 outline.

### Don't:
- **Don't** introduce a hue outside the logo's five violets in the brand layer (The Logo Palette Rule).
- **Don't** use coloured glow shadows or blurred colour blobs for depth; shadows are soft and black (The Black Shadow Rule). The startup intro is the one exception: Luke's mark-and-name reveal keeps its own soft orbit-400 halo and lit reveal line, scoped to the intro.
- **Don't** run orbit strokes through body text, choices or buttons.
- **Don't** use `filter: blur()` or live `backdrop-filter` on surfaces that scroll on phones.
- **Don't** set display type at default tracking; it goes to -0.04em.

### Known drift (recorded, not canonized)
Sections below the hero, built before it, still use devices the hero moved away from. They are listed here so new surfaces do not copy them; they are not part of the system.
- **Eyebrow kickers with glow dots** (`Eyebrow` in `ui.tsx`, via `SectionHeading`, `PageHero`, `Showcase` and the client case study): small uppercase violet labels over headings, each with a glowing dot.
- **Gradient text** (`.text-gradient`): the CTA band's "Let's talk.", the home closing band, the Work page's "next.", the mobile menu's "Get a quote"; and the related `.heading-sweep` clipped-gradient sheen on section headings.
- **Colour blobs** (`.blob` at orbit-500/700): behind page heroes, the showcase, the home "Why" section, the CTA band and the About portrait.
- **Icon tiles** (home "What I build" cards): icons boxed in violet-tinted rounded squares.
- **Glow line** (process timeline): a gradient line with an orbit-400 glow shadow.
