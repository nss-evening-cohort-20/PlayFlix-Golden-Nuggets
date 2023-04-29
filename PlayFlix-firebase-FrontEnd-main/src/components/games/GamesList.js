import { useEffect } from "react";
import { useState } from "react";
import { Game } from "./Game";


export const GamesList = ({}) => {
    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])

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
}