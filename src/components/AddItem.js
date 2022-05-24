import { Navigate } from 'react-router-dom';
//components
import AddItemForm from './AddItemForm';
import Header from './Header';
//images
import bag from '../assets/images/bag-1.svg';

const AddItem = () => {
  if (localStorage.getItem('token') === null) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Header title={'Smart Shopping List'} imageSrc={bag} />
      <h2>Add Item</h2>
      <AddItemForm />
    </>
  );
};

export default AddItem;
