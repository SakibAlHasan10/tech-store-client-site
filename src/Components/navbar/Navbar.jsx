import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/authHook/useAuth";
import { Grid } from "@mui/material";
const pages = (
  <>
    <NavLink
      to={`/`}
      className={({ isActive, isPending }) =>
        isActive
          ? "active text-[#fb8500] border-b-2 border-[#fb8500] pb-1"
          : isPending
          ? "pending"
          : ""
      }
    >
      Home
    </NavLink>
    <NavLink
      to={`/products`}
      className={({ isActive, isPending }) =>
        isActive ? "active text-[#fb8500] border-b-2 border-[#fb8500] pb-1" : isPending ? "pending" : ""
      }
    >
      Products
    </NavLink>
  </>
);

function Navbar() {
  const { user, logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [colorChange, setColorChange] = React.useState(false);
  const changeNavColor = () => {
    if (window.scrollY >= 80) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    logout().then(() => {
      toast.success("sign out successfully");
    });
  };
  window.addEventListener("scroll", changeNavColor);
  // console.log(colorChange)
  console.log(user?.photoURL);
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: `${colorChange ? "#023047" : "#fff0"}`,
        boxShadow: "none",
        color: "#023047",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon
                sx={{ display: { xs: "flex", md: "none", color: "#fff" } }}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={() => handleCloseNavMenu()}>
                <Typography
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"25px"}
                  sx={{ color: "#023047" }}
                  textAlign="center"
                >
                  {pages}
                </Typography>
              </MenuItem>
              {/* // ))} */}
            </Menu>
          </Box>

          <Grid
            container
            component="a"
            href="/"
            justifyContent="flex-center"
            alignItems={"center"}
          >
            <Grid item justifyContent="flex-center" alignItems={"center"}>
              <Typography
                variant="h5"
                component="h5"
                width={45}
                height={45}
                pl={2}
                pt={1}
                mr={2}
                fontSize={{ sx: "35px" }}
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 800,
                  color: "#fff",
                  bgcolor: "#219ebc",
                  alignItems: "center",
                  borderRadius: "50%",
                  textDecoration: "none",
                }}
              >
                P
              </Typography>
            </Grid>
            <Grid sx={{ display: "flex" }}>
              <Grid item>
                <Typography
                  variant="h4"
                  noWrap
                  fontSize={{ sx: "16px" }}
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 800,
                    color: `${colorChange ? "#fff" : "#023047"}`,
                    textDecoration: "none",
                  }}
                >
                  Product
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
                    color: "#8ecae6",
                    textDecoration: "none",
                  }}
                >
                  Hunt
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Box
            mr={"30px"}
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <Typography display={"flex"} gap={"25px"} sx={{ color: "#fff" }}>
              {pages}
            </Typography>
          </Box>
          {user?.email ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open Dashboard">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.photoURL} src={user?.photoURL} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "48px", pl: "4px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Typography sx={{ color: "#023047" }} textAlign="left">
                  {user?.displayName}
                </Typography>
                <NavLink
                  to={`/dashboard`}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "active text-orange-500"
                      : isPending
                      ? "pending"
                      : ""
                  }
                >
                  <Button
                    onClick={handleCloseUserMenu}
                    sx={{
                      my: 2,
                      color: "#023047",
                      display: "block",
                    }}
                  >
                    Dashboard
                  </Button>
                </NavLink>
                <Button onClick={handleLogout} sx={{ color: "#023047" }}>
                  Logout
                </Button>
              </Menu>
            </Box>
          ) : (
            <NavLink
              to={"/login"}
              className="text-[#023047] bg-[#219ebc] px-3 rounded-md py-1 hover:shadow-md"
            >
              <button>Login</button>
            </NavLink>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
