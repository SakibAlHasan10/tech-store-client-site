import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axiosSecure/useAxiosSecure";
import useAuth from "../authHook/useAuth";

const useGetUser = () => {
    const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
    const {
        isLoading,
        data: currentUser = {},
      } = useQuery({
        queryKey: ["singleUser", user?.email ],
        queryFn: async () => {
          const res = await axiosSecure.get(`/users/${user?.email}`);
    
          return res?.data;
        },
      });
    return [currentUser,isLoading]
};

export default useGetUser;