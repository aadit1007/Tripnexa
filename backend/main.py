from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow React to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TripRequest(BaseModel):
    destination: str
    budget: str
    days: str

@app.post("/generate")
def generate_trip(data: TripRequest):
    return {
        "message": f"Trip to {data.destination} for {data.days} days within budget {data.budget} is being planned."
    }