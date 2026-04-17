export const getWindDirection = (deg) => {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
};

export const formatTime = (unix, timezone = 0) => {
  const date = new Date((unix + timezone) * 1000);
  const h = date.getUTCHours();
  const m = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${m} ${ampm}`;
};

export const formatDay = (dateStr) => {
  const date = new Date(dateStr + "T12:00:00Z");
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
};

export const getWeatherGradient = (main) => {
  const gradients = {
    Clear: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    Clouds: "linear-gradient(135deg, #89a4c7 0%, #b8cee4 100%)",
    Rain: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)",
    Drizzle: "linear-gradient(135deg, #5c7a9e 0%, #8aa7c4 100%)",
    Thunderstorm: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    Snow: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
    Mist: "linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%)",
    Fog: "linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%)",
    Haze: "linear-gradient(135deg, #c9d6df 0%, #e2ebf0 100%)",
  };
  return gradients[main] || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
};

export const getWeatherEmoji = (main) => {
  const map = {
    Clear: "☀️", Clouds: "☁️", Rain: "🌧️", Drizzle: "🌦️",
    Thunderstorm: "⛈️", Snow: "❄️", Mist: "🌫️", Fog: "🌫️", Haze: "🌁",
  };
  return map[main] || "🌡️";
};
