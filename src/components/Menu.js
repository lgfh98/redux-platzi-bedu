import { NavLink } from "react-router-dom";

const Link = ({ to, children }) => (
  <NavLink exact to={to} activeClassName="activeLink">
    {children}
  </NavLink>
);

const Menu = () => {
  return (
    <nav id="menu">
      <ul>
        <li>
          <Link to="/">Usuarios</Link>
        </li>
        <li>
          <Link to="/tasks">Tareas</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
