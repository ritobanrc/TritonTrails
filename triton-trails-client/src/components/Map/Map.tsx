import React, { useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RouteDisplay from "../Route/RouteDisplay";
import { fetchRoute } from "../../utils/trail-utils";
import { Route as RouteType, MapProps } from "../../types/types";

const startIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
const endIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const Map: React.FC<MapProps> = ({ trailId }) => {
    const [route, setRoute] = useState<RouteType>({startLatitude: 0, startLongitude: 0, endLatitude: 0, endLongitude: 0, TrailId: 0});

    useEffect(() => {
        const loadRoute = async () => {
            try {
                const fetchedRoute = await fetchRoute(trailId);
                console.log("fetch route ")
                console.log(fetchedRoute)
                if (fetchedRoute) {
                    console.log("route0.5")
                    console.log(fetchedRoute[0].startLatitude)
                    setRoute({
                        startLatitude: fetchedRoute[0].startLatitude,
                        startLongitude: fetchedRoute[0].startLongitude,
                        endLatitude: fetchedRoute[0].endLatitude,
                        endLongitude: fetchedRoute[0].endLongitude,
                        TrailId: fetchedRoute[0].TrailId
                    });
                }
                console.log("route1")
                console.log(route)
            } catch (error) {
                console.error('Failed to fetch route:', error);
            }
        };

        loadRoute();
    }, [trailId]);
    console.log("route")
    console.log(route)

    const center:[number, number] = [
        (route.startLatitude + route.endLatitude) / 2,
        (route.startLongitude + route.endLongitude) / 2
    ]

    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {route && <RouteDisplay source={[route.startLatitude, route.startLongitude]} destination={[route.endLatitude, route.endLongitude]} />}
            <Marker position={[route.startLatitude, route.startLongitude]} icon={startIcon}> </Marker>
            <Marker position={[route.endLatitude, route.endLongitude]} icon={endIcon}> </Marker>
        </MapContainer>
    );
}
export default Map;
