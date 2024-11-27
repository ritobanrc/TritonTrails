import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Trail, Route } from "../../types/types";
import { createTrail, createRoute } from "../../utils/trail-utils"; 

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import './AddTrailForm.css';

const defaultStartIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/9356/9356286.png',
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const defaultEndIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/9356/9356230.png',
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const AddTrailForm = () => {
  const { trails, setTrails } = useContext(AppContext);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const [endPoint, setEndPoint] = useState<[number, number] | null>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTrail: Trail = {
      id: trails.length + 1,  // ID is auto-incremented in the backend
      name: name,
      image: image,
      description: description,
    };

    const newRoute: Route = {
      startLatitude: startPoint ? startPoint[0] : 0,
      startLongitude: startPoint ? startPoint[1] : 0,
      endLatitude: endPoint ? endPoint[0] : 0,
      endLongitude: endPoint ? endPoint[1] : 0,
      TrailId: newTrail.id,
    };

    setTrails([...trails, newTrail]); // Update local trails (can later be fetched from the database)
    // Clear input fields
    setName("");
    setImage("");
    setDescription("");
    setStartPoint(null);
    setEndPoint(null);
    createTrail(newTrail);
    createRoute(newTrail.id, newRoute);
  };

  // Custom map events to handle marker placement
  const MapClickHandler = () => {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;

        if (!startPoint) {
          setStartPoint([lat, lng]); // Set start point when clicked
        } else if (!endPoint) {
          setEndPoint([lat, lng]); // Set end point when clicked
        }
      }
    });

    return null;
  };

  // Trigger file input on button click
  const handleButtonClick = () => {
    document.getElementById('fileInput')!.click();  
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Store base64 image
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="addTrailForm page">
      <div className="page-header">
        <h1 className="page-header-text">Add Your Own Trail</h1>
      </div>
      <div className="rounded-div">
        <form className="rounded-div-content" onSubmit={onSubmit}>
          <div className="flex-row">
            <div className="flex-col">
              <input className="input-field-2"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Trail name"
              />
              {/* Image upload */}
              <div
                className="image-upload-container"
                onClick={handleButtonClick}
                style={{
                  backgroundImage: image ? `url(${image})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!image && (
                  <div className="input-wrapper">
                    <img src="https://cdn-icons-png.freepik.com/512/5008/5008022.png" alt="Upload Image" />
                    <label>Upload Image</label>
                    <input 
                      type="file" 
                      id="fileInput" 
                      onChange={handleImageChange} 
                      style={{ display: 'none' }}
                      accept="image/*" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-col">
              <h2 className="header">Select the start and end points</h2>
              <div className="trail-map">
                <MapContainer center={[32.8638, -117.2615]} zoom={13} scrollWheelZoom={false} style={{ height: "300px", width: "100%" }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                  />
                  <MapClickHandler />
                  {startPoint && (
                    <Marker position={startPoint} icon={defaultStartIcon}>
                      <Popup autoClose={false} closeOnClick={false}>Start Point</Popup>
                    </Marker>
                  )}
                  {endPoint && (
                    <Marker position={endPoint} icon={defaultEndIcon}>
                      <Popup autoClose={false} closeOnClick={false}>End Point</Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
            </div>
          </div>
          <h2 className="desc-header">Tell us about your experience!</h2>
          <textarea className="input-field-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Consider including tips and helpful features"
          />
          <button className="add-trail-button align-right" type="submit">Create Trail</button>
        </form>
      </div>
    </div>
  );
};

export default AddTrailForm;
