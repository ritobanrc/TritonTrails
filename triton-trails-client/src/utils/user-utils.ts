import { API_BASE_URL } from "../constants/constants";
import { User } from "../types/types";
import Cookies from "js-cookie";

// Function to create a User in the backend. Method: POST
export const createUser = async (user: {}): Promise<User> => {
	const response = await fetch(`${API_BASE_URL}/register-user`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});
	if (!response.ok) {
		throw new Error("Failed to create user");
	}
	return response.json();
};

// Function to find User from the backend. Method: POST
export const loginUser = async (user: {}): Promise<{ user: User; token: string }> => {
	const response = await fetch(`${API_BASE_URL}/login-user`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
        credentials: 'include',
		body: JSON.stringify(user),
	});
	if (!response.ok) {
        const errorText = await response.text(); // Get the text response to show specific error messages
        switch (response.status) {
            case 401:
                throw new Error(errorText);  // 'User not found' or 'Invalid password'
            default:
                throw new Error('Login failed due to server error'); // Generic error for other statuses
        }
    }

	return response.json();
};


export const getUserInfo = async (): Promise<User> => {
	const response = await fetch(`${API_BASE_URL}/user-info`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
        credentials: 'include',
	});
	if (!response.ok) {
        const errorText = await response.text(); 
        switch (response.status) {
            case 401:
                throw new Error(errorText);
        }
    }

	return response.json();
};

export const logout = () => {
    Cookies.remove("token", { path: "/" });
}
