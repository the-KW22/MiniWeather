import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { AQIIndicator } from "@/app/components/air/aqi-indicator";
import { getWeatherIconUrl } from "@/app/lib/utils";
import { CurrentWeather, AirQuality } from "@/app/types/weather";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";

interface WeatherWidgetProps {
    weather: CurrentWeather;
    airQuality: AirQuality | null;
}

export function WeatherWidget({ weather, airQuality } : WeatherWidgetProps){
    const weatherCondition = weather.weather[0];

    return(
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5"/>

                    {weather.city}, {weather.country}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src={getWeatherIconUrl(weatherCondition.icon)}
                            alt={weatherCondition.description}
                            className="h-20 w-20"
                            width={20}
                            height={20}
                        />

                        <div>
                            <div className="text-5xl font-bold">
                                {Math.round(weather.temp)}°C
                            </div>

                            <p className="text-lg text-muted-foreground capitalize">
                                {weatherCondition.description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Feels like</p>
                        <p className="text-2xl font-semibold">{Math.round(weather.feels_like)}</p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">Humidity</p>
                        <p className="text-2xl font-semibold">{weather.humidity}%</p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">Wind Speed</p>
                        <p className="text-2xl font-semibold">{weather.wind_speed} m/s</p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">Pressure</p>
                        <p className="text-2xl font-semibold">{weather.pressure} hPa</p>
                    </div>
                </div>

                {airQuality && (
                    <div className="border-t pt-4">
                        <h3 className="text-sm font-medium mb-2">Air Quality</h3>
                        <AQIIndicator aqi={airQuality.aqi} />
                    </div>
                )}

                <div className="flex gap-2 pt-2">
                    <Link href="/weather" className="flex-1">
                        <Button className="w-full" variant="default">
                        Weather Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/air" className="flex-1">
                        <Button className="w-full" variant="outline">
                        Air Quality Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}