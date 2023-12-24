/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
export const Table = (props) => {
  const oneUser = props.oneUser || { name: "", id: "" };

  // Data Table
  const showUsers = props.StateApi.map((item, index) => {
    return (
      <tr key={index}>
        <td className=" px-0 text-center sm:px-2 text-[13px] sm:text-[18px] font-bold py-[30px]">
          {index + 1}
        </td>
        {props.Data.map((item2, index2) => {
          return (
            <td
              key={index2}
              className=" px-0 sm:px-2 text-center text-[13px] sm:text-[18px] font-bold py-[30px]"
            >
              {item2.key === "image" ? (
                <img
                  className="w-[120px] mx-auto"
                  src={item[item2.key]}
                  alt="image"
                />
              ) : item[item2.key] === "1995" ? (
                "Admin"
              ) : item[item2.key] === "1996" ? (
                "Writer"
              ) : item[item2.key] === "1999" ? (
                "Product Manger"
              ) : item[item2.key] === "2001" ? (
                "User"
              ) : (
                item[item2.key]
              )}
              {oneUser && item[item2.id] === oneUser.id && " (You)"}
            </td>
          );
        })}
        <td className=" px-0 text-center sm:px-2 text-[13px] sm:text-[18px] font-bold py-[30px]">
          <Link
            to={`${item.id}`}
            className="font-medium mr-2 text-blue-600  hover:underline"
          >
            Edit
          </Link>
          {item.id !== oneUser.id && (
            <span
              onClick={() => props.Delete(item.id)}
              style={{ color: "red" }}
              className="cursor-pointer"
            >
              Delete
            </span>
          )}
        </td>
      </tr>
    );
  });
  return (
    <div className="relative overflow-hidden mt-[100px] shadow-lg px-2 sm:px-0 rounded-lg w-full  container h-full grid grid-cols-1 justify-center item-center ">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-[#038EDC] uppercase text-center bg-[#F2F3FE]">
          <tr>
            <th
              scope="col"
              className=" px-2 sm:px-2 py-[30px] text-[13px] sm:text-[18px]"
            >
              id
            </th>
            {props.Data.map((item, index) => {
              return (
                <th
                  scope="col"
                  key={index}
                  className=" px-2 sm:px-2 py-[30px] text-[13px] sm:text-[18px]"
                >
                  {item.name}
                </th>
              );
            })}
            <th
              scope="col"
              className=" px-2 sm:px-2 py-[30px] text-[13px] sm:text-[18px]"
            >
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {props.StateApi.length === 0 ? (
            <tr>
              <td colSpan={12} className="text-center">
                Loading.......
              </td>
            </tr>
          ) : props.StateApi.length == 0 && props.notFound ? (
            <tr>
              <td
                colSpan={12}
                className=" px-0 sm:px-2 text-[13px] sm:text-[24px] font-bold py-[30px] text-center "
              >
                Not Found Users....
              </td>
            </tr>
          ) : (
            showUsers
          )}
        </tbody>
      </table>
    </div>
  );
};
