import axios from "axios";
import useAuth from "../authHook/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "https://distinct-lingerie-hare.cyclic.app/v1",
  withCredentials: true,
});
const useAxiosSecure = () => {
  
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          logout().then(() => {
            navigate("/");
          });
        }
      }
    );
  }, [logout, navigate]);
  return axiosSecure;
  // return axiosSecure;
};
export default useAxiosSecure;
