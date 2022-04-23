import AddItemForm from './AddItemForm';
import { Navigate } from 'react-router-dom';

const AddItem = () => {
  if (localStorage.getItem('token') === null) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <h2>Add Item </h2>
      <AddItemForm />
    </>
  );
};

export default AddItem;
