import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/authHook/useAuth";
import useAxiosSecure from "../../hooks/axiosSecure/useAxiosSecure";
import toast from "react-hot-toast";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const TrendingProductCard = ({ prod }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { productName, vote: like, tags, productImage, owner, _id } = prod;
  console.log(like + 1);
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
  return (
    <Grid item container xs={12} sm={6} md={4}>
      <Card sx={{ width: "100%", height: "500px" }}>
        <CardMedia
          sx={{ width: "100%", height: "300px" }}
          width={"full"}
          component="img"
          height="200px"
          image={productImage}
          alt="Paella dish"
        />
        <Grid px={3} py={2}>
          <CardContent>
            <Typography variant="h5" color="text.secondary">
              <Link to={`/details/${_id}`}>{productName.slice(0, 25)}</Link>
            </Typography>
          </CardContent>

          <IconButton
            onClick={() => handleUpVote(_id)}
            disabled={owner[0]?.email === user?.email}
            aria-label="add to favorites"
          >
            <FavoriteIcon />
          </IconButton>

          {like}
          <Grid container gap={2} mt={2} pl={2}>
            {tags.map((tag, idx) => (
              <Typography key={idx} sx={{ "&:hover": "underline" }}>
                <NavLink to={`${tag.text}`}>#{tag.text}</NavLink>
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};
TrendingProductCard.propTypes = {
  prod: PropTypes.object,
};
export default TrendingProductCard;
