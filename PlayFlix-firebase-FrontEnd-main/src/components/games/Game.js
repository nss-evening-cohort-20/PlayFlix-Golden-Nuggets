import { useEffect, useState } from "react";
import "./Game.css"
import { Link } from "react-router-dom";
export const Game = ({id, title, img, description, rating, userRating, genre, iFrame}) => {
return <div className="container">
    <div>
    {title}
    </div>
        <Link to={`/Games/play/${id}`}>
        <a class="item"><img src={img} alt="Animals"></img></a>
        </Link>
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
    </div>  <div>
    {title}
    </div>
</div>

}