import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MainLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex gap-4 font-medium">
          <Link to="/form" className="hover:underline">
            Form
          </Link>
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      {/* Page content injected here */}
      <main className="flex-grow p-6 bg-slate-50">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-200 text-center py-4">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}
