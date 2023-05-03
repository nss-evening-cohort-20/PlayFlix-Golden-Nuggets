import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { logout } from "../helpers/logout";
import { GamesContainer } from "../games/GamesContainer"
import { NavBar } from "../navBar/NavBar"
import { UserProfile } from "../user/UserProfile";
import { Favorites } from "../favorites/Favorites";
import { GamesLeaderBoard } from "../games/GamesLeaderboard";
export const ApplicationViews = () => {
  

  return (
    

    <Routes>
      <Route
        path="/"
        element={
          <>
          <NavBar/>
         <Outlet/>
         </>
        }>
          <Route path="/" element={<GamesContainer/>} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/favorites" element={<Favorites/>} />
          <Route path="/leaderboard" element={<GamesLeaderBoard/>} />
      </Route>
    </Routes>
    
    
    
    
    
    
    // <>
    //   <h1>Test</h1>
    //   {/* logout button */}
    //   <button type="submit" onClick={onLogout}>
    //     Logout
    //   </button>
    // </>
  
    
  );
};
