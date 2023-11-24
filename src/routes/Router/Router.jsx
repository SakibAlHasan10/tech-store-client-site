import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";
import Roots from "../../layout/roots/Roots";
import Home from "../../pages/home/Home";

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
    }
])


export default router;