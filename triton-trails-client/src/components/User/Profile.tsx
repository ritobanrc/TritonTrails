import React, { useEffect } from 'react';
import './Profile.css';
import { Link } from "react-router-dom";
import { useAppContext } from '../../context/AppContext';
import { getUserInfo } from '../../utils/user-utils';

const UserProfile = () => {
  const { user, setUser } = useAppContext();

  useEffect(() => {
    if (!user) {
      getUserInfo().then((data) => {
        console.log(data);
        setUser(data);
      });
    }
  }, [user]);

  if (!user) {
    return <p>Please log in</p>;
  }

  return (
    <div className="user-profile">
      <div className="avatar"></div>
      <div className="user-info">
        <h2 className="display-name">{user.displayName}</h2>
        <h2 className="username">{user.username}</h2>
        <p></p>
      </div>
      <div className="user-actions">
          <Link to="/add-trail-form">
              <button className="add-trail-button">Add Your Own Trail</button>
          </Link>
        <button className="edit-profile-button">Edit profile</button>
      </div>
    </div>
  );
};


export default UserProfile;
