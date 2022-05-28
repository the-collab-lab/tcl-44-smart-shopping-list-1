import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// components
import AddItem from './components/AddItem';
import List from './components/List';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TokenProvider from './context/tokenContext';
//images
import lemon from '../src/assets/background-images/lemon.svg';
import apple from '../src/assets/background-images/apple.svg';
import pear from '../src/assets/background-images/pear.svg';
import pineapple from '../src/assets/background-images/pineapple.svg';

function App() {
  return (
    <TokenProvider>
      <div className="flex flex-col items-center text-stone-700 w-full lg:w-1/2 min-h-screen mx-auto shadow-xl bg-yellow-400">
        <img
          src={lemon}
          width="250px"
          height="250px"
          alt="background apple"
          className="fixed top-10  left-60 -z-10"
        />
        <img
          src={apple}
          width="250px"
          height="250px"
          alt="background apple"
          className="fixed top-10  right-52 -z-10 origin-center rotate-45"
        />
        <img
          src={apple}
          width="250px"
          height="250px"
          alt="background apple"
          className="fixed inset-y-1/3 -left-20  -z-10 origin-center rotate-45"
        />
        <img
          src={lemon}
          width="250px"
          height="250px"
          alt="background apple"
          className="fixed inset-y-1/3 -right-32  -z-10 "
        />

        <img
          src={pear}
          width="250px"
          height="250px"
          alt="background apple"
          className="fixed bottom-20  left-52 -z-10 origin-center -rotate-45"
        />
        <img
          src={pineapple}
          width="250px"
          height="250px"
          alt="background apple"
          className="fixed bottom-16  right-56 -z-10 origin-center rotate-45"
        />
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
