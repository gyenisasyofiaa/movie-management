import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../services/authService";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Sembunyikan navbar di halaman login
  if (location.pathname === "/login") {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/20 group-hover:bg-indigo-700 transition-colors">
            🎬
          </div>
          <div>
            <span className="font-bold text-slate-900 tracking-tight text-base block leading-none">
              Movie Management
            </span>
            <span className="text-[11px] font-medium text-slate-400 mt-1 block">Admin Dashboard</span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <Link
            to="/"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              isActive("/") && location.pathname === "/"
                ? "bg-indigo-50 text-indigo-600 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Home
          </Link>
          <Link
            to="/genres"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              isActive("/genres")
                ? "bg-indigo-50 text-indigo-600 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Genre
          </Link>
          <Link
            to="/films"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              isActive("/films")
                ? "bg-indigo-50 text-indigo-600 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Film
          </Link>
        </nav>

        {/* Logout Button */}
        <div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium text-sm transition-colors border border-rose-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}