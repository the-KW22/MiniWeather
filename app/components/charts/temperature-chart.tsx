import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ForecastItem } from "@/app/types/weather";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatTime } from "@/app/lib/utils";

interface TemperatureChartProps {
  forecast: ForecastItem[];
}

export function TemperatureChart({ forecast }: TemperatureChartProps) {
  // Take first 8 items (24 hours with 3-hour intervals)
  const chartData = forecast.slice(0, 8).map((item) => ({
    time: formatTime(item.dt),
    temp: Math.round(item.temp),
    feels_like: Math.round(item.feels_like),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>24-Hour Temperature Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="time" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              label={{ value: '°C', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Temperature"
              dot={{ fill: 'hsl(var(--primary))' }}
            />
            <Line 
              type="monotone" 
              dataKey="feels_like" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Feels like"
              dot={{ fill: 'hsl(var(--muted-foreground))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}