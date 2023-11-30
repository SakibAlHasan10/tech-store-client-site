import { NavLink, useParams } from "react-router-dom";
import useSingleProduct from "../../hooks/fetchSingleProduct/useSingleProduct";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import useAxiosSecure from "../../hooks/axiosSecure/useAxiosSecure";
import useAuth from "../../hooks/authHook/useAuth";
import toast from "react-hot-toast";
import ReportIcon from "@mui/icons-material/Report";
import { useState } from "react";
import AddReview from "./AddReview";
import { useQuery } from "@tanstack/react-query";
import AllReviews from "./AllReviews";
const ProductDetails = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const { id } = useParams();
  const [singleProduct] = useSingleProduct(id);
  const {
    productName,
    productImage,
    productDescription,
    vote: like,
    owner,
    tags,
    _id,
    links,
    downVote: down,
  } = singleProduct;
  console.log(singleProduct);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // console.log(like + 1);
  // upVote
  const handleUpVote = (id) => {
    const vote = { vote: like + 1 };
    axiosSecure.patch(`/products/${id}`, vote).then((res) => {
      console.log(id, res.data, vote + 1);

      if (res.data._id) {
        toast.success("your vote successfully");
        // refetch();
      }
    });
  };
  const handleDownVote = (id) => {
    if (user === null) {
      // navigate("/login");
      return;
    } else {
      const vote = { downVote: down + 1 };
      axiosSecure.patch(`/products/${id}`, vote).then((res) => {
        console.log(id, res.data, vote + 1);

        if (res.data._id) {
          toast.success("your downVote successfully");
          // refetch();
        }
      });
    }
  };
  // handle downVote
  // get review
  const { isLoading, data: productReviews = [] } = useQuery({
    queryKey: ["review", _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/review?id=${_id}`);

      return res?.data;
    },
  });
  if (isLoading) {
    return <p>loading...</p>;
  }

  // console.log(productReviews);
  const handleProductReport = (id) => {
    const status = { report: true };
    axiosSecure.patch(`/products/${id}`, status).then((res) => {
      console.log(id, res.data);

      if (res.data._id) {
        toast.success("your report successfully");
      }
    });
  };
  return (
    <Box>
      <Grid bgcolor={"#fb8500"} height={100}></Grid>
      <Container>
        <Grid
          bgcolor={"#fff"}
          mt={10}
          sx={{ p: 5, borderRadius: "15px", pt: 10 }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "800",
              background: "linear-gradient(to right bottom, #1962A6, #6EB846)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {productName}
          </Typography>
          <Typography
            variant="body2"
            mt={3}
            sx={{ fontWeight: "500", color: "#000", mt: "26px", pb: "20px" }}
          >
            {productDescription}
          </Typography>
          {/* upVote downVote */}
          <Grid container gap={2}>
            <Grid item>
              <IconButton
                onClick={() => handleUpVote(_id)}
                sx={{
                  mr: "4px",
                  color: "#3a86ff",
                  "&:hover": { color: "#219ebc" },
                }}
                disabled={owner && owner[0]?.email === user?.email}
                aria-label="add to favorites"
              >
                <ThumbUpOffAltIcon />
              </IconButton>
              {like}
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => handleDownVote(_id)}
                sx={{
                  mr: "4px",
                  color: "#e76f51",
                  "&:hover": { color: "#219ebc" },
                }}
                disabled={owner && owner[0]?.email === user?.email}
                aria-label="add to favorites"
              >
                <ThumbDownOffAltIcon />
              </IconButton>
              {down}
            </Grid>
            {/* report */}
            <Grid item>
              <IconButton
                onClick={() => handleProductReport(_id)}
                disabled={owner && owner[0]?.email === user?.email}
              >
                <ReportIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Box
            component={"img"}
            sx={{ mt: "10px", borderRadius: "15px", width: { sm: "80%" } }}
            src={productImage}
          />
          <Grid container gap={2} mt={5} pl={2}>
            {tags?.map((tag, idx) => (
              <Typography key={idx} sx={{ "&:hover": "underline" }}>
                <NavLink to={`${tag.text}`}>#{tag.text}</NavLink>
              </Typography>
            ))}
          </Grid>
          <Typography pl={2} mt={2} sx={{ "&:hover": "underline" }}>
            Links:<NavLink>{links}</NavLink>
          </Typography>
          <Grid pl={1} mt={2}>
            <Button onClick={handleOpen}>Add Review</Button>
          </Grid>
          <Typography
            variant="h5"
            pl={2}
            my={4}
            sx={{
              textAlign: "center",
              background: "linear-gradient(to right bottom, #1962A6, #6EB846)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            TESTIMONIALS
          </Typography>
          {productReviews?.length > 0 ? (
            <AllReviews productReviews={productReviews} />
          ) : (
            <Typography variant="body2" my={10} sx={{ textAlign: "center" }}>
              This product review not available
            </Typography>
          )}
        </Grid>
      </Container>
      <AddReview open={open} setOpen={setOpen} id={_id} />
    </Box>
  );
};

export default ProductDetails;
