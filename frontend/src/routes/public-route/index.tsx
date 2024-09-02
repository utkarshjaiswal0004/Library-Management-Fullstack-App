import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

interface PublicRouteProps {
  element: React.ReactElement;
  redirectTo: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element, redirectTo }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to={redirectTo} replace /> : element;
};

export default PublicRoute;
