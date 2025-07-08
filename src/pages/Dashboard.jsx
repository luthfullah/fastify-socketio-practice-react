import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
export default Dashboard;
