import { useEffect, useState } from "react";

import "./Weather.css";

function Weather({ destination }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!destination) {
      return;
    }

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");

        // 1. Find the destination coordinates
        const geocodingResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            destination
          )}&count=1&language=en&format=json`
        );

        if (!geocodingResponse.ok) {
          throw new Error("Unable to find destination.");
        }

        const geocodingData = await geocodingResponse.json();

        if (!geocodingData.results?.length) {
          throw new Error("Destination not found.");
        }

        const location = geocodingData.results[0];

        // 2. Request weather using coordinates
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`
        );

        if (!weatherResponse.ok) {
          throw new Error("Unable to load weather data.");
        }

        const weatherData = await weatherResponse.json();

        setWeather({
          temperature: weatherData.current.temperature_2m,
          windSpeed: weatherData.current.wind_speed_10m,
          weatherCode: weatherData.current.weather_code,
        });

        const dailyForecast = weatherData.daily.time.map(
          (date, index) => ({
            date,
            weatherCode: weatherData.daily.weather_code[index],
            maxTemperature:
              weatherData.daily.temperature_2m_max[index],
            minTemperature:
              weatherData.daily.temperature_2m_min[index],
          })
        );

        setForecast(dailyForecast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [destination]);

  if (loading) {
  return (
    <section className="weather-section weather-loading">
      <h2>Weather</h2>
      <p>Checking the latest weather conditions...</p>
    </section>
  );
}

  if (error) {
  return (
    <section className="weather-section weather-error">
      <h2>Weather</h2>
      <p>
        We couldn't load the weather right now.
        Please try again later.
      </p>
    </section>
  );
}

  return (
    <section className="weather-section">
      <div className="weather-header">
        <div>
          <h2>Weather</h2>
          <p>Current conditions and 5-day forecast.</p>
        </div>

        <span className="weather-location">
          {destination}
        </span>
      </div>

      {weather && (
        <div className="current-weather">
          <div className="current-temperature">
            {Math.round(weather.temperature)}°C
          </div>

          <div className="current-weather-info">
            <p>
              Wind: {Math.round(weather.windSpeed)} km/h
            </p>

            <p>
              Weather code: {weather.weatherCode}
            </p>
          </div>
        </div>
      )}

      <div className="forecast-grid">
        {forecast.map((day) => (
          <div
            className="forecast-card"
            key={day.date}
          >
            <strong>{day.date}</strong>

            <span>
              {Math.round(day.maxTemperature)}°C
            </span>

            <span className="forecast-min">
              {Math.round(day.minTemperature)}°C
            </span>

            <small>
              Weather code: {day.weatherCode}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Weather;