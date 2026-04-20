import { DateTime } from "luxon";
import {
  BUSINESS_END_HOUR,
  BUSINESS_START_HOUR,
  CONSULTATION_MINUTES,
  MAX_CALENDAR_RANGE_DAYS,
  MAX_SLOTS_RETURNED,
  PLANNING_BUFFER_HOURS
} from "./constants";

export type BusyInterval = { start: string; end: string };

export type ConsultationSlot = {
  startIso: string;
  endIso: string;
  label: string;
};

/** Last start time on a day (30-min consult ending at BUSINESS_END_HOUR:00). */
function dayLastStart(timeZone: string, localDay: DateTime): DateTime {
  return DateTime.fromObject(
    {
      year: localDay.year,
      month: localDay.month,
      day: localDay.day,
      hour: BUSINESS_END_HOUR - 1,
      minute: 30,
      second: 0,
      millisecond: 0
    },
    { zone: timeZone }
  );
}

function dayMorning(timeZone: string, localDay: DateTime): DateTime {
  return DateTime.fromObject(
    {
      year: localDay.year,
      month: localDay.month,
      day: localDay.day,
      hour: BUSINESS_START_HOUR,
      minute: 0,
      second: 0,
      millisecond: 0
    },
    { zone: timeZone }
  );
}

function dayEnd(timeZone: string, localDay: DateTime): DateTime {
  return DateTime.fromObject(
    {
      year: localDay.year,
      month: localDay.month,
      day: localDay.day,
      hour: BUSINESS_END_HOUR,
      minute: 0,
      second: 0,
      millisecond: 0
    },
    { zone: timeZone }
  );
}

/** First moment a consultation may begin (zone-aware). */
export function getFirstBookableStart(timeZone: string): DateTime {
  const now = DateTime.now().setZone(timeZone);
  const twoCalendarDaysNine = now
    .startOf("day")
    .plus({ days: 2 })
    .set({
      hour: BUSINESS_START_HOUR,
      minute: 0,
      second: 0,
      millisecond: 0
    });
  const afterBuffer = now.plus({ hours: PLANNING_BUFFER_HOURS });
  let t = DateTime.max(twoCalendarDaysNine, afterBuffer);
  t = snapUpToSlotBoundary(t, timeZone);
  t = bumpIntoBusinessWindow(t, timeZone);
  return t;
}

function snapUpToSlotBoundary(t: DateTime, timeZone: string): DateTime {
  const x = t.setZone(timeZone);
  if (x.minute % CONSULTATION_MINUTES === 0 && x.second === 0 && x.millisecond === 0) {
    return x;
  }
  const up =
    x.minute < 30
      ? x.set({ minute: 30, second: 0, millisecond: 0 })
      : x.plus({ hours: 1 }).set({ minute: 0, second: 0, millisecond: 0 });
  return up;
}

function bumpIntoBusinessWindow(t: DateTime, timeZone: string): DateTime {
  let x = t.setZone(timeZone);
  const last = dayLastStart(timeZone, x);
  if (x > last) {
    const next = dayMorning(timeZone, x.plus({ days: 1 }));
    return next;
  }
  const morn = dayMorning(timeZone, x);
  if (x < morn) return morn;
  return x;
}

function overlapsBusy(
  start: DateTime,
  end: DateTime,
  busy: BusyInterval[]
): boolean {
  const s = start.toUTC();
  const e = end.toUTC();
  for (const b of busy) {
    const bs = DateTime.fromISO(b.start, { setZone: true }).toUTC();
    const be = DateTime.fromISO(b.end, { setZone: true }).toUTC();
    if (s < be && e > bs) return true;
  }
  return false;
}

export function listConsultationSlots(
  timeZone: string,
  busy: BusyInterval[]
): ConsultationSlot[] {
  const first = getFirstBookableStart(timeZone);
  const rangeEnd = first.plus({ days: MAX_CALENDAR_RANGE_DAYS });
  const slots: ConsultationSlot[] = [];
  let cur = first;

  while (cur < rangeEnd && slots.length < MAX_SLOTS_RETURNED) {
    const loc = cur.setZone(timeZone);
    const lastStart = dayLastStart(timeZone, loc);

    if (cur > lastStart) {
      cur = dayMorning(timeZone, loc.plus({ days: 1 }));
      continue;
    }

    if (loc.hour < BUSINESS_START_HOUR) {
      cur = dayMorning(timeZone, loc);
      if (cur < first) cur = first;
      continue;
    }

    const slotEnd = cur.plus({ minutes: CONSULTATION_MINUTES });
    const endCap = dayEnd(timeZone, loc);
    if (slotEnd > endCap) {
      cur = dayMorning(timeZone, loc.plus({ days: 1 }));
      continue;
    }

    if (cur >= first && !overlapsBusy(cur, slotEnd, busy)) {
      slots.push({
        startIso: cur.toUTC().toISO()!,
        endIso: slotEnd.toUTC().toISO()!,
        label: loc.toFormat("ccc d LLL, HH:mm")
      });
    }

    cur = cur.plus({ minutes: CONSULTATION_MINUTES });
  }

  return slots;
}

export function isValidConsultationStart(
  startIso: string,
  timeZone: string,
  busy: BusyInterval[]
): { ok: true; start: DateTime; end: DateTime } | { ok: false; reason: string } {
  const start = DateTime.fromISO(startIso, { setZone: true });
  if (!start.isValid) return { ok: false, reason: "Invalid time." };

  const startLocal = start.setZone(timeZone);
  const end = start.plus({ minutes: CONSULTATION_MINUTES });

  const first = getFirstBookableStart(timeZone);
  if (start < first) {
    return {
      ok: false,
      reason: "That time is too soon. Consultations need two days notice and sit between 9:00 and 19:00."
    };
  }

  if (
    startLocal.hour < BUSINESS_START_HOUR ||
    startLocal.minute % CONSULTATION_MINUTES !== 0
  ) {
    return { ok: false, reason: "Consultations start on the hour or half hour between 9:00 and 18:30." };
  }

  const lastStart = dayLastStart(timeZone, startLocal);
  if (start > lastStart) {
    return { ok: false, reason: "That time is outside business hours (9:00 to 19:00)." };
  }

  if (end > dayEnd(timeZone, startLocal)) {
    return { ok: false, reason: "Consultation would finish after 19:00." };
  }

  if (overlapsBusy(start, end, busy)) {
    return { ok: false, reason: "That time is no longer free." };
  }

  return { ok: true, start, end };
}
