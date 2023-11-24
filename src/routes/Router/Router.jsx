import { createBrowserRouter } from "react-router-dom";
import Roots from "../../pages/roots/Roots";
import Login from "../../pages/login/Login";

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
    }
])


export default router;