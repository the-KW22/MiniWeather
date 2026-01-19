import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { AirQuality } from "@/app/types/weather";
import { getAQIInfo } from "@/app/lib/utils";
import { Wind, MapPin, Calendar } from "lucide-react";

interface AQIOverviewCardProps {
  airQuality: AirQuality;
}

export function AQIOverviewCard({ airQuality }: AQIOverviewCardProps) {
  const { level, color, description } = getAQIInfo(airQuality.aqi);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="h-5 w-5" />
          Air Quality - {airQuality.city}, {airQuality.country}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main AQI Display */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Air Quality Index</p>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-bold">{airQuality.aqi}</span>
              <div>
                <p className={`text-2xl font-semibold ${color}`}>{level}</p>
                <p className="text-sm text-muted-foreground">US AQI</p>
              </div>
            </div>
          </div>
          
          {/* AQI Scale Visual */}
          <div className="hidden md:block">
            <AQIScale currentAQI={airQuality.aqi} />
          </div>
        </div>

        {/* Description */}
        <div className="p-4 rounded-lg bg-muted/50">
          <p className="text-sm font-medium mb-1">Health Implications</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Wind className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <p className="text-xs text-muted-foreground">Main Pollutant</p>
              <p className="text-lg font-semibold uppercase">{airQuality.main_pollutant}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-lg font-semibold">{airQuality.state}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// AQI Scale Component
function AQIScale({ currentAQI }: { currentAQI: number }) {
  const ranges = [
    { max: 50, color: "bg-green-500", label: "Good" },
    { max: 100, color: "bg-yellow-500", label: "Moderate" },
    { max: 150, color: "bg-orange-500", label: "Unhealthy for Sensitive" },
    { max: 200, color: "bg-red-500", label: "Unhealthy" },
    { max: 300, color: "bg-purple-500", label: "Very Unhealthy" },
    { max: 500, color: "bg-red-900", label: "Hazardous" },
  ];

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground text-center mb-3">AQI Scale</p>
      {ranges.map((range, index) => {
        const isActive = currentAQI <= range.max && (index === 0 || currentAQI > ranges[index - 1].max);
        return (
          <div key={range.max} className="flex items-center gap-2">
            <div className={`w-16 h-6 rounded ${range.color} ${isActive ? 'ring-2 ring-offset-2 ring-primary' : 'opacity-40'}`} />
            <span className={`text-xs ${isActive ? 'font-semibold' : 'text-muted-foreground'}`}>
              {index === 0 ? '0' : ranges[index - 1].max + 1}-{range.max}
            </span>
          </div>
        );
      })}
    </div>
  );
}