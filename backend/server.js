/**
 * Tripnexa API — Express (replaces previous FastAPI backend).
 * POST /generate → OpenRouter chat completions → structured trip JSON in { message }.
 */

const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
  override: true,
});

const PORT = Number(process.env.PORT, 10) || 8000;

const LOCAL_DEV_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://10.223.150.223:3000",
  "http://10.223.150.223:3001",
  "http://10.223.150.223:5173",
];

function openrouterApiKey() {
  require("dotenv").config({
    path: path.join(__dirname, ".env"),
    override: true,
  });
  return (process.env.OPENROUTER_API_KEY || "").trim();
}

function buildCorsMiddleware() {
  const raw = (process.env.CORS_ORIGINS || "").trim();
  if (!raw) {
    return cors({
      origin: true,
      credentials: false,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    });
  }
  const explicit = raw.split(",").map((s) => s.trim()).filter(Boolean);
  const merged = [...new Set([...explicit, ...LOCAL_DEV_ORIGINS])];
  return cors({
    origin: merged,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  });
}

function parseTripBody(raw) {
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      const err = new Error(
        "Body must be a JSON object, or a JSON string containing one."
      );
      err.status = 422;
      throw err;
    }
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    const err = new Error(
      "Input should be a JSON object with destination, days, and budget."
    );
    err.status = 422;
    throw err;
  }
  return raw;
}

function validateTripRequest(obj) {
  const errors = [];
  if (typeof obj.destination !== "string" || !obj.destination.trim()) {
    errors.push({
      type: "missing",
      loc: ["body", "destination"],
      msg: "Field required",
    });
  }
  if (typeof obj.days !== "string" && typeof obj.days !== "number") {
    errors.push({
      type: "type_error",
      loc: ["body", "days"],
      msg: "days must be a string or number",
    });
  }
  if (obj.budget != null && typeof obj.budget !== "string") {
    errors.push({
      type: "type_error",
      loc: ["body", "budget"],
      msg: "budget must be a string",
    });
  }
  if (errors.length) {
    const err = new Error("validation");
    err.status = 422;
    err.details = errors;
    throw err;
  }
  return {
    destination: String(obj.destination).trim(),
    days: String(obj.days),
    budget: obj.budget != null && obj.budget !== "" ? String(obj.budget) : "Medium",
  };
}

function buildPrompt(data) {
  return `

You are an AI travel planner.

Generate a travel plan in STRICT JSON format.

DO NOT:
- Add explanations
- Add markdown
- Add text outside JSON

ONLY return valid JSON.

Structure:
{
  "title": "string",
  "description": "string",
  "history": "string",
  "days": [
    {
      "day": 1,
      "image_query": "short visual search phrase",
      "activities": ["activity1", "activity2", "activity3"]
    }
  ]
}

User input:
Destination: ${data.destination}
Days: ${data.days}
Budget: ${data.budget}

Rules:
- "image_query" must be:
  - short (3–6 words)
  - visual (landmarks, places, scenery)
  - NOT sentences
  - include destination name
  - Prefer famous landmarks for image_query
- Examples:
  - "Tokyo skyline night"
  - "Goa beach sunset"
  - "Paris Eiffel Tower view"
- Avoid generic words like "travel", "tour", "experience"
- Activities should be realistic and specific
- 3–5 activities per day
`;
}

const app = express();
app.use(buildCorsMiddleware());
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({
    service: "Tripnexa API",
    version: "1.0",
    endpoints: { generate: "POST /generate" },
  });
});

app.post("/generate", async (req, res) => {
  let raw = req.body;
  try {
    raw = parseTripBody(raw);
    const data = validateTripRequest(raw);
    const prompt = buildPrompt(data);

    const apiKey = openrouterApiKey();
    if (!apiKey) {
      return res.json({
        message:
          "Server misconfiguration: OPENROUTER_API_KEY is empty. Set it in backend/.env and restart the server.",
      });
    }

    const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-OpenRouter-Title": "Tripnexa",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const dataJson = await orRes.json();
    // eslint-disable-next-line no-console
    console.log("OpenRouter STATUS:", orRes.status);

    if (!dataJson.choices && (orRes.status === 401 || dataJson.error)) {
      const err = dataJson.error || {};
      const code = err.code ?? orRes.status;
      const msg = err.message ?? "unknown error";
      return res.json({
        message: `OpenRouter error (${code}): ${msg}. If the key is correct, check Windows environment variables: remove a bad OPENROUTER_API_KEY from System/User env so backend/.env can take effect, then restart the server.`,
      });
    }

    if (!dataJson.choices) {
      return res.json({ message: "API Error: " + JSON.stringify(dataJson) });
    }

    let output = dataJson.choices[0].message.content;
    output = output.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsed = JSON.parse(output);
    return res.json({ message: parsed });
  } catch (e) {
    if (e.status === 422) {
      if (e.details) {
        return res.status(422).json({ detail: e.details });
      }
      return res.status(422).json({ detail: [{ msg: e.message }] });
    }
    if (e instanceof SyntaxError) {
      // eslint-disable-next-line no-console
      console.error("JSON parse error:", e.message);
      return res.json({ message: "Error generating trip" });
    }
    // eslint-disable-next-line no-console
    console.error("ERROR:", e);
    return res.json({ message: "Error generating trip" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log(`Tripnexa API listening on http://127.0.0.1:${PORT}`);
});
