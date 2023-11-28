import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axiosSecure/useAxiosSecure";
import useAuth from "./authHook/useAuth";

const useGetUserAllProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { isLoading, data: myProducts = [], refetch } = useQuery({
    queryKey: ["myProducts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/products/${user?.email}`);

      return res?.data;
    },
  });
  return [myProducts, isLoading, refetch];
};

export default useGetUserAllProduct;
