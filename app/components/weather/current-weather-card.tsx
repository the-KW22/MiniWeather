import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { CurrentWeather } from "@/app/types/weather";
import { getWeatherIconUrl, formatTime, getWindDirection } from "@/app/lib/utils";
import { MapPin, Droplets, Wind, Gauge, Eye, Sunrise, Sunset } from "lucide-react";

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
}

export function CurrentWeatherCard({ weather }: CurrentWeatherCardProps) {
  const weatherCondition = weather.weather[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Current Weather - {weather.city}, {weather.country}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main weather display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={getWeatherIconUrl(weatherCondition.icon)}
              alt={weatherCondition.description}
              className="h-24 w-24"
            />
            <div>
              <div className="text-6xl font-bold">{Math.round(weather.temp)}°C</div>
              <p className="text-xl text-muted-foreground capitalize">
                {weatherCondition.description}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Feels like {Math.round(weather.feels_like)}°C
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">High / Low</p>
            <p className="text-2xl font-semibold">
              {Math.round(weather.temp_max)}° / {Math.round(weather.temp_min)}°
            </p>
          </div>
        </div>

        {/* Detailed stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard
            icon={<Droplets className="h-5 w-5" />}
            label="Humidity"
            value={`${weather.humidity}%`}
          />
          <StatCard
            icon={<Wind className="h-5 w-5" />}
            label="Wind"
            value={`${weather.wind_speed} m/s`}
            subtitle={getWindDirection(weather.wind_deg)}
          />
          <StatCard
            icon={<Gauge className="h-5 w-5" />}
            label="Pressure"
            value={`${weather.pressure} hPa`}
          />
          <StatCard
            icon={<Eye className="h-5 w-5" />}
            label="Visibility"
            value={`${(weather.visibility / 1000).toFixed(1)} km`}
          />
          <StatCard
            icon={<Sunrise className="h-5 w-5" />}
            label="Sunrise"
            value={formatTime(weather.sunrise)}
          />
          <StatCard
            icon={<Sunset className="h-5 w-5" />}
            label="Sunset"
            value={formatTime(weather.sunset)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Small stat card component
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
}

function StatCard({ icon, label, value, subtitle }: StatCardProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
      <div className="text-muted-foreground mt-1">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}