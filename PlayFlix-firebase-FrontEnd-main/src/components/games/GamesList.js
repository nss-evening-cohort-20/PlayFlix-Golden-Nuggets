import { useState, useEffect } from "react";

import { Game } from "./Game";

export const GamesList = ({}) => {
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
    <>
      <div className="games">
        {genres.map((genre) => (
          <div key={genre}>
            <h2 className="gameGenreTitles">{genre}</h2>
            <div className="container">
              {genreGames[genre].map((game) => (
                <Game
                  key={`game--${game.id}`}
                  id={game.id}
                  img={game.gameImg}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
