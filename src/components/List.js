import { Navigate } from 'react-router-dom';

import useListenItems from '../hooks/useListenItems';
import WelcomingPrompt from './WelcomingPrompt';

const List = () => {
  const { listeningError, isLoading, data } = useListenItems();

  if (localStorage.getItem('token') === null) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {listeningError && <p>{listeningError}</p>}
      {isLoading && <p>loading...</p>}
      {data && data.length === 0 && <WelcomingPrompt />}
      {data &&
        data.map((item) => (
          <ul key={item.id}>
            <li>{item.itemName}</li>
          </ul>
        ))}
    </>
  );
};

export default List;
