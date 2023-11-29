import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import logo from "../../assets/logo11.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <Grid bgcolor={"#023047"} mt={6}>
      <Container>
        <Grid container pt={8} justifyContent={"space-between"}>
          <Grid item md={4} sm={12} sx={{ml:{xs:"100px",sm:"285px", md:"0"}, mb:{xs:"20px", md:"0"}}}>
            <Box
              component="img"
              sx={{
                ml: "50px",
                mb: "10px",
                height: 80,
                width: 80,
              }}
              alt="The house from the offer."
              src={logo}
            />
            <Grid sx={{ display: "flex" }}>
              <Grid item>
                <Typography
                  variant="h4"
                  noWrap
                  fontSize={{ sx: "16px" }}
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 800,
                    color: "#ffb703",
                    textDecoration: "none",
                  }}
                >
                  Tech
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h4"
                  noWrap
                  fontSize={{ sx: "16px" }}
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 800,
                    color: "#fb8500",
                    textDecoration: "none",
                  }}
                >
                  Store
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} sm={12} sx={{ml:{xs:"20px",md:"0"}, mb:{xs:"20px", md:"0"}, textAlign: "center" }}>
            <Typography sx={{ color: "#fff", fontSize: "20px" }}>
              Explore Content
            </Typography>
            <Link
              to={"/"}
              className="underline hover:text-[#ffb703] pb-1 mr-2 text-orange-500"
            >
              Home
            </Link>
            <Link
              to={"/products"}
              className="underline hover:text-[#ffb703] pb-1 mr-2 text-orange-500"
            >
              Products
            </Link>
            <Link
              to={"/login"}
              className="underline hover:text-[#ffb703] pb-1 mr-2 text-orange-500"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="underline hover:text-[#ffb703] pb-1 mr-2 text-orange-500"
            >
              Register
            </Link>

            <Typography sx={{mt:"10px", fontSize:"16px", color:"#9b9898"}}>
              Address: 1573 Fourth Avenue, Calgary, Alberta
            </Typography>
            <Typography sx={{ fontSize:"16px", color:"#9b9898"}}>Canada</Typography>
          </Grid>
          <Grid item md={4} sm={12} sx={{ml:{xs:"70px",sm:"250px", md:"0"}, pl:{md:"140px"}}}>
            <Typography sx={{ml:{sm:"55px"}, color: "#fff", fontSize: "20px", textAlign:{xs:"center", sm:"left"} }}>
              Contact with
            </Typography>
            <IconButton
              size="large"
              sx={{ color: "#3a86ff", fontSize: "40px" }}
            >
              <FacebookIcon fontSize="inherit" />
            </IconButton>
            <IconButton sx={{ color: "#c1121f", fontSize: "40px" }}>
              <YouTubeIcon fontSize="inherit" />
            </IconButton>
            <IconButton sx={{ color: "#ff5400", fontSize: "40px" }}>
              <InstagramIcon fontSize="inherit" />
            </IconButton>
            <IconButton sx={{ color: "#a2d2ff", fontSize: "40px" }}>
              <LinkedInIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
      <Divider
        orientation="vertical"
        sx={{ color: "#fff" }}
        variant="middle"
        flexItem
      />
      <Grid bgcolor={"#264653"}>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "16px",
            color: "#d1cdcd",
            py: "20px",
            mr:"20px"
          }}
        >
          Copyright © TechStore 2023.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
