import { useEffect, useState } from "react";
import "./Game.css"
import { Link } from "react-router-dom";
export const Game = ({id, title, img, description, rating, userRating, genre, iFrame}) => {
return <div className="game">
    <div>
    {title}
    </div>
    <div>
        <Link to={`/Games/play/${id}`}>
    <img src={img} className="gameImg"></img>
        </Link>
    </div>
    <div>
    {description}
    </div>
    <div>
    {rating}
    </div>
    <div>
    {userRating}
    </div>
    <div>
    {genre}
    </div>
</div>
}