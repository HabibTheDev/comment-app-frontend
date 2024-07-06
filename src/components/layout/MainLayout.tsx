import { Outlet } from "react-router-dom";
import NavbarArea from "./Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-blue-gray-50/50" style={{ height: "100%" }}>
      <NavbarArea />
      <Outlet />
    </div>
  );
};

export default MainLayout;
