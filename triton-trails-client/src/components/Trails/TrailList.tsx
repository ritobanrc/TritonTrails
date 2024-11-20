import { AppContext } from "../../context/AppContext";
import { useContext, useState, useEffect } from "react";
import { Trail } from "../../types/types";
import { fetchTrails } from "../../utils/trail-utils";
import { API_BASE_URL } from "../../constants/constants";
import "./TrailList.css"

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
    }, [trail.id]); // Depend on trail.id so it refetches if the trail changes

    return (
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
                    <div className="trail-map">
                        <iframe
                            src="https://www.openstreetmap.org/export/embed.html?bbox=-117.26150035858156%2C32.86383591013185%2C-117.23493576049806%2C32.891227612173246&layer=mapnik"
                            title="Trail Map"
                            style={{ width: '100%', height: '100%', border: 'none' }}
                        ></iframe>
                    </div>
                </div>
                <p className="trail-description">{trail.description}</p> {/* Separate description */}
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

