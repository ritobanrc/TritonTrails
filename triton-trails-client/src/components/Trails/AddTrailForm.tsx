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
      <h1 className="page-header-text">Add Your Own Trail</h1>
      <div className="rounded-div">
        <form onSubmit={onSubmit}>
          <div className="rounded-div-content">
            <div className="flex-row">
              <input className="input-field-2"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Trail name"
              />
              <a href="#" className="location-link">Select the location</a>
            </div>
            {/* Image upload */}
            <div>
              <input type="file" onChange={handleImageChange} accept="image/*" />
            </div>
            {/* Description */}
            <textarea className="input-field-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Trail description"
            />
            <button className="add-trail-button align-right" type="submit">Create Trail</button>
            {image && <img className="add-trail-img" src={image} alt="Preview" style={{ width: "100px", height: "100px" }} />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTrailForm;
