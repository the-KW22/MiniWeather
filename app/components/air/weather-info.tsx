import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { AirQuality } from "@/app/types/weather";
import { Cloud, Droplets, Wind, Gauge } from "lucide-react";

interface WeatherInfoProps {
  airQuality: AirQuality;
}

export function WeatherInfo({ airQuality }: WeatherInfoProps) {
  const weather = airQuality.weather;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          Current Weather Conditions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <WeatherStat
            icon={<Cloud className="h-5 w-5" />}
            label="Temperature"
            value={`${weather.tp}°C`}
          />
          <WeatherStat
            icon={<Droplets className="h-5 w-5" />}
            label="Humidity"
            value={`${weather.hu}%`}
          />
          <WeatherStat
            icon={<Wind className="h-5 w-5" />}
            label="Wind Speed"
            value={`${weather.ws} m/s`}
          />
          <WeatherStat
            icon={<Gauge className="h-5 w-5" />}
            label="Pressure"
            value={`${weather.pr} hPa`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface WeatherStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function WeatherStat({ icon, label, value }: WeatherStatProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
      <div className="text-muted-foreground mt-1">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}