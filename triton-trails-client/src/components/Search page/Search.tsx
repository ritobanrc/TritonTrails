import React from 'react';
import './Search.css';
import TrailList from '../Trails/TrailList';

const Search = () => {
  return (
    <div className="search-page">
      <h1 className="search-header">Top results</h1>
      <TrailList />
    </div>
  );
};

export default Search;