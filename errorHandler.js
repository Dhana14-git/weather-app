const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  // OpenWeatherMap API errors
  if (err.response) {
    const status = err.response.status;
    const message = err.response.data?.message || "External API error";

    if (status === 404) {
      return res.status(404).json({ error: "City not found. Please check the spelling and try again." });
    }
    if (status === 401) {
      return res.status(500).json({ error: "API key is invalid. Please contact support." });
    }
    if (status === 429) {
      return res.status(429).json({ error: "API rate limit exceeded. Please try again later." });
    }
    return res.status(status).json({ error: message });
  }

  // Network / timeout errors
  if (err.code === "ECONNABORTED" || err.code === "ETIMEDOUT") {
    return res.status(504).json({ error: "Weather service timed out. Please try again." });
  }

  // Validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  // Generic fallback
  res.status(500).json({ error: "Internal server error. Please try again later." });
};

module.exports = errorHandler;
