import { Outlet, Route, Routes } from "react-router-dom";
import { GamesContainer } from "../games/GamesContainer"
import { NavBar } from "../navBar/NavBar"
import { UserProfile } from "../user/UserProfile";
import { Favorites } from "../favorites/Favorites";
import { GamePlay } from "../games/GamesPlay";
import { GamesLeaderBoard } from "../games/GamesLeaderBoard/Leaderboard";
import { useState } from "react";
import { searchGames } from "../../ApiKeys";

export const ApplicationViews = ({navigate, setUserCheck, userCheck}) => {
  const[searchParams, setSearchParams] = useState("")
  const[modalOpen, setModalOpen] = useState(false)
  const [returnedGames, setReturnedGames] = useState([])
  
  const handleClick = async () => {
    try {
      const searchedGames = await searchGames(searchParams)
      setReturnedGames(searchedGames)
      setModalOpen(true)
      
      } catch (error) {
      console.log(error)
      }
    }

  return (
    

    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar
            handleClick={handleClick}
            navigate={navigate}
            userCheck={userCheck} 
            setUserCheck={setUserCheck} 
            setSearchParams={setSearchParams} 
            searchParams={searchParams} 
            setModalOpen={setModalOpen}
            returnedGames={returnedGames}
            setReturnedGames={setReturnedGames}/>
         <Outlet/>
         </>
        }>
          <Route path="/" element={<GamesContainer searchParams={searchParams} modalOpen={modalOpen} returnedGames={returnedGames} setReturnedGames={setReturnedGames} setModalOpen={setModalOpen}/>} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/favorites" element={<Favorites/>} />
          <Route path="/leaderboard/" element={<GamesLeaderBoard/>} />
          <Route path="/games/play/:gameId" element={<GamePlay/>} />
          <Route path="/favorites" element={<Favorites/> } />
      </Route>
    </Routes>

  );
};
