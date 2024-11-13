import { API_BASE_URL } from "../constants/constants";
import { User } from "../types/types";

// Function to create a trail in the backend. Method: POST
export const createUser = async (user: {}): Promise<User> => {
	const response = await fetch(`${API_BASE_URL}/register-user`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});
	if (!response.ok) {
		throw new Error("Failed to create trail");
	}
	return response.json();
};

// Function to get all trails from the backend. Method: GET
export const fetchUser = async (user: {}): Promise<User> => {
	const response = await fetch(`${API_BASE_URL}/log-in-user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});
	if (!response.ok) {
		throw new Error('Failed to fetch User'); // maybe could have invalid Username/Password here
	}

	return response.json();
};