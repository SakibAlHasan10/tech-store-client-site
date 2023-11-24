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
const pages = ["Home", "Products"];
const settings = ["User name", "Dashboard", "Logout"];

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

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(e);
  };

  const handleCloseUserMenu = (e) => {
    if (e === "Logout") {
      logout().then(() => {
        toast.success("sign out successfully");
      });
    }
    setAnchorElUser(null);
  };
  window.addEventListener("scroll", changeNavColor);
  // console.log(colorChange)
  return (
    <AppBar
      position="fixed"
      sx={{ bgcolor:`${colorChange? "#023047":"#fff0"}`, boxShadow: "none", color: "#023047" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
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
                    color: `${colorChange? "#fff":"#023047"}`,
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography sx={{color:`${colorChange? "#fff":"#023047"}`}}   textAlign="center">
                    <NavLink
                      to={`/${page}`}
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active text-orange-500"
                          : isPending
                          ? "pending"
                          : ""
                      }
                    >
                      {page}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          {/* <Typography
            variant="h4"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            color={"#0a5299"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontSize: { xs: "24px" },
              fontFamily: "monospace",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Booking
          </Typography> */}
          {/* <Box
            component="img"
            sx={{
              // height: 233,
              // width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
            src={logo}
          /> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink
                key={page}
                to={`/${page}`}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "active text-orange-500"
                    : isPending
                    ? "pending"
                    : ""
                }
              >
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{ my: 2, color: `${colorChange? "#fff":"#023047"}`, display: "block" }}
                >
                  {page}
                </Button>
              </NavLink>
            ))}
          </Box>
          {user?.email ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
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
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography sx={{ color: "#023047" }} textAlign="center">
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
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
