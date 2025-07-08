import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Login</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleLogin}
      >
        Log In
      </button>
    </div>
  );
}
