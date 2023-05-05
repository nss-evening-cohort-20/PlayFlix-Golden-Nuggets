import { Outlet, Route, Routes } from "react-router-dom";
import { GamesContainer } from "../games/GamesContainer"
import { NavBar } from "../navBar/NavBar"
import { UserProfile } from "../user/UserProfile";
import { Favorites } from "../favorites/Favorites";
import { GamesLeaderBoard } from "../games/GamesLeaderboard";

export const ApplicationViews = ({navigate, setUserState, setUserCheck, userCheck, userState}) => {
  

  return (
    

    <Routes>
      <Route
        path="/"
        element={
          <>
          <NavBar navigate={navigate} userState={userState} setUserState={setUserState} userCheck={userCheck} setUserCheck={setUserCheck}/>
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
