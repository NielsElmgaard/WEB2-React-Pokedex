import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="site-header">
      <div className="logo">Pokémon Pokédex</div>
      <Navigation />
    </header>
  );
}

export default Header;
