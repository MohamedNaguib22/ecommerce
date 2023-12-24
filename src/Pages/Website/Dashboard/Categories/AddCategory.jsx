import { useState } from "react";
import { Axios } from "../../../../Api/AxiosCreate";
import { useNavigate } from "react-router-dom";
import { ADD, Cat } from "../../../../Api/Api";

export const AddCategory = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  async function handelUpdate(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      await Axios.post(`${Cat}/${ADD}`, form);
      navigate("/dashboard/categories");
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
            placeholder="Image........."
            id="Image"
            name="image"
            onChange={(e) => setImage(e.target.files.item(0))}
            className="w-full pt-[18px] shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px]"
            required
          />
          <label
            className=" text-white text-[18px] lg:text-black"
            htmlFor="Image"
          >
            Image :
          </label>
        </div>

        <button className="w-[30%] h-[4rem] mx-auto text-[24px] bg-blue-400 text-white font-medium rounded-lg flex justify-center items-center">
          Save
        </button>
      </form>
    </div>
  );
};
