export type Trail = {
    id: number,
    name: string,
    image: string,
    description: string,
};
export type Geometry = {
    type: "Polygon";
    coordinates: number[][][];
};
export type Elevation = {
    unitCode: string;
    value: number;
};
export type ForecastPeriod = {
    number: number;
    name: string;
    startTime: string;
    endTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    temperatureTrend: string | null;
    probabilityOfPrecipitation: {
        unitCode: string;
        value: number | null;
    };
    windSpeed: string;
    windDirection: string;
    icon: string;
    shortForecast: string;
    detailedForecast: string;
};
export type Properties = {
    units: string;
    forecastGenerator: string;
    generatedAt: string;
    updateTime: string;
    validTimes: string;
    elevation: Elevation;
    periods: ForecastPeriod[];
};
export type Weather = {
    "@context": string[];
    type: string;
    geometry: Geometry;
    properties: Properties;
};
