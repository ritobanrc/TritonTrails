import React from 'react';
import './Menu.css';
import { Link } from "react-router-dom";
import { useState } from 'react';

const Menu = () => {
    // menu is open state
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    return (
      <nav className="menu">
        <div className="navbar-menu-icon" onClick={toggleNavbar}>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </div>
        {/* Adds the class open if open and not if not open */}
        <div className={`menu-content ${isOpen ? 'open' : ''}`}>
          <div className="menu-header">
            <div className="menu-avatar"></div>
            <div  className="menu-my-account">
                <Link to="/profile" onClick={() => setIsOpen(false)}>My account</Link>
            </div>
          </div>
          <ul className="menu-links">
            <li><a href="#wishlist">Saved</a></li>
            <li><a href="#posts">Posts</a></li>
            <li><a href="#settings">Settings</a></li>
            <li><a href="#log-out">Log out</a></li>
          </ul>
        </div>
      </nav>
    );
};

export default Menu;