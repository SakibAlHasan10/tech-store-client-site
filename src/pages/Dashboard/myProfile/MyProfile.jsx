import { Box, Button, Container, Typography } from "@mui/material";
import { Verified } from "@mui/icons-material";
import Payment from "./Payment";
import React from "react";
import useGetUser from "../../../hooks/getUser/useGetUser";
import { Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_PK);
const MyProfile = () => {
  const [currentUser] = useGetUser();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  // const email = {email:user?.email}

  const { photo, name, email, status, _id, role } = currentUser;
  // console.log(Object.keys(CurrentUser).join(','));
  const isNonVerified = status === "non-verified";
  // console.log(isNonVerified)
  return (
    <Container>
      <Typography component="" mb={6} variant="h4" sx={{ fontWeight: "800" }}>
        MyProfile
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor:"#d1cdcd",
          borderRadius:"10px",
          py:"20px"
        }}
      >
        <Box
          component="img"
          sx={{
            height: 160,
            width: 160,
            borderRadius: "50%",
            // maxHeight: { xs: 233, md: 167 },
            // maxWidth: { xs: 350, md: 250 },
          }}
          alt="user photo"
          src={photo}
        />
        {isNonVerified || (
          <Typography
            component=""
            mt={2}
            variant="h6"
            sx={{ fontWeight: "700", color: "#219ebc" }}
          >
            Verified <Verified />
          </Typography>
        )}
        
        <Typography component="" mt={1} variant="h6" sx={{ fontWeight: "700" }}>
          name: {name}
        </Typography>
        
        <Typography component="" my={1} variant="body1" sx={{ fontWeight: "600" }}>
          email: {email}
        </Typography>
        <Typography component="" my={1} variant="body2" sx={{ fontWeight: "600" }}>
          Your role: {role}
        </Typography>
        {isNonVerified && (
          <Button variant="contained" sx={ {my:"10px"}} onClick={handleOpen}>
            Premium Subscription $50
          </Button>
        )}
        <Elements stripe={stripePromise}>
      <Payment open={open} setOpen={setOpen} id={_id} />
        
      </Elements>
      </Container>
    </Container>
  );
};

export default MyProfile;
