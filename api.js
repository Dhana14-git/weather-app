import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

export const fetchWeatherByCity = async (city) => {
  const { data } = await API.get("/weather/forecast", { params: { city } });
  return data;
};

export const fetchWeatherByCoords = async (lat, lon) => {
  const { data } = await API.get("/weather/coordinates", { params: { lat, lon } });
  return data;
};
