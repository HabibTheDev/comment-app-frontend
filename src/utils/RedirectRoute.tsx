import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { selectCurrentToken } from "../redux/features/auth/authSlice";

type RedirectRouteProps = {
  children: ReactNode;
};

const RedirectRoute = ({ children }: RedirectRouteProps) => {
  const token = useAppSelector(selectCurrentToken);

  if (token) {
    return <Navigate to="/app" replace={true} />;
  }

  return children;
};

export default RedirectRoute;
