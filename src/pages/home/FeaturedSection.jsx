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
  const active = featuredProduct?.filter(prod=>prod?.status==="Accepted")

  // console.log(featuredProduct);
  return (
    <Container>
      <Grid >

      <Typography mt={10} variant="h4" sx={{ fontWeight: "700", textAlign:"center", background: 'linear-gradient(to right bottom, #1962A6, #6EB846)', backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent", }}>
        Featured Products
      </Typography>
      <Grid
        container
        rowSpacing={2}
        mt={3}
        columnSpacing={{ xs: 1, sm: 2}}
      >
        {active&&active?.slice(0, 4).map((prod) => (
          <FeaturedCard key={prod?._id} prod={prod}></FeaturedCard>
        ))}
      </Grid>
      </Grid>
    </Container>
  );
};

export default FeaturedSection;
