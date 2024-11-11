import React from "react";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import AddTrailForm from "./components/Trails/AddTrailForm";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search page/Search";
import WeatherDisplay from "./components/Weather/Weather";
import { Route, Routes } from "react-router-dom";
import User from "./components/User/User";

// make sure to npm install react-router-dom

function App() {
  return (
    <AppProvider>
      <div className="App">
        <header className="App-header">
          <Navbar />
          <Routes>
            <Route path="/" element={<Search/>}/>
            <Route path="/profile" element={<User/>}/>
            <Route path="/add-trail-form" element={<AddTrailForm />}/>
          </Routes>
        </header>
        <div>
          {/* <h1>Weather</h1>
          <WeatherDisplay /> */}
        </div>
      </div>
    </AppProvider>
  );
}
    
export default App;
    




