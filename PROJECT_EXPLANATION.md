# Tripnexa Project Explanation

## Overview

Tripnexa is a full-stack travel planning application that creates structured itineraries from simple user inputs:

- Destination
- Number of days
- Budget
- Activity preferences

The app focuses on three core outcomes:

1. Fast itinerary generation
2. Readable, day-by-day trip presentation
3. Rich visual experience (images + map)

## Frontend Responsibilities

The frontend (`ai-travel-agent`) handles:

- User input collection and validation
- Destination autocomplete through Geoapify
- Calling backend `/generate` endpoint
- Rendering generated trip content in `TripResult`
- Fetching contextual travel images from Pexels
- Caching generated trip images in local storage
- Exporting trip details as PDF

## Backend Responsibilities

The backend (`backend/server.js`) handles:

- Request parsing and validation
- Prompt construction for the AI model
- OpenRouter API communication
- Response normalization (expects strict JSON itinerary output)
- Error messaging for invalid input, API issues, and server misconfiguration
- CORS policy enforcement for allowed frontend origins

## Core User Journey

1. User fills trip form in `TripPlanner`.
2. Frontend sends request to `/generate`.
3. Backend validates and forwards prompt to OpenRouter.
4. Backend returns structured itinerary JSON.
5. Frontend stores and renders data in `TripResult`.
6. Frontend enriches itinerary with photos and map context.

## Design Notes

- The backend uses explicit validation to prevent malformed AI requests.
- The AI response is cleaned and parsed as JSON before returning.
- Frontend gracefully falls back to non-API image sources when needed.
- Dev and LAN access patterns are supported through configurable proxy/CORS setup.

## Current Strengths

- Clear separation of frontend and backend concerns
- API key-driven integrations for external services
- Resilient UX with fallback behavior
- Easy local development workflow

## Possible Improvements

- Add centralized logging and request correlation IDs
- Add schema validation library (e.g., Zod/Joi) for stricter contracts
- Add unit/integration tests for `/generate` and React pages
- Add loading skeletons and retry controls for third-party API failures
- Add CI pipeline to automate lint/test checks
