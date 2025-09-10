import { Routes, Route, Navigate, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Prescription from "./pages/Prescription";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import { useAuth } from "./auth/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="p-4 border-b flex gap-4">
      <Link to="/">Dashboard</Link>
      <Link to="/appointments">Appointments</Link>
      <Link to="/profile">Profile</Link>
      {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      <div className="ml-auto">{user ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}</div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/prescriptions/:id" element={<Prescription />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
