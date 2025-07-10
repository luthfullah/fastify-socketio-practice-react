import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    const token = res.data.token;
    localStorage.setItem("token", token);

    setIsAuthenticated(true);
    setUser({ email });
  };

  const register = async (email, password) => {
    await axios.post("http://localhost:5000/api/auth/register", {
      email,
      password,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // optionally: call /me to get user info
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
