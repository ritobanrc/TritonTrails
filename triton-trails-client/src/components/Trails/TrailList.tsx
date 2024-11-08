import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { Trail } from "../../types/types";
import { fetchTrails } from "../../utils/trail-utils";

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
    <ul className="list-group">
        {trails.map((trail: Trail) => (
        <div>
            {/* <h2>{trail.id}</h2> */}
            <p style={{marginTop: '-60px', fontSize: '1em', fontWeight: 'bold', fontFamily: 'roboto'}}>{trail.name}</p>
            <img src={trail.image} alt={trail.name} style={{ width: '200px' }} /> 
            <p style = {{marginBottom: '90px', fontSize: '1em', fontFamily: 'roboto'}}>{trail.description}</p>      
            </div>
            
        ))}
    </ul>
  );
};
export default TrailList;
