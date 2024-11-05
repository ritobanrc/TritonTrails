import { WEATHER_BASE_URL } from "../constants/constants"
import { Weather } from "../types/types"

export const fetchWeather = async (): Promise<Weather> => {
    const response = await fetch(WEATHER_BASE_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch weather");
    }
    return response.json();
};
