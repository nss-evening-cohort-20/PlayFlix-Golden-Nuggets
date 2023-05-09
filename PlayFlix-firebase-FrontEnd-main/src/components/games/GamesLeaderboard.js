// import { useEffect } from "react";
// import { useState } from "react";
// import { Game } from "./Game";

// export const GamesLeaderBoard = () => {
// const [games, setGames] = useState([])
// const [filteredGames, setFilteredGames] = useState([])

//     useEffect(
//         () => {
//             const fetchData = async () => {
//                 const respone = await fetch(
//                     `https://localhost:7215/api/Games`
//                 );
//                 const gamesArray = await respone.json();
//                 setGames(gamesArray)
//             };
//             fetchData();
//         },
//         []
//     );
//     useEffect(
//         () => {
//             setFilteredGames(games)
//         },
//         [games]
//     );

//     useEffect(
//         () => {
//             const userRankings = [...filteredGames].sort((a,b) => b.userRating - a.userRating);
//             console.log(userRankings)
//         },
//         [filteredGames]
//     );

//     useEffect(
//         () => {
//             const defaultRankings = [...filteredGames].sort((a,b) => b.rating - a.rating);
//             console.log(defaultRankings)
//         },
//         [filteredGames]
//     );
//     return 
//     <>
//      <List data={userRankings} />
//     </>
// }