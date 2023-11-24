import { Outlet } from "react-router-dom";
import Navbar from "../../Components/navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Roots = () => {
    return (
        <div>
            <div className="min-h-screen">

            <Navbar/>
            <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default Roots;