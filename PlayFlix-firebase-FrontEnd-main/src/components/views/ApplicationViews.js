import { useNavigate } from "react-router-dom";
import { logout } from "../helpers/logout";

export const ApplicationViews = () => {
  let navigate = useNavigate();

  // Move this to where ever you end up putting your logout button
  const onLogout = () => {
    logout.logout(navigate);
  };

  return (
    <>
      <h1>Test</h1>
      {/* logout button */}
      <button type="submit" onClick={onLogout}>
        Logout
      </button>
    </>
  
    
  );
};
