import { API_BASE_URL } from "../constants/constants";
import { Trail, Route } from "../types/types";

// Function to create a trail in the backend. Method: POST
export const createTrail = async (trail: Trail): Promise<Trail> => {
	const response = await fetch(`${API_BASE_URL}/trails`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
        credentials: 'include',
		body: JSON.stringify(trail),
	});
	if (!response.ok) {
		throw new Error("Failed to create trail");
	}
	return response.json();
};

// Function to get all trails from the backend. Method: GET
export const fetchTrails = async (): Promise<Trail[]> => {
	const response = await fetch(`${API_BASE_URL}/trails`);
	if (!response.ok) {
		throw new Error('Failed to fetch trails');
	}

	// Parsing the response to get the data
	let trailList = response.json().then((jsonResponse) => {
		console.log("data in fetchTrails", jsonResponse);
		return jsonResponse.data;
	});

	console.log("response in fetchTrails", trailList);
	return trailList;
};

// Function to create a route associated with a trail. Method: POST
export const createRoute = async (trailId: number, route: Omit<Route, "TrailId">): Promise<Route> => {
    const response = await fetch(`${API_BASE_URL}/trails/${trailId}/routes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(route),
    });

    if (!response.ok) {
        throw new Error("Failed to create route");
    }
    return response.json();
};

// Function to get route associated with trail
export const fetchRoute = async (trailId:number) => {
    try {
        const response = await fetch(`${API_BASE_URL}/trails/${trailId}/routes`);
        if (!response.ok) {
            throw new Error('Failed to fetch routes');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching routes:', error);
        throw error;
    }
};
export const markTrailAsVisited = async (userId: number, trailId: number, rating: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/visited?userId=${userId}&trailId=${trailId}&rating=${rating}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error("Failed to mark trail as visited");
    }
};

export const fetchVisitedTrails = async (userId: number): Promise<Trail[]> => {
	const response = await fetch(`${API_BASE_URL}/visited/${userId}`);
	if (!response.ok) {
		throw new Error('Failed to fetch visited trails');
	}

	// Parsing the response to get the data
	let trailList = response.json().then((jsonResponse) => {
		console.log("data in fetchTrails", jsonResponse);
		return jsonResponse.data;
	});

	console.log("response in fetchTrails", trailList);
	return trailList;
};
