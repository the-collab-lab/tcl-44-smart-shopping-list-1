import React from 'react';

import { reference } from './lib/firebase';
import { addDoc, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddItem from './components/AddItem';
import List from './components/List';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  const [datas, setData] = useState([]);
  const [newItems, setNewItems] = useState('Item0');
  const [newItemsID, setNewItemsID] = useState(1);

  const addItem = async () => {
    await addDoc(reference, { Item: newItems, id: newItemsID });
    setNewItems('item' + newItemsID);
    setNewItemsID((prev) => prev + 1);
  };

  useEffect(() => {
    onSnapshot(reference, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const dataElements = datas.map((data) => (
    <ul key={data.id}>
      <li> {data.Item} </li>
    </ul>
  ));

  return (
    <div className="App">
      <button onClick={addItem}>Add list</button>
      <div>{dataElements}</div>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/add-items" element={<AddItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
