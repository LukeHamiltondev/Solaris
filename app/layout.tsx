import type { Metadata, Viewport } from "next";
import { FloatingNav } from "./components/FloatingNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solaris Scaling",
  description:
    "Barber shop websites with online booking, an AI assistant for DMs and FAQs, and local ads from Solaris Scaling."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-50 antialiased">
        <FloatingNav />
        {children}
      </body>
    </html>
  );
}

