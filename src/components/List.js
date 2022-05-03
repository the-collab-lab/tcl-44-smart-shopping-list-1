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

  return (
    <>
      {listeningError && <p>{listeningError}</p>}
      {isLoading && <p>loading...</p>}
      {data && data.length === 0 && <WelcomingPrompt />}
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        filteredResults={filteredResults}
        setFilteredResults={setFilteredResults}
      />
      {data &&
        data.map((item) => (
          <ul key={item.id}>
            <ListItem
              itemData={item}
              searchInput={searchInput}
              filteredResults={filteredResults}
            />
          </ul>
        ))}
    </>
  );
};

export default List;
