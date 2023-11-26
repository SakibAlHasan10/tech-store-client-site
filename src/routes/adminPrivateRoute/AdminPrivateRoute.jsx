import { Navigate } from "react-router-dom";
import useGetUser from "../../hooks/getUser/useGetUser";
import PropTypes from "prop-types";
const AdminPrivateRoute = ({ children }) => {
  const [currentUser, isLoading] = useGetUser();
  if (isLoading) {
    return <p>moderator loading...</p>;
  }
  if (currentUser?.role === "Admin") {
    return children;
  }
  return <Navigate to={"/"} />;
};
AdminPrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default AdminPrivateRoute;
