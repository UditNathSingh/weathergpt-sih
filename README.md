# ⚡ WeatherGPT - SIH26068 (Live Pitch Demo)

**Conversational AI with a Live Disaster Map & State/City-Wise Climate Prediction for India**

**Team:** AtmosX | **Institution:** Haridwar University  
**Category:** Software | **Theme:** Climate Change, Agriculture & Disaster Management  
**Problem ID:** SIH26068

> *"See the risk. Ask the question. Stay safe — anywhere in India."*

---

## ⚠️ IMPORTANT NOTE FOR JUDGES: DEMO PROTOTYPE
**This repository contains the Live Pitch Demo Prototype, not the final production build.** 

To guarantee 100% uptime, bypass third-party API rate limits, and ensure sub-second response times during our live hackathon presentation, this specific deployment uses **simulated internal data streams**. 

While the UI, Interactive Map, and Conversational Chat features are fully functional, the backend is currently reading from a comprehensive local JSON dictionary of Indian states/districts rather than making live external network calls. Please see the "Architecture" section below to compare this demo with our intended production design.

---

## 🌐 Live Demo Link
https://weathergpt-demo.onrender.com

---

## 🚨 The Core Challenge
Currently, citizens face severe challenges when trying to stay safe from extreme weather:
* Generic, city-level forecasts miss hyper-local reality.
* Disaster alerts (cyclone / flood / heatwave) arrive too late[cite: 5].
* Weather data is scattered across siloed platforms like IMD, CPCB, and NOAA[cite: 5].
* There is no simple, visual way to see where the actual risk is[cite: 5].

## 💡 Our Solution
WeatherGPT provides one simple interface that turns scattered climate data into clear, life-saving answers[cite: 5]. 
* **Conversational Interface:** Ask in plain language — get instant, simple answers[cite: 5].
* **Visual Interface:** A live disaster-risk map, not a wall of text[cite: 5].
* **Hyper-Local:** Pick your state or city for local prediction[cite: 5].
* **Proactive:** Proactive alerts before disaster strikes[cite: 5].

---

## 🏗️ Architecture: Production vs. Demo

### 1. Production Architecture (As Designed)
* **Frontend:** HTML + Tailwind CSS + Vanilla JS initializes chat & map requests[cite: 5].
* **Backend REST API:** Node.js / Flask REST endpoints receive payload & user intent[cite: 5].
* **External API Sync:** Fetches real-time feeds from OpenWeather, IMD, NOAA & CPCB[cite: 5].
* **Database Layer:** MySQL / PostgreSQL stores regional history & risk thresholds[cite: 5].
* **AI Model Engine:** LLM API synthesizes complex data into simple natural language[cite: 5].
* **Real-time Render:** Structured JSON response renders on interactive map & UI[cite: 5].

### 2. Demo Architecture (This Repository)
* **Frontend:** Fully functional (HTML/Tailwind/Vanilla JS)[cite: 5].
* **Backend:** Node.js Express server routing requests[cite: 5].
* **Data & AI Layer:** Replaced with a local, high-speed simulated database of all 28 States and 8 UTs to ensure the request flows right and an answer flows back to the user screen in under 1 second without network failure[cite: 5].

---

## 🚀 How to Run Locally

1. Clone this repository:
   ```bash
   git clone [https://github.com/YourUsername/weathergpt-sih.git](https://github.com/YourUsername/weathergpt-sih.git)

   cd weathergpt-sih

   npm install

   npm start
