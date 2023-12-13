import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://distinct-lingerie-hare.cyclic.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
