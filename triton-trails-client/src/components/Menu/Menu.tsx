import React from 'react';
import './Menu.css';
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { logout } from '../../utils/user-utils'

const Menu = () => {
    // menu is open state
    const [isOpen, setIsOpen] = useState(false);
    // useRef allows you to get a reference to a DOM element without triggering re-render
    // returns object with single prop current, persists throughout renders
    // cast type as HTMLDivElement or null when no element assigned
    const menuRef = useRef<HTMLDivElement | null>(null);
    const menuIconRef = useRef<HTMLDivElement | null>(null);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
      const handleClickOutside = (event: { target: any; }) => {
          // Check if the click is outside the menu container and menu icon
          if (menuRef.current && !menuRef.current.contains(event.target) &&
            menuIconRef.current && !menuIconRef.current.contains(event.target)
          ) {
              setIsOpen(false); 
          }
      };
      // mousedown event listener checks clicks
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const onLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        logout();
    };


    return (
      <nav className="menu">
        <div ref={menuIconRef} className="navbar-menu-icon" onClick={toggleNavbar}>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </div>
        {/* Adds the class open if open and not if not open */}
        {/* Add ref to menu container */}
        <div ref={menuRef} className={`menu-content ${isOpen ? 'open' : ''}`}>
          <div className="menu-header">
            <div className="menu-avatar"></div>
            <div  className="menu-my-account">
                <Link to="/profile" onClick={() => setIsOpen(false)}>My account</Link>
            </div>
          </div>
          <ul className="menu-links">
            <li><a href="#wishlist" onClick={() => setIsOpen(false)}>Saved</a></li>
            <li><a href="#posts" onClick={() => setIsOpen(false)}>Posts</a></li>
            <li><a href="#settings" onClick={() => setIsOpen(false)}>Settings</a></li>
            <li>
                <a href='/' onClick={ onLogout }>Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    );
};

export default Menu;
