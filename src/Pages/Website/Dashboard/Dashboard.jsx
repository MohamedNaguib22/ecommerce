import { Outlet } from "react-router-dom";
import { SideNav } from "../../../Components/Dashboard/SideNav";
import { TopNav } from "../../../Components/Dashboard/TopNav";

export const Dashboard = () => {
  return (
    <div className="relative ">
      <TopNav />
      <div className="mt-[80px] h-auto flex">
        <SideNav />
        <Outlet />
      </div>
    </div>
  );
};
