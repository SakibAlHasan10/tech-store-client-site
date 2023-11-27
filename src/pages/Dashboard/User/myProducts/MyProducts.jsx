import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/axiosSecure/useAxiosSecure";
import useAllProduct from "../../../../hooks/fetchaAlProduct/useAllProduct";

const MyProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [ , , refetch] = useAllProduct();

    // product deleted
  const handleDeleteProduct = async (id) => {
    axiosSecure.delete(`/products/${id}`).then((res) => {
      if (res.data._id) {
        toast.success("Product delete successfully")
        refetch();
      }
    });
  };
    return (
        <div>
            MyProducts
        </div>
    );
};

export default MyProducts;