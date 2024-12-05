import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useAppContext } from '../../context/AppContext';
import { getUserInfo } from '../../utils/user-utils';
import { fetchVisitedTrails } from '../../utils/trail-utils';
import { Trail } from '../../types/types';
import TrailDisplay from "../Trails/TrailDisplay"
import './Profile.css';

const UserProfile = () => {
  const { user, setUser } = useAppContext();
  const [visitedTrails, setVisitedTrails] = useState<Trail[]>([]);
  const [error, setError] = useState(""); // State for handling errors

  useEffect(() => {
    if (!user) {
      getUserInfo().then(setUser)
        .catch(e => {
          console.error('Failed to fetch user info:', e);
          setError("Failed to load user data. Please refresh the page.");
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchVisitedTrails(user.id)
        .then(trails => {
          if (trails.length > 0) {
            setVisitedTrails(trails);
          } else {
            setError("No visited trails found."); // Handle no data case
          }
        })
        .catch(e => {
          console.error('Failed to fetch visited trails:', e);
          setError("Failed to load visited trails.");
        });
    }
  }, [user]);

  if (!user) {
    return <p>Please log in</p>;
  }
  
  return (
    <div className="Profile">
      <div className="user-profile">
        <div className="avatar"></div>
        <div className="user-info">
          <h2 className="display-name">{user.displayName}</h2>
          <h2 className="username">{user.username}</h2>
        </div>
        <div className="user-actions">
          <Link to="/add-trail-form">
            <button className="add-trail-button">Add Your Own Trail</button>
          </Link>
          <button className="edit-profile-button">Edit profile</button>
        </div>
      </div>
      <div className="visited-trails">
        <div className="page-header">
          <h3 className="page-header-text">Visited Trails</h3>
        </div>
        {visitedTrails.length > 0 ? (
          visitedTrails.map(trail => (
            <TrailDisplay key={trail.id} trail={trail} />
          ))
        ) : (
          <p>No trails have been visited yet.</p> // Provide a message for no data
        )}
      </div>
    </div>
  );
};

export default UserProfile;
