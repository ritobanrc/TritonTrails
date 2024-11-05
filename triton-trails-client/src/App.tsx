import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Trail } from './types/types'
import { createTrail } from './utils/trail-utils'



function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [trails, setTrails] = useState<Trail[]>([]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTrail : Trail = {
      id: trails.length+1,  //magic number one: !id in server util checked is true if first trail
      name: name as string,
      description: description as string,
      image: "placeholder"
    }

    setTrails([...trails, newTrail])

    createTrail(newTrail);
  }


  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div>
        <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
      </div>
        <div className="col-sm">
          <label htmlFor="description">Description</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            data-testid="cost"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit">
            Save
          </button>
      </div>
    </form>
  );
};

export default App;
