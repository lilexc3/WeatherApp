import { useState, useEffect } from "react";
import WeatherCard from "./weathercard";

const App = () => {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // 1. Geolocation → city name
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const data = await res.json();
          const foundCity =
            data.address.city || data.address.town || data.address.village;

          if (!foundCity) {
            setError("Could not determine city from your location");
            return;
          }

          setCity(foundCity);
        } catch (e) {
          setError("Failed to get location name: " + e.message);
        }
      },
      (err) => {
        setError("Location access denied: " + err.message);
      },
    );
  }, []);

  // 2. City name → weather
  useEffect(() => {
    if (!city) return;

    async function load() {
      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,
        );
        const geo = await geoRes.json();

        if (!geo.results || geo.results.length === 0) {
          setError(`City "${city}" not found`);
          return;
        }

        const { latitude, longitude } = geo.results[0];

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode`,
        );
        const weatherData = await weatherRes.json();
        setWeather(weatherData);
      } catch (e) {
        setError("Failed to load weather: " + e.message);
      }
    }

    load();
  }, [city]);

  if (error) return <p>Error: {error}</p>;
  if (!city) return <p>Determining location...</p>;
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
