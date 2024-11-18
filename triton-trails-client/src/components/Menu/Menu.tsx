import React, { useEffect, useState, useRef } from 'react';
import './Menu.css';
import { Link } from "react-router-dom";

const Menu = () => {
    // State to track menu open/close
    const [isOpen, setIsOpen] = useState(false);

    // Ref for the menu container
    const menuRef = useRef<HTMLDivElement | null>(null);
    const menuIconRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close the menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          menuIconRef.current && !menuIconRef.current.contains(event.target as Node)) {
          setIsOpen(false); // Close the menu
      }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="menu">
            <div ref={menuIconRef} className="navbar-menu-icon" onClick={toggleMenu}>
                <span className="menu-bar"></span>
                <span className="menu-bar"></span>
                <span className="menu-bar"></span>
            </div>
            {/* Add ref to the menu container */}
            <div ref={menuRef} className={`menu-content ${isOpen ? 'open' : ''}`}>
                <div className="menu-header">
                    <div className="menu-avatar"></div>
                    <div className="menu-my-account">
                        <Link to="/profile" onClick={() => setIsOpen(false)}>My account</Link>
                    </div>
                </div>
                <ul className="menu-links">
                    <li><a href="#wishlist" onClick={() => setIsOpen(false)}>Saved</a></li>
                    <li><a href="#posts" onClick={() => setIsOpen(false)}>Posts</a></li>
                    <li><a href="#settings" onClick={() => setIsOpen(false)}>Settings</a></li>
                    <li><a href="#log-out" onClick={() => setIsOpen(false)}>Log out</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Menu;
