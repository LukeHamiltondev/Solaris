import { NextResponse } from "next/server";
import { z } from "zod";
import { runBookingAgent } from "@/lib/booking/chat-agent";
import { isCalendarConfigured } from "@/lib/booking/google-calendar";

export const runtime = "nodejs";

/** Name + email from the pre-chat steps; passed through to Calendar as event title, attendee invite, and Meet guest. */
const bodySchema = z.object({
  clientName: z.string().trim().min(1).max(120),
  clientEmail: z.string().trim().email().max(320),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(4000)
      })
    )
    .min(1)
    .max(28)
});

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Consultation booking is not configured yet (missing OPENAI_API_KEY)."
      },
      { status: 503 }
    );
  }

  if (!isCalendarConfigured()) {
    return NextResponse.json(
      {
        error:
          "Consultation booking is not configured yet (missing Google Calendar credentials)."
      },
      { status: 503 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request shape.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const reply = await runBookingAgent(parsed.data.messages, {
      clientName: parsed.data.clientName,
      clientEmail: parsed.data.clientEmail
    });
    return NextResponse.json({ reply });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
