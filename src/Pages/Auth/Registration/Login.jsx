/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { LOGIN, baseURL } from "../../../Api/Api";
import Spinner from "../../../Components/Website/Spinner";
import GoogleBtn from "../../../Components/GoogleBtn/GoogleBtn";
import Cookie from "cookie-universal";
const Login = () => {
  const cookie = Cookie();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  function handelChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function Submit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      let res = await axios.post(`${baseURL}/${LOGIN}`, form);
      const token = res.data.token;
      const role = res.data.user.role;
      const go =
        role === "1995"
          ? "dashboard/users"
          : role === "1996"
          ? "dashboard/writer"
          : role === "2001"
          ? "/"
          : null;
      cookie.set("e-commerce", token);
      window.location.pathname = `${go}`;
      setLoading(false);
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        setErr("Email Or Password Wrong");
      } else {
        setErr("Internal Server Error");
      }
      setLoading(false);
    }
  }
  return (
    <>
      {loading && <Spinner />}
      <div className="flex justify-center items-center h-screen container  ">
        <form
          onSubmit={Submit}
          className="FormsBg rounded-lg overflow-hidden shadow-2xl w-full  relative"
        >
          <div className="absolute top-[50%] left-0 lg:left-[30px] px-[20px] lg:px-0 translate-y-[-50%]  flex flex-col gap-[70px] w-full lg:w-[40%] ">
            <h1 className="text-[60px] text-white lg:text-black font-bold ">
              Log In
            </h1>

            <div className="relative">
              <input
                type="email"
                placeholder="Email........."
                id="Email"
                name="email"
                value={form.email}
                onChange={handelChange}
                className="w-full  shadow-lg h-[70px] px-[10px] rounded-lg  bg-green-200 lg:bg-green-100 border-b-[5px] border-transparent outline-none text-black text-[18px]"
                required
              />
              <label
                className="block text-white text-[18px] mb-[10px] lg:text-black"
                htmlFor="Email"
              >
                Email :
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password........."
                id="Password"
                name="password"
                value={form.password}
                onChange={handelChange}
                className="w-full  shadow-lg h-[70px] px-[10px] rounded-lg bg-green-200 lg:bg-green-100 border-b-[5px] border-transparent outline-none text-black text-[18px]"
                required
                minLength={8}
              />
              <label
                className="block text-white text-[18px] mb-[10px] lg:text-black"
                htmlFor="Password"
              >
                Password :
              </label>
            </div>
            <div className="flex">
              <button className="w-[180px] h-[4rem] mx-auto text-[20px] bg-green-300 text-black font-medium rounded-lg flex justify-center items-center">
                Login
              </button>
              <GoogleBtn Google="Login For Google" />
            </div>
            {err !== "" && (
              <span className="rounded-lg w-[80%] mx-auto h-[60px] flex items-center justify-center px-[10px] text-[20px] text-black font-bold bg-red-200 border-[3px] border-red-600">
                {err}
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
