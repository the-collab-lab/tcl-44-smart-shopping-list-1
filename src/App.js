import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddItem from './components/AddItem';
import List from './components/List';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { useEffect } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const changeToken = () => {
      console.log('I changed');
    };
    window.addEventListener('storage', changeToken);

    return () => window.removeEventListener('storage', changeToken);
  }, []);

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
