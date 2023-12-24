import { BsFillPeopleFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { RiShoppingBasketFill } from "react-icons/ri";
import { MdAddShoppingCart } from "react-icons/md";
import { MdCategory } from "react-icons/md";

export const DataLinks = [
  {
    id: "1",
    to: "users",
    name: "Users",
    role: "1995",
    icon: <BsFillPeopleFill size={30} />,
  },
  {
    id: "2",
    to: "users/add",
    name: "Add User",
    role: "1995",
    icon: <FaPlus size={30} />,
  },
  {
    id: "4",
    to: "categories",
    name: "Categories",
    role: ["1995", "1999"],
    icon: <MdCategory size={30} />,
  },
  {
    id: "5",
    to: "categories/add",
    name: "Add Category",
    role: ["1995", "1999"],
    icon: <FaPlus size={30} />,
  },
  {
    id: "6",
    to: "product",
    name: "Product",
    role: ["1995", "1999"],
    icon: <RiShoppingBasketFill size={30} />,
  },
  {
    id: "7",
    to: "product/add",
    name: "Add Product",
    role: ["1995", "1999"],
    icon: <MdAddShoppingCart size={30} />,
  },
];