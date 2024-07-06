import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";

import { verifyToken } from "../utils/verifyToken";
import { logOut, selectCurrentToken } from "../redux/features/auth/authSlice";

type TProtectedRoute = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  const user = verifyToken(token);

  if (!user) {
    dispatch(logOut());
    return <Navigate to="/login" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
