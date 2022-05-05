import { Navigate } from 'react-router-dom';
import ListItem from './ListItem';
import useFetchItems from '../hooks/useFetchItems';
import WelcomingPrompt from './WelcomingPrompt';
import Search from './Search';
import { useState } from 'react';

const List = () => {
  const { listeningError, isLoading, data } = useFetchItems();
  const [searchTerm, setSearchTerm] = useState('');

  if (localStorage.getItem('token') === null) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {listeningError && <p>{listeningError}</p>}
      {isLoading && <p>loading...</p>}
      {data && data.length === 0 && <WelcomingPrompt />}
      <Search setSearchTerm={setSearchTerm} />

      {data &&
        data
          .filter((item) => {
            return item.itemName
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          })
          .map((item) => (
            <ul key={item.id}>
              <ListItem itemData={item} />
            </ul>
          ))}
    </>
  );
};

export default List;
