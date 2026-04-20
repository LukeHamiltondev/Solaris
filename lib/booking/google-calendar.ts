import { randomBytes } from "crypto";
import { JWT } from "google-auth-library";
import { google } from "googleapis";
import type { BusyInterval } from "./slots";

function getJwtClient(): JWT | null {
  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;
  if (!b64) return null;
  const json = JSON.parse(Buffer.from(b64, "base64").toString("utf8")) as {
    client_email: string;
    private_key: string;
  };
  return new JWT({
    email: json.client_email,
    key: json.private_key,
    scopes: ["https://www.googleapis.com/auth/calendar"]
  });
}

export function isCalendarConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 &&
      process.env.GOOGLE_CALENDAR_ID
  );
}

export async function fetchBusyIntervals(
  timeMinIso: string,
  timeMaxIso: string
): Promise<BusyInterval[]> {
  const auth = getJwtClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!auth || !calendarId) {
    throw new Error("Calendar is not configured.");
  }

  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMinIso,
      timeMax: timeMaxIso,
      items: [{ id: calendarId }]
    }
  });

  const busy = res.data.calendars?.[calendarId]?.busy ?? [];
  return busy
    .filter((b): b is { start?: string | null; end?: string | null } =>
      Boolean(b?.start && b?.end)
    )
    .map((b) => ({ start: b.start!, end: b.end! }));
}

function pickMeetLink(data: {
  hangoutLink?: string | null;
  conferenceData?: {
    entryPoints?: { entryPointType?: string | null; uri?: string | null }[];
  } | null;
}): string | undefined {
  if (data.hangoutLink) return data.hangoutLink;
  const video = data.conferenceData?.entryPoints?.find(
    (e) => e.entryPointType === "video"
  );
  return video?.uri ?? undefined;
}

/**
 * Creates the consultation on Google Calendar with one attendee (the visitor’s email from the form)
 * so they receive the invite; display name uses full name or business name from the form.
 * Adds a Google Meet when the API returns conference data.
 */
export async function createConsultationEvent(input: {
  timeZone: string;
  /** Wall time in `timeZone` without offset, e.g. 2026-04-20T14:30:00 */
  startLocal: string;
  endLocal: string;
  title?: string;
  description?: string;
  /** Visitor email from the booking form — Calendar sends the invite here. */
  attendeeEmail: string;
  /** Full name or business name from the form — shown on the invite as guest display name. */
  attendeeDisplayName: string;
}): Promise<{ htmlLink?: string; meetLink?: string; eventId?: string | null }> {
  const auth = getJwtClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!auth || !calendarId) {
    throw new Error("Calendar is not configured.");
  }

  const requestId = `solaris-${Date.now()}-${randomBytes(8).toString("hex")}`;

  const calendar = google.calendar({ version: "v3", auth });
  const event = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: 1,
    requestBody: {
      summary: input.title ?? "Solaris consultation",
      description:
        input.description ??
        "Website consultation booked via Solaris site assistant.",
      start: {
        dateTime: input.startLocal,
        timeZone: input.timeZone
      },
      end: {
        dateTime: input.endLocal,
        timeZone: input.timeZone
      },
      attendees: [
        {
          email: input.attendeeEmail,
          displayName: input.attendeeDisplayName
        }
      ],
      conferenceData: {
        createRequest: {
          requestId,
          conferenceSolutionKey: { type: "hangoutsMeet" }
        }
      }
    }
  });

  return {
    eventId: event.data.id,
    htmlLink: event.data.htmlLink ?? undefined,
    meetLink: pickMeetLink(event.data)
  };
}
