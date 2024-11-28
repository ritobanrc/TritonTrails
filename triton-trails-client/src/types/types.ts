export type Trail = {
    id: number,
    name: string,
    image: string,
    description: string,
};
export type User = {
    id: number;
    username: string;
    displayName: string;
    passwordHash: string;
    passwordSalt: string;
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
export type Route = {
    startLatitude: number;
    startLongitude: number;
    endLatitude: number;
    endLongitude: number;
    TrailId: number;
}
export type RouteDisplayProps = {
    source: [number, number];
    destination: [number, number];
}

export type MapProps = {
    trailId: number;
}