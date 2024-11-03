import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    //<h1>Hello</h1>
    <div className="Header">
      <h1 className = "Title">Triton Trails</h1>
      <img src="/topbanner.png" alt="Top banner" className= "width" />
      
    </div>
  );
}

export default App;