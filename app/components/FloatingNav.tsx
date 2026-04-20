"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const linkBase =
  "rounded-full px-3 py-2 text-sm font-medium text-neutral-400 transition hover:bg-white/5 hover:text-neutral-100 md:px-4";

export function FloatingNav() {
  const pathname = usePathname();
  const isExamples = pathname === "/examples";

  return (
    <nav
      className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-4 md:top-6"
      aria-label="Main"
    >
      <div className="pointer-events-auto flex items-center rounded-full border border-white/10 bg-neutral-950/80 py-1 pl-1 pr-1 shadow-xl shadow-black/40 backdrop-blur-md md:py-1.5 md:pl-1.5 md:pr-1.5">
        <Link href="/" className={linkBase}>
          Home
        </Link>
        <Link
          href="/examples"
          className={`${linkBase} ${isExamples ? "bg-white/10 text-neutral-50" : ""}`}
        >
          Examples
        </Link>
        <Link href="/#book" className={linkBase}>
          Book
        </Link>
      </div>
    </nav>
  );
}
