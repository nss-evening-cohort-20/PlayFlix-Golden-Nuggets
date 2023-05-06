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
            <h2 className="gameGenreTitles">Action</h2>
            <div className="container">
                {
                    actionGames.map(game => <Game key={`game--${game.id}`}
                        id={game.id}
                        img={game.gameImg}/>)
                }
            </div>
            <h2 className="gameGenreTitles">Adventure</h2>
            <div className="container">
                {
                    adventureGames.map(game => <Game key={`game--${game.id}`}
                        id={game.id}
                        img={game.gameImg}/>)
                }
            </div>
            <h2 className="gameGenreTitles">Sports</h2>
            <div className="container">
                {
                    sportsGames.map(game => <Game key={`game--${game.id}`}
                        id={game.id}
                        img={game.gameImg}
                        />)
                }
            </div>
            <h2 className="gameGenreTitles">Racing</h2>
            <div className="container">
                {
                    racingGames.map(game => <Game key={`game--${game.id}`}
                        id={game.id}
                        img={game.gameImg}
                        />)
                }
            </div>
            <h2 className="gameGenreTitles">Fighting</h2>
            <div className="container">
                {
                    fightingGames.map(game => <Game key={`game--${game.id}`}
                        id={game.id}
                        img={game.gameImg}
                         />)
                }
            </div>
            <h2 className="gameGenreTitles">Puzzles</h2>
            <div className="container">
                {
                    puzzleGames.map(game => <Game key={`game--${game.id}`}
                        id={game.id}
                        img={game.gameImg}
                         />)
                }
            </div>
        </div>
    </>
}