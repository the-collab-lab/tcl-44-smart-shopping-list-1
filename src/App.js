import React from 'react';
import { reference } from './lib/firebase';
import { addDoc, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [datas, setData] = useState([]);
  const [newItems, setNewItems] = useState('Item0');
  const [newItemsID, setNewItemsID] = useState(1);

  const addItem = () => {
    setNewItems('item' + newItemsID);
    addDoc(reference, { Item: newItems, id: newItemsID });
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
    </div>
  );
}

export default App;
