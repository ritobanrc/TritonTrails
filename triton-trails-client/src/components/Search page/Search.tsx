import React from 'react';
import './Search.css';
import TrailList from '../Trails/TrailList';
import { Link } from "react-router-dom";

const Search = () => {
  return (
    <div className="search-page">
      <div className="search-header">
      <h1 className="all-results">All results:</h1>
      <Link to="/add-trail-form">
        <button className="add-trail-button">Add Your Own Trail</button>
      </Link>
      </div>
      <TrailList />
    </div>
  );
};

export default Search;