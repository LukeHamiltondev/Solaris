import OpenAI from "openai";
import { DateTime } from "luxon";
import { MAX_CALENDAR_RANGE_DAYS } from "./constants";
import { createConsultationEvent, fetchBusyIntervals } from "./google-calendar";
import {
  isValidConsultationStart,
  listConsultationSlots,
  type BusyInterval
} from "./slots";

/** Values from the pre-chat form; used only for Google Calendar + Meet (see createConsultationEvent). */
export type BookingVisitorContext = {
  clientName: string;
  clientEmail: string;
};

const BASE_SYSTEM_PROMPT = `You are the scheduling assistant for Solaris Scaling.
You ONLY help visitors book a single type of appointment: a consultation call about their website and growth (not haircuts, not other services).

Rules you must follow in every reply:
- Stay strictly on topic: finding a consultation time, confirming details, or explaining booking limits.
- If asked anything unrelated (coding help, general trivia, other companies, legal or medical advice, politics, jokes unrelated to booking), refuse briefly and redirect to booking a consultation.
- Consultations are 30 minutes.
- They can only be scheduled between 9:00 and 19:00 in the business timezone.
- The earliest slot is never before two full calendar days from today at 9:00 in that timezone, and never before 48 hours from the current moment (whichever is later). You do not need to explain this math to the user unless they ask.
- Never invent times. Always use the list_consultation_availability tool before offering concrete slots. When the user picks a time, use book_consultation with only startTimeIso and optional note (their full name or business name and email are already known to the system).
- Do not ask for the visitor's full name, business name, or email; they were collected before this chat.
- Keep replies short and clear.`;

function getTimeZone(): string {
  return process.env.BOOKING_TIMEZONE || "UTC";
}

async function loadBusyWindow(): Promise<BusyInterval[]> {
  const tz = getTimeZone();
  const start = DateTime.now().setZone(tz).startOf("day").toUTC();
  const end = start.plus({ days: MAX_CALENDAR_RANGE_DAYS + 3 });
  return fetchBusyIntervals(start.toISO()!, end.toISO()!);
}

function buildSystemPrompt(ctx: BookingVisitorContext): string {
  return `${BASE_SYSTEM_PROMPT}

Pre-collected visitor details (use for context only; do not repeat as a form):
- Full name or business name: ${JSON.stringify(ctx.clientName)}
- Email: ${JSON.stringify(ctx.clientEmail)}
A Google Calendar invite with Google Meet will be sent to that email when a booking succeeds.`;
}

export async function runBookingAgent(
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  ctx: BookingVisitorContext
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set.");
  }

  const openai = new OpenAI({ apiKey });
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const tz = getTimeZone();

  const tools: OpenAI.Chat.ChatCompletionTool[] = [
    {
      type: "function",
      function: {
        name: "list_consultation_availability",
        description:
          "Returns real open consultation slots from Google Calendar, respecting 9-19 business hours, 30-minute length, two-day planning buffer, and no double booking.",
        parameters: {
          type: "object",
          properties: {},
          additionalProperties: false
        }
      }
    },
    {
      type: "function",
      function: {
        name: "book_consultation",
        description:
          "Books one consultation at an exact start time (ISO 8601 UTC) after the user confirmed. Full name or business name and email are applied server-side for the invite and Meet.",
        parameters: {
          type: "object",
          properties: {
            startTimeIso: {
              type: "string",
              description: "Start instant in ISO 8601 (must match an offered slot)."
            },
            note: {
              type: "string",
              description: "Short optional note from the visitor."
            }
          },
          required: ["startTimeIso"],
          additionalProperties: false
        }
      }
    }
  ];

  const convo: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: buildSystemPrompt(ctx) },
    ...messages
  ];

  for (let step = 0; step < 10; step++) {
    const completion = await openai.chat.completions.create({
      model,
      messages: convo,
      tools,
      tool_choice: "auto",
      temperature: 0.4
    });

    const choice = completion.choices[0];
    if (!choice?.message) {
      throw new Error("Empty model response.");
    }

    const msg = choice.message;
    convo.push(msg);

    if (!msg.tool_calls?.length) {
      const text = msg.content?.trim();
      if (text) return text;
      return "Sorry, I could not produce a reply. Please try again.";
    }

    for (const toolCall of msg.tool_calls) {
      if (toolCall.type !== "function") continue;

      let payload = "";
      try {
        if (toolCall.function.name === "list_consultation_availability") {
          const busy = await loadBusyWindow();
          const slots = listConsultationSlots(tz, busy);
          payload = JSON.stringify({
            timeZone: tz,
            slots: slots.map((s) => ({
              startIso: s.startIso,
              label: s.label
            }))
          });
        } else if (toolCall.function.name === "book_consultation") {
          const args = JSON.parse(toolCall.function.arguments || "{}") as {
            startTimeIso?: string;
            note?: string;
          };
          const busy = await loadBusyWindow();
          const check = isValidConsultationStart(
            args.startTimeIso ?? "",
            tz,
            busy
          );
          if (!check.ok) {
            payload = JSON.stringify({ ok: false, error: check.reason });
          } else {
            const title = `Consultation — ${ctx.clientName}`;
            const desc = [
              args.note,
              `Guest (full name or business): ${ctx.clientName} <${ctx.clientEmail}>`,
              `Booked via site assistant. TZ: ${tz}`
            ]
              .filter(Boolean)
              .join("\n");

            const created = await createConsultationEvent({
              timeZone: tz,
              startLocal: check.start
                .setZone(tz)
                .toFormat("yyyy-MM-dd'T'HH:mm:ss"),
              endLocal: check.end
                .setZone(tz)
                .toFormat("yyyy-MM-dd'T'HH:mm:ss"),
              title,
              description: desc,
              attendeeEmail: ctx.clientEmail,
              attendeeDisplayName: ctx.clientName
            });

            payload = JSON.stringify({
              ok: true,
              message: "Booked successfully.",
              startLabel: check.start.setZone(tz).toFormat("ccc d LLL, HH:mm"),
              meetLink: created.meetLink ?? null,
              calendarLink: created.htmlLink ?? null
            });
          }
        } else {
          payload = JSON.stringify({ error: "Unknown tool." });
        }
      } catch (e) {
        payload = JSON.stringify({
          error: e instanceof Error ? e.message : "Tool failed."
        });
      }

      convo.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: payload
      });
    }
  }

  return "Sorry, that booking flow took too many steps. Please refresh and try again.";
}
