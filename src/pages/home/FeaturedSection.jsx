import { Container, Grid, Typography } from "@mui/material";
import FeaturedCard from "./FeaturedCard";
import useAxiosPublic from "../../hooks/axiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const FeaturedSection = () => {
  const axiosPublic = useAxiosPublic();
  const { isLoading, data: featuredProduct = [] } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/v1/products?featured=true&createdAt=desc`
      );

      return res?.data;
    },
  });
  if (isLoading) {
    return <p>loading...</p>;
  }
  // console.log(featuredProduct);
  return (
    <Container>
      <Grid sx={{ px: { md: "100px"}, }} >

      <Typography mt={10} variant="h4" sx={{ fontWeight: "700", textAlign:"center", }}>
        Featured Products
      </Typography>
      <Grid
        container
        rowSpacing={3}
        mt={3}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {featuredProduct?.slice(0, 4).map((prod) => (
          <FeaturedCard key={prod?._id} prod={prod}></FeaturedCard>
        ))}
      </Grid>
      </Grid>
    </Container>
  );
};

export default FeaturedSection;
