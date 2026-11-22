import "./signin.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = ({ onSignin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await onSignin(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="signin">
      <form className="signin__form" onSubmit={handleSubmit}>
        <h2 className="signin__title">Sign In</h2>

        <input
          type="email"
          className="signin__input"
          name="email"
          id="signin-email"
          placeholder="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          className="signin__input"
          name="password"
          id="signin-password"
          placeholder="Password"
          minLength="8"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button
          className="signin__button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>

        {error && <p className="signin__error">{error}</p>}

        <div className="signin__signup">
          <p className="signin__text">Don't have an account?</p>
          <Link to="/signup" className="signin__link">
            Sign up here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
