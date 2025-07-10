import Landing from "@/pages/Landing";
import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div>
      <Landing />
      {/* <nav className="p-4 bg-slate-200 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <main className="p-6">
        <Outlet />
      </main> */}
    </div>
  );
}
