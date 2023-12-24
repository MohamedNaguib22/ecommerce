import { Link } from "react-router-dom";
import { Table } from "../../../../Components/Table/Table";
import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/AxiosCreate";
import { PRO, Pro } from "../../../../Api/Api";

export const Product = () => {
  // State
  const [product, setProduct] = useState([]);

  // Function Get Products
  function getProduct() {
    Axios.get(`/${PRO}`).then((data) => {
      setProduct(data.data);
    });
  }

  // getProduct
  useEffect(() => {
    getProduct();
  }, []);

  // Header Table
  const headers = [
    {
      name: "Title",
      key: "title",
    },
    {
      name: "Description",
      key: "description",
    },
    {
      name: "Price",
      key: "price",
    },
    {
      name: "Rating",
      key: "rating",
    },
  ];
  // Delete Users
  async function handelDelete(id) {
    try {
      await Axios.delete(`/${Pro}/${id}`);
      getProduct();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="absolute right-[10%] mt-[25px] ">
        <Link
          to="add"
          className="flex justify-center items-center w-[140px] relative h-[50px] bg-blue-500 rounded-xl text-[18px] text-white"
        >
          Add Products
        </Link>
      </div>
      <Table StateApi={product} Data={headers} Delete={handelDelete} />
    </>
  );
};
