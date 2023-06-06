import { Link } from "react-router-dom";
import "../css/Nav.css";
import { useState } from "react";
import MyButton from "./myButton";
import MyLink from "./MyLink";

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
    document.body.classList.toggle("overflow-hidden");
  };

  const handleLinkCloseMobileMenu = () => {
    setIsOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <nav className="nav">
      <div className="nav__mobile-nav">
        <MyButton className="nav__mobile-open-button" onClick={handleMenuShow}>
          {openButtonIcon}
        </MyButton>
      </div>
      {isOpen && (
        <div className="nav__mobile-links">
          <MyButton
            className="nav__mobile-close-button"
            onClick={handleMenuShow}
          >
            {closeButtonIcon}
          </MyButton>
          <MyLink onClick={handleLinkCloseMobileMenu} to="/">
            Home
          </MyLink>
          <MyLink onClick={handleLinkCloseMobileMenu} to="/cart">
            Cart
          </MyLink>
          <MyLink onClick={handleLinkCloseMobileMenu} to="/items">
            Items
          </MyLink>
          <MyLink onClick={handleLinkCloseMobileMenu} to="/items/manage">
            Manage items
          </MyLink>
          <MyLink onClick={handleLinkCloseMobileMenu} to="/users">
            Users
          </MyLink>
          {isLogged ? (
            <MyButton
              className="nav__mobile__logout-button"
              onClick={handleLogout}
            >
              Logout
            </MyButton>
          ) : (
            <MyLink to="/Login" onClick={handleLinkCloseMobileMenu}>
              Login
            </MyLink>
          )}
        </div>
      )}
      <div className="nav__desktop-nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/items">Items</Link>
        <Link to="/items/manage">Manage items</Link>
        <Link to="/users">Users</Link>
        {isLogged ? (
          <MyButton
            className="nav__desktop__logout-button"
            onClick={handleLogout}
          >
            Logout
          </MyButton>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
