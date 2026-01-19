import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { AirQuality } from "@/app/types/weather";
import { Activity } from "lucide-react";

interface PollutantBreakdownProps {
  airQuality: AirQuality;
}

export function PollutantBreakdown({ airQuality }: PollutantBreakdownProps) {
  const pollutants = [
    {
      name: "PM2.5",
      value: airQuality.pollution.aqius,
      unit: "US AQI",
      description: "Fine particulate matter (2.5 micrometers or smaller)",
      isMain: airQuality.pollution.mainus === "p2",
    },
    {
      name: "PM10",
      value: airQuality.pollution.aqicn,
      unit: "CN AQI",
      description: "Particulate matter (10 micrometers or smaller)",
      isMain: airQuality.pollution.maincn === "p1",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Pollutant Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pollutants.map((pollutant) => (
          <PollutantCard key={pollutant.name} pollutant={pollutant} />
        ))}
        
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> AQI values are based on the concentration of pollutants in the air. 
            The main pollutant is the one with the highest concentration.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

interface PollutantCardProps {
  pollutant: {
    name: string;
    value: number;
    unit: string;
    description: string;
    isMain: boolean;
  };
}

function PollutantCard({ pollutant }: PollutantCardProps) {
  const getColor = (value: number) => {
    if (value <= 50) return "bg-green-500";
    if (value <= 100) return "bg-yellow-500";
    if (value <= 150) return "bg-orange-500";
    if (value <= 200) return "bg-red-500";
    if (value <= 300) return "bg-purple-500";
    return "bg-red-900";
  };

  const percentage = Math.min((pollutant.value / 300) * 100, 100);

  return (
    <div className="p-4 rounded-lg bg-muted/50">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{pollutant.name}</h4>
            {pollutant.isMain && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                Main
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{pollutant.description}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{pollutant.value}</p>
          <p className="text-xs text-muted-foreground">{pollutant.unit}</p>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor(pollutant.value)} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}