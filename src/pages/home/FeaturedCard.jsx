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

const FeaturedCard = ({ prod }) => {
  const { user } = useAuth();
  const { productName, vote, tags, productImage, owner,_id } = prod;
  // console.log(owner[0]?.email===user?.email)
  return (
    <Grid item container xs={12} sm={6}>
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
            <Link to={`/details/${_id}`}>
              {productName.slice(0, 35)}
                </Link>
            </Typography>
          </CardContent>
          <IconButton
            disabled={owner[0]?.email === user?.email}
            aria-label="add to favorites"
          >
            <FavoriteIcon />
          </IconButton>
          {vote}
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
FeaturedCard.propTypes = {
  prod: PropTypes.object,
};
export default FeaturedCard;
