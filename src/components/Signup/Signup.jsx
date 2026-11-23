import "./signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await onSignup(name, email, password);
      navigate("/signin");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="signup">
      <form className="signup__form" onSubmit={handleSubmit}>
        <h2 className="signup__title">Sign Up</h2>
        <fieldset className="signup__content">
          <input
            type="text"
            className="signup__input"
            name="name"
            id="signup-name"
            placeholder="User name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            minLength={2}
            maxLength={30}
          />

          <input
            type="email"
            className="signup__input"
            name="email"
            id="signup-email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <input
            type="password"
            className="signup__input"
            name="password"
            id="signup-password"
            placeholder="Password"
            value={password}
            minLength="8"
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button
            className="signup__button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </fieldset>
        {error && <p className="signup__error">{error}</p>}
        <div className="signup__signup">
          <p className="signup__text">Already a member? </p>
          <Link to="/signin" className="signup__link">
            Sign in here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
