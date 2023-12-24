import { FaBars } from "react-icons/fa";
import Logo from "../../Assets/img/ecommerce.svg";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ContextSide } from "../../Context/OpenSideContext";
import { Axios } from "../../Api/AxiosCreate";
import { LOGOUT, USER } from "../../Api/Api";
import Cookie from "cookie-universal";
export const TopNav = () => {
  const [oneUser, setOneUser] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const Context = useContext(ContextSide);
  const SetSide = Context.setSide;
  const StateSide = Context.side;
  function handelClick() {
    SetSide(!StateSide);
  }
  function handelDrop() {
    setDropDown(!dropDown);
  }
  const cookie = Cookie();

  // fun Log-Out
  async function handelLogOut() {
    try {
      await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }
  // oneUser
  useEffect(() => {
    try {
      Axios(`/${USER}`).then((data) => {
        setOneUser(data.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="px-[20px] h-[80px] flex justify-between items-center shadow-md fixed top-0 w-full z-[10] bg-white">
      <div className="flex flex-1 items-center gap-[75px]">
        <div className="flex items-center gap-1">
          <div>
            <img src={Logo} alt="Logo E-Commerce" className="h-[50px]" />
          </div>
          <Link to="/" className="text-black text-[22px] font-bold">
            E-Commerce
          </Link>
        </div>
        <p
          className="cursor-pointer text-black text-[18px] font-medium"
          onClick={handelClick}
        >
          <FaBars />
        </p>
      </div>
      <div>
        <button
          onClick={handelDrop}
          className="w-[120px] relative h-[50px] bg-blue-500 rounded-xl text-[18px] text-white"
        >
          {oneUser.name}
        </button>
        <ul>
          <li
            onClick={handelLogOut}
            className={` absolute cursor-pointer left-[80%] rounded-lg font-medium text-black bg-white shadow-lg w-[130px] py-[12px] pl-[4px] ${
              dropDown ? "block" : "hidden"
            } `}
          >
            Log-Out
          </li>
        </ul>
      </div>
    </div>
  );
};
