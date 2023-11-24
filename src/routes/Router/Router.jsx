import { createBrowserRouter } from "react-router-dom";
import Roots from "../../pages/roots/Roots";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Roots/>
    }
])


export default router;