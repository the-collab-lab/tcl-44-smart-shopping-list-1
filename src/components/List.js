import { Navigate } from 'react-router-dom';
import ListItem from './ListItem';
import useFetchItems from '../hooks/useFetchItems';
import WelcomingPrompt from './WelcomingPrompt';
import Search from './Search';

const List = () => {
  const { listeningError, isLoading, data } = useFetchItems();

  if (localStorage.getItem('token') === null) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {listeningError && <p>{listeningError}</p>}
      {isLoading && <p>loading...</p>}
      {data && data.length === 0 && <WelcomingPrompt />}
      <Search />
      {data &&
        data.map((item) => (
          <ul key={item.id}>
            <ListItem itemData={item} />
          </ul>
        ))}
    </>
  );
};

export default List;
