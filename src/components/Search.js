import React, { useState } from 'react';
import useFetchItems from '../hooks/useFetchItems';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const { data } = useFetchItems();

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    console.log(searchValue);
    console.log(searchInput);

    const filteredItem = data.filter((item) => {
      return item.itemName.toLowerCase().includes(searchInput.toLowerCase());
    });
    console.log(filteredItem);
  };
  return (
    <form action="">
      <label htmlFor="search-input">Filter Items</label>
      <input
        type="text"
        placeholder="Start typing here..."
        name="search-input"
        id="search-input"
        onChange={(e) => searchItems(e.target.value)}
      />
    </form>
  );
};

export default Search;
