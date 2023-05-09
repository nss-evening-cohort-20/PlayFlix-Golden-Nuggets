import { useEffect, useState } from "react";
import "./Game.css"
import { Link } from "react-router-dom";
export const Game = ({id, title, img, description, rating, userRating, genre, iFrame}) => {
return <>
        <div>
            {title}
        </div>
        <Link to={`/Games/play/${id}`} className="item">
        <img src={img}></img>
        </Link>
</>
}