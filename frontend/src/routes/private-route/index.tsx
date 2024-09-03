import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
interface PrivateRouteProps {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
