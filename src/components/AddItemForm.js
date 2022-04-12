import { useState } from 'react';

const AddItemForm = () => {
  const [timeframe, setTimframe] = useState('soon');
  const [newItem, setNewItem] = useState("")

  const handleSelect = (e) => {
    setTimframe(e.target.value);
  };

  const handleItemAdd = (e) => {
    setNewItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(timeframe);
  };
  return (
    <form onSubmit={handleSubmit}>
      <legend>Item name:</legend>
        <input
          type="text"
          id="newItem"
          for="newItem"
          value={newItem}
          onChange={handleItemAdd}
          name="newItem"
          placeholder='Add Item'
        />
      <fieldset>
        <legend>How soon will you buy this again ?</legend>
        <input
          type="radio"
          id="soon"
          value="soon"
          checked={timeframe === 'soon'}
          onChange={handleSelect}
          name="timeframe"
        />
        <label htmlFor="soon">Soon</label>
        <input
          type="radio"
          id="kind-of-soon"
          value="kind-of-soon"
          checked={timeframe === 'kind-of-soon'}
          onChange={handleSelect}
          name="timeframe"
        />
        <label htmlFor="kind-of-soon">kind of soon</label>
        <input
          type="radio"
          id="not-soon"
          value="not-soon"
          checked={timeframe === 'not-soon'}
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
