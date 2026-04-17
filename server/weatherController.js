const axios = require("axios");
const NodeCache = require("node-cache");

// Cache with 10-minute TTL
const cache = new NodeCache({ stdTTL: 600 });

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Helper: fetch from OpenWeatherMap
const fetchWeather = async (endpoint, params) => {
  const { data } = await axios.get(`${BASE_URL}/${endpoint}`, {
    params: { ...params, appid: API_KEY, units: "metric" },
    timeout: 8000,
  });
  return data;
};

// GET /api/weather/current?city=London
exports.getCurrentWeather = async (req, res, next) => {
  try {
    const { city } = req.query;
    if (!city || city.trim().length < 2) {
      return res.status(400).json({ error: "City name is required (min 2 characters)." });
    }

    const cacheKey = `current_${city.toLowerCase().trim()}`;
    const cached = cache.get(cacheKey);
    if (cached) return res.json({ ...cached, cached: true });

    const data = await fetchWeather("weather", { q: city.trim() });
    const result = formatCurrentWeather(data);
    cache.set(cacheKey, result);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

// GET /api/weather/forecast?city=London
exports.getForecast = async (req, res, next) => {
  try {
    const { city } = req.query;
    if (!city || city.trim().length < 2) {
      return res.status(400).json({ error: "City name is required (min 2 characters)." });
    }

    const cacheKey = `forecast_${city.toLowerCase().trim()}`;
    const cached = cache.get(cacheKey);
    if (cached) return res.json({ ...cached, cached: true });

    const [currentData, forecastData] = await Promise.all([
      fetchWeather("weather", { q: city.trim() }),
      fetchWeather("forecast", { q: city.trim(), cnt: 40 }),
    ]);

    const result = {
      current: formatCurrentWeather(currentData),
      forecast: formatForecast(forecastData),
    };
    cache.set(cacheKey, result);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

// GET /api/weather/coordinates?lat=17.38&lon=78.48
exports.getWeatherByCoords = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    const cacheKey = `coords_${parseFloat(lat).toFixed(2)}_${parseFloat(lon).toFixed(2)}`;
    const cached = cache.get(cacheKey);
    if (cached) return res.json({ ...cached, cached: true });

    const [currentData, forecastData] = await Promise.all([
      fetchWeather("weather", { lat, lon }),
      fetchWeather("forecast", { lat, lon, cnt: 40 }),
    ]);

    const result = {
      current: formatCurrentWeather(currentData),
      forecast: formatForecast(forecastData),
    };
    cache.set(cacheKey, result);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

// ---- Formatters ----

const formatCurrentWeather = (data) => ({
  city: data.name,
  country: data.sys.country,
  temperature: Math.round(data.main.temp),
  feelsLike: Math.round(data.main.feels_like),
  tempMin: Math.round(data.main.temp_min),
  tempMax: Math.round(data.main.temp_max),
  humidity: data.main.humidity,
  pressure: data.main.pressure,
  windSpeed: data.wind.speed,
  windDeg: data.wind.deg,
  visibility: data.visibility ? Math.round(data.visibility / 1000) : null,
  description: data.weather[0].description,
  icon: data.weather[0].icon,
  main: data.weather[0].main,
  sunrise: data.sys.sunrise,
  sunset: data.sys.sunset,
  timezone: data.timezone,
  dt: data.dt,
  coords: { lat: data.coord.lat, lon: data.coord.lon },
});

const formatForecast = (data) => {
  // Group by day, take one entry per day (noon)
  const daily = {};
  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toISOString().split("T")[0];
    const hour = new Date(item.dt * 1000).getUTCHours();
    if (!daily[date] || Math.abs(hour - 12) < Math.abs(new Date(daily[date].dt * 1000).getUTCHours() - 12)) {
      daily[date] = item;
    }
  });

  return Object.values(daily)
    .slice(0, 5)
    .map((item) => ({
      date: item.dt_txt.split(" ")[0],
      dt: item.dt,
      temperature: Math.round(item.main.temp),
      tempMin: Math.round(item.main.temp_min),
      tempMax: Math.round(item.main.temp_max),
      humidity: item.main.humidity,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      main: item.weather[0].main,
      windSpeed: item.wind.speed,
      pop: Math.round((item.pop || 0) * 100), // probability of precipitation %
    }));
};
