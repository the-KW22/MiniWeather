import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { AirQuality } from "@/app/types/weather";
import { Heart, AlertTriangle, Info } from "lucide-react";

interface HealthRecommendationsProps {
  airQuality: AirQuality;
}

export function HealthRecommendations({ airQuality }: HealthRecommendationsProps) {
  const recommendations = getRecommendations(airQuality.aqi);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Health Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <RecommendationItem key={index} recommendation={rec} />
        ))}
      </CardContent>
    </Card>
  );
}

interface Recommendation {
  type: "info" | "warning" | "alert";
  title: string;
  message: string;
}

function getRecommendations(aqi: number): Recommendation[] {
  if (aqi <= 50) {
    return [
      {
        type: "info",
        title: "Air quality is good",
        message: "It's a great day to be active outside! Air quality is ideal for outdoor activities.",
      },
      {
        type: "info",
        title: "No restrictions",
        message: "Everyone can enjoy normal outdoor activities without any health concerns.",
      },
    ];
  }

  if (aqi <= 100) {
    return [
      {
        type: "info",
        title: "Air quality is acceptable",
        message: "Air quality is acceptable for most people. Unusually sensitive individuals should consider limiting prolonged outdoor exertion.",
      },
      {
        type: "warning",
        title: "Sensitive groups take note",
        message: "People with respiratory conditions should monitor their symptoms and reduce prolonged or heavy outdoor exertion if symptoms occur.",
      },
    ];
  }

  if (aqi <= 150) {
    return [
      {
        type: "warning",
        title: "Unhealthy for sensitive groups",
        message: "People with heart or lung disease, older adults, children, and people with asthma should reduce prolonged or heavy outdoor exertion.",
      },
      {
        type: "info",
        title: "General public",
        message: "The general public is less likely to be affected, but should consider reducing prolonged outdoor exertion.",
      },
    ];
  }

  if (aqi <= 200) {
    return [
      {
        type: "alert",
        title: "Unhealthy air quality",
        message: "Everyone should reduce prolonged or heavy outdoor exertion. People with heart or lung disease, older adults, children, and people with asthma should avoid prolonged outdoor exertion.",
      },
      {
        type: "warning",
        title: "Consider staying indoors",
        message: "Close windows and use air purifiers if available. Wear a mask if you must go outside.",
      },
    ];
  }

  if (aqi <= 300) {
    return [
      {
        type: "alert",
        title: "Very unhealthy",
        message: "Everyone should avoid all outdoor physical activity. Keep windows closed and use air purifiers.",
      },
      {
        type: "alert",
        title: "High-risk groups",
        message: "People with heart or lung disease, older adults, children, and people with asthma should remain indoors and keep activity levels low.",
      },
    ];
  }

  return [
    {
      type: "alert",
      title: "Hazardous conditions",
      message: "Health warning of emergency conditions. Everyone should avoid all outdoor activities and stay indoors with windows closed.",
    },
    {
      type: "alert",
      title: "Seek medical attention",
      message: "If you experience symptoms such as difficulty breathing, seek medical attention immediately.",
    },
  ];
}

function RecommendationItem({ recommendation }: { recommendation: Recommendation }) {
  const icons = {
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-orange-500" />,
    alert: <AlertTriangle className="h-5 w-5 text-red-500" />,
  };

  const bgColors = {
    info: "bg-blue-50 border-blue-200",
    warning: "bg-orange-50 border-orange-200",
    alert: "bg-red-50 border-red-200",
  };

  return (
    <div className={`p-4 rounded-lg border ${bgColors[recommendation.type]}`}>
      <div className="flex gap-3">
        <div className="shrink-0 mt-0.5">{icons[recommendation.type]}</div>
        <div>
          <h4 className="font-semibold text-sm mb-1">{recommendation.title}</h4>
          <p className="text-sm text-muted-foreground">{recommendation.message}</p>
        </div>
      </div>
    </div>
  );
}