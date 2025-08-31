import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import WeatherCard from "./WeatherCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const geo = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      if (!geo.data.results) {
        alert("City not found!");
        return;
      }
      const { latitude, longitude, name, country } = geo.data.results[0];

      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&hourly=temperature_2m,precipitation_probability,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset&timezone=auto`
      );

      setWeather({ city: name, country, ...res.data });
    } catch (err) {
      console.error(err);
      alert("Error fetching weather data.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800 text-white p-6">
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🌦 Weather Forecast
      </motion.h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded-l-lg text-black w-64"
        />
        <button
          onClick={fetchWeather}
          className="bg-yellow-500 px-4 py-2 rounded-r-lg font-bold"
        >
          Search
        </button>
      </div>

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
