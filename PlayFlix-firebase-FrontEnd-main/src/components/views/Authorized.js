import { getAuth } from "firebase/auth";
import { Navigate, useLocation } from "react-router-dom";


export const Authorized = ({ children, userCheck }) => {
  const location = useLocation();
  
  if (userCheck === true) {
    return children;
  } else {
    return (
      <Navigate to={`/login/${location.search}`} replace state={{ location }} />
    );
  }
};
