import "./navigation.css";

import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth.js";

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navigation">
      <Link to="/">Destinations</Link>
      <Link to="/about">About</Link>

      {isAuthenticated ? (
        <>
          <Link to="/saved">Saved Places</Link>
          <button className="navigation__logout" type="button" onClick={logout}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
