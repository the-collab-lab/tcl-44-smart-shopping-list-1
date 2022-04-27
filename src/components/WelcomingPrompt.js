import { Link } from 'react-router-dom';

const WelcomingPrompt = () => {
  return (
    <>
      <p>Welcome to your shoping list. Your list is currenctly empty!</p>
      <p>Please click the button below to add an item.</p>
      <button>
        <Link to="/add-item">Add Item</Link>
      </button>
    </>
  );
};

export default WelcomingPrompt;
