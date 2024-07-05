import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/Home/HomePage";
import LoginForm from "../components/layout/Authentication/LoginForm";
import RegisterForm from "../components/layout/Authentication/RegisterForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/sign-up",
    element: <RegisterForm />,
  },
]);
