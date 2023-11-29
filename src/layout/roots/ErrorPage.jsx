import { Link } from "react-router-dom";


const ErrorPage = () => {
  return (
    <div className="bg-[#d1cdcd] flex items-center justify-center min-h-screen  w-full mx-auto">
      <div className="text-center">
        <img
          src="https://kitpro.site/lawncare/wp-content/uploads/sites/193/2023/10/404-01-800x322.png"
          alt=""
        />
        <h1 className="mt-10 text-3xl font-bold text-green-700">Oops! Page Not Found</h1>
        <Link to={"/"}>
            <button className="mt-5 hover:text-green-400 rounded-3xl px-4 border border-green-500 hover:border-green-400 text-green-500 text-2xl">Back Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
