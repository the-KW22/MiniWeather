"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { CurrentWeatherCard } from "@/app/components/weather/current-weather-card";
import { TemperatureChart } from "@/app/components/charts/temperature-chart";
import { ForecastList } from "@/app/components/weather/forecast-list";
import { WeatherSkeleton } from "@/app/components/weather/weather-skeleton";
import { WeatherError } from "@/app/components/weather/weather-error";
import { getCurrentWeather, getForecast } from "@/app/lib/weather-api";
import { CurrentWeather, Forecast } from "@/app/types/weather";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function WeatherPage(){
    const [weather, setWeather] = useState<CurrentWeather | null>(null);
    const [forecast, setForecast] = useState<Forecast | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const defaultLat = parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LAT || "3.139");
    const defaultLon = parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LON || "101.6869");

    const fetchWeatherData = async () => {
        try{
            setLoading(true);
            setError(null);

            const [weatherData, forecastData] = await Promise.all([
                getCurrentWeather(defaultLat, defaultLon),
                getForecast(defaultLat, defaultLon),
            ]);

            setWeather(weatherData);
            setForecast(forecastData);
        } catch (err){
            setError(err instanceof Error ? err.message: "Failed to fetch weather data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    if(loading){
        return(
            <main className="min-h-screen p-4 md:p-8 bg-linear-to-br from-blue-50 to-blue-100">
                <div className="max-w-6xl mx-auto space-y-6">
                <WeatherSkeleton />
                <WeatherSkeleton />
                </div>
            </main>
        )
    }

    if (error) {
        return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-blue-50 to-blue-100">
            <div className="w-full max-w-2xl">
            <WeatherError message={error} onRetry={fetchWeatherData} />
            </div>
        </main>
        );
    }

  if (!weather || !forecast) {
    return null;
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-linear-to-br from-blue-50 to-blue-100">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back button */}
        <Link href="/">
          <Button variant="outline" size="sm" className="mb-3">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Current weather */}
        <CurrentWeatherCard weather={weather} />

        {/* Temperature chart */}
        <TemperatureChart forecast={forecast.list} />

        {/* Forecast list */}
        <ForecastList forecast={forecast.list} />
      </div>
    </main>
  );
}