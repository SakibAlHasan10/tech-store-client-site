import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/authHook/useAuth";
import PropTypes from "prop-types";
const PrivateRoute = ({ children }) => {
  const { user, isLoading} = useAuth();

  if(isLoading){
    return <p className="test-2xl">loading...</p>
  }
  if (user?.email) {
    return children;
  }
  return <Navigate to={"/login"} />;
};
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;
