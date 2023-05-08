import { useEffect } from "react"

export const GamesLeaderBoard = () => {
   
        const [leaderBoard, setLeaderBoard] = useState([])
        
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
    
}