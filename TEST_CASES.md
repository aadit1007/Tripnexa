# Tripnexa Test Cases

## Scope

These test cases cover functional behavior for frontend, backend, and third-party integrations.

## Test Data Assumptions

- Valid `OPENROUTER_API_KEY` exists in `backend/.env`
- Valid `REACT_APP_GEOAPIFY_KEY` and `REACT_APP_PEXELS_KEY` exist in `ai-travel-agent/.env`
- Backend running on `http://127.0.0.1:8000`
- Frontend running on `http://localhost:3000`

## Functional Test Cases

### TC-01: Generate itinerary successfully

- Precondition: Services are running, API keys are valid
- Steps:
  1. Open Trip Planner page
  2. Enter destination, days, budget
  3. Submit the form
- Expected:
  - `/generate` returns `200`
  - Trip result page shows title, description, history, and day plans

### TC-02: Destination field required

- Steps:
  1. Leave destination empty
  2. Submit form
- Expected:
  - Request blocked by frontend validation or backend responds with `422`
  - User sees meaningful validation feedback

### TC-03: Invalid days type

- Steps:
  1. Send manual request to `/generate` with `days` as invalid object type
- Expected:
  - Backend returns `422`
  - Error detail includes `days must be a string or number`

### TC-04: Missing OpenRouter key

- Precondition: Remove or empty `OPENROUTER_API_KEY`
- Steps:
  1. Restart backend
  2. Submit trip generation
- Expected:
  - Response contains server misconfiguration message
  - No backend crash

### TC-05: OpenRouter unauthorized key

- Precondition: Set invalid OpenRouter key
- Steps:
  1. Restart backend
  2. Submit trip generation
- Expected:
  - Response includes OpenRouter auth error details
  - App remains responsive

### TC-06: Geoapify autocomplete works

- Steps:
  1. Type at least 2 characters in destination input
- Expected:
  - Suggestions appear
  - Selecting a suggestion fills destination field

### TC-07: Missing Geoapify key fallback

- Precondition: Remove `REACT_APP_GEOAPIFY_KEY`
- Steps:
  1. Restart frontend
  2. Type destination
- Expected:
  - Console warning appears
  - App does not crash
  - Suggestions remain empty

### TC-08: Pexels image load works

- Steps:
  1. Generate a trip
  2. Open results page
- Expected:
  - Hero/day images load from Pexels

### TC-09: Missing Pexels key fallback

- Precondition: Remove `REACT_APP_PEXELS_KEY`
- Steps:
  1. Restart frontend
  2. Open results page
- Expected:
  - Console warning appears
  - Fallback images load
  - Page remains usable

### TC-10: Backend port conflict handling

- Precondition: Another process already uses `8000`
- Steps:
  1. Run backend server
- Expected:
  - Backend logs `EADDRINUSE`
  - Starting a single backend instance after freeing port resolves issue

## Non-Functional Checks

### NFT-01: Basic performance

- Measure itinerary generation response time under normal network conditions
- Target: acceptable user wait (e.g., < 10s for standard requests)

### NFT-02: Resilience

- Disconnect network during OpenRouter request
- Verify graceful error messaging without UI crash

### NFT-03: Usability

- Verify pages are readable in both light/dark themes
- Verify form controls and result sections are navigable
