import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
  // const { isAuthenticated } = useAuth();

  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" />;
}
