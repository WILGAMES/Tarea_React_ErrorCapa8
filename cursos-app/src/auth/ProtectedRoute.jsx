import { useContext } from "react";

import { Navigate } from "react-router-dom";

import { AuthContext } from "./AuthContext";

function ProtectedRoute({ children }) {

  const { isAuthenticated } = useContext(AuthContext);
  const hasToken = !!localStorage.getItem("token");

  if (!isAuthenticated || !hasToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;