import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Search from './components/Search page/Search'

function App() {
  return (
    <div className="Header">
      <h1 className = "Title">Triton Trails</h1>
      <img src="/topbanner.png" alt="Top banner" className= "width" />
      <nav className="Nav">
        <a href="#explore" className="NavLink">Explore</a>
        <a href="#wishlist" className="NavLink">Wishlist</a>
        <a href="#login" className="NavLink">Login</a>
        <img src ="menu.png" alt="Menu" className = "MenuIcon" />
    </nav>    
    </div>
  );
}
export default App;