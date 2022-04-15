import { Navigate } from "react-router-dom"

const AddItem = () => {

  if (localStorage.getItem('token') === null) {
    return <Navigate to="/" />;
 }
  return <div>Add Item </div>;
};

export default AddItem;
