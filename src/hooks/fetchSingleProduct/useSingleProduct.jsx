import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axiosSecure/useAxiosSecure";

const useSingleProduct = (id) => {
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: singleProduct = [] } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);

      return res?.data;
    },
  });
  return [singleProduct, isLoading];
};

export default useSingleProduct;
