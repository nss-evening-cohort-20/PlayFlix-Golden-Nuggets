import { Navigate, useLocation } from "react-router-dom";


export const Authorized = ({ children, userState, userCheck }) => {
  const location = useLocation();

  if (/*sessionStorage.getItem("PlayFlix_user")*/ userState.type && userCheck === true ) {
    return children;
  } else {
    return (
      <Navigate to={`/login/${location.search}`} replace state={{ location }} />
    );
  }
};
