import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

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
import useAxiosSecure from "../../../hooks/axiosSecure/useAxiosSecure";
import useAuth from "../../../hooks/authHook/useAuth";
import { Button, Grid } from "@mui/material";
import toast from "react-hot-toast";
const Payment = ({ open, setOpen, id }) => {
  const handleClose = () => setOpen(false);
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [transId, setTransId] = useState("");
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: 20 }).then((res) => {
      // console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }
    // confirm payment
    const { paymentIntent, error: cardError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );
    if (cardError) {
      console.log("payment error", cardError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransId(paymentIntent.id);
        //   product status accept
        const role = { status: "verified" };
        axiosSecure.patch(`/user/role/${id}`, role).then((res) => {
          //   console.log(id, res.data);

          if (res.data._id) {
            toast.success("your payment successfully");
            // refetch();
          }
        });
        // console.log(paymentIntent.id);
      }
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
          <Typography
            id="modal-modal-title"
            sx={{ mb: "30px", textAlign: "center" }}
            variant="h6"
            component="h2"
          >
            Text in a modal
          </Typography>

          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <Grid
              container
              justifyContent={"center"}
              sx={{ textAlign: "center", mt: "50px" }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  type="submit"
                  size="medium"
                  sx={{
                    color: "#fff",
                    bgcolor: "#02c39a",
                    mb:"20px",
                    width: "100px",
                    "&:hover": {
                      bgcolor: "green",
                    },
                  }}
                  disabled={!stripe || !clientSecret}
                >
                  Pay
                </Button>
              </Grid>
            </Grid>
            <Typography sx={{ color: "#d62828" }}>{error}</Typography>
            <Typography sx={{ color: "#02c39a" }}>{transId}</Typography>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
Payment.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  id: PropTypes.string,
};
export default Payment;
