import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { RouteDisplayProps } from "../../types/types";

const RouteDisplay: React.FC<RouteDisplayProps> = ({ source, destination }) => {
    const map = useMap();

    useEffect(() => {
        const fetchRoute = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            console.log(apiKey)
            const response = await fetch(
                `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${apiKey}&start=${destination[1]},${destination[0]}&end=${source[1]},${source[0]}`,
                { method: 'GET' }
            );
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                const points = data.features[0].geometry.coordinates;
                const latlngs: L.LatLngExpression[] = points.map((coord: [number, number]) => [coord[1], coord[0]]); // Reverse the coordinates for Leaflet

                // Create a polyline from the coordinates
                const routePolyline = L.polyline(latlngs, { color: "red" });
                routePolyline.addTo(map);

                // Fit map bounds to polyline
                map.fitBounds(routePolyline.getBounds());
            }
        };

        fetchRoute();
    }, [source, destination, map]);

    return null;
};

export default RouteDisplay;
