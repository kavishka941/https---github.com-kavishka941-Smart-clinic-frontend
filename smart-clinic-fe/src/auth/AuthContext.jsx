import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const fetchMe = async () => {
    try {
      const { data } = await api.get("/me");
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setReady(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchMe();
    else setReady(true);
  }, []);

  const login = async (credentials) => {
    const { data } = await api.post("/login", credentials);
    // expect { token } from your backend
    localStorage.setItem("token", data.token);
    await fetchMe();
  };

  const register = async (form) => {
    await api.post("/register", form);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, ready, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
