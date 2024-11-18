//  Import useContext from React and AppContext from your context file
import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Trail } from "../../types/types";
// Import the createExpense function
import { createTrail } from "../../utils/trail-utils"; 
import "./AddTrailForm.css";

const AddTrailForm = () => {
  const { trails, setTrails } = useContext(AppContext);
  const [name, setName] = useState("");
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTrail : Trail = {
      id: trails.length+1,  //magic number one: !id in server util checked is true if first trail
      name: name as string,
      image: image,
      description: description as string,
    }
    setTrails([...trails, newTrail]);
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
    <div className="addTrailForm page">
      <h1 className="page-header-text add-trail-text">Add Your Own Trail</h1>
      <div className="rounded-div">
        <form onSubmit={onSubmit}>
          <div className="flex-row">
            <input
              className="input-field-2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <a href="#" className="location-link">Select the location</a>
          </div>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {image && <img className="img-preview" src={image} alt="Preview"/>}
          <textarea className="input-field-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Trail description"
          />
          <button className="add-trail-button align-right" type="submit">Create Trail</button>
        </form>
      </div>
    </div>
  );
};

export default AddTrailForm;
