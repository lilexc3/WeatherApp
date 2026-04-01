import React from "react";
import Statblock from "./statblock";
import { useState, useEffect } from "react";
import Weathercard from "./weathercard";

const App = () => {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);

  // 1. Geolocation of City
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      );
      const data = await res.json();
      setCity(data.address.city || data.address.town);
    });
  }, []);

  // 2. The Weather of City from Geolocation
  useEffect(() => {
    if (!city) return;
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
      .then((r) => r.json())
      .then(async (geo) => {
        const { latitude, longitude } = geo.results[0];
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode`,
        );
        setWeather(await res.json());
      });
  }, [city]);

  if (!city) return <p>Determine the location...</p>;
  if (!weather) return <p>Loading weather...</p>;

  return (
    <WeatherCard
      city={city}
      temperature={weather.current.temperature_2m}
      weatherCode={weather.current.weathercode}
    />
  );
};

export default App;
