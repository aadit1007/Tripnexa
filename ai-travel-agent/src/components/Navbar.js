import { Link } from "react-router-dom";
import "../styles/landing.css";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="nav-left">
        <img src={logo} alt="Tripnexa" className="logo" />
        <span className="brand">Tripnexa</span>
      </div>

      <div className="nav-center">
        <Link to="/">Blog</Link>
        <Link to="/trip-planner">Trip Planner</Link>
        <Link to="/">Deals</Link>
      </div>

      <div className="nav-right">
        <button className="signin-btn">Sign in</button>
      </div>

    </nav>
  );
}

export default Navbar;