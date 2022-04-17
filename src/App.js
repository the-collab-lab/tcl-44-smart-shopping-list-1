import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddItem from './components/AddItem';
import List from './components/List';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/list" element={<List />} />
          <Route path="/add-items" element={<AddItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
