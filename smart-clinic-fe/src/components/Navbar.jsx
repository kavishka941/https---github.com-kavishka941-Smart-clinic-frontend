import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        {/* Brand */}
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img src="src/assets/onlylogo.png" alt="Nawaloka Hospitals" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-title">Nawaloka Hospitals</span>
            <span className="brand-sub">Panadura</span>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Links */}
        <nav className={`links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={() => setOpen(false)} className="link">
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className="link">
            About Us
          </NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)} className="link">
            Contact
          </NavLink>

          {/* App links when logged in */}
          {user && (
            <>
              <NavLink to="/dashboard" onClick={() => setOpen(false)} className="link">
                Dashboard
              </NavLink>
              <NavLink to="/appointments" onClick={() => setOpen(false)} className="link">
                Appointments
              </NavLink>
              <NavLink to="/profile" onClick={() => setOpen(false)} className="link">
                Profile
              </NavLink>
              {user?.role === "admin" && (
                <NavLink to="/admin" onClick={() => setOpen(false)} className="link">
                  Admin
                </NavLink>
              )}
            </>
          )}
        </nav>

        {/* Right side actions */}
        <div className="actions">
          {user ? (
            <button onClick={logout} className="btn btn-outline">Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-light">Sign in</Link>
              <Link to="/register" className="btn btn-solid">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
