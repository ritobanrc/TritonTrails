import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { Trail } from "../../types/types";
import { fetchTrails } from "../../utils/trail-utils";
import "./TrailList.css"

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
              <div className="rounded-div">
                {/* <h2>{trail.id}</h2> */}
                <p className="trail-name">{trail.name}</p>
                <img className="trail-image" src={trail.image} alt={trail.name} /> 
                <p className="trail-description">{trail.description}</p>      
              </div>      
            ))}
            </ul>
          </div>
        </div>
    </div>
  );
};
export default TrailList;
