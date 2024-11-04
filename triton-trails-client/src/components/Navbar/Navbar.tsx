import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Ideally would link to the Home page */}
        <h1 className="navbar-logo">TritonTrails</h1>
        <div className="navbar-right">
          <ul className="navbar-links">
            <li><a href="#explore">Explore</a></li>
            <li><a href="#wishlist">Wishlist</a></li>
            <li><a href="#login">Login</a></li>
          </ul>
          <div className="navbar-menu-icon">
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;