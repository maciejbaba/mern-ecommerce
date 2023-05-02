import { Link } from "react-router-dom";
import "../css/Nav.css";
import { useEffect, useState } from "react";

const closeButtonIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="nav__close-button"
    viewBox="0 0 20 20"
    fill="currentColor"
    width={40}
    height={40}
  >
    <path
      fillRule="evenodd"
      d="M10.707 10l4.147-4.146a.5.5 0 10-.708-.708L10 9.293 5.854 5.146a.5.5 0 10-.708.708L9.293 10l-4.147 4.146a.5.5 0 10.708.708L10 10.707l4.146 4.147a.5.5 0 00.708-.708L10.707 10z"
      clipRule="evenodd"
    />
  </svg>
);

const openButtonIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="nav__open-button"
    viewBox="0 0 20 20"
    fill="currentColor"
    width={30}
    height={30}
  >
    <path
      fillRule="evenodd"
      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zm0 5A.75.75 0 012.75 14h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);

const Nav = () => {
  const token = localStorage.getItem("token");
  const [isLogged, setIsLogged] = useState(token ? true : false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    alert("You have been logged out");
  };

  const handleMenuShow = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("overflow-hidden")
  };

  return (
    <nav className="nav">
      <div className="nav__mobile-nav">
        <button className="nav__mobile-open-button" onClick={handleMenuShow}>{openButtonIcon}</button>
      </div>
      {isOpen && (
        <div className="nav__mobile-links">
          <button className="nav__mobile-close-button" onClick={handleMenuShow}>{closeButtonIcon}</button>
          <Link to="/">Home</Link>
          <Link to="/Cart">Cart</Link>
          <Link to="/Items">Items</Link>
          <Link to="/Users">Users</Link>
          {isLogged ? (
            <button className="nav__mobile__logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/Login">Login</Link>
          )}
        </div>
      )}
      <div className="nav__desktop-nav">
        <Link to="/">Home</Link>
        <Link to="/Cart">Cart</Link>
        <Link to="/Items">Items</Link>
        <Link to="/Users">Users</Link>
        {isLogged ? (
          <button
            className="nav__desktop__logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/Login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
