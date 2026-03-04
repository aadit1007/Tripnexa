from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TripRequest(BaseModel):
    destination: str
    days: str
    budget: str


@app.post("/generate")
def generate_trip(data: TripRequest):

    prompt = f"""
    Create a travel plan in JSON.

    Destination: {data.destination}
    Days: {data.days}
    Budget: {data.budget}

    Return JSON with this format:

    {{
    "title": "",
    "description": "",
    "history": "",
    "days": [
    {{
        "day": 1,
        "activities": ["", "", ""]
    }}
    ],
    "image_queries": ["", "", ""]
    }}
    """ 

    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "deepseek/deepseek-chat",
        "messages": [
            {"role": "system", "content": "You are a travel planning assistant."},
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post(url, headers=headers, json=payload)
    result = response.json()

    return {
        "message": result["choices"][0]["message"]["content"]
    }