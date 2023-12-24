import { NavLink } from "react-router-dom";
import "./Nav.css";
import { useContext, useEffect, useState } from "react";
import { ContextSide } from "../../Context/OpenSideContext";
import { USER } from "../../Api/Api";
import { Axios } from "../../Api/AxiosCreate";
import { DataLinks } from "./DataLinks";
// import { WidthSide } from "../../Context/WidthContext";
export const SideNav = () => {
  const SideContext = useContext(ContextSide);
  const SideCondition = SideContext.side;
  // const SideWidth = useContext(WidthSide);
  // const WidthCondition = SideWidth.widthSide;
  const [user, setUSer] = useState("");
  useEffect(() => {
    Axios.get(`/${USER} `).then((data) => setUSer(data.data));
  }, []);
  return (
    <>
      <div
        className={` left-0 invisible opacity-0 hidden lg:flex lg:flex-col lg:gap-[20px] lg:opacity-[1] lg:visible z-[1] sticky bg-white min-h-screen shadow-lg py-[30px] px-[10px] SideNav transition-all duration-[0.3s] ${
          SideCondition ? "w-[320px]" : "w-[90px]"
        }`}
        // style={{ left: WidthCondition < "992" ? (SideCondition ? "0" : "-100%") : "0" }}
      >
        {DataLinks.map((item) => {
          return (
            item.role.includes(user.role) && (
              <NavLink
                key={item.id}
                to={item.to}
                className="w-full flex items-center text-[18px] px-[20px] rounded-lg gap-2 py-[8px] text-gray-500 hover:text-black transition-all duration-[0.3s]"
              >
                <p>{item.icon}</p>
                <p
                  className={`mt-[10px] ${SideCondition ? "block" : "hidden"}`}
                >
                  {item.name}
                </p>
              </NavLink>
            )
          );
        })}
      </div>
      {/* Mobile Side */}
      <div
        className={`left-0 w-[320px] z-[3] bg-white lg:hidden flex flex-col gap-[20px] fixed h-screen lg:invisible lg:opacity-0 opacity-[1] visible shadow-lg py-[30px] px-[10px] SideNav transition-all duration-[0.5s] ${
          SideCondition ? " left-0" : "left-[-200%]"
        }`}
      >
        {DataLinks.map((item) => {
          item.role.includes(user.role) && (
            <NavLink
              key={item.id}
              to={item.to}
              className="w-full flex items-center text-[18px] px-[20px] rounded-lg gap-2 py-[8px] text-gray-500 hover:text-black transition-all duration-[0.3s]"
            >
              <p>{item.icon}</p>
              <p className={`mt-[10px]`}>{item.name}</p>
            </NavLink>
          );
        })}
      </div>
      <div
        className={`bg-[#0303038f] w-full h-screen absolute z-[1] transition-all duration-[0.2s] lg:hidden block  lg:invisible lg:opacity-0 opacity-[1] visible ${
          SideCondition ? " left-0" : "left-[-200%]"
        }`}
      ></div>
    </>
  );
};
