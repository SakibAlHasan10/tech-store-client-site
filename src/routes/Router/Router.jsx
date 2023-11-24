import { createBrowserRouter } from "react-router-dom";
import Roots from "../../pages/roots/Roots";
import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Roots/>,
        // errorElement
        children:[
            {

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