/* eslint-disable react/prop-types */
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { USER } from "../../../Api/Api";
import Spinner from "../../../Components/Website/Spinner";
import { Error403 } from "../../../Components/Error/Error403/Error403";
import { Axios } from "../../../Api/AxiosCreate";
export const ProtectedAuth = ({ routeRole }) => {
  const [user, setUSer] = useState("");

  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  useEffect(() => {
    Axios.get(`/${USER} `).then((data) => setUSer(data.data));
  }, []);

  return token ? (
    user === "" ? (
      <Spinner />
    ) : routeRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Error403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
};
