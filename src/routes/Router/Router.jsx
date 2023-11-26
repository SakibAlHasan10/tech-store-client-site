import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";
import Roots from "../../layout/roots/Roots";
import Home from "../../pages/home/Home";
import Dashboard from "../../layout/dashboard/Dashboard";
import MyProfile from "../../pages/Dashboard/User/myProfile/MyProfile";
import AddProduct from "../../pages/Dashboard/User/addProduct/AddProduct";
import Products from "../../pages/products/Products";
import PrivateRoute from "../privateRoute/PrivateRoute";
import ReportedProduct from "../../pages/Dashboard/Moderators/ReportedProduct/ReportedProduct";
import ReviewProduct from "../../pages/Dashboard/Moderators/ReviewProduct/ReviewProduct";
import MyProducts from "../../pages/Dashboard/User/myProducts/MyProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    // errorElement
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup/:p",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // user route
      {
        path: "",
        element: <MyProfile />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "my-products",
        element: <MyProducts />,
      },
      // Moderators route
      {
        path: "reported-product",
        element: (
          <PrivateRoute>
            <ReportedProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "review-product",
        element: (
          <PrivateRoute>
            <ReviewProduct />
          </PrivateRoute>
        ),
      },
      //   Admin Route
    ],
  },
]);

export default router;
