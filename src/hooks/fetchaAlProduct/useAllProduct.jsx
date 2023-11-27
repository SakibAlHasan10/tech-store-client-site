import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axiosSecure/useAxiosSecure";

const useAllProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: allProduct = [] } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products`);

      return res?.data;
    },
  });
  return [allProduct, isLoading];
};

export default useAllProduct;
