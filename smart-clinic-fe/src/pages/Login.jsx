import { useForm } from "react-hook-form";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/login.css";
import loginImage from "../assets/loginpage.jpg";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login, user, ready } = useAuth();
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const location = useLocation();

  // Optional: if you came from a protected page, you can return there.
  // But your primary rule is always go to /dashboard after login.
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (ready && user) nav("/dashboard", { replace: true });
  }, [ready, user, nav]);

  const onSubmit = async (data) => {
    try {
      setErr("");
      await login(data);           // sets token + user in context
      nav(from, { replace: true }); // goes to /dashboard
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    }
  };

  if (!ready) return null;

  return (
    <div className="login-container">
      <div className="login-form-section">
        <div className="login-form-wrapper">
          <h1 className="login-title">Log in</h1>
          {err && <p className="login-error">{err}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" {...register("email")} required />
            <label>Password</label>
            <input type="password" placeholder="Enter your password" {...register("password")} required />
            <div className="login-extra">
              <Link to="/forgot-password" className="forgot-link">Forgot Password ?</Link>
            </div>
            <button type="submit" className="login-btn">Log in</button>
          </form>
          <p className="signup-text">
            Don’t have an account? <Link className="signup-link" to="/register">Sign up</Link>
          </p>
        </div>
      </div>

      <div className="login-image-section">
        <img src={loginImage} alt="Doctors walking" />
      </div>
    </div>
  );
}
