
# Tripnexa – AI Travel Planning Website

Tripnexa is an AI-powered travel planning web application that generates personalized travel itineraries based on user preferences such as destination, budget, travel type, and activities.

The system uses:

* **React** for the frontend
* **FastAPI** for the backend
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
│   ├── main.py
│   └── .env
```

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

### 2. Python 3.9+

Download from:

```
https://python.org
```

Check installation:

```bash
python --version
```

---

### 3. Git (optional but recommended)

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

Install Python dependencies:

```bash
pip install fastapi uvicorn requests python-dotenv
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
uvicorn main:app --reload
```

Backend will start at:

```
http://127.0.0.1:8000
```

API documentation:

```
http://127.0.0.1:8000/docs
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
Frontend → FastAPI → OpenRouter AI → Itinerary → Result Page
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

* FastAPI
* Python
* Requests
* OpenRouter AI API

---

# Running Both Servers

Make sure **both servers are running**.

Backend:

```bash
uvicorn main:app --reload
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
npm install
pip install fastapi uvicorn requests python-dotenv
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
