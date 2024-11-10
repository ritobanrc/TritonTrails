import React from 'react';
import './User.css';
import { Link } from "react-router-dom";

const User = () => {
    return (
      <div className="user-profile">
        <div className="avatar"></div>
        <div className="user-info">
          <h2>User1</h2>
          <a href="mailto:user1@ucsd.edu">user1@ucsd.edu</a>
          <p>Short bio I suppose</p>
        </div>
        <div className="user-actions">
            <Link to="/add-trail-form">
                <button className="add-trail-button">Add Your Own Trail</button>
            </Link>
          <button className="edit-profile-button">Edit profile</button>
          <button className="settings-button">Settings</button>
        </div>
      </div>
    );
  };

export default User;