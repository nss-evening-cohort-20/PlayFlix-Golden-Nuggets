import { useEffect } from "react";
import { useState } from "react";

import "./leaderboardStyles.css";
export const GamesLeaderBoard = () => {
const [games, setGames] = useState([])
const [filteredGames, setFilteredGames] = useState([])
const [userLeaderBoard, setUserLeaderboard] = useState([])
const [defaultLeaderBoard, setDefaultLeaderboard] = useState([])
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
            const userRankings = [...filteredGames].sort((a,b) => b.userRating - a.userRating);
            setUserLeaderboard(userRankings)
        },
        [filteredGames]
    );

    useEffect(
        () => {
            const defaultRankings = [...filteredGames].sort((a,b) => b.rating - a.rating);
            setDefaultLeaderboard(defaultRankings)
        },
        [filteredGames]
    );
    return <>
        <div className="ledaerboardFlexbox">
        <ul className="item-wrapper">
        <h3 className="ratingsTitle">Critic Ratings</h3>
        {defaultLeaderBoard.map((row) => (
          <li className="leaderboard_item">
          <span className="item__name">{row.title}</span>
          <span className="item__rating">{row.rating}</span>
        </li>
        ))}
      </ul>
      <ul className="item-wrapper">
        <h3 className="ratingsTitle">User Ratings</h3>
        {userLeaderBoard.map((row) => (
          <li className="leaderboard_item">
          <span className="item__name">{row.title}</span>
          <span className="item__rating">{row.userRating}</span>
        </li>
        ))}
      </ul>
      </div>
      </>
    }
