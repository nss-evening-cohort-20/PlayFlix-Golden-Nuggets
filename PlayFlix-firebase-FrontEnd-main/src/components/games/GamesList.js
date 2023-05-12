import { useState, useEffect } from "react";
import { FiArrowRightCircle, FiArrowLeftCircle  } from "react-icons/fi";
import { Game } from "./Game";
import "./GamesList.css"


export const GamesList = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://localhost:7215/api/Games`);
      const gamesArray = await response.json();
      setGames(gamesArray);
      setFilteredGames(gamesArray);
    };
    fetchData();
  }, []);

  const genres = [
    "Action",
    "Adventure",
    "Racing",
    "Fighting",
    "Puzzles",
    "Sports",
  ];

  const genreGames = {};
  genres.forEach((genre) => {
    genreGames[genre] = games.filter((game) => game.genre === genre);
  });

  

  return (
    <div className="games">
      {genres.map((genre) => (
        <div key={genre} id={genre}>
          <h2 className="gameGenreTitles">{genre}</h2>
          <div className="container">
            
            {/* <FiArrowLeftCircle size = {50} className="left-arrow"/> */}
            {genreGames[genre].map((game) => (
              <Game
                key={`game--${game.id}`}
                id={game.id}
                img={game.gameImg}
                title={game.title}
              />
              )
              )
            }
            {/* <FiArrowRightCircle size = {50} className="right-arrow"/> */}
            </div>
          </div>
       
        
      ))}
    </div>
  );
};
