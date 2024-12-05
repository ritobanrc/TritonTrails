import React from "react";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import AddTrailForm from "./components/Trails/AddTrailForm";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search page/Search";
import Login from "./components/User/Login"
import Register from "./components/User/Register";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./components/User/Profile";

// make sure to npm install react-router-dom

function App() {
  return (
    <AppProvider>
      <div className="App">
        <header className="App-header">
          <Navbar />
          <Routes>
            <Route path="/" element={<Search/>}/>
            <Route path="/profile" element={<UserProfile/>}/>
            <Route path="/add-trail-form" element={<AddTrailForm />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/create-account" element={<Register/>}/>
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
    




