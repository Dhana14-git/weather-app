import React from "react";
import { formatDay } from "../utils/helpers";

const ForecastCard = ({ day }) => {
  const { date, temperature, tempMin, tempMax, description, icon, humidity, pop, windSpeed } = day;

  return (
    <div className="forecast-card">
      <p className="forecast-day">{formatDay(date)}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="forecast-icon"
      />
      <p className="forecast-desc">{description.charAt(0).toUpperCase() + description.slice(1)}</p>
      <div className="forecast-temps">
        <span className="forecast-high">{tempMax}°</span>
        <span className="forecast-low">{tempMin}°</span>
      </div>
      <div className="forecast-meta">
        {pop > 0 && <span className="precip">💧 {pop}%</span>}
        <span className="forecast-wind">{windSpeed} m/s</span>
      </div>
    </div>
  );
};

export default ForecastCard;
