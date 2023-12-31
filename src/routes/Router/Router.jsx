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
import AdminPrivateRoute from "../adminPrivateRoute/AdminPrivateRoute";
import ErrorPage from "../../layout/roots/ErrorPage";
import StatisticsPage from "../../pages/Dashboard/Admin/StatisticsPage/StatisticsPage";
import ManageCoupon from "../../pages/Dashboard/Admin/ManageCoupon/ManageCoupon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    errorElement: <ErrorPage />,
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
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <ManageUser />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-coupon",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <ManageCoupon />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <StatisticsPage />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
