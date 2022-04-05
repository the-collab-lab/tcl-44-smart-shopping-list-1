import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul className="links">
        <li>
          <NavLink to="/list">List</NavLink>
        </li>
        <li>
          <NavLink to="/add-items">add an item</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
