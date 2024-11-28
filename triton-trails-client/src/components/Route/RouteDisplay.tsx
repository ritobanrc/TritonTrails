import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import polyline from '@mapbox/polyline';
import 'leaflet/dist/leaflet.css';
import { RouteDisplayProps } from "../../types/types"

const RouteDisplay: React.FC<RouteDisplayProps> = ({ source, destination }) => {
    const map = useMap();

    useEffect(() => {
        const fetchRoute = async () => {
            const response = await fetch(
                `https://router.project-osrm.org/route/v1/foot/${source[1]},${source[0]};${destination[1]},${destination[0]}?overview=full`
            );
            const data = await response.json();
            if (data.routes && data.routes.length > 0 && data.routes[0].geometry) {
                const decodedCoords = polyline.decode(data.routes[0].geometry);
                const latlngs: L.LatLngExpression[] = decodedCoords.map((coord: [number, number]) => [coord[0], coord[1]] as [number, number]);

                // Create a polyline from the decoded coordinates
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
