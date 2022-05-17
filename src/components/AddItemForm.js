import { useState, useRef } from 'react';
import useToken from '../hooks/useToken';
import useAddItem from '../hooks/useAddItem';

const AddItemForm = () => {
  const [timeframe, setTimframe] = useState('7');
  const [newItem, setNewItem] = useState('');
  const newItemInputRef = useRef(null);

  const { token } = useToken();
  const { addItem, isLoading, successMessage, error, duplicateItemMessage } =
    useAddItem(newItemInputRef);

  const handleSelect = (e) => {
    setTimframe(e.target.value);
  };

  const handleItemAdd = (e) => {
    setNewItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(newItem, timeframe, token);
    setNewItem('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <label className="text-red-500" htmlFor="newItem">
        Item name:
      </label>
      <input
        className="border-black border-2"
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
      <button disabled={isLoading}>
        {isLoading ? 'adding...' : 'add an item'}
      </button>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>Could not add the item</p>}
      <p>{duplicateItemMessage}</p>
    </form>
  );
};

export default AddItemForm;
