import { Outlet } from "react-router-dom";
import Navbar from "../../Components/navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Roots = () => {
    return (
        <div className="bg-slate-200">
            <div className="min-h-screen">

            <Navbar/>
            
            <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default Roots;