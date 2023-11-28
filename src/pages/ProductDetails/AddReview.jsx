import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
import PropTypes from "prop-types";
import useAuth from "../../hooks/authHook/useAuth";
import useAxiosSecure from "../../hooks/axiosSecure/useAxiosSecure";
import toast from "react-hot-toast";
const AddReview = ({ open, setOpen, id }) => {
  const handleClose = () => setOpen(false);
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const description = data.get("description");
    const rating = data.get("rating");
    const name = user?.displayName;
    const photo = user.photoURL;

    const review = {
      id,
      name,
      photo,
      description,
      rating: parseFloat(rating),
    };
    console.log(typeof parseFloat(rating));
    const pro = await axiosSecure.post("/reviews", review);
    if (pro.statusText === "OK") {
      toast.success("your reviews successfully");
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {/* <Grid container alignItems={"center"}> */}
            <TextField
              id="name"
              label="Name"
              defaultValue={user?.displayName}
              multiline
              name="name"
              variant="filled"
              disabled
            />
            <TextField
              id="image"
              label="Image"
              defaultValue={user?.photoURL}
              disabled
              multiline
              name="image"
              variant="filled"
            />
            <TextField
              id="rating"
              label="Rating"
              multiline
              name="rating"
              maxRows={4}
              variant="filled"
            />
            <Grid>
              <TextField
                id="Review_Description"
                label="Description"
                multiline
                name="description"
                maxRows={4}
                variant="filled"
              />
            </Grid>
            {/* </Grid> */}
            <Grid textAlign={"center"} mt={3}>
              <Button size="medium" variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
AddReview.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  id: PropTypes.string,
};
export default AddReview;
