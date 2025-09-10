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

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();

  // Keep your chrome logic as-is
  const hideChromeOn = ["/login", "/register", "/dashboard"];
  const hideChrome = hideChromeOn.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideChrome && <Navbar />}

      <main className={hideChrome ? "" : "p-4 flex-1"}>
        <Routes>
          {/* PUBLIC: Home is always at "/" */}
          <Route path="/" element={<Home />} />

          {/* PUBLIC: Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PRIVATE: needs auth */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/prescriptions/:id" element={<Prescription />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* ADMIN-ONLY */}
          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          {/* 404 → Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      {!hideChrome && <Footer />}
    </div>
  );
}
