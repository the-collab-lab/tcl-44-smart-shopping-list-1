import { Navigate } from 'react-router-dom';
import ListItem from './ListItem';
import useFetchItems from '../hooks/useFetchItems';
import WelcomingPrompt from './WelcomingPrompt';
import Search from './Search';
import { useState } from 'react';

const List = () => {
  const { listeningError, isLoading, data } = useFetchItems();
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  if (localStorage.getItem('token') === null) {
    return <Navigate to="/" />;
  }

  //Use conditional rendering to render either the filered items or the items list from firebase
  //If searchInput.length === 0 map data and send each item data to the ListItem component
  //If searchInput.length > 1 map filteredResults and send each item data to the ListItem component

  return (
    <>
      {listeningError && <p>{listeningError}</p>}
      {isLoading && <p>loading...</p>}
      {data && data.length === 0 && <WelcomingPrompt />}
      <Search
        setFilteredResults={setFilteredResults}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
      />
      {data &&
        searchInput.length === 0 &&
        data.map((item) => (
          <ul key={item.id}>
            <ListItem itemData={item} />
          </ul>
        ))}

      {data &&
        searchInput.length > 1 &&
        filteredResults.map((item) => (
          <ul key={item.id}>
            <ListItem itemData={item} />
          </ul>
        ))}
    </>
  );
};

export default List;
