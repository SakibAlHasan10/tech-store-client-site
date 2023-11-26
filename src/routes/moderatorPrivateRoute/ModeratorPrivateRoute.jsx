import { Navigate } from "react-router-dom";
// import useAuth from "../../hooks/authHook/useAuth";
import useGetUser from "../../hooks/getUser/useGetUser";
import PropTypes from "prop-types";
const ModeratorPrivateRoute = ({ children }) => {
  // const {user} = useAuth()
  const [currentUser, isLoading] = useGetUser();
  if(isLoading){
    return <p>moderator loading...</p>
  }
  if (currentUser?.role === "Moderator") {
    return children;
  }
  return <Navigate to={"/"} />;
};
ModeratorPrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default ModeratorPrivateRoute;
