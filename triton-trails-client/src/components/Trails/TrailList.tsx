import React, { useContext, useEffect } from "react";
import { AppContext } from '../../context/AppContext'; // Corrected the import
import { fetchTrails } from "../../utils/trail-utils";
import "./TrailList.css";
import TrailDisplay from './TrailDisplay'

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
