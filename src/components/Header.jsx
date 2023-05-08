import { Link } from "react-router-dom";
import Nav from "./Nav";
import "../css/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <p>aBay 🛍️</p>
        </Link>
      </div>
      <div className="nav">
        <Nav />
      </div>
    </header>
  );
};

export default Header;
