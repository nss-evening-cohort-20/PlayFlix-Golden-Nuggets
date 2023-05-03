import { useEffect } from "react";
import { useState } from "react";
import { Game } from "./Game";


export const GamesList = ({ }) => {
    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])
    const [actionGames, setActionGames] = useState([])
    const [adventureGames, setAdventureGames] = useState([])
    const [racingGames, setRacingGames] = useState([])
    const [fightingGames, setFightingGames] = useState([])
    const [puzzleGames, setPuzzleGames] = useState([])
    const [sportsGames, setSportsGames] = useState([])
    useEffect(
        () => {
            const fetchData = async () => {
                const respone = await fetch(
                    `https://localhost:7215/api/Games`
                );
                const gamesArray = await respone.json();
                setGames(gamesArray)
            };
            fetchData();
        },
        []
    );
    useEffect(
        () => {
            setFilteredGames(games)
        },
        [games]
    );

    useEffect(
        () => {
            var tempActionGames = [];
            games.forEach(game => {
                if (game.genre === "Action") {
                    tempActionGames.push(game)
                }
                setActionGames(tempActionGames)
            });
        },
        [games]
    );
    useEffect(
        () => {
            var tempAdventureGames = [];
            games.forEach(game => {
                if (game.genre === "Adventure") {
                    tempAdventureGames.push(game)
                }
                setAdventureGames(tempAdventureGames)
            });
        },
        [games]
    );
    useEffect(
        () => {
            var tempRacingGames = [];
            games.forEach(game => {
                if (game.genre === "Racing") {
                    tempRacingGames.push(game)
                }
                setRacingGames(tempRacingGames)
            });
        },
        [games]
    );
    useEffect(
        () => {
            var tempFightingGames = [];
            games.forEach(game => {
                if (game.genre === "Fighting") {
                    tempFightingGames.push(game)
                }
                setFightingGames(tempFightingGames)
            });
        },
        [games]
    );
    useEffect(
        () => {
            var tempSportsGames = [];
            games.forEach(game => {
                if (game.genre === "Sports") {
                    tempSportsGames.push(game)
                }
                setSportsGames(tempSportsGames)
            });
        },
        [games]
    );
    useEffect(
        () => {
            var tempPuzzleGames = [];
            games.forEach(game => {
                if (game.genre === "Puzzles") {
                    tempPuzzleGames.push(game)
                }
                setPuzzleGames(tempPuzzleGames)
            });
        },
        [games]
    );
   

    return <>
        <div className="games">
            <h2>Action</h2>
            <div className="genreRow">
                {
                    actionGames.map(game => <Game key={`game--${game.id}`}
                        id={game.id}
                        title={game.title}
                        img={game.gameImg}
                        description={game.description}
                        rating={game.rating}
                        userRating={game.userRating}
                        genre={game.genre} />)
                }
            </div>
            <h2>Adventure</h2>
            <div className="genreRow">
                {
                    adventureGames.map(game => <Game key={`game--${game.id}`}
                        id={game.id}
                        title={game.title}
                        img={game.gameImg}
                        description={game.description}
                        rating={game.rating}
                        userRating={game.userRating}
                        genre={game.genre} />)
                }
            </div>
            <h2>Sports</h2>
            <div className="genreRow">
                {
                    sportsGames.map(game => <Game key={`game--${game.id}`}
                        id={game.id}
                        title={game.title}
                        img={game.gameImg}
                        description={game.description}
                        rating={game.rating}
                        userRating={game.userRating}
                        genre={game.genre} />)
                }
            </div>
            <h2>Racing</h2>
            <div className="genreRow">
                {
                    racingGames.map(game => <Game key={`game--${game.id}`}
                        id={game.id}
                        title={game.title}
                        img={game.gameImg}
                        description={game.description}
                        rating={game.rating}
                        userRating={game.userRating}
                        genre={game.genre} />)
                }
            </div>
            <h2>Fighting</h2>
            <div className="genreRow">
                {
                    fightingGames.map(game => <Game key={`game--${game.id}`}
                        id={game.id}
                        title={game.title}
                        img={game.gameImg}
                        description={game.description}
                        rating={game.rating}
                        userRating={game.userRating}
                        genre={game.genre} />)
                }
            </div>
            <h2>Puzzles</h2>
            <div className="genreRow">
                {
                    puzzleGames.map(game => <Game key={`game--${game.id}`}
                        id={game.id}
                        title={game.title}
                        img={game.gameImg}
                        description={game.description}
                        rating={game.rating}
                        userRating={game.userRating}
                        genre={game.genre} />)
                }
            </div>
        </div>
    </>
}