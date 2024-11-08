import React from 'react';
import './Search.css';
import TrailList from '../Trails/TrailList';

const Search = () => {
  return (
    <div className="search-page">
        <h1 className="search-header">Top results</h1>
        <div className="box">
          <div className="rounded-div">
          <div className="search-content">
          <TrailList /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;