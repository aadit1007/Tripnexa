/**
 * CRA dev server: set "proxy" in package.json → use relative URLs (no browser CORS).
 * Production: set REACT_APP_API_URL (e.g. https://api.tripnexa.com) before build.
 */
export function getApiBase() {
  const fromEnv = (process.env.REACT_APP_API_URL || "").trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "development") return "";
  return "http://127.0.0.1:8000";
}
