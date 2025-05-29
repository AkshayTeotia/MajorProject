/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Weather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    name: "Delhi",
    latitude: 28.69,
    longitude: 77.72,
  });
  const [showHourly, setShowHourly] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, [selectedLocation]);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation.latitude}&longitude=${selectedLocation.longitude}&current=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async (searchQuery) => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=5&language=en&format=json`
      );
      const geoData = await response.json();
      setSuggestions(geoData.results || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching location data.");
    }
  };

  const handleLocationChange = (e) => {
    setQuery(e.target.value);
    fetchLocations(e.target.value);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setQuery(location.name);
    setSuggestions([]);
  };

  if (loading) return <div className="text-2xl font-semibold text-center pt-14">Loading...</div>;
  if (error) return <div className="text-red-600 text-center font-medium">{error}</div>;

  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Weather Forecast</h2>

      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={handleLocationChange}
          placeholder="Search location..."
          className="border border-gray-300 p-3 w-full rounded-md shadow-sm"
        />
        {suggestions.length > 0 && (
          <ul className="absolute w-full bg-white border mt-1 rounded shadow-md z-10">
            {suggestions.map((loc, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() =>
                  handleLocationSelect({
                    name: loc.name,
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                  })
                }
              >
                {loc.name}, {loc.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      <CurrentConditions data={data} onHourlyClick={() => setShowHourly(true)} selectedLocation={selectedLocation.name} />

      <AnimatePresence>
        {showHourly && (
          <HourlyForecast data={data.hourly} onClose={() => setShowHourly(false)} />
        )}
      </AnimatePresence>

      <SevenDayForecast data={data} />
    </motion.div>
  );
};

const CurrentConditions = ({ data, onHourlyClick, selectedLocation }) => {
  if (!data) return null;

  return (
    <motion.div
      className="bg-green-50 p-5 rounded-lg mb-6 shadow-md"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-semibold mb-3">Current Conditions: {selectedLocation}</h3>
      <p>🌡 Temperature: {data.current.temperature_2m}°C</p>
      <p>💧 Humidity: {data.current.relative_humidity_2m}%</p>
      <p>🌥 Condition: {mapWeatherCodeToCondition(data.current.weather_code)}</p>
      <p>🌧 Rain Chance: {data.current.precipitation_probability}%</p>
      <button
        onClick={onHourlyClick}
        className="mt-3 px-4 py-2 cursor-pointer bg-green-600 text-white rounded hover:bg-green-700"
      >
        Hourly Forecast
      </button>
    </motion.div>
  );
};

const HourlyForecast = ({ data, onClose }) => {
  if (!data || !data.time) return null;

  return (
    <motion.div
      className="mt-6 bg-white shadow-md rounded-lg p-5 w-full mb-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-2xl font-semibold">Hourly Forecast</h3>
        <button onClick={onClose} className="text-red-600 font-semibold hover:scale-110">
          ✖
        </button>
      </div>
      <div className="flex overflow-x-auto space-x-4 p-2">
        {data.time.map((time, index) => (
          <motion.div
            key={index}
            className="min-w-[160px] bg-green-100 p-3 rounded-md shadow-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <p className="text-sm font-medium text-white bg-green-400 py-1 rounded">
              {new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
            <p>{mapWeatherCodeToCondition(data.weather_code[index])}</p>
            <p>🌡 {data.temperature_2m[index]}°C</p>
            <p>💧 {data.relative_humidity_2m[index]}%</p>
            <p>🌧 {data.precipitation_probability[index]}%</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const SevenDayForecast = ({ data }) => {
  if (!data || !data.daily) return null;

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-semibold mb-4">7-Day Forecast</h3>
      <div className="bg-white shadow-md rounded-lg p-5">
        <div className="grid grid-cols-4 gap-4 font-medium border-b pb-2 text-center">
          <span>Date</span>
          <span>Condition</span>
          <span>Temp (Max/Min)</span>
          <span>Rain %</span>
        </div>
        {data.daily.time.map((date, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 py-3 border-b last:border-b-0 text-center">
            <span>{new Date(date).toLocaleDateString("en-GB")}</span>
            <span>{mapWeatherCodeToCondition(data.daily.weather_code[index])}</span>
            <span>
              {data.daily.temperature_2m_max[index]}°C / {data.daily.temperature_2m_min[index]}°C
            </span>
            <span>🌧 {data.daily.precipitation_probability_max[index]}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const mapWeatherCodeToCondition = (code) => {
  const weatherConditions = {
    0: "☀ Clear",
    1: "🌤 Mainly Clear",
    2: "⛅ Partly Cloudy",
    3: "☁ Cloudy",
    45: "🌫 Fog",
    48: "🌫 Rime Fog",
    51: "🌧 Drizzle",
    53: "🌧 Moderate Drizzle",
    55: "🌧 Heavy Drizzle",
    61: "🌧 Light Rain",
    63: "🌧 Moderate Rain",
    65: "🌧 Heavy Rain",
    80: "🌦 Light Showers",
    81: "🌦 Moderate Showers",
    82: "🌧 Heavy Showers",
  };
  return weatherConditions[code] || "Unknown";
};

export default Weather;
