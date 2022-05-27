import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// components
import AddItem from './components/AddItem';
import List from './components/List';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TokenProvider from './context/tokenContext';

function App() {
  return (
    <TokenProvider>
      <div className="flex flex-col items-center text-stone-700">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/add-item" element={<AddItem />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TokenProvider>
  );
}

export default App;
