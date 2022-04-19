import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddItem from './components/AddItem';
import List from './components/List';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar token={token} />
        <Routes>
          <Route path="/" element={<Home setToken={setToken} />} />
          <Route path="/list" element={<List />} />
          <Route path="/add-items" element={<AddItem token={token} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
