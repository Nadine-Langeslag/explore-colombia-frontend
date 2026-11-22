import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser, getCurrentUser } from "../utils/auth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(() =>
    Boolean(localStorage.getItem("token"))
  );

  const isAuthenticated = Boolean(currentUser.email);

  // Restore the session when the app starts
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const restoreSession = async () => {
      try {
        const user = await getCurrentUser(token);
        setCurrentUser(user);
      } catch {
        localStorage.removeItem("token");
        setCurrentUser({});
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Log in
  const login = async (email, password) => {
    const { token, user } = await loginUser(email, password);

    localStorage.setItem("token", token);
    setCurrentUser(user);
  };

  // Register
  const register = async (name, email, password) => {
    return registerUser(name, email, password);
  };

  // Log out
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser({});
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
