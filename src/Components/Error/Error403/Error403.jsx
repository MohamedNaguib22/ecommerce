/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const Error403 = ({ role }) => {
  return (
    <div className="text-red-500 font-bold text-[28px] text-center h-[80vh] w-full flex flex-col  justify-center items-center">
      <p className="text-green-400 text-[50px] font-black">Ohhh...</p>
      <h1>Error403 This Page is Not Access</h1>
      <div>
        <Link
          to={role === "1996" ? "/dashboard/writer" :  "/"}
          className="inline-block text-[18px] text-white bg-blue-500 w-[180px] py-[8px] rounded-lg"
        >
          Go To Home page
        </Link>
      </div>
    </div>
  );
};
