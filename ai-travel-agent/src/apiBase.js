/**
 * API base for POST /generate (Express backend).
 *
 * Development: leave REACT_APP_API_URL unset so requests stay same-origin (e.g. /generate)
 * and Create React App forwards them via package.json "proxy" → http://127.0.0.1:8000.
 *
 * Production build: set REACT_APP_API_URL (e.g. https://api.yourdomain.com) before npm run build.
 */
export function getApiBase() {
  const fromEnv = (process.env.REACT_APP_API_URL || "").trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "development") return "";
  return "http://10.223.150.223:8000";
}
