import { useForm } from "react-hook-form";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Register.css";

// ✅ import assets (more reliable than "/src/..." paths)
import heroImg from "../assets/register.jpg";
import logoImg from "../assets/nawalokalogo.png";

export default function Register() {
  const {
    register: reg,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "patient",
    },
  });

  const { register: doRegister, login } = useAuth();
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      setErr("");
      await doRegister(data);
      await login({ email: data.email, password: data.password });
      nav("/dashboard");
    } catch (e) {
      setErr(e?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      {/* LEFT: image + logo (desktop only) */}
      <div className="register-left">
        <img
          src={heroImg}
          alt="Healthcare professionals"
          className="register-hero"
        />
        <div className="register-logo-card">
          <img src={logoImg} alt="Nawaloka Hospitals PLC" className="register-logo" />
        </div>
      </div>

      {/* RIGHT: heading + form */}
      <div className="register-right">
        <div className="register-form-wrapper">
          {/* ✅ New title */}
          <h1 className="register-title">Register for your visit</h1>
          {/* (Optional subtext)
          <p className="register-subtitle">
            Create your patient account to book appointments and manage your visits.
          </p>
          */}

          {err && <p className="error-msg">{err}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="register-form">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="form-input"
                {...reg("name", { required: "Full name is required" })}
              />
              {errors.name && <p className="error-msg">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-input"
                {...reg("email", { required: "Email is required" })}
              />
              {errors.email && <p className="error-msg">{errors.email.message}</p>}
            </div>

            {/* Mobile Number */}
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className="form-input"
                {...reg("phone", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9+\-\s()]{6,20}$/,
                    message: "Enter a valid phone number",
                  },
                })}
              />
              {errors.phone && <p className="error-msg">{errors.phone.message}</p>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="form-input"
                {...reg("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
              />
              {errors.password && <p className="error-msg">{errors.password.message}</p>}
            </div>

            {/* hidden default role */}
            <input type="hidden" {...reg("role")} value="patient" readOnly />

            <button type="submit" className="register-btn">Sign up</button>
          </form>

          <p className="signin-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
