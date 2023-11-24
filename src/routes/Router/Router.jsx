import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";
import Roots from "../../layout/roots/Roots";
import Home from "../../pages/home/Home";
import Dashboard from "../../layout/dashboard/Dashboard";
import MyProfile from "../../pages/Dashboard/User/MyProfile";
import AddProduct from "../../pages/Dashboard/User/addProduct/AddProduct";
import MyProducts from "../../layout/dashboard/User/myProducts/MyProducts";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Roots/>,
        // errorElement
        children:[
            {
                path:"/",
                element:<Home/>
            }
        ]
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/signup",
        element:<Signup/>
    },
    {
        path:"/dashboard",
        element:<Dashboard/>,
        children:[
            // user route
            {
                path:"my-profile",
                element:<MyProfile/>
            },
            {
                path:"add-product",
                element:<AddProduct/>
            },
            {
                path:"my-products",
                element:<MyProducts/>
            }
        ]
    }
])


export default router;