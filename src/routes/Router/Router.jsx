import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";
import Roots from "../../layout/roots/Roots";
import Home from "../../pages/home/Home";
import Dashboard from "../../layout/dashboard/Dashboard";
import AddProduct from "../../pages/Dashboard/User/addProduct/AddProduct";
import Products from "../../pages/products/Products";
import PrivateRoute from "../privateRoute/PrivateRoute";
import ReportedProduct from "../../pages/Dashboard/Moderators/ReportedProduct/ReportedProduct";
import ReviewProduct from "../../pages/Dashboard/Moderators/ReviewProduct/ReviewProduct";
import MyProducts from "../../pages/Dashboard/User/myProducts/MyProducts";
import MyProfile from "../../pages/Dashboard/myProfile/MyProfile";
import ModeratorPrivateRoute from "../moderatorPrivateRoute/ModeratorPrivateRoute";
import ProductDetails from "../../pages/ProductDetails/ProductDetails";
import UpdateProduct from "../../pages/Dashboard/User/myProducts/updateProduct";
import ManageUser from "../../pages/Dashboard/Admin/manageUser/ManageUser";

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
      {
        path: "/details/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
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
      {
        path: "update/:id",
        element: <UpdateProduct />,
      },
      // Moderators route
      {
        path: "reported-product",
        element: (
          <PrivateRoute>
            <ModeratorPrivateRoute>
              <ReportedProduct />
            </ModeratorPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "review-product",
        element: (
          <PrivateRoute>
            <ModeratorPrivateRoute>
              <ReviewProduct />
            </ModeratorPrivateRoute>
          </PrivateRoute>
        ),
      },
      //   Admin Route
      {
        path: "manage-user",
        element: <ManageUser />,
      },
    ],
  },
]);

export default router;
