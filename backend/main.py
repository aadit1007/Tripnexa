from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

class TripRequest(BaseModel):
    destination: str
    days: str
    budget: str


@app.post("/generate")
def generate_trip(data: TripRequest):

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

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                # ✅ Use working modern model
                "model": "openai/gpt-4o-mini",
                "messages": [
                    {"role": "user", "content": prompt}
                ]
            },
            timeout=30
        )

        data_json = response.json()

        # Debug logs
        print("STATUS:", response.status_code)
        print("RAW:", data_json)

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