import { useEffect, useState } from "react";
import { CAT, Cat } from "../../../../Api/Api";
import { Link } from "react-router-dom";
import { Axios } from "../../../../Api/AxiosCreate";
import { Table } from "../../../../Components/Table/Table";

export const Categories = () => {
  // State
  const [categories, setCategories] = useState([]);
  const [notFound, setNotFound] = useState(false);

  // Header Table
  const headers = [
    {
      name: "title",
      key: "title",
    },
    {
      name: "image",
      key: "image",
    },
  ];

  // Filter OneUser
  // const filterCategories = users.filter((user) => user.id !== oneUser.id);

  // Variable Get All Data(Users)
  const getData = () => {
    try {
      Axios(`/${CAT}`).then((data) => {
        setCategories(data.data);
        console.log(data.data);
        setNotFound(true);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect get All Users
  useEffect(() => {
    getData();
  }, []);

  // Delete Users
  async function handelDelete(id) {
    try {
      await Axios.delete(`/${Cat}/${id}`);
      getData();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="absolute right-[10%] mt-[25px] ">
        <Link
          to="add"
          className="flex justify-center items-center w-[120px] relative h-[50px] bg-blue-500 rounded-xl text-[18px] text-white"
        >
          Add Category
        </Link>
      </div>
      <Table
        Delete={handelDelete}
        StateApi={categories}
        notFound={notFound}
        Data={headers}
      />
    </>
  );
};
