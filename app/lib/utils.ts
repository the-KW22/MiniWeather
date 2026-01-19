import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]){
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getWindDirection(deg: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

export function getAQIInfo(aqi: number): {
  level: string;
  color: string;
  description: string;
} {
  if (aqi <= 50) {
    return {
      level: "Good",
      color: "text-green-600",
      description: "Air quality is satisfactory",
    };
  } else if (aqi <= 100) {
    return {
      level: "Moderate",
      color: "text-yellow-600",
      description: "Acceptable for most people",
    };
  } else if (aqi <= 150) {
    return {
      level: "Unhealthy for Sensitive Groups",
      color: "text-orange-600",
      description: "Sensitive groups should limit outdoor activity",
    };
  } else if (aqi <= 200) {
    return {
      level: "Unhealthy",
      color: "text-red-600",
      description: "Everyone may experience health effects",
    };
  } else if (aqi <= 300) {
    return {
      level: "Very Unhealthy",
      color: "text-purple-600",
      description: "Health alert: everyone may experience serious effects",
    };
  } else {
    return {
      level: "Hazardous",
      color: "text-red-900",
      description: "Health warning of emergency conditions",
    };
  }
}

export function getWeatherIconUrl( icon: string) : string {
  return (`https://openweathermap.org/img/wn/${icon}@2x.png`);
}