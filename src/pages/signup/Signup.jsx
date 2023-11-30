import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/authHook/useAuth";
import OtherSignin from "../../shear/otherSignin/OtherSignin";
import { updateProfile } from "firebase/auth";
import useAxiosPrivate from "../../hooks/axiosPrivate/useAxiosPrivate";

const Signup = () => {
  const { signUpWithEmail } = useAuth();
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="/">
          TechStore
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  // TODO remove, this demo shouldn't need to reset the theme.

  const defaultTheme = createTheme();
  const axiosPrivate = useAxiosPrivate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const fullName = data.get("fullName");
    const email = data.get("email");
    const photo = data.get("photoURL");
    const password = data.get("password");
    const user = {
      name: fullName,
      email,
      photo,
      role:"User",
      status:"non-verified"
    };
    // console.log(user);
    setErrorText("");
    if (password.length < 6) {
      setErrorText("Your password must be at least 6 characters");
      return;
    } else if (!/(?=.*?[A-Z])/.test(password)) {
      setErrorText("Your password must contain at least one capital letter");
      return;
    } else {
      if (!/(?=.*[!#$%&? "])/.test(password)) {
        setErrorText(
          "Your password must contain at least one Special characters"
        );
        return;
      }
    }
    signUpWithEmail(email, password)
      .then((res) => {
        if (res.user) {
          updateProfile(res.user, {
            displayName: fullName,
            photoURL: photo,
          })
            .then(() => {
              axiosPrivate.post("/users", user).then((res) => {
                if (res.data) {
                  toast.success("your sign up successfully");
                  navigate("/");
                }
                console.log(res.data);
              });
              // alert("update user");
            })
            .catch((error) => {
              error && alert("error update user");
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="photoURL"
                  label="Photo URL"
                  name="photoURL"
                  autoComplete="photoURL"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <p className="text-red-500 mt-2">{errorText}</p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <OtherSignin />
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5, mb:"20px" }} />
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
