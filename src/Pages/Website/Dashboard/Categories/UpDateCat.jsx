import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Cat } from "../../../../Api/Api";
import { Axios } from "../../../../Api/AxiosCreate";
import Spinner from "../../../../Components/Website/Spinner";

export const UpDateCat = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // function Get Cat
  const GetCat = async () => {
    try {
      await Axios.get(`${Cat}/${id}`).then((data) => {
        setTitle(data.data.title);
        console.log(data.data.title);
        setDisable(false);
        setLoading(false);
      });
    } catch {
      navigate("/dashboard/users/404/page/404", { replace: true });
    }
  };

  //  Get Cat Api UseEffect
  useEffect(() => {
    setLoading(true);
    GetCat();
  }, []);

  // Get Cat
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

  // Function UpDate Cat
  async function handelUpdate(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      Axios.post(`${Cat}/edit/${id}`, form).then(() =>
        navigate("/dashboard/categories")
      );
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
              placeholder="Title........."
              id="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full  shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px]"
              required
            />
            <label
              className=" text-white text-[18px] lg:text-black"
              htmlFor="Title"
            >
              Title :
            </label>
          </div>
          <div className="relative">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files.item(0))}
              className="w-full  shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px]"
              required
            />
            <label
              className="block text-white text-[18px] mb-[10px] lg:text-black"
              htmlFor="Image"
            >
              Image :
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
