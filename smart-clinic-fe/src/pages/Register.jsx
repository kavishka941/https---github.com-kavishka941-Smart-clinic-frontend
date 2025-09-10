import { useForm } from "react-hook-form";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const { register: reg, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "patient", // sensible default
    },
  });
  const { register: doRegister, login } = useAuth();
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      setErr("");
      // Sends { name, email, phone, password, role }
      await doRegister(data);
      await login({ email: data.email, password: data.password });
      nav("/");
    } catch (e) {
      setErr(e.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl mb-4">Register</h1>
      {err && <p className="text-red-600 mb-2">{err}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input className="input" placeholder="Name"
            {...reg("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <input className="input" placeholder="Email"
            type="email"
            {...reg("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <input className="input" placeholder="Phone"
            {...reg("phone", {
              // optional: make it required if you want
              // required: "Phone is required",
              pattern: {
                value: /^[0-9+\-\s()]{6,20}$/,
                message: "Enter a valid phone number",
              },
            })}
          />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
        </div>

        <div>
          <select className="input"
            {...reg("role", { required: "Role is required" })}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-red-600 text-sm">{errors.role.message}</p>}
        </div>

        <div>
          <input className="input" type="password" placeholder="Password"
            {...reg("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </div>

        <button className="btn w-full">Create account</button>
      </form>
    </div>
  );
}
