// All of the site's words live here, so copy can change without touching layout code.

export const site = {
  name: "Solaris Scaling",
  owner: "Luke Hamilton",
  url: "https://solarisscaling.com",
  email: "luke@solarisscaling.com",
  // Quote form endpoint from Formspree (formspree.io). Leave empty to fall back to opening the email app.
  formspree: "",
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
  sub: "Fast, custom websites, plus the tools you run your business on.",
} as const;

export const builds = [
  {
    title: "Business websites",
    body: "Built to turn visitors into calls and quotes.",
    need: "A new website",
  },
  {
    title: "Catalogues & quote systems",
    body: "Every product searchable, with a quote basket.",
    need: "A catalogue or shop",
  },
  {
    title: "Admin tools & AI assistants",
    body: "Run your stock and prices from your phone.",
    need: "A custom tool",
  },
] as const;

export const reasons = [
  {
    title: "Built to win work",
    body: "Every page leads to a call or a quote.",
  },
  {
    title: "Fast and found",
    body: "Quick to load, easy to find on Google.",
  },
  {
    title: "You can run it yourself",
    body: "Change things from your phone, no developer needed.",
  },
  {
    title: "Start to finish",
    body: "The people you talk to build your site.",
  },
] as const;

export const steps = [
  { title: "Call", body: "A short chat about your business." },
  { title: "Plan & quote", body: "A fixed price before any work starts." },
  { title: "Design & build", body: "You see it take shape as we build." },
  { title: "Launch & support", body: "It goes live, and we stay on hand." },
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
  { title: "Tell us what you need", body: "A few lines is plenty." },
  { title: "Quick call", body: "We talk it through." },
  { title: "Fixed quote", body: "One price and a timeline. Free." },
] as const;

export const carePlan = {
  name: "Care plan",
  body: "Hosting, updates, backups and small edits, handled. Add it to any project.",
} as const;

export const faqs = [
  {
    q: "How much does a website cost?",
    a: "It depends on the job, so every project gets a free, fixed quote.",
  },
  {
    q: "How long does it take?",
    a: "Usually 2 to 6 weeks. Your quote includes a timeline.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. The code, the content and the domain are yours.",
  },
  {
    q: "Can I edit it myself?",
    a: "Yes, from a simple admin screen on your phone.",
  },
  {
    q: "I already have a website. Can you move it over?",
    a: "Yes, and your Google rankings come with you.",
  },
  {
    q: "How does payment work?",
    a: "50% to start, 50% at launch. The price is fixed.",
  },
] as const;

export const enquiryTypes = [...services.map((s) => s.need), "Not sure yet"] as const;

export const about = {
  heading: "Hi, we're Solaris Scaling.",
  body: [
    "We build websites that bring in calls, quotes and customers.",
    "No templates and no handoffs, from first call to launch.",
  ],
} as const;

// A short quote from a client, shown on the home page and case study when set.
export const testimonial: { quote: string; name: string; role: string } | null = null;

export const projects = [
  {
    slug: "industrial-supplier",
    client: "Irish industrial supplier",
    summary: "475 products, rebuilt to be fast and easy to quote from.",
    tags: ["Next.js", "Product catalogue", "Quote basket", "Admin panel", "AI assistant"],
    image: "/work/supplier/home-desktop.webp",
  },
] as const;

export const caseStudy = {
  client: "Industrial supplier",
  location: "Ireland",
  industry: "Industrial supplies: valves, actuation, gaskets and clamps",
  intro:
    "Their old site was slow and hard to update. Their customers wanted prices on lists of parts, not a checkout.",
  stats: [
    { value: 475, suffix: "", label: "Products moved across" },
    { value: 153, suffix: "", label: "Categories, all kept" },
    { value: 100, suffix: "", label: "Lighthouse score" },
    { value: 0, suffix: "", label: "Google links lost" },
  ],
  features: [
    {
      title: "A catalogue that's fast to browse",
      body: "Every product moved across, with no Google rankings lost.",
      image: "/work/supplier/shop-desktop.webp",
      kind: "desktop",
    },
    {
      title: "Product pages built for engineers",
      body: "Specs, photos and search across the whole range.",
      image: "/work/supplier/product-desktop.webp",
      kind: "desktop",
    },
    {
      title: "A quote basket instead of a checkout",
      body: "Add parts, send one request, get a price.",
      image: "/work/supplier/quote-desktop.webp",
      kind: "desktop",
    },
    {
      title: "An AI product assistant",
      body: "Ask for a part, get matching products.",
      image: "/work/supplier/chat-mobile.webp",
      kind: "phone",
    },
    {
      title: "An admin panel that fits in a pocket",
      body: "Stock and products, updated from a phone.",
      image: "/work/supplier/admin-mobile.webp",
      kind: "phone",
    },
  ],
  stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Claude AI", "Playwright", "Lighthouse CI"],
} as const;
