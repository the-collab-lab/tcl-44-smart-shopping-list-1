const Search = ({ setSearchTerm }) => {
  return (
    <>
      <form>
        <label htmlFor="search-input">Filter Items</label>
        <br />
        <input
          className="input"
          type="search"
          placeholder="Start typing here..."
          name="search-input"
          id="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </>
  );
};

export default Search;
