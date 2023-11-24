import { Outlet } from "react-router-dom";
import Navbar from "../../Components/navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Roots = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Roots;