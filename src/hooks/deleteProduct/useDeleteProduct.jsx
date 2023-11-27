// import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axiosSecure/useAxiosSecure";

const useDeleteProduct = (id) => {
  const axiosSecure = useAxiosSecure();
  //   const { isLoading, data: deleteProduct = [] } = useQuery({
  //     queryKey: ["deleteProduct", id],
  //     queryFn: async () => {
  //       const res = await axiosSecure.get(`/products/${id}`);

  //       return res?.data;
  //     },
  //   });

   axiosSecure.delete(`/products/${id}`)
  .then(res=>{

      console.log(res.data);
  })
  return ;
};

export default useDeleteProduct;
