import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";


export const Authorized = ({ children, userCheck }) => {
  const location = useLocation();
  const user = sessionStorage.getItem("firebase:authUser:AIzaSyCBSUB6tbhxaGfVsvX5_sBEo2E9HzWNbJg:[DEFAULT]")
  const userCookie = Cookies.get();
  if (user || userCookie) {
    return children
  } else {
    return (
      <Navigate to={`/login/${location.search}`} replace state={{ location }} />
    );
  }
};
