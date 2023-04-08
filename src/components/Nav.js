import { Link } from "react-router-dom";
import "../css/Nav.css";

const Nav = () => {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/Cart">Cart</Link>
      <Link to="/Users">Users</Link>
      <Link to="/Login">Login</Link>
    </nav>
  );
};

export default Nav;
