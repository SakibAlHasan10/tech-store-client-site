import { useParams } from "react-router-dom";
import useSingleProduct from "../../hooks/fetchSingleProduct/useSingleProduct";

const ProductDetails = () => {
  const { id } = useParams();
  const [singleProduct] = useSingleProduct(id);
  console.log(id, singleProduct);
  return (
    <div>
      details
      <p>{singleProduct?.productName}</p>
      <img src={singleProduct?.productImage} alt="" />
      <p>{singleProduct?.productDescription}</p>
    </div>
  );
};

export default ProductDetails;
