import useFetchItems from '../hooks/useFetchItems';

const Search = ({ setSearchTerm }) => {
  const { data } = useFetchItems();

  //Get list of items from firebase
  //Get value from search input
  //Filter list of items from firebase to see if they include the value from search input
  //Set filtered item to filteredResults state if searchInput is not empty,
  //otherwise set items list from firebase to filteredResults

  //Conditionally render the form to prevent it from showing when the list is empty
  return (
    <>
      {data && data.length !== 0 && (
        <form>
          <label htmlFor="search-input">Filter Items</label>
          <br />
          <input
            type="search"
            placeholder="Start typing here..."
            name="search-input"
            id="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      )}
    </>
  );
};

export default Search;
