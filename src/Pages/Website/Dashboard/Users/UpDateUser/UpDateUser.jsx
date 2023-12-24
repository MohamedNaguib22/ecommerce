import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../../../Api/AxiosCreate";
import { USER } from "../../../../../Api/Api";
import Spinner from "../../../../../Components/Website/Spinner";

export const UpDateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  
  // function Get User
  const GetUser = async () => {
    try {
      await Axios.get(`${USER}/${id}`).then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
        setDisable(false);
        setLoading(false);
      });
    } catch {
      navigate("/dashboard/users/404/page/404", { replace: true });
    }
  };

  //  Get User Api UseEffect
  useEffect(() => {
    setLoading(true);
    GetUser();
  }, []);

// Get User
  // useEffect(() => {
  //   setLoading(true);
  //    Axios.get(`${USER}/${id}`)
  //      .then((data) => {
  //        setName(data.data.name);
  //        setEmail(data.data.email);
  //        setRole(data.data.role);
  //        setLoading(false);
  //      })
  //      .then(() => setDisable(false))
  //      .catch(() =>
  //        navigate("/dashboard/users/404/page/404", { replace: true })
  //      );
  // }, [id, navigate]);

  // Function UpDate User
  async function handelUpdate(e) {
    e.preventDefault();
    try {
      Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      }).then(() => navigate("/dashboard/users"));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {loading && <Spinner />}
      <div className="w-full container mt-[100px]">
        <form
          onSubmit={handelUpdate}
          className="flex flex-col gap-[80px] mt-[50px]"
        >
          <h1 className="text-[60px] text-blue-400 font-bold text-center ">
            UP DATE
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
          <button
            className="w-[30%] h-[4rem] mx-auto text-[24px] bg-blue-400 text-white font-medium rounded-lg flex justify-center items-center"
            disabled={disable}
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};
