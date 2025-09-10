import { useForm } from "react-hook-form";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../styles/login.css"; // fixed path
import loginImage from "../assets/loginpage.jpg"; // fixed path

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      setErr("");
      await login(data); // expects {email, password}
      nav("/");
    } catch (e) {
      setErr(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      {/* Left Form Section */}
      <div className="login-form-section">
  <div className="login-form-wrapper">
    <h1 className="login-title">Log in</h1>
    {err && <p className="login-error">{err}</p>}
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <label>Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        {...register("email")}
        required
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Create a password"
        {...register("password")}
        required
      />
      <div className="login-extra">
        <Link to="/forgot-password" className="forgot-link">
          Forgot Password ?
        </Link>
      </div>
      <button type="submit" className="login-btn">Log in</button>
    </form>
    <p className="signup-text">
      Don’t have an account?{" "}
      <Link className="signup-link" to="/register">
        Sign up
      </Link>
    </p>
  </div>
</div>


      {/* Right Image Section */}
      <div className="login-image-section">
        <img src={loginImage} alt="Doctors walking" />
      </div>
    </div>
  );
}
