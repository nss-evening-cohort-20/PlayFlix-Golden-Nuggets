import { useEffect, useState } from "react";
import "./Game.css"
export const Game = ({id, title, img, description, rating, userRating, genre}) => {
return <div className="game">
    <div>
    {title}
    </div>
    <div>
    <img src={img} className="gameImg"></img>
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