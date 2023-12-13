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
  borderRadius: "15px",
  bgcolor: "background.paper",
  textAlign:"center",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
import PropTypes from "prop-types";
// import toast from "react-hot-toast";
// import useAxiosSecure from "../../../../hooks/axiosSecure/useAxiosSecure";
// import useAuth from "../../../../hooks/authHook/useAuth";
const CreateCoupon = ({ open, setOpen}) => {
  const handleClose = () => setOpen(false);
  // const axiosSecure = useAxiosSecure();

  // const { user } = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const description = data.get("description");
    const couponCode = data.get("coupon-code");
    const discount = data.get("discount");
    const expireDate = data.get("expire-date");

    const coupon = {
      
      couponCode,
      discount:parseInt(discount),
      description,
      expireDate:parseInt(expireDate),
    };
    console.log(coupon)
    // console.log(typeof parseFloat(rating));
    // const pro = await axiosSecure.post("/reviews", review);
    // if (pro.statusText === "OK") {
    //   toast.success("your reviews successfully");
    // }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
            <Box sx={style} >
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
                  id="Coupon-Code"
                  label="Coupon Code"
                  multiline
                  name="coupon-code"
                  variant="outlined"
                />
                <TextField
                  id="discount"
                  label="Discount"
                  multiline
                  name="discount"
                  variant="outlined"
                />
                <TextField
                  id="expire-date"
                  label="Expire Date"
                  multiline
                  name="expire-date"
                  maxRows={4}
                  variant="outlined"
                />
                <Grid>
                  <TextField
                    id="description"
                    label="Description"
                    multiline
                    name="description"
                    maxRows={4}
                    variant="outlined"
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
CreateCoupon.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  id: PropTypes.string,
};
export default CreateCoupon;
