import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";


export const Authorized = ({ children, userCheck }) => {
  const location = useLocation();
  const user = sessionStorage.getItem("uid")
  if (user) {
    return children
  } else {
    return (
      <Navigate to={`/login/${location.search}`} replace state={{ location }} />
    );
  }
};
