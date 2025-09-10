import { useForm } from "react-hook-form";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

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
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>
      {err && <p className="text-red-600 mb-2">{err}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input className="input" placeholder="Email" {...register("email")} />
        <input className="input" type="password" placeholder="Password" {...register("password")} />
        <button className="btn">Login</button>
      </form>
      <p className="mt-2 text-sm">
        No account? <Link className="text-blue-600" to="/register">Register</Link>
      </p>
    </div>
  );
}
