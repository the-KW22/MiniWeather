"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { AQIOverviewCard } from "@/app/components/air/aqi-overview-card";
import { PollutantBreakdown } from "@/app/components/air/pollutant-breakdown";
import { HealthRecommendations } from "@/app/components/air/health-recommendations";
import { WeatherInfo } from "@/app/components/air/weather-info";
import { WeatherSkeleton } from "@/app/components/weather/weather-skeleton";
import { WeatherError } from "@/app/components/weather/weather-error";
import { getAirQuality } from "@/app/lib/airvisual-api";
import { AirQuality } from "@/app/types/weather";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AirPage() {
  const [airQuality, setAirQuality] = useState<AirQuality | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const defaultLat = parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LAT || "3.139");
  const defaultLon = parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LON || "101.6869");

  const fetchAirQuality = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAirQuality(defaultLat, defaultLon);
      setAirQuality(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch air quality data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirQuality();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen p-4 md:p-8 bg-linear-to-br from-green-50 to-green-100">
        <div className="max-w-6xl mx-auto space-y-6">
          <WeatherSkeleton />
          <WeatherSkeleton />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-green-50 to-green-100">
        <div className="w-full max-w-2xl">
          <WeatherError message={error} onRetry={fetchAirQuality} />
        </div>
      </main>
    );
  }

  if (!airQuality) {
    return null;
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-linear-to-br from-green-50 to-green-100">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back button */}
        <Link href="/">
          <Button variant="outline" size="sm" className="mb-3">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* AQI Overview */}
        <AQIOverviewCard airQuality={airQuality} />

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            <PollutantBreakdown airQuality={airQuality} />
            <WeatherInfo airQuality={airQuality} />
          </div>

          {/* Right column */}
          <div>
            <HealthRecommendations airQuality={airQuality} />
          </div>
        </div>
      </div>
    </main>
  );
}