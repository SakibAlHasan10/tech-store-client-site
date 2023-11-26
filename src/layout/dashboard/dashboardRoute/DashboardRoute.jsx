import * as React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
// import Typography from "@mui/material/Typography";
import {
  Link as RouterLink,
  //   Route,
  //   Routes,
  MemoryRouter,
  //   useLocation,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { Home, ProductionQuantityLimits } from "@mui/icons-material";
import UserRoute from "../User/UserRoute";

function Router(props) {
  const { children } = props;
  if (typeof window === "undefined") {
    return <StaticRouter location="/drafts">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={["/drafts"]} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

const Link = React.forwardRef(function Link(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

function ListItemLink(props) {
  const { icon, primary, to } = props;

  return (
    <li>
      <ListItem button component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

// function Content() {
//   const location = useLocation();
//   return (
//     <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
//       Current route: {location.pathname}
//     </Typography>
//   );
// }

const DashboardRoute = () => {
  return (
    // <Router>
    <Box sx={{ width: 360 }}>
      {/* <Routes>
              <Route path="*" element={<Content />} />
            </Routes> */}

      <Paper elevation={0}>
        <UserRoute />
        <Divider />
        <List aria-label="secondary mailbox folders">
          <ListItemLink to="/" primary="Home" icon={<Home />} />
          <ListItemLink
            to="/products"
            primary="Products"
            icon={<ProductionQuantityLimits />}
          />
        </List>
      </Paper>
    </Box>
  );
};

export default DashboardRoute;
