import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context/use-auth-context";

interface PublicRouteProps {
  element: React.ReactNode;
  redirectTo: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element, redirectTo }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{element}</>;
};

export default PublicRoute;
