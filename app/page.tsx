"use client";

import { useState, useEffect } from "react";
import { WeatherWidget } from "@/app/components/weather/weather-widget";
import { WeatherSkeleton } from "@/app/components/weather/weather-skeleton";
import { WeatherError } from "@/app/components/weather/weather-error";
import { getCurrentWeather } from "@/app/lib/weather-api";
import { getAirQuality } from "@/app/lib/airvisual-api";
import { CurrentWeather, AirQuality } from "@/app/types/weather";

export default function HomePage() {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [airQuality, setAirQuality] = useState<AirQuality | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const defaultLat = parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LAT || "3.139");
  const defaultLon = parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LON || "101.6869");

  const fetchWeatherData = async () => {
    try{
      setLoading(true);
      setError(null);

      const [ weatherData, airData ] = await Promise.all([
        getCurrentWeather(defaultLat, defaultLon),
        getAirQuality(defaultLat, defaultLon).catch(() => null),
      ]);

      setWeather(weatherData);
      setAirQuality(airData);
    } catch (err){
      setError(err instanceof Error ? err.message : "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-2xl">
        {loading && <WeatherSkeleton />}
        
        {error && !loading && (
          <WeatherError message={error} onRetry={fetchWeatherData} />
        )}
        
        {weather && !loading && !error && (
          <WeatherWidget weather={weather} airQuality={airQuality} />
        )}
      </div>
    </main>
  );
}