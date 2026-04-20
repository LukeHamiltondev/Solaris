"use client";

import { useCallback, useRef, useState } from "react";

type Role = "user" | "assistant";

type Msg = { role: Role; content: string };

type Step = "name" | "email" | "chat";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function BookingConsultationAgent() {
  const [step, setStep] = useState<Step>("name");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [nameDraft, setNameDraft] = useState("");
  const [emailDraft, setEmailDraft] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const beginChat = useCallback((name: string, email: string) => {
    setClientName(name);
    setClientEmail(email);
    setStep("chat");
    setMessages([
      {
        role: "assistant",
        content: `Thanks, ${name}. I can only help book your website consultation. Want me to pull the next open times?`
      }
    ]);
  }, []);

  const send = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading || step !== "chat") return;

    const prior = messages;
    const nextMessages: Msg[] = [...prior, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/booking/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Same name + email on every turn; server uses them for the Google Calendar invite and Meet guest.
        body: JSON.stringify({
          clientName: clientName.trim(),
          clientEmail: clientEmail.trim(),
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });
      const data = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok) {
        setError(data.error ?? "Could not reach the booking assistant.");
        setMessages(prior);
        return;
      }

      if (!data.reply) {
        setError("Empty response from server.");
        setMessages(prior);
        return;
      }

      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Network error. Try again in a moment.");
      setMessages(prior);
    } finally {
      setLoading(false);
      requestAnimationFrame(() =>
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
      );
    }
  }, [clientEmail, clientName, input, loading, messages, step]);

  if (step === "name") {
    return (
      <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-950/50 px-4 py-6 text-left sm:px-6">
        <label className="block text-sm font-medium text-neutral-200">
          Full name or business name
        </label>
        <input
          type="text"
          value={nameDraft}
          onChange={(e) => setNameDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const n = nameDraft.trim();
              if (n.length >= 1) setStep("email");
            }
          }}
          placeholder="e.g. Jane Doe or Northside Cuts"
          className="mt-2 w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-neutral-500 focus:outline-none"
          autoComplete="name"
          aria-label="Full name or business name"
        />
        <button
          type="button"
          disabled={!nameDraft.trim()}
          onClick={() => {
            if (nameDraft.trim()) setStep("email");
          }}
          className="mt-4 w-full rounded-full bg-neutral-100 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    );
  }

  if (step === "email") {
    return (
      <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-950/50 px-4 py-6 text-left sm:px-6">
        <label className="block text-sm font-medium text-neutral-200">
          Your email
        </label>
        <p className="mt-1 text-xs text-neutral-500">
          We use this for your calendar invite and Google Meet link.
        </p>
        <input
          type="email"
          value={emailDraft}
          onChange={(e) => setEmailDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const em = emailDraft.trim();
              if (isValidEmail(em)) beginChat(nameDraft.trim(), em);
            }
          }}
          placeholder="you@example.com"
          className="mt-3 w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-neutral-500 focus:outline-none"
          autoComplete="email"
          aria-label="Your email"
        />
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setStep("name")}
            className="flex-1 rounded-full border border-neutral-600 py-3 text-sm font-medium text-neutral-200 transition hover:bg-neutral-800"
          >
            Back
          </button>
          <button
            type="button"
            disabled={!isValidEmail(emailDraft)}
            onClick={() => {
              const em = emailDraft.trim();
              if (isValidEmail(em)) beginChat(nameDraft.trim(), em);
            }}
            className="flex-1 rounded-full bg-neutral-100 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-950/50 text-left shadow-inner">
      <p className="border-b border-neutral-800 px-4 py-2 text-center text-xs text-neutral-500">
        {clientName} · {clientEmail}
      </p>
      <div className="max-h-[min(420px,55vh)] space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                m.role === "user"
                  ? "rounded-br-sm bg-neutral-100 text-neutral-950"
                  : "rounded-bl-sm bg-neutral-800/90 text-neutral-100"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <p className="text-center text-xs text-neutral-500">Checking calendar…</p>
        )}
        <div ref={bottomRef} />
      </div>

      {error && (
        <p className="border-t border-neutral-800 px-4 py-2 text-center text-xs text-red-300">
          {error}
        </p>
      )}

      <div className="flex gap-2 border-t border-neutral-800 p-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
          placeholder="Ask for times or confirm a slot…"
          className="min-w-0 flex-1 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-neutral-500 focus:outline-none"
          disabled={loading}
          aria-label="Message to booking assistant"
        />
        <button
          type="button"
          onClick={() => void send()}
          disabled={loading || !input.trim()}
          className="shrink-0 rounded-full bg-neutral-100 px-5 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-white disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
}
