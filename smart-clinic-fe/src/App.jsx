import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Prescription from "./pages/Prescription";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import { useAuth } from "./auth/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="p-4 border-b flex gap-4">
      <Link to="/">Home</Link>
      {user && <Link to="/dashboard">Dashboard</Link>}
      {user && <Link to="/appointments">Appointments</Link>}
      {user && <Link to="/profile">Profile</Link>}
      {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      <div className="ml-auto">
        {user ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
}

export default function App() {
  const location = useLocation();
  const hideNavbarOn = ["/login", "/register"];
  const hideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <div className="min-h-screen">
      {!hideNavbar && <Navbar />}

      <div className={hideNavbar ? "" : "p-4"}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Auth-required */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/prescriptions/:id" element={<Prescription />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Admin-only */}
          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
