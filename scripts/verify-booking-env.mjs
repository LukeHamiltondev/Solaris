/**
 * Loads .env.local from the project root (same as Next.js), then checks booking env vars.
 * Run: node scripts/verify-booking-env.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const envPath = path.join(root, ".env.local");

if (fs.existsSync(envPath)) {
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
  console.log("Loaded:", path.basename(envPath), "\n");
}

const need = [
  "OPENAI_API_KEY",
  "GOOGLE_SERVICE_ACCOUNT_KEY_BASE64",
  "GOOGLE_CALENDAR_ID",
  "BOOKING_TIMEZONE"
];

let ok = true;
for (const k of need) {
  const v = process.env[k];
  if (!v || String(v).trim() === "") {
    console.error(`Missing or empty: ${k}`);
    ok = false;
  }
}

if (process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.startsWith("sk-")) {
  console.warn("Warning: OPENAI_API_KEY usually starts with sk-");
}

if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64) {
  try {
    const raw = Buffer.from(
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64.trim(),
      "base64"
    ).toString("utf8");
    const j = JSON.parse(raw);
    if (!j.client_email || !j.private_key) {
      console.error(
        "GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 decodes but JSON missing client_email or private_key"
      );
      ok = false;
    } else {
      console.log("Service account email:", j.client_email);
    }
  } catch (e) {
    console.error(
      "GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 is not valid base64 JSON:",
      e.message
    );
    ok = false;
  }
}

if (ok) {
  console.log("\nAll required booking env vars look good. Next: npm run dev");
  process.exit(0);
} else {
  console.error(
    "\nCopy env.example to .env.local, fill values, then run this script again."
  );
  process.exit(1);
}
