import { useEffect, useState } from "react";
import { USER, USERS } from "../../../../Api/Api";
import { Link } from "react-router-dom";
import { Axios } from "../../../../Api/AxiosCreate";
import { Table } from "../../../../Components/Table/Table";

export const Users = () => {
  // State
  const [users, setUsers] = useState([]);
  const [oneUser, setOneUser] = useState([]);
  const [notFound, setNotFound] = useState(false);

  // Header Table
  const headers = [
    {
      name: "User Name",
      key: "name",
      id : "email"
    },
    {
      name: "Email",
      key: "email",
    },
    {
      name: "Role",
      key: "role",
    },
  ];

  // Filter OneUser
  // const filterUsers = users.filter((user) => user.id !== oneUser.id);

  // Variable Get All Data(Users)
  const getData = () => {
    try {
      Axios(`/${USERS}`).then((data) => {
        setUsers(data.data);
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

  // oneUser
  useEffect(() => {
    try {
      Axios(`/${USER}`).then((data) => {
        setOneUser(data.data);
        console.log(data.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Delete Users
  async function handelDelete(id) {
    try {
      await Axios.delete(`/${USER}/${id}`);
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
          Add User
        </Link>
      </div>
      <Table
        Delete={handelDelete}
        StateApi={users}
        oneUser={oneUser}
        notFound={notFound}
        Data={headers}
      />
    </>
  );
};
