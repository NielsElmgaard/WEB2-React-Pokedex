import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/About"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
                    <NavLink
            to="/PokemonDisplay"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Who's that Pokémon?
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
