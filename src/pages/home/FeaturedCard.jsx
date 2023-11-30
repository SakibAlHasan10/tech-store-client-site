import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/authHook/useAuth";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ReactStars from "react-rating-stars-component";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/axiosSecure/useAxiosSecure";

const FeaturedCard = ({ prod }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { productName, vote: like, tags, productImage, owner, _id, downVote:down } = prod;
  // console.log(owner[0]?.email===user?.email)
  // console.log(tags)
  // upVote
  const handleUpVote = (id) => {
    if (user === null) {
      navigate("/login");
      return;
    } else {
      const vote = { vote: like + 1 };
      axiosSecure.patch(`/products/${id}`, vote).then((res) => {
        console.log(id, res.data, vote + 1);

        if (res.data._id) {
          toast.success("your vote successfully");
          // refetch();
        }
      });
    }
  };
  const handleDownVote = (id) => {
    if (user === null) {
      navigate("/login");
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
  return (
    <Grid item container xs={12} sm={6} md={3}>
      <Card sx={{ width: "100%", height: "400px" }}>
        <CardMedia
          sx={{ width: "100%", height: "200px" }}
          width={"full"}
          component="img"
          image={productImage}
          alt="Paella dish"
        />
        <Grid px={3} pt={3}>
          <Typography
            variant="h6"
            sx={{ fontSize: "18px", "&:hover": { color: "#fb8500" } }}
            color="text.secondary"
          >
            <Link to={`/details/${_id}`}>{productName.slice(0, 24)}</Link>
          </Typography>

          <Grid container gap={"4px"} mt={1} pl={1}>
            Tags:{" "}
            {tags.map((tag, idx) => (
              <Typography
                key={idx}
                sx={{ color: "#000", fontSize: "14px", mt: "2px" }}
              >
                <NavLink className={" bg-[#caf0f8] p-1"} to={`${tag.text}`}>
                  {tag.text}
                </NavLink>
              </Typography>
            ))}
          </Grid>
          <Grid sx={{ height: "40px" }}>
            <ReactStars
              count={5}
              // onChange={ratingChanged}
              size={24}
              value={like}
              activeColor="#ffd700"
            />
          </Grid>
          <Grid container gap={2} justifyContent={"center"}>
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
