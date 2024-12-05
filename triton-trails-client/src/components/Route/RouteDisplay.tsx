import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import polyline from "@mapbox/polyline";
import "leaflet/dist/leaflet.css";
import { RouteDisplayProps } from "../../types/types";

const RouteDisplay: React.FC<RouteDisplayProps> = ({ source, destination }) => {
  const map = useMap();

  useEffect(() => {
    let routePolyline: L.Polyline | null = null;

    const fetchRoute = async () => {
      try {
        if (source[0] === 0 || source[1] === 0 || destination[0] === 0 || destination[1] === 1) return;

        const url = `https://router.project-osrm.org/route/v1/foot/${source[1]},${source[0]};${destination[1]},${destination[0]}?overview=full&geometries=polyline`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data) return;

        // Ensure data integrity
        if (!data.routes || data.routes.length === 0 || !data.routes[0].geometry) {
          console.error("Invalid route data:", data);
          return;
        }

        // Decode the polyline
        const decodedCoords = polyline.decode(data.routes[0].geometry);
        const latlngs: L.LatLngExpression[] = decodedCoords.map(
          (coord: [number, number]) => [coord[0], coord[1]]
        );

        // Create and add the polyline to the map
        routePolyline = L.polyline(latlngs, { color: "red" });
        routePolyline.addTo(map);

        // Fit the map bounds to the polyline
        map.fitBounds(routePolyline.getBounds());
      } catch (error) {
        console.error("Error fetching or displaying the route:", error);
      }
    };

    fetchRoute();

    // Cleanup function to remove the polyline
    return () => {
      if (routePolyline) {
        map.removeLayer(routePolyline);
      }
    };
  }, [source, destination, map]);

  return null;
};

export default RouteDisplay;
