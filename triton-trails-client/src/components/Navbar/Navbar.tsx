import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Ideally would link to the Home page; just have it link to Explore for now */}
        <Link to="/" className="navbar-logo">TritonTrails</Link>
        {/*<h1 className="navbar-logo">TritonTrails</h1>*/}
        <img src = "/topbanner.png" alt = "Top Banner" className = "NavBanner"/>
        <div className="navbar-right">
          <ul className="navbar-links">
            <li><Link to="/">Explore</Link></li>
            <li><a href="#wishlist">Wishlist</a></li>
            <li><a href="#login">Login</a></li>
          </ul>
          <Link to="/profile" className="menu-link">
            <div className="navbar-menu-icon">
                <span className="menu-bar"></span>
                <span className="menu-bar"></span>
                <span className="menu-bar"></span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;