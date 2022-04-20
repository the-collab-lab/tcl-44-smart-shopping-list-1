import { useState } from 'react';
import { db } from '../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import useToken from '../hooks/useToken';

const AddItemForm = () => {
  const [timeframe, setTimframe] = useState('7');
  const [newItem, setNewItem] = useState('');
  const { token } = useToken();

  const handleSelect = (e) => {
    setTimframe(e.target.value);
  };

  const handleItemAdd = (e) => {
    setNewItem(e.target.value);
  };

  const addItem = async (newItem, timeframe, token, lastPurchased = null) => {
    const ListRef = collection(db, 'List1');
    await addDoc(ListRef, {
      item: newItem,
      timeframe: parseInt(timeframe),
      lastPurchased,
      token,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(newItem, timeframe, token);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newItem">Item name:</label>
      <input
        type="text"
        id="newItem"
        value={newItem}
        onChange={handleItemAdd}
        name="newItem"
        placeholder="Add Item"
        required
      />

      <fieldset>
        <legend>How soon will you buy this again ?</legend>
        <input
          type="radio"
          id="soon"
          value="7"
          checked={timeframe === '7'}
          onChange={handleSelect}
          name="timeframe"
        />
        <label htmlFor="soon">Soon</label>
        <input
          type="radio"
          id="kind-of-soon"
          value="14"
          checked={timeframe === '14'}
          onChange={handleSelect}
          name="timeframe"
        />
        <label htmlFor="kind-of-soon">kind of soon</label>
        <input
          type="radio"
          id="not-soon"
          value="30"
          checked={timeframe === '30'}
          onChange={handleSelect}
          name="timeframe"
        />
        <label htmlFor="not-soon">not-Soon</label>
      </fieldset>
      <button>Add item</button>
    </form>
  );
};

export default AddItemForm;
