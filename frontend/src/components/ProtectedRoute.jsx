import { Navigate } from "react-router-dom";
import { getToken } from "../services/authService";
import Navbar from "./Navbar";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-base-200/50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pb-12">
        {children}
      </main>
    </div>
  );
};

export default ProtectedRoute;