import { AppContext } from "../../context/AppContext";
import { useContext, useState, useEffect } from "react";
import { Trail } from "../../types/types";
import { fetchTrails, fetchRoute } from "../../utils/trail-utils";
import { API_BASE_URL } from "../../constants/constants";
import "./TrailList.css"
import Map from "../Map/Map"

const TrailDisplay: React.FC<{ trail: Trail }> = ({ trail }) => {
    const [images, setImages] = useState([]); // State to hold images array

    useEffect(() => {
        // Fetch images only once when the component mounts
        const fetchImages = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/trail_images/` + trail.id, {
                    method: 'GET',
                });
                const data = await res.json();
                setImages(data); // Update state with the fetched images array
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
        fetchRoute(trail.id);
    }, [trail.id]); // Depend on trail.id so it refetches if the trail changes

    return (
        <div className="ListTrails">
        <div className="rounded-div">
            <p className="trail-name">{trail.name}</p>
            <div className="trail-details">
                <div className="trail-visuals">  {/* Container for image and map only */}
                    <div className="trail-content">
                        {images.length > 0 && (
                            <img
                                className="trail-image"
                                src={`${API_BASE_URL}/image/` + images[0]}
                                alt={trail.name}
                            />
                        )}
                    </div>
                    <div className="trail-map" data-testid="map">
                        <Map trailId={trail.id}/>
                    </div>
                </div>
                <p className="trail-description">{trail.description}</p> {/* Separate description */}
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

