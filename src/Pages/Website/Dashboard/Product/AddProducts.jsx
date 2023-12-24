import { useEffect, useRef, useState } from "react";
import { Axios } from "../../../../Api/AxiosCreate";
import { useNavigate } from "react-router-dom";
import { ADD, CAT, EDIT, Pro } from "../../../../Api/Api";
import { MdCloudUpload } from "react-icons/md";
import "./AddProduct.css";
export const AddProduct = () => {
  // State
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    rating: "",
    price: "",
    discount: "",
    About: "",
  });
  const fakeData = {
    category: null,
    title: "Fake Data",
    description: "Data",
    rating: "20",
    price: "20",
    discount: "15",
    About: "Data Fake",
  };
  const [cat, setCat] = useState([]);
  const [images, setImages] = useState([]);
  const [disableInput, setDisableInput] = useState(false);
  const [productId, setProductId] = useState("");

  // Ref
  const focus = useRef();
  const fileInputRef = useRef(null);
  const progress = useRef([]);
  const num = useRef(-1);

  // Focus Ref
  useEffect(() => {
    focus.current.focus();
  }, []);
  function inputClick() {
    fileInputRef.current.click();
  }
  // function Submit Choose Cate
  const submitCateForm = async () => {
    try {
      await Axios.post(`${Pro}/${ADD}`, fakeData).then((data) => {
        setProductId(data.data.id);
      });
    } catch (err) {
      console.log(err);
    }
  };
  // Function OnChange
  function onChangeForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });

    setDisableInput("Done");
    if (disableInput !== "Done") {
      submitCateForm();
    }
  }
  // Navigate
  const navigate = useNavigate();

  //  Function Add Products
  async function handelUpdate(e) {
    e.preventDefault();
    try {
      await Axios.post(`${Pro}/${EDIT}/${productId}`, form);
      navigate("/dashboard/product");
    } catch (err) {
      console.log(err);
    }
  }

  // Get Category
  useEffect(() => {
    Axios.get(`${CAT}`).then((data) => {
      setCat(data.data);
      console.log(data.data);
    });
  }, []);

  // Function Upload Images
  async function handleImages(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const sendImage = e.target.files;
    const data = new FormData();
    for (let i = 0; i < sendImage.length; i++) {
      num.current++;
      data.append("image", sendImage[i]);
      data.append("product_id", productId);
      try {
        await Axios.post("/product-img/add", data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 20 === 0) {
              progress.current[num.current].style.width = `${percent}%`;
              progress.current[num.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
  // View Img
  const viewImage = images.map((img, key) => {
    return (
      <>
        <div className="flex items-center gap-3">
          <img
            key={key}
            className="w-[400px]"
            src={URL.createObjectURL(img)}
            alt=""
          />
          <p className="text-black">
            {img.size / 1024 < 900
              ? (img.size / 1024).toFixed(2) + "KB"
              : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
          </p>
        </div>
        <span className="w-full h-[9px] block bg-gray-200 rounded-full ">
          <span
            className="bg-blue-500 h-full block w-0 relative rounded-full Progress transition-all duration-[0.3s]"
            // eslint-disable-next-line react/no-unknown-property
            percent={"0%"}
            ref={(e) => (progress.current[key] = e)}
          ></span>
        </span>
      </>
    );
  });
  return (
    <div className="w-full container">
      <form
        onSubmit={handelUpdate}
        className="flex flex-col gap-[80px] mt-[50px]"
      >
        <h1 className="text-[60px] text-blue-400 font-bold text-center ">
          Add User
        </h1>
        <div className="relative">
          <select
            onChange={onChangeForm}
            value={form.category}
            name="category"
            ref={focus}
            className="w-full shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px]"
          >
            <option disabled>Select Category</option>
            {cat.map((cate, index) => {
              return (
                <option value={cate.id} key={index}>
                  {cate.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Title........."
            id="Title"
            name="title"
            value={form.title}
            onChange={onChangeForm}
            className={`w-full  shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px] ${
              !disableInput === true && "bg-gray-400 lg:bg-gray-200"
            }`}
            required
            disabled={!disableInput}
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
            type="text"
            placeholder="Description........."
            id="Description"
            name="description"
            value={form.description}
            onChange={onChangeForm}
            className={`w-full  shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px] ${
              !disableInput === true && "bg-gray-400 lg:bg-gray-200"
            }`}
            required
            disabled={!disableInput}
          />
          <label
            className="block text-white text-[18px] mb-[10px] lg:text-black"
            htmlFor="Description"
          >
            Description :
          </label>
        </div>
        <div className="relative">
          <input
            type="number"
            placeholder="Rating........."
            id="Rating"
            name="rating"
            value={form.rating}
            onChange={onChangeForm}
            className={`w-full  shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px] ${
              !disableInput === true && "bg-gray-400 lg:bg-gray-200"
            }`}
            required
            disabled={!disableInput}
          />
          <label
            className="block text-white text-[18px] mb-[10px] lg:text-black"
            htmlFor="Price"
          >
            Price :
          </label>
        </div>
        <div className="relative">
          <input
            type="number"
            placeholder="Price........."
            id="Price"
            name="price"
            value={form.price}
            onChange={onChangeForm}
            className={`w-full  shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px] ${
              !disableInput === true && "bg-gray-400 lg:bg-gray-200"
            }`}
            required
            disabled={!disableInput}
          />
          <label
            className="block text-white text-[18px] mb-[10px] lg:text-black"
            htmlFor="Price"
          >
            Price :
          </label>
        </div>
        <div className="relative">
          <input
            type="number"
            placeholder="Discount........."
            id="Discount"
            name="discount"
            value={form.discount}
            onChange={onChangeForm}
            className={`w-full  shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px] ${
              !disableInput === true && "bg-gray-400 lg:bg-gray-200"
            }`}
            required
            disabled={!disableInput}
          />
          <label
            className="block text-white text-[18px] mb-[10px] lg:text-black"
            htmlFor="Discount"
          >
            Discount :
          </label>
        </div>
        <div className="relative">
          <input
            type="number"
            placeholder="About........."
            id="About"
            name="About"
            value={form.About}
            onChange={onChangeForm}
            className={`w-full  shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px] ${
              !disableInput === true && "bg-gray-400 lg:bg-gray-200"
            }`}
            required
            disabled={!disableInput}
          />
          <label
            className="block text-white text-[18px] mb-[10px] lg:text-black"
            htmlFor="About"
          >
            About :
          </label>
        </div>
        <div className="relative">
          <input
            type="file"
            multiple
            onChange={handleImages}
            hidden
            ref={fileInputRef}
            disabled={!disableInput}
            className={`w-full  shadow-lg h-[70px] px-[10px] rounded-lg  bg-blue-200 lg:bg-blue-100 border-b-[5px] border-transparent outline-none text-black text-[18px] ${
              !disableInput === true && "bg-gray-400 lg:bg-gray-200"
            }`}
          />
          <div
            onClick={inputClick}
            className={`w-full h-[200px] flex justify-center items-center flex-col px-[10px] rounded-lg border-dashed border-2 text-[35px] font-bold  ${
              !disableInput === true
                ? " text-gray-400 border-gray-400"
                : "border-sky-400 text-sky-400"
            }`}
          >
            <MdCloudUpload size={120} />
            <div>
              <h2 className="uppercase">UpLoad Images</h2>
            </div>
          </div>
          <div className="flex flex-col gap-[16px] mt-[20px]">{viewImage}</div>
        </div>
        <button
          disabled={!disableInput}
          className={`w-[30%] h-[4rem] mx-auto text-[24px] bg-blue-400 text-white font-medium rounded-lg flex justify-center items-center ${
            !disableInput && "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Save
        </button>
      </form>
    </div>
  );
};
