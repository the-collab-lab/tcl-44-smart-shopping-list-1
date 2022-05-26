const Search = ({ setSearchTerm }) => {
  return (
    <>
      <form>
        <label
          htmlFor="search-input"
          className="flex justify-centre"
          aria-labelledby="search-input"
        >
          <input
            className="input"
            type="search"
            placeholder="Search items.."
            name="search-input"
            id="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </form>
    </>
  );
};

export default Search;
