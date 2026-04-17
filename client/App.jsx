import React, { useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import ForecastCard from "./components/ForecastCard";
import ErrorMessage from "./components/ErrorMessage";
import useWeather from "./hooks/useWeather";
import { getWeatherGradient } from "./utils/helpers";
import "./App.css";

function App() {
  const { weatherData, loading, error, searchCity, searchByLocation } = useWeather();

  // Auto-load default city on mount
  useEffect(() => {
    searchCity("Hyderabad");
  }, []);

  const gradient = weatherData?.current
    ? getWeatherGradient(weatherData.current.main)
    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

  return (
    <div className="app" style={{ "--weather-gradient": gradient }}>
      <div className="app-bg" />

      <div className="container">
        <header className="header">
          <div className="logo">
            <span className="logo-icon">⛅</span>
            <span className="logo-text">Skye</span>
          </div>
        </header>

        <SearchBar onSearch={searchCity} onLocationSearch={searchByLocation} loading={loading} />

        {loading && (
          <div className="loading-state">
            <div className="loading-ring" />
            <p>Fetching weather data...</p>
          </div>
        )}

        {error && !loading && <ErrorMessage message={error} />}

        {weatherData && !loading && (
          <main className="weather-content">
            <CurrentWeather data={weatherData.current} />

            {weatherData.forecast && weatherData.forecast.length > 0 && (
              <section className="forecast-section">
                <h2 className="section-title">5-Day Forecast</h2>
                <div className="forecast-grid">
                  {weatherData.forecast.map((day) => (
                    <ForecastCard key={day.date} day={day} />
                  ))}
                </div>
              </section>
            )}
          </main>
        )}

        {!weatherData && !loading && !error && (
          <div className="empty-state">
            <span className="empty-icon">🌍</span>
            <p>Search for a city to see the weather</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
