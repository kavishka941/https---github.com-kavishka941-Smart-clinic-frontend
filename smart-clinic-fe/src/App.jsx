import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Prescription from "./pages/Prescription";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Home from "./pages/Home";

// NEW: import your extracted components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();

  // pages where you don't want the site chrome
  const hideChromeOn = ["/login", "/register"];
  const hideChrome = hideChromeOn.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      {!hideChrome && <Navbar />}

      {/* Main content */}
      <main className={hideChrome ? "" : "p-4 flex-1"}>
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
      </main>

      {/* Footer */}
      {!hideChrome && <Footer />}
    </div>
  );
}
