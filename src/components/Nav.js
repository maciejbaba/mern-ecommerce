import { Link } from "react-router-dom";
import "../css/Nav.css";
import { useState } from "react";

const Nav = () => {
  const token = localStorage.getItem("token");
  const [isLogged, setIsLogged] = useState(token ? true : false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    alert("You have been logged out");
  };

  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/Cart">Cart</Link>
      <Link to="/Items">Items</Link>
      <Link to="/Users">Users</Link>
      {isLogged ? (
        <button className="nav__logout-button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link to="/Login">Login</Link>
      )}
    </nav>
  );
};

export default Nav;
