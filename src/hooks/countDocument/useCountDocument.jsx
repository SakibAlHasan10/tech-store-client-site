// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../axiosPublic/useAxiosPublic";

// // const useCountDocument = () => {
//     const axiosPublic= useAxiosPublic()
//     const {  data: count, } = useQuery({
//         queryKey: ["allUser"],
//         queryFn: async () => {
//           const res = await axiosPublic.get(`/v1/products/count?status=Verified`);
    
//           return res?.data;
//         },
//       });
//       console.log(count) 
//     return [count]
// };

// export default useCountDocument;