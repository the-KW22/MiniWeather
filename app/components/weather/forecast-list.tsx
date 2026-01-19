import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ForecastItem } from "@/app/types/weather";
import { getWeatherIconUrl, formatDate, formatTime } from "@/app/lib/utils";
import { Droplet, Wind } from "lucide-react";

interface ForecastListProps {
  forecast: ForecastItem[];
}

export function ForecastList({ forecast }: ForecastListProps) {
  // Group by date and take one per day
  const dailyForecast = forecast.reduce((acc: ForecastItem[], item) => {
    const date = new Date(item.dt * 1000).toDateString();
    
    // Check if we already have a forecast for this date
    const existingIndex = acc.findIndex(
      (existing) => new Date(existing.dt * 1000).toDateString() === date
    );
    
    if (existingIndex === -1) {
      // New date, add it
      acc.push(item);
    } else {
      // Date exists, keep the one closest to noon (12:00)
      const existingHour = new Date(acc[existingIndex].dt * 1000).getHours();
      const currentHour = new Date(item.dt * 1000).getHours();
      
      if (Math.abs(currentHour - 12) < Math.abs(existingHour - 12)) {
        acc[existingIndex] = item;
      }
    }
    
    return acc;
  }, []).slice(0, 5); // Take first 5 days

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {dailyForecast.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No forecast data available
          </p>
        ) : (
          dailyForecast.map((item) => (
            <ForecastCard key={item.dt} item={item} />
          ))
        )}
      </CardContent>
    </Card>
  );
}

interface ForecastCardProps {
  item: ForecastItem;
}

function ForecastCard({ item }: ForecastCardProps) {
  const weatherCondition = item.weather[0];

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <div className="text-sm font-medium min-w-20">
          {formatDate(item.dt)}
        </div>
        <img
          src={getWeatherIconUrl(weatherCondition.icon)}
          alt={weatherCondition.description}
          className="h-12 w-12"
        />
        <div className="flex-1">
          <p className="font-medium capitalize">{weatherCondition.description}</p>
          <p className="text-sm text-muted-foreground">
            {formatTime(item.dt)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-2xl font-bold">{Math.round(item.temp)}°C</p>
          <p className="text-xs text-muted-foreground">
            {Math.round(item.temp_min)}° / {Math.round(item.temp_max)}°
          </p>
        </div>

        <div className="flex gap-4 text-sm text-muted-foreground min-w-30">
          <div className="flex items-center gap-1">
            <Droplet className="h-4 w-4" />
            <span>{item.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="h-4 w-4" />
            <span>{item.wind_speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
}