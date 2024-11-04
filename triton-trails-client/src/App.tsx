import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Search from './components/Search page/Search'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <Search/>
      </header>
    </div>
  );
}

export default App;
