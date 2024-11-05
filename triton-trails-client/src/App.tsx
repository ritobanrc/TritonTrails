/*
import React, { useEffect, useState } from "react";
import './App.css';
import { Trail } from './types/types'
import { createTrail, fetchTrails } from './utils/trail-utils'
import ImageUploadComponent from "./image-logic"
import Navbar from './components/Navbar/Navbar';
import Search from './components/Search page/Search'
import WeatherDisplay from './components/Weather/Weather';


function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [trails, setTrails] = useState<Trail[]>([]);
  const [image, setImage] = useState("")
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTrail : Trail = {
      id: trails.length+1,  //magic number one: !id in server util checked is true if first trail
      name: name as string,
      description: description as string,
      image: image
    }

    setTrails([...trails, newTrail])

    createTrail(newTrail);
  }

  useEffect(() => {
    loadTrails();
    }, []);

  const loadTrails = async () => {
    try {
      const trailsList = await fetchTrails();
      setTrails(trailsList);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // This will be a base64 encoded string
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <Search/>
      </header>
      <div>
            <h1>Weather</h1>
            <WeatherDisplay />
        </div>
      <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Trail name" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Trail description" />
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <button type="submit">Create Trail</button>
        {image && <img src={image} alt="Preview" style={{ width: '100px', height: '100px' }} />}
      </form>
      <ul className="list-group">
      {trails.map((trail: Trail) => (
        <div>
          <h2>{trail.id}</h2>
          <p>{trail.name}</p>
          <p>{trail.description}</p>
          <img src={trail.image} alt={trail.name} style={{ width: '200px' }} />        </div>
      ))}
      </ul>
    </div>
    </div>
  );
  
}
export default App;
*/

import React from "react";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import AddTrailForm from "./components/Trails/AddTrailForm"; // Import the form component
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search page/Search";
import WeatherDisplay from "./components/Weather/Weather";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <header className="App-header">
          <Navbar />
          <Search />
        </header>
        <div>
          <h1>Weather</h1>
          <WeatherDisplay />
        </div>
        <AddTrailForm /> 
      </div>
    </AppProvider>
  );
}
    
export default App;
    




