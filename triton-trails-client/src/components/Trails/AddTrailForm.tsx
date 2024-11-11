//  Import useContext from React and AppContext from your context file
import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Trail } from "../../types/types";
// Import the createExpense function
import { createTrail } from "../../utils/trail-utils"; 

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
    <form onSubmit={onSubmit}>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Trail name"
    />
    <input type="file" onChange={handleImageChange} accept="image/*" />
    <button type="submit">Create Trail</button>
    {image && <img src={image} alt="Preview" style={{ width: "100px", height: "100px" }} />}
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Trail description"
    />
  </form>
  );
};

export default AddTrailForm;
