import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { AlertCircle } from "lucide-react";

interface WeatherErrorProps {
    message: string;
    onRetry: () => void;
}

export function WeatherError({ message, onRetry } : WeatherErrorProps){
    return(
        <Card className="w-full max-w-2xl border-destructive">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                Error Loading Weather
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">{message}</p>
                <Button onClick={onRetry} variant="outline">
                Try Again
                </Button>
            </CardContent>
        </Card>
    )
}