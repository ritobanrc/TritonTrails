import { useEffect, useState } from "react";
import { fetchWeather } from "../../utils/weather-utils";
import { Weather, ForecastPeriod } from "../../types/types";

const WeatherDisplay = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);
  const fetchWeatherData = async () => {
    try {
      const weatherData = await fetchWeather();
      setWeather(weatherData);
    } catch (err: any) {
      setError("Failed to load weather data.");
      console.error(err.message);
    }
  };
  if (error) {
    return <div>{error}</div>;
  }

  if (!weather) {
    return <div>Loading weather data...</div>;
  }
  return (
    <div className="alert alert-secondary p-3">
      <h2>Weather Forecast</h2>
      <p>Generated at: {new Date(weather.properties.generatedAt).toLocaleString()}</p>
      <div>
        {weather.properties.periods.map((period: ForecastPeriod) => (
          <div key={period.number} className="forecast-period">
            <h3>{period.name}</h3>
            <p>{new Date(period.startTime).toLocaleString()} - {new Date(period.endTime).toLocaleString()}</p>
            <p><strong>{period.temperature}°{period.temperatureUnit}</strong></p>
            <p>{period.shortForecast}</p>
            <p>Wind: {period.windSpeed} {period.windDirection}</p>
            <img src={period.icon} alt={`${period.shortForecast} icon`} />
            <p>{period.detailedForecast}</p>
          </div>
        ))}
      </div>
    {/* test */}
    </div>
  );
};

export default WeatherDisplay;
