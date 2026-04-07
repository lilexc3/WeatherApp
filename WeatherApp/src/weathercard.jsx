import React from "react";
import StatBlock from "./statblock";

// WMO code descriptions
const getWeatherDescription = (code) => {
  const descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Icy fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Rain showers",
    81: "Moderate showers",
    82: "Heavy showers",
    95: "Thunderstorm",
    99: "Heavy thunderstorm",
  };
  return descriptions[code] ?? "Unknown";
};

// WMO code icons
const getWeatherIcon = (code) => {
  if (code === 0) return "☀️";
  if (code === 1) return "🌤️";
  if (code === 2) return "⛅";
  if (code === 3) return "☁️";
  if (code === 45 || code === 48) return "🌫️";
  if (code >= 51 && code <= 55) return "🌦️";
  if (code >= 61 && code <= 65) return "🌧️";
  if (code >= 71 && code <= 75) return "❄️";
  if (code >= 80 && code <= 82) return "🌧️";
  if (code >= 95) return "⛈️";
  return "🌡️";
};

const WeatherCard = ({
  city,
  temperature,
  apparentTemperature,
  weatherCode,
  windspeed,
  humidity,
}) => {
  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2 className="city-name">{city}</h2>
        <p className="weather-description">
          {getWeatherDescription(weatherCode)}
        </p>
      </div>

      <div className="weather-main">
        <span className="weather-icon">{getWeatherIcon(weatherCode)}</span>
        <span className="temperature">{Math.round(temperature)}°C</span>
      </div>

      {apparentTemperature !== undefined && (
        <p className="feels-like">
          Feels like {Math.round(apparentTemperature)}°C
        </p>
      )}

      <div className="stat-blocks">
        {windspeed !== undefined && (
          <StatBlock label="Wind" value={Math.round(windspeed)} unit=" m/s" />
        )}
        {humidity !== undefined && (
          <StatBlock label="Humidity" value={humidity} unit="%" />
        )}
        <StatBlock label="Weather code" value={weatherCode} unit="" />
      </div>
    </div>
  );
};

export default WeatherCard;
