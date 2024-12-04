import React, { useContext, useState, useEffect } from "react";
import { useAppContext, AppContext } from '../../context/AppContext'; // Corrected the import
import { Trail } from "../../types/types";
import { fetchTrails, fetchRoute, markTrailAsVisited } from "../../utils/trail-utils";
import { API_BASE_URL } from "../../constants/constants";
import Map from "../Map/Map";
import "./TrailList.css";
import { getUserInfo } from '../../utils/user-utils';

const TrailDisplay: React.FC<{ trail: Trail }> = ({ trail }) => {
    const [images, setImages] = useState([]);
    const { user, setUser } = useAppContext();
    const [error, setError] = useState(''); // State to hold any error messages

    useEffect(() => {
        if (!user) {
            getUserInfo().then(setUser).catch(e => {
                console.error('Failed to fetch user info:', e);
                setError('Failed to fetch user info. Please try reloading the page.');
            });
        }
    }, [user, setUser]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/trail_images/` + trail.id);
                const data = await res.json();
                setImages(data);
            } catch (error) {
                console.error('Error fetching images:', error);
                setError('Failed to load images.');
            }
        };

        fetchImages();
        fetchRoute(trail.id);
    }, [trail.id]);

    const handleVisit = async () => {
        if (!user) {
            alert('User information is not available. Please log in.');
            return;
        }
        try {
            await markTrailAsVisited(user.id, trail.id);
            alert("Trail marked as visited!");
        } catch (error) {
            console.error('Failed to mark trail as visited:', error);
            alert("Failed to mark trail as visited. Please try again.");
        }
    };

    if (error) {
        return <p className="error">{error}</p>; // Show any error message if present
    }

    return (
        <div className="ListTrails">
            <div className="rounded-div">
                <p className="trail-name">{trail.name}</p>
                <div className="trail-details">
                    <div className="trail-visuals">
                        <div className="trail-content">
                            {images.length > 0 ? (
                                <img className="trail-image" src={`${API_BASE_URL}/image/` + images[0]} alt={trail.name} />
                            ) : <p>No images available</p>}
                        </div>
                        <Map trailId={trail.id} />
                    </div>
                    <p className="trail-description">{trail.description}</p>
                    <button onClick={handleVisit} disabled={!user} className="visit-button">Mark as Visited</button>
                </div>
            </div>
        </div>
    );
};

const TrailList = () => {
    const { trails, setTrails } = useContext(AppContext);

    useEffect(() => {
        const loadTrails = async () => {
            try {
                const trailsList = await fetchTrails();
                setTrails(trailsList);
            } catch (err) {
                console.log(err);
            }
        };
        loadTrails();
    }, []);

    return (
        <div className="box">
            <div className="ListTrails">
                {trails.map((trail) => (
                    <TrailDisplay key={trail.id} trail={trail} />
                ))}
            </div>
        </div>
    );
};

export default TrailList;