// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: JSX.Element;
  roles?: ("admin" | "user")[];
}

const ProtectedRoute: React.FC<Props> = ({ children, roles }) => {
  const { role } = useAuth();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/dashboard" replace />; // access denied
  }

  return children;
};

export default ProtectedRoute;
