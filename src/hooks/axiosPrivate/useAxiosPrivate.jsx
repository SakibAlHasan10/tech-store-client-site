import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "https://distinct-lingerie-hare.cyclic.app/v1", withCredentials:true
});
const useAxiosPrivate = () => {
  return axiosPrivate;
};

export default useAxiosPrivate;
