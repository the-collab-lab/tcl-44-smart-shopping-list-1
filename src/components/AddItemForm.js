import { useState, useRef } from 'react';
import useToken from '../hooks/useToken';
import { db } from '../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import useListenItems from '../hooks/useListenItems';

const AddItemForm = () => {
  const [timeframe, setTimframe] = useState('7');
  const [newItem, setNewItem] = useState('');
  const [duplicateItemMessage, setDuplicateItemMessage] = useState('');
  const newItemInputRef = useRef(null);
  const { data: items } = useListenItems();
  const { token } = useToken();

  const handleSelect = (e) => {
    setTimframe(e.target.value);
  };

  const handleItemAdd = (e) => {
    setNewItem(e.target.value);
  };

  //Check for duplication:
  //get the existing items list from firebase
  //loop through the existing items list to check if there is a match with current item
  //set itemExists to true if duplication and return it

  const checkDuplication = (newItem) => {
    let itemExists = false;

    items.forEach((itemObject) => {
      //Remove punctuation of existing item with regex
      let existingItem = itemObject.item;
      let cleanExistingItem = existingItem.replace(/[\W|_]/g, '');

      //Remove punctuation of current item with regex
      let currentItem = newItem;
      let cleanCurrentItem = currentItem.replace(/[\W|_]/g, '');

      //Check for duplication while normalizin capitalization
      if (cleanCurrentItem.toLowerCase() === cleanExistingItem.toLowerCase()) {
        itemExists = true;
      }
    });
    return itemExists;
  };

  //Set error message and erase it after 3 sec and focus text input
  const showErrorMessage = () => {
    setDuplicateItemMessage('Item already added. Try another one.');

    setTimeout(() => {
      newItemInputRef.current.focus();
      setDuplicateItemMessage('');
    }, 3000);
  };

  const addItem = async (newItem, timeframe, token, lastPurchased = null) => {
    const ListRef = collection(db, 'List1');
    checkDuplication(newItem)
      ? showErrorMessage()
      : await addDoc(ListRef, {
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
        ref={newItemInputRef}
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
      <p>{duplicateItemMessage}</p>
    </form>
  );
};

export default AddItemForm;
