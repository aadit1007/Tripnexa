from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
import requests
import json
import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env next to this file. override=True: values in .env beat stale/wrong Windows user env vars.
_ENV_FILE = Path(__file__).resolve().parent / ".env"
load_dotenv(_ENV_FILE, override=True)

app = FastAPI()

# CORS: preflight must echo Access-Control-Allow-Origin for the browser Origin.
# CORS_ORIGINS (optional) lists production sites — local CRA ports are always merged in so
# .env can keep prod URLs without breaking http://localhost:3001 → 127.0.0.1:8000.
_LOCAL_DEV_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:5173",
]
_cors_env = os.getenv("CORS_ORIGINS", "").strip()
_explicit = [o.strip() for o in _cors_env.split(",") if o.strip()] if _cors_env else []
if _explicit:
    _merged = list(dict.fromkeys(_explicit + _LOCAL_DEV_ORIGINS))
    app.add_middleware(
        CORSMiddleware,
        allow_origins=_merged,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )

def _openrouter_api_key() -> str:
    """Re-read .env each call so edits apply without fighting OS-level env (dotenv override)."""
    load_dotenv(_ENV_FILE, override=True)
    return (os.getenv("OPENROUTER_API_KEY") or "").strip()


class TripRequest(BaseModel):
    destination: str
    days: str
    budget: str


def _parse_trip_body(raw):
    """Accept a JSON object or a JSON-encoded string (double-encoded clients)."""
    if isinstance(raw, str):
        try:
            raw = json.loads(raw)
        except json.JSONDecodeError as exc:
            raise HTTPException(
                status_code=422,
                detail="Body must be a JSON object, or a JSON string containing one.",
            ) from exc
    if not isinstance(raw, dict):
        raise HTTPException(
            status_code=422,
            detail="Input should be a JSON object with destination, days, and budget.",
        )
    return raw


@app.post("/generate")
async def generate_trip(request: Request):
    try:
        raw = await request.json()
    except ValueError as exc:
        raise HTTPException(status_code=400, detail="Invalid JSON body") from exc

    raw = _parse_trip_body(raw)
    try:
        data = TripRequest.model_validate(raw)
    except ValidationError as exc:
        raise HTTPException(status_code=422, detail=exc.errors()) from exc

    prompt = f"""

You are an AI travel planner.

Generate a travel plan in STRICT JSON format.

DO NOT:
- Add explanations
- Add markdown
- Add text outside JSON

ONLY return valid JSON.

Structure:
{{
  "title": "string",
  "description": "string",
  "history": "string",
  "days": [
    {{
      "day": 1,
      "image_query": "short visual search phrase",
      "activities": ["activity1", "activity2", "activity3"]
    }}
  ]
}}

User input:
Destination: {data.destination}
Days: {data.days}
Budget: {data.budget}

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
"""

    api_key = _openrouter_api_key()
    if not api_key:
        return {
            "message": "Server misconfiguration: OPENROUTER_API_KEY is empty. Set it in backend/.env and restart uvicorn."
        }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-OpenRouter-Title": "Tripnexa",
            },
            json={
                "model": "openai/gpt-4o-mini",
                "messages": [
                    {"role": "user", "content": prompt}
                ],
            },
            timeout=60,
        )

        data_json = response.json()

        print("STATUS:", response.status_code)

        if "choices" not in data_json and (
            response.status_code == 401 or data_json.get("error")
        ):
            err = data_json.get("error") or {}
            code = err.get("code", response.status_code)
            msg = err.get("message", "unknown error")
            return {
                "message": (
                    f"OpenRouter error ({code}): {msg}. "
                    "If the key is correct, check Windows environment variables: remove a bad OPENROUTER_API_KEY "
                    "from System/User env so backend/.env can take effect, then restart uvicorn."
                )
            }

        if "choices" not in data_json:
            return {"message": "API Error: " + str(data_json)}

        output = data_json["choices"][0]["message"]["content"]

        # Clean just in case (rare now)
        output = output.replace("```json", "").replace("```", "").strip()

        parsed = json.loads(output)

        return {"message": parsed}

    except Exception as e:
        print("ERROR:", str(e))
        return {"message": "Error generating trip"}