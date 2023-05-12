
import { Button, Modal } from "@mui/material/";
import { useState, useEffect } from "react";
import { Game } from "./Game";
import { ActiveGameModal } from "../modal/ActiveGameModal";
import { FiArrowRightCircle, FiArrowLeftCircle  } from "react-icons/fi";
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


  const [selectedGame, setClickedGame] = useState(null);

  const onGameClick = (id) => {
    const clickedGame = games.find((game) => game.id === id);
    console.log(clickedGame);
    setClickedGame(clickedGame);
  };

  return (
    <>
      <div className="games">
        {genres.map((genre) => (
          <div key={genre}>
            <h2 className="gameGenreTitles">{genre}</h2>
            <div className="container">
              {genreGames[genre].map((game) => (
                <Game
                  onGameClick={onGameClick}
                  key={`game--${game.id}`}
                  game={game}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedGame && (
        <ActiveGameModal
          game={selectedGame}
          closeModal={() => setClickedGame(null)}
        />
      )}
    </>

  );
};
