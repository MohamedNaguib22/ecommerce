import { Link } from "react-router-dom";
import "./Error.css";
export const Err404 = () => {
  return (
    <div className="BG-ERR relative">
      <span className="absolute text-[80px] font-medium text-black left-2/4 translate-x-[-50%] top-[10%]">
        404
      </span>
      <h1 className="w-full text-center text-black font-bold text-[28px] absolute left-2/4 translate-x-[-50%] top-[80%]">
        This Page is Not Found 404
      </h1>
      <Link
        to="/"
        className="flex justify-center items-center rounded-lg text-white bg-green-500 w-[140px] py-[8px] text-[18px] absolute left-2/4 translate-x-[-50%] top-[90%]"
      >
        Go To Home
      </Link>
    </div>
  );
};
