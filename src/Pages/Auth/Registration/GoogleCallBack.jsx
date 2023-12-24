import axios from "axios";
import { useEffect } from "react";
import { GOOGLECALLBACK, baseURL } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";
const GoogleCallBack = () => {
  const cookie = Cookie();
  const location = useLocation();
  useEffect(() => {
    async function GoogleCall() {
      try {
        let res = await axios.get(
          `${baseURL}/${GOOGLECALLBACK}${location.search}`
        );
        const token = res.data.access_token;
        cookie.set("e-commerce", token);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, []);
  return <div>GoogleCallBack</div>;
};

export default GoogleCallBack;
