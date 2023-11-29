import { Button, Container, Grid, Typography } from "@mui/material";
import useAxiosPublic from "../../hooks/axiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import TrendingProductCard from "./TrendingProductCard";
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
      <Typography mt={12} variant="h4" sx={{
    background: 'linear-gradient(to right bottom, #1962A6, #6EB846)', backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent", fontWeight: "700", textAlign:"center" }}>
        Trending Products
      </Typography>
      <Grid
        container
        rowSpacing={3}
        mt={3}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {trendingProduct?.slice(0, 6).map((prod) => (
          <TrendingProductCard key={prod?._id} prod={prod}></TrendingProductCard>
        ))}
      </Grid>
      <Grid sx={{ mt: "60px", textAlign: "center" }}>
        <Link to={"/products"}>
          <Button variant="contained" sx={{color: 'white',
    background: 'linear-gradient(to right bottom, #1962A6, #6EB846)',}}>Show All Products</Button>
        </Link>
      </Grid>
    </Container>
  );
};

export default TrendingProductsSection;
