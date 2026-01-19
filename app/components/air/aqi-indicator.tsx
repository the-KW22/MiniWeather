import { getAQIInfo } from "@/app/lib/utils";

interface AQIIndicatorProp {
    aqi: number;
}

export function AQIIndicator({aqi} : AQIIndicatorProp){
    const { level, color, description } = getAQIInfo(aqi);

    return(
        <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">
                    {aqi}
                </span>

                <span className={`text-sm font-semibold ${color}`}>
                    {level}
                </span>

                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}