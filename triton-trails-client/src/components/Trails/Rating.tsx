import React, { useState, useEffect } from "react";
import { Trail } from "../../types/types";
import { API_BASE_URL } from "../../constants/constants";
import "./Rating.css";

export const TrailRating: React.FC<{ trail: Trail; onRatingChange?: (rating: number) => void }> = ({ trail, onRatingChange }) => {
    // Adapted substantially from https://www.putzisan.com/articles/html-css-star-rating-input
    // State to track the selected rating
    const [currentRating, setCurrentRating] = useState<number | null>(null);
    useEffect(() => {
        // Fetch the current rating for the trail
        const fetchRating = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/rating/${trail.id}`, {
                    credentials: 'include'
                });

                response.json().then((res) => {
                    setCurrentRating(Number(res.rating));
                });
            } catch (error) {
                console.error("Failed to fetch rating:", error);
                setCurrentRating(0);
            }
        };

        fetchRating();
    }, [trail.id]);

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRating = Number(event.target.value);
        setCurrentRating(newRating); // Update the UI optimistically

        if (onRatingChange) {
            onRatingChange(newRating);
        }
    };

    const ratings = Array.from({ length: 5 }, (_, i) => 5 - i);

    return (
        <div className="star-rating">
            {ratings.map((value) => (
                <React.Fragment key={value}>
                    <input
                        type="radio"
                        id={`sr-${trail.id}-${value}`}
                        name={`star-rating-${trail.id}`}
                        value={value}
                        className="rating-input"
                        checked={currentRating === value}
                        onChange={handleRatingChange}
                    />
                    <label className="rating-label" htmlFor={`sr-${trail.id}-${value}`}>★</label>
                </React.Fragment>
            ))}
        </div>
    );
}
