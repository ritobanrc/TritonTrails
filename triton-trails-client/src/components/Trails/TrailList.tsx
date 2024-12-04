import React, { useContext, useState, useEffect } from "react";
import { useAppContext, AppContext } from '../../context/AppContext'; // Corrected the import
import { Trail } from "../../types/types";
import { fetchTrails, fetchRoute, markTrailAsVisited } from "../../utils/trail-utils";
import { API_BASE_URL } from "../../constants/constants";
import Map from "../Map/Map";
import "./TrailList.css";
import { getUserInfo } from '../../utils/user-utils';
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