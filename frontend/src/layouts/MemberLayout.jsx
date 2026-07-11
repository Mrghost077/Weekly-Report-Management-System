import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MemberLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">
              Weekly Report Management System
            </h1>
            <p className="text-sm text-gray-600">
              Welcome, {user?.firstName}
            </p>
          </div>

          <nav className="flex items-center gap-6">
            <NavLink to="/member">
              Dashboard
            </NavLink>

            <NavLink to="/member/reports">
              My Reports
            </NavLink>

            <NavLink to="/member/reports/new">
              New Report
            </NavLink>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default MemberLayout;