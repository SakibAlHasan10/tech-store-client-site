import GoogleIcon from "@mui/icons-material/Google";
import toast from "react-hot-toast";
import useAuth from "../../hooks/authHook/useAuth";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const OtherSignin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const handleGoogle = () => {
    signInWithGoogle()
      .then((res) => {
        if (res.user) {
          toast.success("create account successful");
          navigate("/")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container>
      {/* <Divider variant="middle" mt={3}/> */}
      <Grid container justifyContent="flex-center">
        <Typography component="h6" variant="h6" textAlign="center">
          or
        </Typography>
      </Grid>
      <Grid container justifyContent="flex-center">
        <Grid item xs={12}>
          <Button
            onClick={handleGoogle}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <GoogleIcon color="warning" />
            <Typography component="h6" variant="body2" pl={2}>
              Continue with google
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OtherSignin;
