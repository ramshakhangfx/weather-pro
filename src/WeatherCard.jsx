import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

function WeatherCard({ weather }) {
  const hourly = weather.hourly.time.map((t, i) => ({
    time: new Date(t).getHours() + ":00",
    temp: weather.hourly.temperature_2m[i],
    rain: weather.hourly.precipitation_probability[i],
  }));

  return (
    <motion.div
      className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-semibold mb-2">
        {weather.city}, {weather.country}
      </h2>
      <p className="text-lg">
        🌡 {weather.current.temperature_2m}°C | Feels Like{" "}
        {weather.current.apparent_temperature}°C
      </p>
      <p>💧 Humidity: {weather.current.relative_humidity_2m}%</p>
      <p>🌬 Wind: {weather.current.windspeed_10m} km/h</p>

      <h3 className="mt-4 text-xl">Hourly Forecast</h3>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <LineChart data={hourly.slice(0, 12)}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#ffcc00" />
            <Line type="monotone" dataKey="rain" stroke="#00ccff" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default WeatherCard;
