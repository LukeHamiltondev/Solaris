import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Motion } from "@/components/motion";

// Inter (the logo's typeface), self-hosted and preloaded, with a size-matched fallback so nothing jumps.
const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Custom websites that win you work`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    images: [{ url: "/brand/social-avatar-400.png", width: 400, height: 400 }],
  },
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IE" className={inter.variable}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-orbit-200 px-4 py-2 text-sm font-semibold text-ink-950 focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
