import { Link } from "react-router-dom"
import Nav from "./Nav"
import "../css/Header.css"

const Header = () => {
  return (
    <header>
      <div className="header__logo">
        <p>aBay 🛍️</p>
      </div>
      <div className="nav">
        <Nav />
      </div>
    </header>
  )
}

export default Header