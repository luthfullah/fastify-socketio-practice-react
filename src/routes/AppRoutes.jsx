import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../components/PrivateRoute";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import FormComp from "../pages/FormComp";
import Home from "../pages/Home";
import SubmittedForms from "../pages/SubmittedForms";
// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000", { autoConnect: false });

export default function AppRoutes() {
  // const [userCount, setUserCount] = useState(0);
  // const [formCount, setFormCount] = useState(0);
  //   const token = localStorage.getItem("token");
  //  const { isAuthenticated, user, login } = useAuth();
  //   useEffect(() => {
  //     if (token) {
  //       socket.connect();
  //       socket.on("userCount", (count) => {
  //         console.log("Received userCount:", count);
  //         setUserCount(count);
  //       });

  //       socket.on("formCount", (count) => {
  //         console.log("Received formCount:", count);
  //         setFormCount(count);
  //       });

  //       // Clean up
  //       return () => {
  //         socket.off("userCount");
  //         socket.off("formCount");
  //       };
  //     }
  //   }, [token]);
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form" element={<FormComp />} />
          <Route path="/submitted" element={<SubmittedForms />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
