import { Outlet, Route, Routes } from "react-router-dom";
import { GamesContainer } from "../games/GamesContainer"
import { NavBar } from "../navBar/NavBar"
import { UserProfile } from "../user/UserProfile";
import { Favorites } from "../favorites/Favorites";
import { GamesLeaderBoard } from "../games/GamesLeaderboard";
import { GamePlay } from "../games/GamesPlay";
import { useState } from "react";

export const ApplicationViews = ({navigate, setUserCheck, userCheck}) => {
  const[searchParams, setSearchParams] = useState("")
  const[modalOpen, setModalOpen] = useState(false)
  

  return (
    

    <Routes>
      <Route
        path="/"
        element={
          <>
          <NavBar navigate={navigate} userCheck={userCheck} setUserCheck={setUserCheck} setSearchParams={setSearchParams} searchParams={searchParams} setModalOpen={setModalOpen}/>
         <Outlet/>
         </>
        }>
          <Route path="/" element={<GamesContainer searchParams={searchParams} modalOpen={modalOpen} setModalOpen={setModalOpen}/>} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/favorites" element={<Favorites/>} />
          <Route path="/leaderboard" element={<GamesLeaderBoard/>} />
          <Route path="/games/play/:gameId" element={<GamePlay/>} />
          <Route path="/favorites" element={<Favorites/> } />
      </Route>
    </Routes>

  );
};
