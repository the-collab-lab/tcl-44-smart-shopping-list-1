import { getToken } from '@the-collab-lab/shopping-list-utils';
import { useNavigate, Navigate } from 'react-router-dom';
//components
import ShareTokenForm from './ShareTokenForm';
import Button from '../components/Button';
import Header from './Header';
//hooks
import useToken from '../hooks/useToken';
//images
import bag from '../assets/images/bag.svg';

const Home = () => {
  let navigate = useNavigate();
  const { setToken } = useToken();

  const createToken = () => {
    const newToken = getToken();
    if (localStorage.getItem('token') === null) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    }
    navigate('/list');
  };

  if (localStorage.getItem('token')) {
    return <Navigate to="/list" />;
  }

  return (
    <>
      <Header
        title={'Welcome to your smart shopping list'}
        imageSrc={bag}
        isHome={true}
      />
      <section>
        <Button
          createToken={createToken}
          text="Create new List"
          width={'w-52'}
        />
        <p>- or -</p>
        <p>Join an existing shopping list by entering a three word token.</p>

        <ShareTokenForm setToken={setToken} />
      </section>
    </>
  );
};

export default Home;
