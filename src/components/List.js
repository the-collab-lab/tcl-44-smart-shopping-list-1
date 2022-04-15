import { Navigate } from "react-router-dom"

const List = () => {

  if (localStorage.getItem('token') === null) {
    return <Navigate to="/" />;
 }
  return <div>List</div>;
};

export default List;
