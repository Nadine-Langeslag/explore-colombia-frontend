import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth.js";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <p className="loading">Checking your session...</p>;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/signin" replace />;
}
