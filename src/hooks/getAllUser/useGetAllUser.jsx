import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axiosSecure/useAxiosSecure";

const useGetAllUser = () => {
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: allUser = [], refetch } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);

      return res?.data;
    },
  });
  return [allUser, isLoading, refetch];
};

export default useGetAllUser;
