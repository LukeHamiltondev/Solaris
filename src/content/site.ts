// All of the site's words live here, so copy can change without touching layout code.

export const site = {
  name: "Solaris Scaling",
  owner: "Luke Hamilton",
  url: "https://solarisscaling.com",
  email: "lukehamo15@gmail.com",
  github: "https://github.com/LukeHamiltondev",
  description:
    "Fast, custom websites for growing businesses, with the quote forms, catalogues and admin tools that turn visitors into customers.",
} as const;

export const nav = [
  { label: "Work", href: "/work/" },
  { label: "Services", href: "/services/" },
  { label: "About", href: "/about/" },
] as const;

export const hero = {
  eyebrow: "Web design & development",
  headline: "Websites that win you work.",
  sub: "I design and build fast, custom websites for growing businesses, with the quote forms, catalogues and admin tools that turn visitors into customers.",
} as const;

export const builds = [
  {
    title: "Business websites",
    body: "Custom-designed, mobile-first sites with a clear next step on every page: call, quote or enquire.",
    icon: "site",
  },
  {
    title: "Catalogues & quote systems",
    body: "Hundreds of products, search, and a quote basket that matches how your customers actually buy.",
    icon: "catalogue",
  },
  {
    title: "Admin tools & AI assistants",
    body: "Update products, stock and prices from your phone, and let an assistant answer questions around the clock.",
    icon: "tools",
  },
] as const;

export const reasons = [
  {
    title: "Built to win work",
    body: "Not just a nice-looking page. Every section is there to move a visitor one step closer to contacting you.",
  },
  {
    title: "Fast and found",
    body: "Hand-written code, top Lighthouse scores and proper SEO. Moving from an old site? Your Google rankings come with you.",
  },
  {
    title: "You can run it yourself",
    body: "A simple admin panel for the things that change, built for your phone, so you're never waiting on a developer.",
  },
  {
    title: "One person, start to finish",
    body: "You talk to the person building your site. No account managers, no handoffs, no surprises.",
  },
] as const;

export const steps = [
  { title: "Call", body: "A short chat about your business, your customers and what the site needs to do." },
  { title: "Plan & quote", body: "A clear plan and a fixed price before any work starts." },
  { title: "Design & build", body: "You see progress as it happens and get two rounds of changes built in." },
  { title: "Launch & support", body: "I put it live, set up analytics, and stay on hand afterwards." },
] as const;

// What's on offer. There are no fixed packages: every project gets its own quote.
export const services = [
  {
    name: "Business websites",
    need: "A new website",
    for: "New and growing businesses",
    features: [
      "Custom, mobile-first design",
      "Contact, quote or booking forms",
      "Editable pages and blog",
      "SEO and analytics set up",
      "Google Business profile help",
    ],
  },
  {
    name: "Catalogues & shops",
    need: "A catalogue or shop",
    for: "Businesses with lots of products",
    features: [
      "Searchable product catalogue",
      "Quote basket or online checkout",
      "Phone-friendly admin panel",
      "Moving products from your old site",
      "AI product assistant",
    ],
  },
  {
    name: "Custom tools",
    need: "A custom tool",
    for: "Work your website could take on",
    features: [
      "Admin panels and dashboards",
      "Booking and job systems",
      "Integrations with tools you use",
      "Spreadsheet imports and exports",
      "Automations that save hours",
    ],
  },
] as const;

export const quoteSteps = [
  { title: "Tell me what you need", body: "Fill in the form or send an email. A few lines is plenty." },
  { title: "Quick call", body: "We talk through your business, your customers and what the site has to do." },
  { title: "Fixed quote", body: "You get one clear price and a timeline, free and with no obligation." },
] as const;

export const carePlan = {
  name: "Care plan",
  body: "Hosting, updates, backups, small content edits and a monthly health check, so you never have to think about it. Add it to any project.",
} as const;

