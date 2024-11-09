import React from "react";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import AddTrailForm from "./components/Trails/AddTrailForm";
import TrailList from "./components/Trails/TrailList"; // Import the form component
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
          {/* <h1>Weather</h1>
          <WeatherDisplay /> */}
        </div>
        <AddTrailForm />
      </div>
    </AppProvider>
  );
}
    
export default App;
    




