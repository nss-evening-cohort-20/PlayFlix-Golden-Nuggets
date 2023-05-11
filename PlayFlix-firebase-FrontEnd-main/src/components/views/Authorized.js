import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";


export const Authorized = ({ children, userCheck, auth }) => {
  const location = useLocation();
  const user = sessionStorage.getItem("firebase:authUser:AIzaSyCBSUB6tbhxaGfVsvX5_sBEo2E9HzWNbJg:[DEFAULT]")
  if (user) {
    return children
  } else {
    return (
      <Navigate to={`/login/${location.search}`} replace state={{ location }} />
    );
  }
};
