const BASE_URL = "http://localhost:5000/api/weather";

export const fetchWeatherByCity = async (city) => {
  const res = await fetch(`${BASE_URL}/current?city=${city}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch weather");
  }

  return data;
};

export const fetchWeatherByCoords = async (lat, lon) => {
  const res = await fetch(`${BASE_URL}/coordinates?lat=${lat}&lon=${lon}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch weather");
  }

  return data;
};