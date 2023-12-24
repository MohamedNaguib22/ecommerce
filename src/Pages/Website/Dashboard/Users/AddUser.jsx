import { useState } from "react";
import { Axios } from "../../../../Api/AxiosCreate";
import { useNavigate } from "react-router-dom";
import { ADD, USER } from "../../../../Api/Api";

export const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  async function handelUpdate(e) {
    e.preventDefault();
    try {
      await Axios.post(`${USER}/${ADD}`, {
        name: name,
        email: email,
        role: role,
        password: password,
      });
      navigate("/dashboard/users");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="w-full container mt-[100px]">
      <form
        onSubmit={handelUpdate}
        className="flex flex-col gap-[80px] mt-[50px]"
      >
        <h1 className="text-[60px] text-blue-400 font-bold text-center ">
          Add User
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Name........."
            id="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full  shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px]"
            required
          />
          <label
            className=" text-white text-[18px] lg:text-black"
            htmlFor="Name"
          >
            Name :
          </label>
        </div>
        <div className="relative">
          <select
            onChange={(e) => setRole(e.target.value)}
            value={role}
            className="w-full shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px]"
          >
            <option disabled value="">
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="1996">Writer</option>
            <option value="2001">User</option>
            <option value="1999">Product Manger</option>
          </select>
        </div>
        <div className="relative">
          <input
            type="email"
            placeholder="Email........."
            id="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full  shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px]"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full  shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px]"
            required
          />
          <label
            className="block text-white text-[18px] mb-[10px] lg:text-black"
            htmlFor="Email"
          >
            Email :
          </label>
        </div>
        <button className="w-[30%] h-[4rem] mx-auto text-[24px] bg-blue-400 text-white font-medium rounded-lg flex justify-center items-center">
          Save
        </button>
      </form>
    </div>
  );
};
