import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

export function WeatherSkeleton(){
    return(
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <Skeleton className="h-6 w-48" />
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-20 rounded-full" />

                    <div className="space-y-2">
                        <Skeleton className="h-12 w-32" />
                        <Skeleton className="h-6 w-40" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-8 w-16" />
                        </div>
                    ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-4 w-full" />
                </div>

                <div className="flex gap-2">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 flex-1" />
                </div>
            </CardContent>
        </Card>
    )
}