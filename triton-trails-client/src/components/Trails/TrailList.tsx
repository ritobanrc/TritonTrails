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
            {images.length > 0 && (
                <img
                    className="trail-image"
                    src={`${API_BASE_URL}/image/` + images[0]} // Display the first image
                    alt={trail.name}
                />
            )}
            <p className="trail-description">{trail.description}</p>
        </div>
    );
};

const TrailList = () => {
  const { trails, setTrails } = useContext(AppContext);

  useEffect(() => {
      loadTrails();
  }, []);

  const loadTrails = async () => {
      try {
          const trailsList = await fetchTrails();
          setTrails(trailsList);
      } catch (err: any) {
          console.log(err.message);
      }
  };
  return (
    <div className="box">
        <div className="search-content">
          <div className = "ListTrails">
            <ul className="list-group">
                {trails.map((trail: Trail) => (
                    <TrailDisplay key={trail.id} trail={trail}  /> // Use JSX to render the component
                ))}
            </ul>
          </div>
        </div>
    </div>
  );
};

export default TrailList;
