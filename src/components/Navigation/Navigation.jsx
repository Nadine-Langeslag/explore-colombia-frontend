import "./navigation.css";

import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/">Destinations</Link>
      <Link to="/about">About</Link>
    </nav>
  );
};

export default Navigation;
