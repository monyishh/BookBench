import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function ProtectedRoute({ element }) {
  const [authUser] = useAuth();

  return authUser ? element : <Navigate to="/" replace />;
}

export default ProtectedRoute;
