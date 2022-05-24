import { Link } from 'react-router-dom';
import Button from '../components/Button';

const WelcomingPrompt = () => {
  return (
    <section className="flex flex-col text-xl text-center gap-4 pt-8 sm: w-2/3">
      <p>Welcome to your shopping list. Your list is currently empty!</p>
      <p>Please click the button below to add an item.</p>
      <Link to="/add-item">
        <Button text="add" width={'w-40'} />
      </Link>
    </section>
  );
};

export default WelcomingPrompt;
