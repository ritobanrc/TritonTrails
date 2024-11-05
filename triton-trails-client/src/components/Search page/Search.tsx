import React from 'react';
import './Search.css';

const Search = () => {
  return (
    <div className="search-page">
        <h1 className="search-header">Top results</h1>
        <div className="box">
          <div className="rounded-div">
            <div className = "title">
              Westfield UTC 
              </div>
          <div className="search-content">
            <div className= "image">
              <img src = "/utcwalk.jpeg" alt = "walk" className="image-border"/>
            </div>
            <div className = "Description">
            <p>Description of Walk</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;