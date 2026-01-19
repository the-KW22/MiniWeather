import { AirQuality, AirVisualResponse } from "@/app/types/weather";

const API_KEY = process.env.NEXT_PUBLIC_AIRVISUAL_API_KEY;
const BASE_URL = "https://api.airvisual.com/v2";

// Simple in-memory cache
let cache: {
  data: AirQuality | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

// Fetch air quality data by coordinates
export async function getAirQuality(
  lat: number,
  lon: number
): Promise<AirQuality> {
  // Check cache first
  const now = Date.now();
  if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
    console.log("Using cached AirVisual data");
    return cache.data;
  }

  const url = `${BASE_URL}/nearest_city?lat=${lat}&lon=${lon}&key=${API_KEY}`;

  const response = await fetch(url);

  // Handle rate limit error
  if (response.status === 429) {
    // If we have cached data, return it even if expired
    if (cache.data) {
      console.warn("AirVisual rate limit hit, using cached data");
      return cache.data;
    }
    throw new Error("AirVisual API rate limit exceeded. Please try again later.");
  }

  if (!response.ok) {
    throw new Error(`AirVisual API error: ${response.statusText}`);
  }

  const apiData: AirVisualResponse = await response.json();

  // Check if we got valid data
  if (apiData.status !== "success") {
    throw new Error("AirVisual API returned error status");
  }

  const { current, city, state, country } = apiData.data;

  // Transform to our type
  const airQuality: AirQuality = {
    aqi: current.pollution.aqius,
    main_pollutant: current.pollution.mainus,
    timestamp: current.pollution.ts,
    city,
    state,
    country,
    pollution: current.pollution,
    weather: current.weather,
  };

  // Update cache
  cache = {
    data: airQuality,
    timestamp: now,
  };

  return airQuality;
}