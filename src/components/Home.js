import { getToken } from '@the-collab-lab/shopping-list-utils';

const Home = () => {
  const createToken = () => {
    const newToken = getToken();
    console.log(newToken);
  };
  return (
    <div>
      <button onClick={createToken}>Create new List</button>
    </div>
  );
};

export default Home;
