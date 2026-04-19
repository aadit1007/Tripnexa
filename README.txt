
# Tripnexa – AI Travel Planning Website

Tripnexa is an AI-powered travel planning web application that generates personalized travel itineraries based on user preferences such as destination, budget, travel type, and activities.

The system uses:

* **React** for the frontend
* **Node.js (Express)** for the backend API
* **OpenRouter AI API** for itinerary generation

---

# Project Structure

```
Tripnexa
│
├── ai-travel-agent
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│
├── backend
│   ├── server.js
│   ├── package.json
│   └── .env
```

---

# How to start the project

Use **two terminals**: one for the **Express backend** and one for the **React frontend**.

### 1) Backend setup and start

From repo root:

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
OPENROUTER_API_KEY=your_openrouter_key
CORS_ORIGINS=https://tripnexa.com,https://www.tripnexa.com,http://192.168.1.11:3000,http://192.168.1.11:3001,http://192.168.1.11:3002
```

Start backend:

```bash
npm run dev
```

Backend URL: `http://192.168.1.11:8000`

### 2) Frontend setup and start

From repo root in a new terminal:

```bash
cd ai-travel-agent
npm install
npm start
```

Frontend URL:

- Local: `http://localhost:3002`
- Network: `http://192.168.1.11:3002`

Notes:

- `ai-travel-agent/.env.development` sets `PORT=3002`
- `ai-travel-agent/package.json` proxy points to `http://192.168.1.11:8000`

### 3) Use the app

Open `http://localhost:3002`, go to **Trip planner**, fill details, and click generate.

### Production build (frontend only)

```bash
cd ai-travel-agent
npm run build
```

Set **`REACT_APP_API_URL`** to your public API base URL before `npm run build` if the API is not served from the same host.

---

# Prerequisites

Your system must have the following installed.

### 1. Node.js

Download from:

```
https://nodejs.org
```

Check installation:

```bash
node -v
npm -v
```

---

### 2. Git (optional but recommended)

Download:

```
https://git-scm.com
```

---

# Step 1 — Clone the Repository

```bash
git clone https://github.com/aadit1007/Tripnexa.git
```

Enter the project:

```bash
cd Tripnexa
```

---

# Step 2 — Setup Backend

Navigate to backend folder:

```bash
cd backend
```

Install Node dependencies:

```bash
npm install
```

---

## Create Environment File

Create a file named:

```
.env
```

Inside `backend`.

Add your **OpenRouter API key**:

```
OPENROUTER_API_KEY=your_api_key_here
```

Get a key from:

```
https://openrouter.ai
```

---

## Run Backend Server

```bash
npm run dev
```

Backend will start at:

```
http://127.0.0.1:8000
```

API root (JSON):

```
http://127.0.0.1:8000/
```

---

# Step 3 — Setup Frontend

Open a new terminal and go to frontend:

```bash
cd ai-travel-agent
```

Install dependencies:

```bash
npm install
```

---

## Install Additional Libraries

```bash
npm install react-router-dom react-select react-icons jspdf
```

---

## Start React Server

```bash
npm start
```

The website will run at:

```
http://localhost:3000
```

---

# Step 4 — Using the Application

1. Open the website in your browser.
2. Go to the **Trip Planner page**.
3. Enter:

* Destination
* Travel date
* Number of days
* Budget
* Travel type
* Activities

4. Click **Submit**.

The system will:

```
Frontend → Express API → OpenRouter AI → Itinerary → Result Page
```

5. A **formatted trip page** will appear with:

* trip overview
* destination description
* itinerary by day
* PDF download option

---

# Features

* AI generated travel itineraries
* Travel preference selection
* Activity based planning
* Structured itinerary view
* PDF export of trip plan

---

# Technologies Used

### Frontend

* React
* React Router
* React Select
* React Icons
* CSS

### Backend

* Node.js
* Express
* OpenRouter AI API

---

# Running Both Servers

Make sure **both servers are running**.

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
npm start
```

---

# Common Issues

### Backend not connecting

Make sure backend is running on:

```
127.0.0.1:8000
```

---

### API key error

Check `.env` file exists in backend folder.

---

### Dependencies missing

Run:

```bash
cd backend && npm install
cd ../ai-travel-agent && npm install
```

---

# Author

Aadi
Computer Science Engineering Project
AI Travel Planning Agent (Tripnexa)

---

If you want, I can also make a **much cleaner professional README (like real GitHub projects)** with:

* badges
* screenshots
* architecture diagram
* API documentation

which will make the repo look **far more impressive for evaluation**.
