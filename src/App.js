import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddItem from './components/AddItem';
import List from './components/List';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TokenProvider from './context/tokenContext';

function App() {
  return (
    <TokenProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/add-items" element={<AddItem />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TokenProvider>
  );
}

export default App;
