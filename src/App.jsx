import { useEffect } from "react";
import Signup from "./Pages/Auth/Registration/Signup";
import Aos from "aos";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Registration/Login";
import HomePage from "./Pages/Website/HomePage";
import GoogleCallBack from "./Pages/Auth/Registration/GoogleCallBack";
import { Dashboard } from "./Pages/Website/Dashboard/Dashboard";
import { Users } from "./Pages/Website/Dashboard/Users/Users";
import { ProtectedAuth } from "./Pages/Auth/Protected/ProtectedAuth";
import { UpDateUser } from "./Pages/Website/Dashboard/Users/UpDateUser/UpDateUser";
import { AddUser } from "./Pages/Website/Dashboard/Users/AddUser";
import { AddCategory } from "./Pages/Website/Dashboard/Categories/AddCategory";
import { Categories } from "./Pages/Website/Dashboard/Categories/Categories";
import { UpDateCat } from "./Pages/Website/Dashboard/Categories/UpDateCat";
import { AddProduct } from "./Pages/Website/Dashboard/Product/AddProducts";
import { Err404 } from "./Components/Error/Error404/Err404";
import ProtectedSign from "./Pages/Auth/Protected/ProtectedSign";
import { Product } from "./Pages/Website/Dashboard/Product/Product";
export default function App() {
  useEffect(() => {
    Aos.init({
      easing: "ease",
      duration: 1000,
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedSign />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        <Route element={<ProtectedAuth routeRole={["1995", "1996", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<ProtectedAuth routeRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/add" element={<AddUser />} />
              <Route path="users/:id" element={<UpDateUser />} />
            </Route>
            <Route element={<ProtectedAuth routeRole={["1999", "1995"]} />}>
              <Route path="categories" element={<Categories />} />
              <Route path="categories/add" element={<AddCategory />} />
              <Route path="categories/:id" element={<UpDateCat />} />
              <Route path="product" element={<Product />} />
              <Route path="product/add" element={<AddProduct />} />
            </Route>
          </Route>
          <Route path="/*" element={<Err404 routeRole={["1996", "1995"]} />} />
        </Route>
      </Routes>
    </>
  );
}
