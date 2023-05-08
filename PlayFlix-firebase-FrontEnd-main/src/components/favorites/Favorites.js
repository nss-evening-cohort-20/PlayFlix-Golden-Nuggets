import { useEffect, useState } from "react";
import { Game } from "../games/Game";
export const Favorites = () => {
    const localUser = sessionStorage.getItem("google-uid");
    const user = ({localUser}.localUser)

  const [favorites, setFavorites] = useState([])

  useEffect(
      () => {
          const fetchFavorites = async () => {
              const response = await fetch(`https://localhost:7215/api/FavoriteGames?uId=${user}`)
              const responseJSON = await response.json()
              console.log({localUser})
              console.log({responseJSON})
              setFavorites(responseJSON)
          }
          fetchFavorites()
      },
      []
  )
return (
  <>
            <div>
                <h2>Favorites Page</h2>
                <article className="games">
                    {
                    favorites.map((game) =>      
                            <Game
                                key={`game--${game?.games?.id}`}
                                id={game?.games?.id}
                                title={game?.games?.title}
                                rating={game?.games?.rating}
                                userRating={game?.games?.userRating}
                                genre={game?.games?.genre}
                                img={game?.games?.gameImg}
                                info={game?.games?.description}
                            />
                    )}
                </article>
            </div>
            </>
);
}