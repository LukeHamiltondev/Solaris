"use client";

import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { enquiryTypes, site } from "@/content/site";
import { OrbitMark } from "./orbit-mark";

const field =
  "peer w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 pt-6 pb-2.5 text-[15px] text-mist outline-none transition-colors placeholder:text-transparent focus:border-orbit-400 focus:bg-white/[0.05]";
const label =
  "pointer-events-none absolute top-4 left-4 origin-left text-[15px] text-subtle transition-all duration-300 ease-out-expo peer-focus:top-2 peer-focus:scale-[0.78] peer-focus:text-orbit-200 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-[0.78]";

function Field({ name, text, type = "text", required = false, area = false, autoComplete }: {
  name: string;
  text: string;
  type?: string;
  required?: boolean;
  area?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="relative block">
      {area ? (
        <textarea name={name} required={required} placeholder={text} rows={5} className={`${field} resize-none`} />
      ) : (
        <input name={name} type={type} required={required} placeholder={text} autoComplete={autoComplete} className={field} />
      )}
      <span className={label}>
        {text}
        {required && " *"}
      </span>
    </label>
  );
}

function Choice({ name, options, value, onChange }: {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label key={o} className="cursor-pointer">
          <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} className="peer sr-only" />
          <span className="inline-block rounded-full border border-white/12 px-4 py-2 text-sm text-muted transition-all duration-300 peer-checked:border-orbit-200 peer-checked:bg-orbit-200 peer-checked:text-ink-950 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orbit-200 hover:border-white/30 hover:text-mist">
            {o}
          </span>
        </label>
      ))}
    </div>
  );
}

/**
 * The quote form. Posts to Formspree, which emails the enquiry to Luke. Without a Formspree endpoint
 * set (or if sending fails) it falls back to opening the visitor's email app with everything filled in.
 */
export function ContactForm() {
  const [need, setNeed] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");

  // Arriving from a service card preselects that service.
  useEffect(() => {
    const preset = new URLSearchParams(window.location.search).get("need");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the URL once on arrival
    if (preset && (enquiryTypes as readonly string[]).includes(preset)) setNeed(preset);
  }, []);

  const mailto = (data: FormData) => {
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const lines = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      get("phone") && `Phone: ${get("phone")}`,
      get("business") && `Business: ${get("business")}`,
      get("website") && `Current website: ${get("website")}`,
      need && `Looking for: ${need}`,
    ].filter(Boolean);
    const subject = `Website enquiry from ${get("business") || get("name")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${lines.join("\n")}\n\n${get("message")}`)}`;
    setStatus("mailto");
  };

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!site.formspree) return mailto(data);
    data.set("_subject", `Website enquiry from ${String(data.get("business") || data.get("name") || "").trim()}`);
    setStatus("sending");
    try {
      const res = await fetch(site.formspree, { method: "POST", body: data, headers: { Accept: "application/json" } });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent" || status === "mailto") {
    return (
      <div className="flex flex-col items-center rounded-[2rem] border border-white/8 bg-ink-900/70 px-8 py-16 text-center" role="status">
        <OrbitMark intro spin className="size-28" />
        <h2 className="fade-up mt-8 text-3xl font-semibold tracking-tight" style={{ animationDelay: "0.8s" }}>
          {status === "sent" ? "Thanks, got it." : "Thanks, that\u2019s on its way."}
        </h2>
        <p className="fade-up mt-3 max-w-sm text-muted" style={{ animationDelay: "0.95s" }}>
          {status === "sent"
            ? "We\u2019ll reply within one working day."
            : "Your email app should have opened with your message ready to send."}
        </p>
        {status === "mailto" && (
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="fade-up mt-8 text-sm text-orbit-100 underline underline-offset-4"
            style={{ animationDelay: "1.1s" }}
          >
            Didn&apos;t open? Go back to the form
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={send} className="space-y-4 rounded-[2rem] border border-white/8 bg-ink-900/70 p-6 md:p-9">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" text="Your name" required autoComplete="name" />
        <Field name="email" text="Email" type="email" required autoComplete="email" />
        <Field name="phone" text="Phone (optional)" type="tel" autoComplete="tel" />
        <Field name="business" text="Business name" autoComplete="organization" />
      </div>
      <Field name="website" text="Current website (optional)" type="url" autoComplete="url" />
      <fieldset className="pt-3 pb-1">
        <legend className="mb-3 text-sm text-muted">What do you need?</legend>
        <Choice name="need" options={enquiryTypes} value={need} onChange={setNeed} />
      </fieldset>
      <Field name="message" text="Tell us about your project" area required />
      {/* Spam trap: people never see or fill this; bots do, and Formspree drops those. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {status === "error" && (
        <p role="alert" className="text-[15px] text-orbit-100">
          That didn&apos;t send. Please try again, or email{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        data-magnetic
        className="sheen group inline-flex w-full items-center justify-center gap-2 rounded-full bg-orbit-200 px-6 py-4 font-semibold text-ink-950 transition-colors hover:bg-orbit-100 disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? "Sending\u2026" : "Send enquiry"}
        <Icon name="arrow" className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
      </button>
    </form>
  );
}
