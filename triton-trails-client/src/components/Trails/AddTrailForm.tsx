//  Import useContext from React and AppContext from your context file
import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Trail } from "../../types/types";
// Import the createExpense function
import { createTrail } from "../../utils/trail-utils"; 

const AddTrailForm = () => {
  const { trails, setTrails } = useContext(AppContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("")

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTrail : Trail = {
      id: trails.length+1,  //magic number one: !id in server util checked is true if first trail
      name: name as string,
      description: description as string,
      image: image
    }
    setTrails([...trails, newTrail]);
    // clear input fields
    setName("");
    setDescription("");
    setImage("");
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
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Trail description"
    />
    <input type="file" onChange={handleImageChange} accept="image/*" />
    <button type="submit">Create Trail</button>
    {image && <img src={image} alt="Preview" style={{ width: "100px", height: "100px" }} />}
  </form>
  );
};

export default AddTrailForm;
