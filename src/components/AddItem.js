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
      <section className="section-radius">
        <h2 className="text-2xl font-bold my-7 text-center">Add Item</h2>
        <AddItemForm />
      </section>
    </>
  );
};

export default AddItem;
