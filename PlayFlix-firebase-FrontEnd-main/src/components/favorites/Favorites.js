import { useEffect, useState } from "react";
import { Game } from "../games/Game";

export const Favorites = () => {
  const localUser = sessionStorage.getItem("uid");

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await fetch(
        `https://localhost:7215/api/FavoriteGames?uId=${localUser}`
      );
      const responseJSON = await response.json();
      console.log({ localUser });
      console.log({ responseJSON });
      setFavorites(responseJSON);
    };
    fetchFavorites();
  }, []);

  return (
    favorites &&
    favorites.length > 0 && (
      <>
        <div>
          <h2>Favorites Page</h2>
          <article className="games">
            {favorites?.map(
              (game) =>
                game &&
                game?.games && (
                  <Game
                    key={`game--${game?.games?.id}`}
                    game={game?.games}
                    onGameClick={() => {}}
                  />
                )
            )}
          </article>
        </div>
      </>
    )
  );
};
