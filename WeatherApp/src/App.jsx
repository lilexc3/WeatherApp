import { useState, useEffect } from "react";
import WeatherCard from "./weathercard";

const App = () => {
  const [city, setCity] = useState(null);
  const [input, setInput] = useState("");
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

  // 2. City → weather
  useEffect(() => {
    if (!city) return;

    setWeather(null);
    setError(null);

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
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m,relativehumidity_2m`,
        );
        setWeather(await weatherRes.json());
      } catch (e) {
        setError("Failed to load weather: " + e.message);
      }
    }

    load();
  }, [city]);

  // Обработчик поиска
  function handleSearch() {
    const trimmed = input.trim();
    if (trimmed) {
      setCity(trimmed);
      setInput("");
    }
  }

  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          value={input}
          placeholder="Enter city..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Состояния загрузки и ошибок */}
      {error && <p className="error">{error}</p>}
      {!error && !city && <p className="status">Determining location...</p>}
      {!error && city && !weather && (
        <p className="status">Loading weather...</p>
      )}

      {/* Карточка погоды */}
      {weather && (
        <WeatherCard
          city={city}
          temperature={weather.current.temperature_2m}
          apparentTemperature={weather.current.apparent_temperature}
          weatherCode={weather.current.weathercode}
          windspeed={weather.current.windspeed_10m}
          humidity={weather.current.relativehumidity_2m}
        />
      )}
    </div>
  );
};

export default App;
