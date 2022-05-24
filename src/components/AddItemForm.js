import { useState, useRef } from 'react';
import useToken from '../hooks/useToken';
import useAddItem from '../hooks/useAddItem';
import Button from '../components/Button';

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
    <form onSubmit={handleSubmit} className="flex flex-col items-centre">
      <label htmlFor="newItem" className="flex justify-centre">
        <input
          className="input"
          type="text"
          id="newItem"
          value={newItem}
          onChange={handleItemAdd}
          name="newItem"
          placeholder="Enter an item..."
          required
          ref={newItemInputRef}
        />
      </label>

      <fieldset className="flex flex-col gap-y-1 mt-4">
        <legend className="text-xl">
          How soon will you buy this item again ?
        </legend>
        <label htmlFor="soon">
          <input
            className="border-2 border-cyan-500 form-radio text-cyan-500 h-5 w-5 mb-5"
            type="radio"
            id="soon"
            value="7"
            checked={timeframe === '7'}
            onChange={handleSelect}
            name="timeframe"
          />
          <span className="ml-2 text-lg">Soon</span>
        </label>
        <label htmlFor="kind-of-soon">
          <input
            className="border-2 border-cyan-500 form-radio text-cyan-500 h-5 w-5 mb-5"
            type="radio"
            id="kind-of-soon"
            value="14"
            checked={timeframe === '14'}
            onChange={handleSelect}
            name="timeframe"
          />
          <span className="ml-2 text-lg">Kind of soon</span>
        </label>
        <label htmlFor="not-soon">
          <input
            className="border-2 border-cyan-500 form-radio text-cyan-500 h-5 w-5 mb-5"
            type="radio"
            id="not-soon"
            value="30"
            checked={timeframe === '30'}
            onChange={handleSelect}
            name="timeframe"
          />
          <span className="ml-2 text-lg">Not soon</span>
        </label>
      </fieldset>
      <p>{duplicateItemMessage}</p>
      <Button
        text={isLoading ? 'adding...' : 'add'}
        disabled={isLoading}
        width={'w-40'}
      />

      {successMessage && <p>{successMessage}</p>}
      {error && <p>Could not add the item</p>}
      <p>{duplicateItemMessage}</p>
    </form>
  );
};

export default AddItemForm;
