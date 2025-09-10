import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold mb-3">Welcome to Smart Clinic</h1>
      <p className="mb-6">Manage appointments, prescriptions, and profiles with ease.</p>

      {user ? (
        <Link to="/dashboard" className="btn">Go to Dashboard</Link>
      ) : (
        <div className="flex justify-center gap-4">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </div>
      )}
    </div>
  );
}
