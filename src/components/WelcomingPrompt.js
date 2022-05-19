import { Link } from 'react-router-dom';
import Button from '../components/Button';

const WelcomingPrompt = () => {
  return (
    <>
      <p>Welcome to your shoping list. Your list is currenctly empty!</p>
      <p>Please click the button below to add an item.</p>
      <Link to="/add-item">
        <Button text="add" width={'w-40'} />
      </Link>
    </>
  );
};

export default WelcomingPrompt;
