const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");

// GET /api/weather/current?city=Hyderabad
router.get("/current", weatherController.getCurrentWeather);

// GET /api/weather/forecast?city=Hyderabad
router.get("/forecast", weatherController.getForecast);

// GET /api/weather/current?lat=17.38&lon=78.48
router.get("/coordinates", weatherController.getWeatherByCoords);

module.exports = router;
