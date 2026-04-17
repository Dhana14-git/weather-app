import React from "react";
import { formatTime, getWindDirection } from "../utils/helpers";

const CurrentWeather = ({ data }) => {
  const { city, country, temperature, feelsLike, tempMin, tempMax, humidity,
    pressure, windSpeed, windDeg, visibility, description, icon, main,
    sunrise, sunset, timezone } = data;

  return (
    <div className="current-weather">
      <div className="current-top">
        <div className="city-info">
          <h1 className="city-name">{city}, {country}</h1>
          <p className="weather-desc">{description.charAt(0).toUpperCase() + description.slice(1)}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="weather-icon-img"
        />
      </div>

      <div className="temp-display">
        <span className="temp-main">{temperature}°</span>
        <div className="temp-range">
          <span>↑{tempMax}°</span>
          <span>↓{tempMin}°</span>
        </div>
      </div>

      <p className="feels-like">Feels like {feelsLike}°C</p>

      <div className="stats-grid">
        <div className="stat">
          <span className="stat-label">Humidity</span>
          <span className="stat-value">{humidity}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Wind</span>
          <span className="stat-value">{windSpeed} m/s {getWindDirection(windDeg)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Pressure</span>
          <span className="stat-value">{pressure} hPa</span>
        </div>
        {visibility !== null && (
          <div className="stat">
            <span className="stat-label">Visibility</span>
            <span className="stat-value">{visibility} km</span>
          </div>
        )}
        <div className="stat">
          <span className="stat-label">Sunrise</span>
          <span className="stat-value">{formatTime(sunrise, timezone)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Sunset</span>
          <span className="stat-value">{formatTime(sunset, timezone)}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
