import Navigation from "../Navigation/Navigation.jsx";
import "./header.css";
import logo from "../../images/explore_colombia_logo.png";

const Header = () => {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Explore Colombia Logo"
        className="logo header__logo"
      />

      <Navigation />
    </header>
  );
};

export default Header;
