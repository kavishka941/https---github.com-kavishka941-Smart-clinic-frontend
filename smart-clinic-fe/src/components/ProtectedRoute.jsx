import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute({ roles }) {
  const { user, ready } = useAuth();
  if (!ready) return null; // or a spinner
  if (!user) return <Navigate to="/login" replace />;

  if (roles?.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
