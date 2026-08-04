import { Link } from "react-router-dom";

import "./Navbar.css";


function Navbar() {
  return (
    <nav>
      <h2>Travel Planner</h2>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/destinations">Destinations</Link>
        </li>
        <li>
          <Link to="/planner">Planner</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;