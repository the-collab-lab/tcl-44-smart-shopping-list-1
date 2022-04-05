import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/list">List</NavLink>
        </li>
        <li>
          <NavLink to="/add-items">add an item</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
