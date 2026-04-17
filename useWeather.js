import { useState, useCallback } from "react";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../utils/api";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCity = useCallback(async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to fetch weather data. Please try again.";
      setError(msg);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const data = await fetchWeatherByCoords(coords.latitude, coords.longitude);
          setWeatherData(data);
        } catch (err) {
          const msg = err.response?.data?.error || "Failed to fetch weather data.";
          setError(msg);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied. Please search by city name.");
        setLoading(false);
      }
    );
  }, []);

  return { weatherData, loading, error, searchCity, searchByLocation };
};

export default useWeather;
