/** Local consultation window (24h clock). Last 30-min slot starts at 18:30 and ends 19:00. */
export const BUSINESS_START_HOUR = 9;
export const BUSINESS_END_HOUR = 19;
export const CONSULTATION_MINUTES = 30;
/** Earliest slot is the later of: start of calendar day +2 at 9:00, or now + 48h (in zone). */
export const PLANNING_BUFFER_HOURS = 48;
export const MAX_CALENDAR_RANGE_DAYS = 14;
export const MAX_SLOTS_RETURNED = 20;
