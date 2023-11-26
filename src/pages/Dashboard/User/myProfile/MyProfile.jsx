import { Box, Button, Container, Typography } from "@mui/material";
import useAuth from "../../../../hooks/authHook/useAuth";
import { Verified } from "@mui/icons-material";
import Payment from "./Payment";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/axiosSecure/useAxiosSecure";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  // const email = {email:user?.email}
  const {
    isPending,
    error,
    data: CurrentUser = {},
  } = useQuery({
    queryKey: ["singleUser"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);

      return res?.data;
    },
  });
  const { photo, name, email, status } = CurrentUser;
  // console.log(Object.keys(CurrentUser).join(','));
  const isNonVerified = status === "non-verified";
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
        <Typography component="" mt={2} variant="h5" sx={{ fontWeight: "800" }}>
          {name}
        </Typography>
        <Typography component="" my={2} variant="h6" sx={{ fontWeight: "700" }}>
          {email}
        </Typography>
        {isNonVerified && (
          <Button variant="contained" onClick={handleOpen}>
            Subscribe only $20
          </Button>
        )}
      </Container>
      <Payment open={open} setOpen={setOpen} />
    </Container>
  );
};

export default MyProfile;
