import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/Home/HomePage";
import LoginForm from "../components/layout/Authentication/LoginForm";
import RegisterForm from "../components/layout/Authentication/RegisterForm";
import ProtectedRoute from "../utils/ProtectedRoute";
import ErrorPage from "../utils/ErrorPage";
import RedirectRoute from "../utils/RedirectRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RedirectRoute>
        <LoginForm />
      </RedirectRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <RedirectRoute>
        <LoginForm />
      </RedirectRoute>
    ),
  },
  {
    path: "/sign-up",
    element: <RegisterForm />,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/app",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