export const faqs = [
  {
    q: "How much does a website cost?",
    a: "Every project is different, so I quote each one rather than squeezing it into a package. Tell me what you need and you'll get a fixed price, free and with no obligation.",
  },
  {
    q: "How long does it take?",
    a: "Most sites take 2 to 6 weeks, depending on what they need to do. You'll get a timeline with your quote.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. The code, the content and the domain are yours.",
  },
  {
    q: "Can I edit it myself?",
    a: "Yes. Anything that changes often, like products, prices or posts, gets a simple admin screen that works on your phone.",
  },
  {
    q: "I already have a website. Can you move it over?",
    a: "Yes. I'll move your content across and keep your old page addresses working, so you don't lose your place on Google.",
  },
  {
    q: "How does payment work?",
    a: "50% to start and 50% at launch. Your quote is fixed before any work begins, so the price won't creep.",
  },
] as const;

export const enquiryTypes = [...services.map((s) => s.need), "Not sure yet"] as const;

export const about = {
  heading: "Hi, I'm Luke.",
  body: [
    "I build websites for businesses that want their site to do a job: bring in calls, quotes and customers.",
    "I write every site by hand rather than starting from a template. That's what makes them fast, easy to find on Google, and shaped around how your customers actually buy.",
    "When you work with Solaris Scaling, you work with me directly, from the first call to launch day and after.",
  ],
} as const;

// A short quote from a client, shown on the home page and case study when set.
export const testimonial: { quote: string; name: string; role: string } | null = null;

export const projects = [
  {
    slug: "wixted-engineering",
    client: "Wixted Engineering",
    summary: "An industrial supplier's 475-product catalogue, rebuilt to be fast, searchable and easy to quote from.",
    tags: ["Next.js", "Product catalogue", "Quote basket", "Admin panel", "AI assistant"],
    image: "/work/wixted/home-desktop.webp",
    url: "https://www.wixtedengineering.ie",
  },
] as const;

export const wixted = {
  client: "Wixted Engineering Services Ltd",
  location: "Limerick, Ireland",
  industry: "Industrial supplies: valves, actuation, gaskets and clamps",
  url: "https://www.wixtedengineering.ie",
  intro:
    "Wixted Engineering has supplied Ireland's power, food, pharmaceutical and manufacturing plants since 2012. Their old WooCommerce site was slow and hard to keep up to date, and it didn't match how their customers buy: engineers asking for prices on a list of parts.",
  stats: [
    { value: 475, suffix: "", label: "Products moved across" },
    { value: 153, suffix: "", label: "Categories, all kept" },
    { value: 100, suffix: "", label: "Lighthouse score" },
    { value: 0, suffix: "", label: "Google links lost" },
  ],
  features: [
    {
      title: "A catalogue that's fast to browse",
      body: "All 475 products and 153 categories moved off WooCommerce onto a fully static site. Every old product address still works, so the Google rankings came with it.",
      image: "/work/wixted/shop-desktop.webp",
      kind: "desktop",
    },
    {
      title: "Product pages built for engineers",
      body: "Clear specs, photos and a breadcrumb trail through the category tree, with search across the whole range.",
      image: "/work/wixted/product-desktop.webp",
      kind: "desktop",
    },
    {
      title: "A quote basket instead of a checkout",
      body: "Industrial buyers want prices on a list of parts, not a card payment. Customers add products, note sizes and ratings, and send one request.",
      image: "/work/wixted/quote-desktop.webp",
      kind: "desktop",
    },
    {
      title: "An AI product assistant",
      body: "A chat assistant that knows the whole catalogue. Ask for “stainless ball valves” and it suggests matching products you can add straight to a quote.",
      image: "/work/wixted/chat-mobile.webp",
      kind: "phone",
    },
    {
      title: "An admin panel that fits in a pocket",
      body: "The team updates stock, products, photos and categories from their phone, or in bulk from a spreadsheet. Changes go live on their own within minutes.",
      image: "/work/wixted/admin-mobile.webp",
      kind: "phone",
    },
  ],
  stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Claude AI", "Playwright", "Lighthouse CI"],
} as const;
