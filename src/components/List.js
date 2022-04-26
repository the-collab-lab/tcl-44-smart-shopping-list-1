import { Navigate } from 'react-router-dom';

import useListenItems from '../hooks/useListenItems';

const List = () => {
  const { listeningError, isLoading, data } = useListenItems();

  if (localStorage.getItem('token') === null) {
    return <Navigate to="/" />;
  }

  const dataElements = data.map((data) => (
    <ul key={data.id}>
      <li> {data.item} </li>
    </ul>
  ));

  return (
    <>
      {listeningError && <p>{listeningError}</p>}
      {isLoading && <p>loading...</p>}
      <div>{dataElements}</div>
    </>
  );
};

export default List;
