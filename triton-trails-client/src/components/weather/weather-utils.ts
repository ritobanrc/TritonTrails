// import { WEATHER_BASE_URL } from "../../constants/constants"
// export const fetchWeather = async (): Promise<number> => 
// {
//     const response = await fetch(`${API_BASE_URL}/weather`);
//     if (!response.ok)
//     {
//         throw new Error ('Failed to fetch weather'); 
//     }
//     const weather = await response.json(); 
//     console.log("response in fetchWeather", weather); 
//     return weather.data; 
// }
// export const updateWeather = async (): Promise<number> =>
// {
//     const response = await fetch(`${API_BASE_URL}/weather`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount: newWeather }),
//     });

//     if (!response.ok) {
//         throw new Error('Failed to update weather');
//     }
//     const updatedWeather = await response.json();

//     console.log("response in updateBudget", updatedWeather);
//     return updatedWeather;
// }