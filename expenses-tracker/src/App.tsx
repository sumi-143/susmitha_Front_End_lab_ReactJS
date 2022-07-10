import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ShowData from './Components/ShowData';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ShowData/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
