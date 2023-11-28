import { Button, Container, Grid, Typography } from "@mui/material";
import FeaturedCard from "./FeaturedCard";
import useAxiosPublic from "../../hooks/axiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
const TrendingProductsSection = () => {
  const axiosPublic = useAxiosPublic();
  const { isLoading, data: trendingProduct = [] } = useQuery({
    queryKey: ["TrendingProduct"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/v1/products?vote=desc`);

      return res?.data;
    },
  });
  if (isLoading) {
    return <p>loading...</p>;
  }
  // console.log(featuredProduct);
  return (
    <Container>
      <Typography mt={10} variant="h4" sx={{ fontWeight: "700" }}>
        Trending Products
      </Typography>
      <Grid
        container
        rowSpacing={3}
        mt={6}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {trendingProduct?.slice(0, 6).map((prod) => (
          <FeaturedCard key={prod?._id} prod={prod}></FeaturedCard>
        ))}
      </Grid>
      <Grid sx={{ mt: "30px", textAlign: "center" }}>
        <Link to={"/products"}>
          <Button variant="contained">Show All Products</Button>
        </Link>
      </Grid>
    </Container>
  );
};

export default TrendingProductsSection;
