//  Import useContext from React and AppContext from your context file
import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Trail } from "../../types/types";
// Import the createExpense function
import { createTrail } from "../../utils/trail-utils"; 
import './AddTrailForm.css';

const AddTrailForm = () => {
  const { trails, setTrails } = useContext(AppContext);
  const [name, setName] = useState("");
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTrail : Trail = {
        // TODO: get rid of this, the database auto-increments IDs
      id: trails.length+1,  //magic number one: !id in server util checked is true if first trail
      name: name as string,
      image: image,
      description: description as string,
    }
    setTrails([...trails, newTrail]); // TODO: just do a re-fetch from the database (really, this eventually won't matter at all, because the "add trail" page should not be displaying other trails)
    // clear input fields
    setName("");
    setImage("");
    setDescription("");
    createTrail(newTrail);
  }

  // This function triggers the hidden file input
  const handleButtonClick = () => {
    document.getElementById('fileInput')!.click();  // Trigger file input click

  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // This will be a base64 encoded string
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    // copy setup from Search page
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
                    <img src="https://cdn-icons-png.freepik.com/512/5008/5008022.png" ></img>
                    <label>Upload Image</label>
                    {/* Hidden file input */}
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
            {/* Location */}
            <div className="flex-col">
              <h2 className="header">Select the start and end points</h2>
              <div className="trail-map" data-testid="map">
                <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-117.26150035858156%2C32.86383591013185%2C-117.23493576049806%2C32.891227612173246&layer=mapnik"
                    title="Trail Map"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                ></iframe>
              </div>
              
            </div>
          </div>
          {/* Description */}
          <h2 className="header">Tell us about your experience!</h2>
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
