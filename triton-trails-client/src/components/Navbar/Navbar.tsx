import React, { useState } from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">TritonTrails</Link>
        <img src="/topbanner.png" alt="Top Banner" className="NavBanner" />
        <div className="navbar-right">
          <ul className="navbar-links">
            <li><Link to="/">Explore</Link></li>
            <li><a href="#wishlist">Wishlist</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>
      </div>
      {/* Pass isMenuOpen and toggleMenu to Menu */}
      <Menu/>
    </nav>
  );
};

export default Navbar;