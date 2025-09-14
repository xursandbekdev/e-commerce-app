import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

interface Props {
  roles?: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ roles = ["USER"], children }: Props) => {
  const { user, loading } = useAuth();

  if (loading) {
    // AuthProvider hali localStorage’ni tekshiryapti — hozircha redirect qilmaymiz
    return <div>Loading...</div>;
  }

  if (!user.token) return <Navigate to="/login" replace />;
  if (roles && user.role && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
