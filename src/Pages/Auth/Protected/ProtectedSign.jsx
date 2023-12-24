import Cookie from "cookie-universal";
import { Outlet } from "react-router-dom";
const ProtectedSign = () => {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  return token ? window.history.back(): <Outlet />;
};

export default ProtectedSign;
