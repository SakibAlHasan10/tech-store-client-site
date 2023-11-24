import GoogleIcon from "@mui/icons-material/Google";
import toast from "react-hot-toast";
import useAuth from "../../hooks/authHook/useAuth";
import { Button, Divider, Grid, Typography } from "@mui/material";
const OtherSignin = () => {
  const { signInWithGoogle } = useAuth();
  const handleGoogle = () => {
    signInWithGoogle()
      .then((res) => {
        if (res.user) {
          toast.success("create account successful");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex flex-col items-center text-center">
      <Divider variant="middle" />
      <Grid container justifyContent="flex-center">

      <Typography component="h6" variant="h6" textAlign={'center'}>
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
            <GoogleIcon className="text-orange-500 text-3xl bg-white" />
            <span>Continue with google</span>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default OtherSignin;
