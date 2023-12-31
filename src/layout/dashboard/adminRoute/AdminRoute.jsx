import * as React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link as RouterLink, MemoryRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
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

const AdminRoute = () => {
  return (
    <Box sx={{ width: 360 }}>
      <Paper elevation={0}>
        <List aria-label="main mailbox folders">
          <ListItemLink
            to="/dashboard"
            primary="My Profile"
            icon={<AccountBoxIcon />}
          />
          <ListItemLink
            to="/dashboard/statistics"
            primary="Admin Statistics"
            icon={<AutoGraphIcon />}
          />
          <ListItemLink
            to="/dashboard/manage-user"
            primary="Manage Users"
            icon={<ManageAccountsIcon />}
          />

          <ListItemLink
            to="/dashboard/manage-coupon"
            primary="Manage Coupon"
            icon={<LocalOfferIcon />}
          />
        </List>
      </Paper>
    </Box>
  );
};

export default AdminRoute;
