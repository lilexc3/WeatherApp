import React from "react";
import StatBlock from "./statblock";

const WeatherCard = ({ city, temperature, weatherCode }) => {
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <StatBlock label="Temperature" value={temperature} unit="°C" />
      <StatBlock label="Weather Code" value={weatherCode} unit="" />
    </div>
  );
};

export default WeatherCard;
