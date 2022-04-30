import { NavLink } from 'react-router-dom';
import useToken from '../hooks/useToken';

const Navbar = () => {
  const { token } = useToken();

  if (!token) {
    return null;
  } else
    return (
      <nav>
        <ul className="links">
          <li>
            <NavLink to="/list">List</NavLink>
          </li>
          <li>
            <NavLink to="/add-item">add an item</NavLink>
          </li>
        </ul>
      </nav>
    );
};

export default Navbar;
