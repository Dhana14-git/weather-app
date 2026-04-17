# ⛅ Skye — Weather Forecast App

A full-stack weather forecast application built with **React**, **Node.js/Express**, and the **OpenWeatherMap API**. Features a secure backend proxy, server-side caching, geolocation support, and a polished glassmorphism UI.

---

## 📸 Features

- 🔍 **City search** — Search weather for any city worldwide
- 📍 **Geolocation** — Detect current location automatically
- 🌡️ **Current weather** — Temperature, humidity, wind, pressure, visibility, sunrise/sunset
- 📅 **5-day forecast** — Daily breakdown with precipitation probability
- ⚡ **Server-side caching** — Responses cached for 10 minutes to reduce API calls
- 🔒 **Secure backend proxy** — API key never exposed to the browser
- 🛡️ **Rate limiting** — 100 requests per 15 minutes per IP
- 📱 **Fully responsive** — Works on mobile, tablet, and desktop
- 🎨 **Dynamic themes** — Background gradient changes based on weather condition

---

## 🗂️ Project Structure

```
weather-app/
├── backend/
│   ├── controllers/
│   │   └── weatherController.js   # Business logic, API calls, formatting
│   ├── middleware/
│   │   └── errorHandler.js        # Centralised error handling
│   ├── routes/
│   │   └── weather.js             # Express route definitions
│   ├── .env.example               # Environment variable template
│   ├── package.json
│   └── server.js                  # Express app entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── CurrentWeather.jsx  # Current conditions display
│   │   │   ├── ErrorMessage.jsx    # Error UI component
│   │   │   ├── ForecastCard.jsx    # Single forecast day card
│   │   │   └── SearchBar.jsx       # Search input + location button
│   │   ├── hooks/
│   │   │   └── useWeather.js       # Custom React hook for weather state
│   │   ├── utils/
│   │   │   ├── api.js              # Axios API calls to backend
│   │   │   └── helpers.js          # Utility functions (time, wind, gradients)
│   │   ├── App.jsx                 # Root component
│   │   ├── App.css                 # All styles
│   │   └── index.js               # React entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16 or higher
- npm v8 or higher
- A free [OpenWeatherMap API key](https://openweathermap.org/api)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

---

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```env
PORT=5000
OPENWEATHER_API_KEY=your_actual_api_key_here
CLIENT_URL=http://localhost:3000
```

Start the backend server:

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The backend runs at `http://localhost:5000`

---

### 3. Set Up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

The default `.env` is:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm start
```

The app opens at `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint | Query Params | Description |
|--------|----------|--------------|-------------|
| GET | `/api/weather/forecast` | `city` (string) | Current + 5-day forecast by city name |
| GET | `/api/weather/current` | `city` (string) | Current weather only |
| GET | `/api/weather/coordinates` | `lat`, `lon` (float) | Forecast by GPS coordinates |
| GET | `/health` | — | Server health check |

### Example Requests

```bash
# Current + forecast by city
GET http://localhost:5000/api/weather/forecast?city=Hyderabad

# By coordinates
GET http://localhost:5000/api/weather/coordinates?lat=17.38&lon=78.48
```

### Example Response

```json
{
  "current": {
    "city": "Hyderabad",
    "country": "IN",
    "temperature": 34,
    "feelsLike": 38,
    "humidity": 45,
    "windSpeed": 4.2,
    "description": "clear sky",
    "icon": "01d",
    "sunrise": 1713323400,
    "sunset": 1713369600
  },
  "forecast": [
    {
      "date": "2025-04-17",
      "temperature": 34,
      "tempMin": 26,
      "tempMax": 37,
      "description": "clear sky",
      "pop": 0,
      "windSpeed": 3.8
    }
  ]
}
```

---

## ⚙️ Technical Highlights

### Backend Proxy Pattern
The API key is stored only in the backend `.env`. The React frontend **never** directly calls OpenWeatherMap — it only calls your Express server, keeping the key safe.

```
Browser → Express Backend → OpenWeatherMap API
```

### Server-side Caching
Using `node-cache` with a 10-minute TTL. Repeated searches for the same city are served instantly from cache, reducing API usage.

### Error Handling
All errors flow through a centralised Express error handler that maps OpenWeatherMap HTTP status codes to meaningful user messages (city not found, rate limit exceeded, etc.).

### Custom React Hook
`useWeather.js` encapsulates all data-fetching logic, loading states, and error states. Components stay clean and focused on rendering.

---

## 🌐 Deployment

### Backend — Render / Railway / Fly.io

1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Set the root directory to `backend`
4. Add environment variables: `OPENWEATHER_API_KEY`, `CLIENT_URL` (your deployed frontend URL)
5. Build command: `npm install` | Start command: `npm start`

### Frontend — Vercel / Netlify

1. Create a new project on [Vercel](https://vercel.com)
2. Set root directory to `frontend`
3. Add environment variable: `REACT_APP_API_URL` = your deployed backend URL
4. Build command: `npm run build` | Output: `build`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, React Hooks, Axios |
| Backend | Node.js, Express.js |
| API | OpenWeatherMap (Current + Forecast) |
| Caching | node-cache (server-side, TTL 10 min) |
| Rate Limiting | express-rate-limit |
| Styling | Pure CSS, Google Fonts (DM Sans + Playfair Display) |

---

## 📄 License

MIT License — free to use for personal and commercial projects.
