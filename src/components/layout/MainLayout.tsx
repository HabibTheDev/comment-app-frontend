import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logOut, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { Button } from "antd";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div>
      <h2>{user?.email}</h2>
      <h2>
        <Button onClick={handleLogout}>Logout</Button>
      </h2>
      <Outlet />
    </div>
  );
};

export default MainLayout;
