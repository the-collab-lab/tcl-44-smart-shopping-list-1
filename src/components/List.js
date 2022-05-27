import { useState } from 'react';
import { Navigate } from 'react-router-dom';
//components
import ListItem from './ListItem';
import WelcomingPrompt from './WelcomingPrompt';
import Search from './Search';
import Header from './Header';
//hooks
import useFetchItems from '../hooks/useFetchItems';
//images
import bag from '../assets/images/bag.svg';

const List = () => {
  const { listeningError, isLoading, data } = useFetchItems();
  const [searchTerm, setSearchTerm] = useState('');

  if (localStorage.getItem('token') === null) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header title={'Smart Shopping List'} imageSrc={bag} />
      <section className="mb-24">
        <h2 className="text-2xl font-bold my-7 text-center">My Items</h2>
        {listeningError && <p className="error-message">{listeningError}</p>}
        {isLoading && <p>loading...</p>}
        {data && data.length === 0 && <WelcomingPrompt />}
        {data && data.length !== 0 && <Search setSearchTerm={setSearchTerm} />}

        {data &&
          data
            .filter((item) => {
              return item.itemName
                .toLowerCase()
                .includes(searchTerm.trim().toLowerCase());
            })

            .map((item) => (
              <ul key={item.id} className="flex">
                <ListItem itemData={item} />
              </ul>
            ))}
      </section>
    </>
  );
};

export default List;
