import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createPortal } from 'react-dom'
export const GamePlay = () => {
const navigate = useNavigate()
const { gameId } = useParams()
const [game, updateGame] = useState({})

useEffect(
    () => {
        const fetchData = async () => {
            const response = await fetch(`https://localhost:7215/api/Games/id/${gameId}`)
            const singleGame = await response.json()
            updateGame(singleGame)
        }
        fetchData()
    },
    [gameId]
)


return <>
<section>
    <h1>hello world</h1>
    <div>
        {game?.title}
    </div>
    <div>
    <iframe src={game.iFrame} width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>
    </div>
</section>

</>

}